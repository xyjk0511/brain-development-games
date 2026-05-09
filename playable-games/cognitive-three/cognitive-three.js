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
const assetBase = '../../training-assets/image2-split/';

const shapes = ['circle', 'square', 'triangle'];
const shapeLabel = { circle: '圆形', square: '方形', triangle: '三角形' };
const paletteSize = 8;

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
  const badgeIndex = (index % 16) + 1;
  return imageAsset(`flash/badge_${String(badgeIndex).padStart(2, '0')}.png`, `记忆徽章 ${badgeIndex}`);
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
  promptEl.textContent = '记住这张图形';
  const previousIndex = (round * 5 + 2) % 16;
  const isSame = [false, true, false, false, true, true, false, true][round % 8];
  const currentIndex = isSame ? previousIndex : (previousIndex + 5 + round * 3) % 16;
  const board = document.createElement('div');
  board.className = 'flash-compare-board';

  const card = document.createElement('div');
  card.className = 'flash-card';
  card.append(flashBadge(previousIndex));
  const cardLabel = document.createElement('strong');
  cardLabel.textContent = '上一张';
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
  sameButton.onclick = () => answer(isSame);
  differentButton.onclick = () => answer(!isSame);
  actions.append(sameButton, differentButton);

  board.append(card, actions);
  stage.append(board);
  feedback.textContent = '正在记忆上一张';

  window.setTimeout(() => {
    startedAt = Date.now();
    promptEl.textContent = '当前图形和上一张是否相同？';
    feedback.textContent = '判断同或不同';
    card.innerHTML = '';
    card.append(flashBadge(currentIndex));
    cardLabel.textContent = '当前张';
    card.append(cardLabel);
    sameButton.disabled = false;
    differentButton.disabled = false;
  }, 1000);
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
