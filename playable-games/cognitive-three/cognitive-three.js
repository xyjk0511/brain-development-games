const title = document.querySelector('#game-title');
const sideTitle = document.querySelector('#side-title');
const sideCopy = document.querySelector('#side-copy');
const ruleBox = document.querySelector('#rule-box');
const promptEl = document.querySelector('#prompt');
const stage = document.querySelector('#stage');
const feedback = document.querySelector('#feedback');
const nextButton = document.querySelector('#next-button');
const roundEl = document.querySelector('#round');
const scoreEl = document.querySelector('#score');
const streakEl = document.querySelector('#streak');
const tabs = Array.from(document.querySelectorAll('[data-game]'));
const assetBase = '../../training-assets/image2/';

const shapes = ['circle', 'square', 'triangle'];
const shapeLabel = { circle: '圆形', square: '方形', triangle: '三角形' };
const paletteSize = 8;
const flashTypeLabel = { 0: '不限制', 1: '颜色变化', 2: '形状变化', 3: '纹理变化' };
const flashLevels = [
  [1, 1, 50, 1, 1, 1, 2, 20, 104, 10, 60, 1, 1, 60], [2, 2, 50, 1, 1, 1, 2, 20, 108, 10, 60, 1, 1, 60],
  [3, 3, 50, 1, 1, 1, 2, 20, 112, 11, 66, 1, 1, 66], [4, 4, 50, 1, 1, 1, 2, 20, 116, 11, 66, 1, 1, 66],
  [5, 5, 50, 1, 1, 1, 2, 20, 120, 12, 72, 1, 1, 72], [6, 6, 50, 1, 1, 1, 2, 20, 124, 12, 72, 1, 1, 72],
  [7, 7, 50, 1, 1, 1, 2, 20, 128, 13, 78, 1, 1, 78], [8, 8, 50, 1, 1, 1, 2, 20, 132, 13, 78, 1, 1, 78],
  [9, 9, 50, 1, 1, 1, 2, 20, 136, 14, 84, 1, 1, 84], [10, 10, 50, 1, 1, 1, 2, 20, 140, 14, 84, 1, 1, 84],
  [11, 11, 50, 1, 1, 1, 3, 20, 144, 15, 120, 1, 1, 120], [12, 12, 50, 1, 1, 1, 3, 20, 148, 15, 120, 1, 1, 120],
  [13, 13, 50, 1, 1, 1, 3, 20, 152, 16, 128, 1, 1, 128], [14, 14, 50, 1, 1, 1, 3, 20, 156, 16, 128, 1, 1, 128],
  [15, 15, 50, 1, 1, 1, 3, 20, 160, 17, 136, 1, 1, 136], [16, 16, 50, 1, 1, 1, 3, 25, 164, 17, 170, 1, 1, 170],
  [17, 17, 50, 1, 1, 1, 3, 25, 168, 18, 180, 1, 1, 180], [18, 18, 50, 1, 1, 1, 3, 25, 172, 18, 180, 1, 1, 180],
  [19, 19, 50, 1, 1, 1, 3, 25, 176, 19, 190, 1, 1, 190], [20, 20, 50, 1, 1, 1, 3, 25, 180, 19, 190, 1, 1, 190],
  [21, 21, 50, 1, 1, 1, 4, 25, 184, 20, 250, 1, 1, 275], [22, 22, 50, 1, 1, 1, 4, 25, 188, 20, 250, 1, 1, 275],
  [23, 23, 50, 1, 1, 1, 4, 25, 192, 21, 263, 1, 1, 289], [24, 24, 50, 1, 1, 1, 4, 25, 196, 21, 263, 1, 1, 289],
  [25, 25, 50, 1, 1, 1, 4, 25, 200, 21, 263, 1, 1, 289], [26, 26, 50, 1, 1, 1, 4, 25, 204, 21, 263, 1, 2, 289],
  [27, 27, 50, 1, 1, 1, 4, 25, 208, 22, 275, 1, 2, 303], [28, 28, 50, 1, 1, 1, 4, 25, 212, 22, 275, 1, 2, 303],
  [29, 29, 50, 1, 1, 1, 4, 25, 216, 22, 275, 1, 2, 303], [30, 30, 50, 1, 1, 1, 4, 25, 220, 22, 275, 1, 2, 303],
  [31, 31, 50, 2, 1, 1, 5, 30, 224, 23, 414, 1, 2, 456], [32, 32, 50, 2, 1, 1, 5, 30, 228, 23, 414, 1, 2, 456],
  [33, 33, 50, 2, 1, 1, 5, 30, 232, 23, 414, 1, 2, 456], [34, 34, 50, 2, 1, 1, 5, 30, 236, 23, 414, 1, 2, 456],
  [35, 35, 50, 2, 1, 1, 5, 30, 240, 24, 432, 1, 2, 476], [36, 36, 50, 2, 1, 1, 5, 30, 244, 24, 432, 1, 2, 476],
  [37, 37, 50, 2, 1, 1, 5, 30, 248, 24, 432, 1, 2, 476], [38, 38, 50, 2, 1, 1, 5, 30, 252, 24, 432, 1, 2, 476],
  [39, 39, 50, 2, 1, 1, 5, 30, 256, 25, 450, 1, 2, 495], [40, 40, 50, 2, 1, 1, 5, 30, 260, 25, 450, 1, 2, 495],
  [41, 41, 50, 3, 1, 1, 6, 30, 264, 25, 600, 1, 3, 720], [42, 42, 50, 3, 1, 1, 6, 30, 268, 25, 600, 1, 3, 720],
  [43, 43, 50, 3, 1, 1, 6, 30, 272, 26, 624, 1, 3, 749], [44, 44, 50, 3, 1, 1, 6, 30, 276, 26, 624, 1, 3, 749],
  [45, 45, 50, 3, 1, 1, 6, 30, 280, 26, 624, 1, 3, 749], [46, 46, 50, 3, 1, 1, 6, 30, 284, 26, 624, 1, 3, 749],
  [47, 47, 50, 3, 1, 1, 6, 30, 288, 27, 648, 1, 3, 778], [48, 48, 50, 3, 1, 1, 6, 30, 292, 27, 648, 1, 3, 778],
  [49, 49, 50, 3, 1, 1, 6, 30, 296, 27, 648, 1, 3, 778], [50, 50, 50, 3, 1, 1, 6, 30, 300, 27, 648, 1, 3, 778],
].map(([ID, Level, Rate, Type, MissionNum, MissionPass, Fault, Time, Brains, Score, Scores, Reward, RewardNum, Limit]) => ({
  ID, Level, Rate, Type, MissionNum, MissionPass, Fault, Time, Brains, Score, Scores, Reward, RewardNum, Limit,
}));
const flashCatalog = Array.from({ length: 120 }, (_, index) => {
  const color = Math.floor(index / 15) + 1;
  const shape = Math.floor((index % 15) / 3) + 1;
  const texture = (index % 3) + 1;
  return {
    index,
    color,
    shape,
    texture,
    src: `../../training-assets/flash/core/flash_c${String(color).padStart(2, '0')}_s${String(shape).padStart(2, '0')}_t${String(texture).padStart(2, '0')}.svg`,
  };
});

