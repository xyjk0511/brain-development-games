# Brain Development Games

> A cute browser-based cognitive training collection with 17 playable games.

## Play

[Open the live site](https://xyjk0511.github.io/brain-development-games/)

Strong Memory can also be opened directly:

[Strong Memory](https://xyjk0511.github.io/brain-development-games/games/strong-memory)

## Current Game Set

The homepage registry is the source of truth. It currently exposes 17 games:

### Memory

- **彩虹水母灯灯岛** (`simon-says`) - sequence memory
- **强力记忆** (`strong-memory`) - position memory, backed by the supplied 60-level reference data
- **小动物找朋友** (`card-matching`) - matching memory
- **记忆小侦探** (`n-back`) - working-memory updating

### Attention

- **小鱼侦探队** (`visual-search`) - visual search
- **小动物过马路** (`reaction-time`) - Go/No-Go style reaction control
- **星星数字广场** (`schulte-table`) - visual scanning and attention
- **小鱼队长看方向** (`stroop`) - Flanker-style inhibition
- **宝藏小路** (`trail-making`) - attention switching and ordered connection

### Logic And Planning

- **字字小乐园** (`word-scramble`) - language and semantic flexibility
- **森林小侦探** (`logic-puzzles`) - logical reasoning
- **甜甜圈收纳架** (`tower-of-hanoi`) - planning
- **规律小火车** (`number-sequence`) - pattern reasoning
- **小熊果汁铺** (`water-jugs`) - step planning
- **果果心算铺** (`quick-math`) - numerical fluency

### Spatial

- **萤火虫路线** (`maze`) - route planning
- **转转积木伙伴** (`mental-rotation`) - mental rotation

Most games use 10 levels. **Strong Memory** is a standalone playable integrated into the registry and uses the supplied 60-level `data.json` / workbook contract.

## Strong Memory Reference Alignment

Strong Memory lives under `public/playable-games/strong-memory/` and is loaded by `/games/strong-memory` through the app shell.

Its runtime data file is:

- `public/playable-games/strong-memory/data.json`

The current checked-in JSON is intended to match the reference package:

- `data.json`
- `最强记忆数值(3).xlsm`
- `游戏关卡设置-难度配置表.xlsx`
- `强力记忆测试用例.xlsx`
- `游戏策划-强力记忆.docx`
- `最强记忆文档.xlsx`
- `强力记忆.rp`

The OpenSpec traceability record is in:

- `openspec/changes/align-strong-memory-reference-specs/traceability.md`

## Local Development

### Prerequisites

- Node.js 22+
- npm

### Install

```bash
npm install
```

### Run

```bash
npm run dev
```

Open:

```text
http://localhost:5173/brain-development-games/
```

### Test

```bash
npm test -- --run
```

### Build

```bash
npm run build
```

The production build is written to `docs/`. The build also copies `docs/index.html` to `docs/404.html` so GitHub Pages can serve client-side routes.

## Deployment

The project is deployed to the user's own GitHub repository:

```text
https://github.com/xyjk0511/brain-development-games
```

Use the `xyjk` remote when pushing source or deploying:

```bash
git push xyjk main
npm run deploy -- -r https://github.com/xyjk0511/brain-development-games.git
```

The deployed site is:

```text
https://xyjk0511.github.io/brain-development-games/
```

## Project Structure

```text
brain-development-games/
├── src/
│   ├── components/       # Shared React UI
│   ├── games/            # React game implementations
│   ├── lib/              # Registry, parameters, progress, leaderboard, tests
│   ├── pages/            # Home and route surfaces
│   ├── App.tsx
│   └── main.tsx
├── public/
│   ├── game-art/         # Homepage art assets
│   ├── playable-games/   # Standalone playable bundles such as Strong Memory
│   ├── manifest.json
│   ├── robots.txt
│   └── sitemap.xml
├── openspec/             # Change specs and traceability
├── design/               # Design and adaptive-difficulty notes
└── scripts/              # Validation helpers
```

## Claim Boundary

These games are training and practice activities. Product copy should describe memory, attention, planning, problem solving, and cognitive challenge. Do not claim diagnosis, treatment, cure, disease improvement, or guaranteed IQ improvement.
