import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFile as execFileCallback } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath, pathToFileURL } from 'node:url';

const execFile = promisify(execFileCallback);

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PLAYABLE_ROOT = path.resolve(ROOT, 'public', 'playable-games');
const DEFAULT_GAMES = fs.readdirSync(PLAYABLE_ROOT, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && entry.name !== 'shared')
  .map((entry) => entry.name)
  .sort();

const COMMON_BROWSERS = [
  process.env.CHROME_PATH,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
].filter(Boolean);

function findBrowser() {
  const found = COMMON_BROWSERS.find((candidate) => fs.existsSync(candidate));
  if (!found) {
    throw new Error('No Chrome/Edge executable found. Set CHROME_PATH to run browser smoke checks.');
  }
  return found;
}

function urlForGame(gameId) {
  const baseUrl = process.argv.find((arg) => arg.startsWith('--base-url='))?.slice('--base-url='.length);
  if (baseUrl) return `${baseUrl.replace(/\/$/, '')}/playable-games/${gameId}/index.html`;
  return pathToFileURL(path.join(PLAYABLE_ROOT, gameId, 'index.html')).href;
}

async function smokeGame(browserPath, gameId) {
  const url = urlForGame(gameId);
  const args = [
    '--headless=new',
    '--disable-gpu',
    '--disable-extensions',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${path.join(os.tmpdir(), `cognitive-game-smoke-${process.pid}-${gameId}`)}`,
    '--virtual-time-budget=4000',
    '--dump-dom',
    url
  ];

  const { stdout, stderr } = await execFile(browserPath, args, {
    timeout: 20000,
    maxBuffer: 8 * 1024 * 1024
  });

  const hasBody = /<body[\s>]/i.test(stdout);
  const hasUnified = stdout.includes('playable-unified')
    || stdout.includes('unified-home-link')
    || stdout.includes('CognitiveGameRecorder')
    || fs.readFileSync(path.join(PLAYABLE_ROOT, gameId, 'index.html'), 'utf8').includes('shared/unified.js');

  return {
    gameId,
    url,
    ok: hasBody && hasUnified && stdout.length > 500,
    domLength: stdout.length,
    hasBody,
    hasUnified,
    stderr: stderr.trim().split(/\r?\n/).slice(-3)
  };
}

const selected = process.argv
  .filter((arg) => arg.startsWith('--games='))
  .flatMap((arg) => arg.slice('--games='.length).split(',').map((item) => item.trim()).filter(Boolean));
const games = selected.length ? selected : DEFAULT_GAMES;
const browserPath = findBrowser();
const results = [];

for (const gameId of games) {
  try {
    results.push(await smokeGame(browserPath, gameId));
  } catch (error) {
    results.push({ gameId, ok: false, error: error.message });
  }
}

const failed = results.filter((result) => !result.ok);
console.log(JSON.stringify({
  browserPath,
  total: results.length,
  passed: results.length - failed.length,
  failed: failed.length,
  results
}, null, 2));

if (failed.length > 0) process.exit(1);