const gameNames = {
  'color-shape-stroop': '幻色图形',
  'flash-shape': '快闪图形',
  'eye-quick': '眼疾手快',
};

const gameCopy = {
  'color-shape-stroop': {
    copy: '只按颜色或形状规则作答，忽略另一个维度的干扰。',
    rule: '训练目标：干扰抑制与规则切换。每轮先看左侧目标，再按提示选择右侧正确图形。',
  },
  'flash-shape': {
    copy: '先记住上一张图形，下一张出现后判断两张图形是否相同。',
    rule: '训练目标：即刻视觉记忆。先观察上一张图形，1 秒后判断当前图形与上一张是否相同。',
  },
  'eye-quick': {
    copy: '地鼠出现要快速点击，干扰物出现要忍住。',
    rule: '训练目标：反应控制。普通地鼠点一下，戴头盔地鼠点两下；炸弹、猫、兔子、熊猫都不要点。',
  },
};

let game = normalizeGame(location.hash.slice(1));
let round = 0;
let score = 0;
let streak = 0;
let answered = false;
let startedAt = Date.now();
let current = null;
let flashSession = null;

function normalizeGame(value) {
  return gameNames[value] ? value : 'color-shape-stroop';
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function gemShape(shape, colorIndex, label = '') {
  return imageAsset(`stroop/${shape}_${String(colorIndex).padStart(2, '0')}.png`, label || `${shapeLabel[shape]}图形`);
}

function flashBadge(index) {
  const icon = flashCatalog[index % flashCatalog.length];
  const image = document.createElement('img');
  image.src = icon.src;
  image.alt = `记忆图形 ${icon.index + 1}`;
  image.decoding = 'async';
  image.loading = 'eager';
  image.className = 'sprite-shadow';
  return image;
}

function eyeSprite(kind, helmetHits = 0) {
  const key = kind === 'normal'
    ? 'mole_normal_idle'
    : kind === 'helmet'
      ? (helmetHits ? 'mole_helmet_cracked' : 'mole_helmet_idle')
      : kind === 'bomb'
        ? 'bomb_fuse'
        : kind === 'cat'
          ? 'cat_guard_idle'
          : kind === 'rabbit'
            ? 'rabbit_decoy_idle'
            : 'panda_decoy_idle';
  return imageAsset(`eye/${key}.png`, key);
}

function imageAsset(path, label) {
  const image = document.createElement('img');
  image.src = `${assetBase}${path}`;
  image.alt = label;
  image.decoding = 'async';
  image.loading = 'eager';
  image.className = 'sprite-shadow';
  return image;
}

function updateHud() {
  const name = gameNames[game];
  title.textContent = name;
  sideTitle.textContent = name;
  sideCopy.textContent = gameCopy[game].copy;
  ruleBox.textContent = gameCopy[game].rule;
  roundEl.textContent = `${round + 1}/8`;
  scoreEl.textContent = String(score);
  streakEl.textContent = String(streak);
  tabs.forEach((tab) => tab.classList.toggle('active', tab.dataset.game === game));
}

function stopFlashSession() {
  if (!flashSession) return;
  flashSession.timers.forEach((timer) => window.clearTimeout(timer));
  window.clearInterval(flashSession.clock);
  flashSession = null;
}

function queueFlashTimer(callback, delay) {
  const timer = window.setTimeout(() => {
    if (flashSession) flashSession.timers.delete(timer);
    callback();
  }, delay);
  flashSession.timers.add(timer);
  return timer;
}

function currentFlashConfig() {
  return flashLevels[Math.max(0, Math.min(flashLevels.length - 1, flashSession.level - 1))];
}

function flashTargetCount(config) {
  return Math.ceil(config.Scores / config.Score);
}

function updateFlashHud() {
  const config = currentFlashConfig();
  const target = flashTargetCount(config);
  roundEl.textContent = `${flashSession.level}/50`;
  scoreEl.textContent = `${flashSession.correctCount}/${target}`;
  streakEl.textContent = `${flashSession.wrongCount}/${config.Fault}`;
}

function answer(correct) {
  if (answered) return;
  answered = true;
  const rt = Date.now() - startedAt;
  streak = correct ? streak + 1 : 0;
  score = Math.max(0, score + (correct ? 100 + Math.max(0, 900 - Math.floor(rt / 4)) + streak * 8 : -30));
  feedback.textContent = correct ? '正确，继续保持' : '这轮不算通过，下一轮放慢一点';
  nextButton.classList.add('show');
  updateHud();
}

function nextRound() {
  if (round >= 7) {
    feedback.textContent = `完成：${score} 分`;
    nextButton.textContent = '重新开始';
    nextButton.onclick = () => startGame(game);
    return;
  }
  round += 1;
  renderRound();
}

function startGame(nextGame) {
  stopFlashSession();
  game = normalizeGame(nextGame);
  round = 0;
  score = 0;
  streak = 0;
  nextButton.textContent = '下一题';
  nextButton.onclick = nextRound;
  history.replaceState(null, '', `#${game}`);
  renderRound();
}

function renderRound() {
  if (game !== 'flash-shape') stopFlashSession();
  answered = false;
  startedAt = Date.now();
  stage.innerHTML = '';
  feedback.textContent = '根据本轮规则作答';
  nextButton.classList.remove('show');
  updateHud();
  if (game === 'color-shape-stroop') renderStroop();
  if (game === 'flash-shape') renderFlash();
  if (game === 'eye-quick') renderEye();
}

function renderStroop() {
  const rule = round % 2 === 0 ? 'color' : 'shape';
  const targetShape = shapes[round % shapes.length];
  const targetColor = ((round * 3) % paletteSize) + 1;
  const otherShapes = shapes.filter((shape) => shape !== targetShape);
  const shifted = (offset) => ((targetColor + offset - 1) % paletteSize) + 1;
  promptEl.textContent = rule === 'color' ? '只看颜色：找出和目标颜色一致的图形' : '只看形状：找出和目标形状一致的图形';

  const wrap = document.createElement('div');
  wrap.className = 'stroop-board';
  const target = document.createElement('div');
  target.className = 'target-card';
  target.append(gemShape(targetShape, targetColor, `${shapeLabel[targetShape]}目标`));
  const label = document.createElement('strong');
  label.textContent = rule === 'color' ? '目标颜色，不看形状' : '目标形状，不看颜色';
  target.append(label);

  const correct = rule === 'color'
    ? { shape: otherShapes[round % otherShapes.length], color: targetColor, correct: true }
    : { shape: targetShape, color: shifted(2), correct: true };
  const options = shuffle(rule === 'color'
    ? [
      correct,
      { shape: targetShape, color: shifted(1), correct: false },
      { shape: otherShapes[0], color: shifted(3), correct: false },
      { shape: otherShapes[1], color: shifted(5), correct: false },
    ]
    : [
      correct,
      { shape: otherShapes[0], color: shifted(1), correct: false },
      { shape: otherShapes[1], color: shifted(3), correct: false },
      { shape: otherShapes[(round + 1) % otherShapes.length], color: shifted(5), correct: false },
    ]);

  const grid = document.createElement('div');
  grid.className = 'choice-grid';
  options.forEach((option) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.append(gemShape(option.shape, option.color, `${shapeLabel[option.shape]}选项`));
    button.onclick = () => answer(option.correct);
    grid.append(button);
  });
  wrap.append(target, grid);
  stage.append(wrap);
}

