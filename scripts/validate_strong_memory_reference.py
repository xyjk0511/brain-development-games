from __future__ import annotations

import json
import os
import sys
from pathlib import Path

try:
    import openpyxl
except Exception as exc:  # pragma: no cover - runtime environment check
    print(f"openpyxl is required for workbook parity validation: {exc}", file=sys.stderr)
    sys.exit(2)


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_REFERENCE_DIR = Path(
    r"F:\wechat\xwechat_files\wxid_br2nkrs4dgri12_68ec\msg\file\2026-05\强力记忆测试用例(1)"
)


def rows_from_workbook(path: Path, sheet_name: str) -> tuple[list[str], list[list[object]]]:
    wb = openpyxl.load_workbook(path, data_only=True, read_only=True)
    ws = wb[sheet_name]
    rows = list(ws.iter_rows(values_only=True))
    fields = [str(value).strip().strip('"') for value in rows[1][1:] if value is not None]
    active = []
    for raw in rows[2:]:
        if raw[0] is None:
            continue
        active.append(list(raw[1 : 1 + len(fields)]))
    return fields, active


def rows_from_json(table: dict) -> tuple[list[str], list[list[object]]]:
    return list(table["Columes"]), table["Values"]


def normalize(value: object) -> str:
    if value is None:
        return ""
    if isinstance(value, float) and value.is_integer():
        return str(int(value))
    return str(value)


def compare_table(name: str, json_table: dict, workbook_fields: list[str], workbook_rows: list[list[object]]) -> list[str]:
    json_fields, json_rows = rows_from_json(json_table)
    errors: list[str] = []
    if json_fields != workbook_fields:
        errors.append(f"{name}: fields differ json={json_fields} workbook={workbook_fields}")
    if len(json_rows) != len(workbook_rows):
        errors.append(f"{name}: row count differs json={len(json_rows)} workbook={len(workbook_rows)}")
    for index, (json_row, workbook_row) in enumerate(zip(json_rows, workbook_rows), start=1):
        if [normalize(v) for v in json_row] != [normalize(v) for v in workbook_row]:
            errors.append(f"{name}: row {index} differs json={json_row} workbook={workbook_row}")
            if len(errors) > 20:
                break
    return errors


def main() -> int:
    reference_dir = Path(os.environ.get("STRONG_MEMORY_REFERENCE_DIR", DEFAULT_REFERENCE_DIR))
    data_path = ROOT / "public" / "playable-games" / "strong-memory" / "data.json"
    workbook_path = reference_dir / "最强记忆数值(3).xlsm"

    with data_path.open("r", encoding="utf-8") as fh:
        data = json.load(fh)

    errors: list[str] = []
    floor_fields, floor_rows = rows_from_workbook(workbook_path, "层数据")
    level_fields, level_rows = rows_from_workbook(workbook_path, "关卡")
    errors.extend(compare_table("Floor", data["Floor"], floor_fields, floor_rows))
    errors.extend(compare_table("Level", data["Level"], level_fields, level_rows))

    if errors:
        print("Strong Memory reference validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print(
        json.dumps(
            {
                "status": "ok",
                "reference": str(workbook_path),
                "floors": len(floor_rows),
                "levels": len(level_rows),
            },
            ensure_ascii=False,
        )
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
