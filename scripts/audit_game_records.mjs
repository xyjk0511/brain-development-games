import fs from 'node:fs';
import path from 'node:path';

const REQUIRED_SESSION_FIELDS = [
  'gameId',
  'domain',
  'taskFamily',
  'mode',
  'level',
  'startedAt',
  'completedAt',
  'summary',
  'trials',
  'events',
  'adaptive'
];

const REQUIRED_TRIAL_FIELDS = [
  'trialId',
  'condition',
  'stimulus',
  'correctAnswer',
  'response',
  'correct',
  'rtMs',
  'errorType',
  'difficultyParams'
];

function readJson(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(raw);
}

function unwrapRecords(value) {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value.records)) return value.records;
  if (Array.isArray(value.sessions)) return value.sessions;
  if (Array.isArray(value.data)) return value.data;
  return [value];
}

function isObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value);
}

function missingSessionFields(record) {
  return REQUIRED_SESSION_FIELDS.filter((field) => {
    if (!(field in record)) return true;
    if (field === 'summary' || field === 'adaptive') return !isObject(record[field]);
    if (field === 'trials' || field === 'events') return !Array.isArray(record[field]);
    return record[field] === null || record[field] === undefined || record[field] === '';
  });
}

function missingTrialFields(trial) {
  if (!isObject(trial)) return REQUIRED_TRIAL_FIELDS;
  return REQUIRED_TRIAL_FIELDS.filter((field) => !(field in trial));
}

function audit(records) {
  return records.map((record, index) => {
    const trialIssues = Array.isArray(record.trials)
      ? record.trials
          .map((trial, trialIndex) => ({ trialIndex, missing: missingTrialFields(trial) }))
          .filter((issue) => issue.missing.length > 0)
      : [];

    return {
      index,
      gameId: record.gameId || null,
      validSession: missingSessionFields(record).length === 0,
      missingSession: missingSessionFields(record),
      trialCount: Array.isArray(record.trials) ? record.trials.length : 0,
      eventCount: Array.isArray(record.events) ? record.events.length : 0,
      trialIssues: trialIssues.slice(0, 10)
    };
  });
}

const filePath = process.argv[2];
if (!filePath) {
  console.error('Usage: node scripts/audit_game_records.mjs <records.json>');
  console.error('The JSON may be an array or an object containing records/sessions/data.');
  process.exit(2);
}

const resolved = path.resolve(filePath);
const records = unwrapRecords(readJson(resolved));
const report = audit(records);
const failed = report.filter((item) => !item.validSession || item.trialIssues.length > 0);

console.log(JSON.stringify({
  file: resolved,
  total: records.length,
  passed: records.length - failed.length,
  failed: failed.length,
  records: report
}, null, 2));

if (failed.length > 0) process.exit(1);