function renderFlash() {
  flashSession = {
    level: 1,
    failCount: 0,
    correctCount: 0,
    wrongCount: 0,
    consecutiveWrong: 0,
    trialIndex: 0,
    totalAwarded: 0,
    remaining: flashLevels[0].Time,
    canAnswer: false,
    previous: pickFlashIcon(0),
    current: null,
    expectedSame: false,
    timers: new Set(),
    clock: null,
  };
  renderFlashLevelIntro();
}

function renderFlashLevelIntro() {
  const config = currentFlashConfig();
  flashSession.remaining = config.Time;
  flashSession.correctCount = 0;
  flashSession.wrongCount = 0;
  flashSession.consecutiveWrong = 0;
  flashSession.trialIndex = 0;
  flashSession.previous = pickFlashIcon(flashSession.level + flashSession.failCount);
  flashSession.current = null;
  flashSession.canAnswer = false;
  promptEl.textContent = '记住这张图形';
  feedback.textContent = `第 ${config.Level} 级 · ${flashTypeLabel[config.Type]} · ${config.Time} 秒`;
  updateFlashHud();
  const board = document.createElement('div');
  board.className = 'flash-session-board';

  const status = renderFlashStatus();
  const card = document.createElement('div');
  card.className = 'flash-card flash-moving-card enter';
  card.append(flashBadge(flashSession.previous.index));
  const cardLabel = document.createElement('strong');
  cardLabel.textContent = '引导：记住这张图形';
  card.append(cardLabel);

  const actions = document.createElement('div');
  actions.className = 'flash-actions';
  const sameButton = document.createElement('button');
  sameButton.type = 'button';
  sameButton.textContent = '相同';
  sameButton.disabled = true;
  const differentButton = document.createElement('button');
  differentButton.type = 'button';
  differentButton.textContent = '不同';
  differentButton.disabled = true;
  sameButton.onclick = () => answerFlash(true);
  differentButton.onclick = () => answerFlash(false);
  actions.append(sameButton, differentButton);

  board.append(status, card, actions);
  stage.innerHTML = '';
  stage.append(board);
  nextButton.classList.remove('show');

  queueFlashTimer(() => startFlashClockAndChoice(card, cardLabel, sameButton, differentButton), 3000);
}

