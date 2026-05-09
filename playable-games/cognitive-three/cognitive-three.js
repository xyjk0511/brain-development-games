const base = '/brain-development-games/training-assets/image2/';
const title = document.querySelector('#game-title');
const promptEl = document.querySelector('#prompt');
const stage = document.querySelector('#stage');
const feedback = document.querySelector('#feedback');
const nextButton = document.querySelector('#next-button');
const roundEl = document.querySelector('#round');
const scoreEl = document.querySelector('#score');
const streakEl = document.querySelector('#streak');
const tabs = Array.from(document.querySelectorAll('[data-game]'));

const shapes = ['circle', 'square', 'triangle'];
const shapeLabel = { circle: '圆形', square: '方形', triangle: '三角形' };
const gameNames = {
  'color-shape-stroop': '幻色图形',
  'flash-shape': '快闪图形',
  'eye-quick': '眼疾手快',
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

function asset(path) {
  return `${base}${path}`;
}

function img(src, alt = '') {
  const image = document.createElement('img');
  image.src = src;
  image.alt = alt;
  return image;
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function updateHud() {
  title.textContent = gameNames[game];
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

function stroopAsset(shape, color) {
  return asset(`stroop/${shape}_${String(color).padStart(2, '0')}.png`);
}

function renderStroop() {
  const rule = round % 2 === 0 ? 'color' : 'shape';
  const targetShape = shapes[round % shapes.length];
  const targetColor = ((round * 3) % 8) + 1;
  const otherShapes = shapes.filter((shape) => shape !== targetShape);
  const shifted = (offset) => ((targetColor + offset - 1) % 8) + 1;
  promptEl.textContent = rule === 'color' ? '只看颜色：找出和目标颜色一致的图形' : '只看形状：找出和目标形状一致的图形';

  const wrap = document.createElement('div');
  const target = document.createElement('div');
  target.className = 'target-card';
  target.append(img(stroopAsset(targetShape, targetColor), `${shapeLabel[targetShape]}目标`));
  const label = document.createElement('strong');
  label.textContent = rule === 'color' ? '忽略形状' : '忽略颜色';
  target.append(label);

  const correct = rule === 'color'
    ? { shape: otherShapes[round % otherShapes.length], color: targetColor, correct: true }
    : { shape: targetShape, color: shifted(2), correct: true };
  const options = shuffle([
    correct,
    { shape: targetShape, color: shifted(1), correct: false },
    { shape: otherShapes[0], color: shifted(3), correct: false },
    { shape: otherShapes[1], color: shifted(5), correct: false },
  ]);

  const grid = document.createElement('div');
  grid.className = 'choice-grid';
  options.forEach((option) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.append(img(stroopAsset(option.shape, option.color), `${shapeLabel[option.shape]}选项`));
    button.onclick = () => answer(option.correct);
    grid.append(button);
  });
  wrap.append(target, grid);
  stage.append(wrap);
}

function flashAsset(index) {
  const row = Math.floor(index / 4) + 1;
  const col = (index % 4) + 1;
  return asset(`flash/badge_r${String(row).padStart(2, '0')}_c${String(col).padStart(2, '0')}.png`);
}

function renderFlash() {
  promptEl.textContent = '记住亮起图形的位置，遮住后点回来';
  const targets = shuffle(Array.from({ length: 16 }, (_, index) => index)).slice(0, 3 + (round % 2));
  const selected = [];
  let recall = false;
  const grid = document.createElement('div');
  grid.className = 'flash-grid';
  Array.from({ length: 16 }, (_, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    const image = img(flashAsset(index));
    button.append(image);
    if (!targets.includes(index)) button.classList.add('hidden');
    button.onclick = () => {
      if (!recall || answered || selected.includes(index)) return;
      selected.push(index);
      button.classList.remove('hidden');
      if (!targets.includes(index)) {
        answer(false);
        return;
      }
      if (targets.every((item) => selected.includes(item))) answer(true);
    };
    grid.append(button);
  });
  stage.append(grid);
  feedback.textContent = '正在展示';
  window.setTimeout(() => {
    recall = true;
    startedAt = Date.now();
    feedback.textContent = '回忆位置';
    Array.from(grid.children).forEach((button, index) => {
      if (targets.includes(index)) button.classList.add('hidden');
    });
  }, 900);
}

function renderEye() {
  promptEl.textContent = '地鼠出现要点；炸弹、猫、兔子、熊猫出现要忍住';
  const pattern = ['normal', 'bomb', 'normal', 'rabbit', 'helmet', 'cat', 'normal', 'panda'];
  current = { kind: pattern[round % pattern.length], slot: Math.floor(Math.random() * 9), helmetHits: 0 };
  const grid = document.createElement('div');
  grid.className = 'eye-grid';
  Array.from({ length: 9 }, (_, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    if (index === current.slot) button.append(img(eyeSprite(current.kind, 0)));
    button.onclick = () => hitEye(index, button);
    grid.append(button);
  });
  stage.append(grid);
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
    button.append(img(eyeSprite('helmet', 1)));
    feedback.textContent = '头盔裂开了，再点一下';
    return;
  }
  answer(current.kind === 'normal' || current.kind === 'helmet');
}

function eyeSprite(kind, helmetHits) {
  const key = kind === 'normal'
    ? 'mole_normal_idle'
    : kind === 'helmet'
      ? (helmetHits ? 'mole_helmet_break_2' : 'mole_helmet_idle')
      : kind === 'bomb'
        ? 'bomb_fuse'
        : kind === 'cat'
          ? 'cat_guard_idle'
          : kind === 'rabbit'
            ? 'rabbit_decoy_idle'
            : 'panda_decoy_idle';
  return asset(`eye/${key}.png`);
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