function startFlashClockAndChoice(card, cardLabel, sameButton, differentButton) {
  if (!flashSession) return;
  flashSession.clock = window.setInterval(() => {
    if (!flashSession) return;
    flashSession.remaining -= 1;
    renderFlashStatusIntoExisting();
    if (flashSession.remaining <= 0) endFlashLevel('time');
  }, 1000);
  showNextFlashCard(card, cardLabel, sameButton, differentButton);
}

function showNextFlashCard(card, cardLabel, sameButton, differentButton) {
  if (!flashSession) return;
  const config = currentFlashConfig();
  const trial = makeFlashTrialFromConfig(config, flashSession.previous, flashSession.trialIndex);
  flashSession.current = trial.current;
  flashSession.expectedSame = trial.isSame;
  flashSession.canAnswer = true;
  startedAt = Date.now();
  promptEl.textContent = '判断当前图形与上一张是否相同';
  feedback.textContent = trial.isSame ? '本题按一致率生成：可能相同' : `本题干扰维度：${flashTypeLabel[config.Type]}`;
  card.classList.remove('enter');
  card.classList.add('exit');
  queueFlashTimer(() => {
    if (!flashSession) return;
    card.classList.remove('exit');
    card.classList.add('enter');
    card.innerHTML = '';
    card.append(flashBadge(flashSession.current.index));
    cardLabel.textContent = '当前图形';
    card.append(cardLabel);
    sameButton.disabled = false;
    differentButton.disabled = false;
    renderFlashStatusIntoExisting();
  }, 200);
}

function answerFlash(choiceSame) {
  if (!flashSession || !flashSession.canAnswer) return;
  flashSession.canAnswer = false;
  const isCorrect = choiceSame === flashSession.expectedSame;
  const config = currentFlashConfig();
  if (isCorrect) {
    flashSession.correctCount += 1;
    flashSession.consecutiveWrong = 0;
  } else {
    flashSession.wrongCount += 1;
    flashSession.consecutiveWrong += 1;
  }
  feedback.textContent = isCorrect ? '正确' : '错误';
  const buttons = stage.querySelectorAll('.flash-actions button');
  buttons.forEach((button) => {
    button.disabled = true;
  });
  updateFlashHud();
  if (flashSession.consecutiveWrong >= 2 || flashSession.wrongCount > config.Fault) {
    endFlashLevel('fault');
    return;
  }
  flashSession.previous = flashSession.current;
  flashSession.trialIndex += 1;
  queueFlashTimer(() => {
    const card = stage.querySelector('.flash-card');
    const label = stage.querySelector('.flash-card strong');
    const [sameButton, differentButton] = stage.querySelectorAll('.flash-actions button');
    if (card && label && sameButton && differentButton) showNextFlashCard(card, label, sameButton, differentButton);
  }, 500);
}

function endFlashLevel(reason) {
  if (!flashSession) return;
  flashSession.timers.forEach((timer) => window.clearTimeout(timer));
  flashSession.timers.clear();
  window.clearInterval(flashSession.clock);
  flashSession.clock = null;
  const config = currentFlashConfig();
  const target = flashTargetCount(config);
  const passed = flashSession.correctCount >= target;
  const baseAward = passed ? config.Scores + Math.max(0, flashSession.correctCount - target) * config.RewardNum + 10 : 10;
  flashSession.totalAwarded += baseAward;
  const fromLevel = flashSession.level;
  let nextLevel = fromLevel;
  let failNote = '';
  if (passed) {
    nextLevel = Math.min(50, fromLevel + 1);
    flashSession.failCount = 0;
  } else {
    flashSession.failCount += 1;
    if (flashSession.failCount === 2) {
      nextLevel = Math.max(1, fromLevel - 1);
      failNote = '连续失败 2 次，难度 -1';
    }
    if (flashSession.failCount >= 3) {
      nextLevel = Math.max(1, fromLevel - 3);
      failNote = '连续失败 3 次，难度 -3，并重置失败计数';
      flashSession.failCount = 0;
    }
  }
  score = flashSession.totalAwarded;
  streak = passed ? streak + 1 : 0;
  updateFlashHud();
  scoreEl.textContent = String(score);
  const finishedAll = passed && fromLevel >= 50;
  promptEl.textContent = finishedAll ? '完成全部 50 级' : passed ? '本小关通过' : '本小关未通过';
  feedback.textContent = reason === 'fault' ? '结束条件：连续选错或超过容错' : '结束条件：倒计时为 0';
  stage.innerHTML = `
    <div class="flash-result-panel">
      <strong>${passed ? '通过' : '未通过'}</strong>
      <p>等级 ${fromLevel} · ${flashTypeLabel[config.Type]} · 正确 ${flashSession.correctCount}/${target} · 错误 ${flashSession.wrongCount}/${config.Fault}</p>
      <p>本关积分 ${baseAward} · 累计积分 ${flashSession.totalAwarded}${failNote ? ` · ${failNote}` : ''}</p>
      <p>${finishedAll ? '50 级已完成。' : `下一小关等级：${nextLevel}`}</p>
    </div>`;
  nextButton.textContent = finishedAll ? '重新开始' : '进入下一小关';
  nextButton.classList.add('show');
  nextButton.onclick = () => {
    if (finishedAll) {
      startGame('flash-shape');
      return;
    }
    flashSession.level = nextLevel;
    renderFlashLevelIntro();
  };
}

function renderFlashStatus() {
  const config = currentFlashConfig();
  const target = flashTargetCount(config);
  const status = document.createElement('div');
  status.className = 'flash-status-row';
  status.innerHTML = `
    <span>等级 <strong>${config.Level}/50</strong></span>
    <span>倒计时 <strong>${flashSession.remaining}s</strong></span>
    <span>目标 <strong>${flashSession.correctCount}/${target}</strong></span>
    <span>容错 <strong>${flashSession.wrongCount}/${config.Fault}</strong></span>
  `;
  return status;
}

function renderFlashStatusIntoExisting() {
  const status = stage.querySelector('.flash-status-row');
  if (!status || !flashSession) return;
  const next = renderFlashStatus();
  status.innerHTML = next.innerHTML;
}

function makeFlashTrialFromConfig(config, previous, trialIndex) {
  const shouldMatch = ((trialIndex * 37 + config.Level * 11 + flashSession.failCount * 5) % 100) < config.Rate;
  if (shouldMatch) {
    return { isSame: true, current: previous };
  }
  const candidates = flashCatalog.filter((icon) => icon.index !== previous.index && matchesFlashType(icon, previous, config.Type));
  const pool = candidates.length ? candidates : flashCatalog.filter((icon) => icon.index !== previous.index);
  return {
    isSame: false,
    current: pool[(trialIndex * 7 + config.Level * 3) % pool.length],
  };
}

function matchesFlashType(icon, previous, type) {
  if (type === 1) return icon.color !== previous.color && icon.shape === previous.shape && icon.texture === previous.texture;
  if (type === 2) return icon.shape !== previous.shape && icon.color === previous.color && icon.texture === previous.texture;
  if (type === 3) return icon.texture !== previous.texture && icon.color === previous.color && icon.shape === previous.shape;
  return true;
}

function pickFlashIcon(seed) {
  return flashCatalog[(seed * 9 + 3) % flashCatalog.length];
}

function renderEye() {
  promptEl.textContent = '地鼠出现要点；炸弹、猫、兔子、熊猫出现要忍住';
  const pattern = ['normal', 'bomb', 'normal', 'rabbit', 'helmet', 'cat', 'normal', 'panda'];
  current = { kind: pattern[round % pattern.length], slot: Math.floor(Math.random() * 9), helmetHits: 0 };
  const board = document.createElement('div');
  board.className = 'eye-board';
  const grid = document.createElement('div');
  grid.className = 'eye-grid';
  Array.from({ length: 9 }, (_, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    if (index === current.slot) {
      button.append(eyeSprite(current.kind, 0));
    } else {
      button.classList.add('empty');
    }
    button.onclick = () => hitEye(index, button);
    grid.append(button);
  });

  const legend = document.createElement('div');
  legend.className = 'eye-legend';
  const legendTitle = document.createElement('h2');
  legendTitle.textContent = current.kind === 'normal' || current.kind === 'helmet' ? '该出手' : '要忍住';
  const legendCopy = document.createElement('p');
  legendCopy.textContent = current.kind === 'helmet'
    ? '戴头盔地鼠需要连续点两下。'
    : current.kind === 'normal'
      ? '普通地鼠出现时快速点击。'
      : '这是干扰物，等待它消失才算正确。';
  legend.append(legendTitle, legendCopy);
  board.append(grid, legend);
  stage.append(board);

  window.setTimeout(() => {
    if (!answered) answer(!(current.kind === 'normal' || current.kind === 'helmet'));
  }, current.kind === 'helmet' ? 1850 : 1450);
}

function hitEye(index, button) {
  if (answered || index !== current.slot) {
    answer(false);
    return;
  }
  if (current.kind === 'helmet' && current.helmetHits === 0) {
    current.helmetHits = 1;
    button.innerHTML = '';
    button.append(eyeSprite('helmet', 1));
    feedback.textContent = '头盔裂开了，再点一下';
    return;
  }
  answer(current.kind === 'normal' || current.kind === 'helmet');
}

window.addEventListener('hashchange', () => startGame(location.hash.slice(1)));
tabs.forEach((tab) => {
  tab.addEventListener('click', (event) => {
    event.preventDefault();
    startGame(tab.dataset.game);
  });
});
nextButton.onclick = nextRound;
startGame(game);
