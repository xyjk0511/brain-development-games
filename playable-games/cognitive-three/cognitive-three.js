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

const shapes = ['circle', 'square', 'triangle'];
const shapeLabel = { circle: '圆形', square: '方形', triangle: '三角形' };
const palette = [
  { name: '红色', main: '#ff4963', dark: '#d81e3a', light: '#ff93a4' },
  { name: '橙色', main: '#ff9d25', dark: '#e06d00', light: '#ffd075' },
  { name: '蓝色', main: '#3496ff', dark: '#1268c7', light: '#94d0ff' },
  { name: '绿色', main: '#78d84e', dark: '#329f30', light: '#c4f58a' },
  { name: '紫色', main: '#a36cff', dark: '#6840cf', light: '#d3b8ff' },
  { name: '青色', main: '#35c9d4', dark: '#008b9d', light: '#a6f3f5' },
  { name: '黄色', main: '#ffd43d', dark: '#e3a300', light: '#fff19d' },
  { name: '粉色', main: '#ff74b8', dark: '#d83c86', light: '#ffc1df' },
];

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
    copy: '短暂记住亮起的格子，遮住后按原位置点回。',
    rule: '训练目标：瞬时视觉记忆。先观察亮起徽章，遮住后只点刚才出现过的位置。',
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

function svgElement(markup, label = '') {
  const template = document.createElement('template');
  template.innerHTML = markup.trim();
  const node = template.content.firstElementChild;
  node.setAttribute('role', 'img');
  node.setAttribute('aria-label', label);
  node.classList.add('sprite-shadow');
  return node;
}

function gemShape(shape, colorIndex, label = '') {
  const color = palette[(colorIndex - 1 + palette.length) % palette.length];
  const shapeNode = {
    circle: `
      <circle cx="100" cy="104" r="61" fill="url(#fill)" stroke="${color.dark}" stroke-width="8"/>
      <circle cx="100" cy="104" r="45" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="5"/>
    `,
    square: `
      <rect x="39" y="43" width="122" height="122" rx="22" fill="url(#fill)" stroke="${color.dark}" stroke-width="8"/>
      <rect x="58" y="62" width="84" height="84" rx="14" fill="none" stroke="rgba(255,255,255,.32)" stroke-width="5"/>
    `,
    triangle: `
      <path d="M100 35 L166 158 H34 Z" fill="url(#fill)" stroke="${color.dark}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M100 64 L139 139 H61 Z" fill="none" stroke="rgba(255,255,255,.32)" stroke-width="5" stroke-linejoin="round"/>
    `,
  }[shape];

  return svgElement(`
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fill" x1="36" y1="28" x2="162" y2="170" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="${color.light}"/>
          <stop offset=".54" stop-color="${color.main}"/>
          <stop offset="1" stop-color="${color.dark}"/>
        </linearGradient>
      </defs>
      <ellipse cx="101" cy="173" rx="58" ry="13" fill="rgba(42,68,104,.12)"/>
      ${shapeNode}
      <path d="M58 74 C73 48 105 43 130 58" fill="none" stroke="rgba(255,255,255,.72)" stroke-width="12" stroke-linecap="round"/>
      <circle cx="70" cy="92" r="6" fill="rgba(255,255,255,.72)"/>
      <path d="M74 65 L112 41 L148 83 L118 70 Z" fill="rgba(255,255,255,.16)"/>
      <path d="M52 118 L90 80 L125 130 L97 158 Z" fill="rgba(255,255,255,.12)"/>
    </svg>
  `, label || `${color.name}${shapeLabel[shape]}`);
}

function flashBadge(index) {
  const hue = index % palette.length;
  const color = palette[hue];
  const variant = index % 4;
  const motif = [
    '<path d="M100 34 L115 78 L162 78 L124 105 L139 150 L100 122 L61 150 L76 105 L38 78 L85 78 Z" fill="url(#fill)" stroke="#ffffff" stroke-width="7" stroke-linejoin="round"/>',
    '<path d="M100 34 C132 56 154 77 154 109 C154 140 132 160 100 160 C68 160 46 140 46 109 C46 77 68 56 100 34 Z" fill="url(#fill)" stroke="#ffffff" stroke-width="7"/>',
    '<path d="M50 78 C50 58 66 42 86 42 H114 C134 42 150 58 150 78 V122 C150 142 134 158 114 158 H86 C66 158 50 142 50 122 Z" fill="url(#fill)" stroke="#ffffff" stroke-width="7"/>',
    '<path d="M100 35 L153 88 L100 161 L47 88 Z" fill="url(#fill)" stroke="#ffffff" stroke-width="7" stroke-linejoin="round"/>',
  ][variant];

  return svgElement(`
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fill" x1="44" y1="36" x2="156" y2="162" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="${color.light}"/>
          <stop offset=".56" stop-color="${color.main}"/>
          <stop offset="1" stop-color="${color.dark}"/>
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="174" rx="48" ry="11" fill="rgba(42,68,104,.11)"/>
      ${motif}
      <circle cx="75" cy="72" r="10" fill="rgba(255,255,255,.68)"/>
      <path d="M74 58 C92 42 119 44 134 61" fill="none" stroke="rgba(255,255,255,.72)" stroke-width="10" stroke-linecap="round"/>
    </svg>
  `, `记忆徽章 ${index + 1}`);
}

function eyeSprite(kind, helmetHits = 0) {
  if (kind === 'bomb') return svgElement(`
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="170" rx="52" ry="12" fill="rgba(32,42,58,.16)"/>
      <circle cx="98" cy="104" r="55" fill="#31384a"/>
      <circle cx="83" cy="84" r="23" fill="rgba(255,255,255,.16)"/>
      <path d="M119 59 C132 44 151 43 161 56" fill="none" stroke="#403629" stroke-width="10" stroke-linecap="round"/>
      <path d="M154 43 L166 24 L169 49 L190 42 L173 59 L191 73 L166 70 L157 91 L152 67 L129 65 Z" fill="#ffb22c" stroke="#e66d14" stroke-width="4" stroke-linejoin="round"/>
    </svg>
  `, '炸弹');

  if (kind === 'cat') return svgElement(`
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="170" rx="52" ry="12" fill="rgba(32,42,58,.13)"/>
      <path d="M55 79 L67 42 L94 70 H106 L133 42 L145 79 C159 92 166 111 162 131 C156 158 132 171 100 171 C68 171 44 158 38 131 C34 111 41 92 55 79 Z" fill="#f5a95b" stroke="#cc7830" stroke-width="6" stroke-linejoin="round"/>
      <circle cx="78" cy="112" r="8" fill="#263047"/>
      <circle cx="122" cy="112" r="8" fill="#263047"/>
      <path d="M93 128 Q100 135 107 128" fill="none" stroke="#563423" stroke-width="5" stroke-linecap="round"/>
      <path d="M61 128 H36 M64 141 H39 M139 128 H164 M136 141 H161" stroke="#8a5634" stroke-width="5" stroke-linecap="round"/>
    </svg>
  `, '猫');

  if (kind === 'rabbit') return svgElement(`
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="170" rx="52" ry="12" fill="rgba(32,42,58,.13)"/>
      <path d="M73 82 C58 39 63 20 82 18 C99 17 102 52 99 81 Z" fill="#f4f7ff" stroke="#b9c6d8" stroke-width="6"/>
      <path d="M127 82 C142 39 137 20 118 18 C101 17 98 52 101 81 Z" fill="#f4f7ff" stroke="#b9c6d8" stroke-width="6"/>
      <path d="M83 78 H117 C143 78 162 99 162 125 C162 154 137 172 100 172 C63 172 38 154 38 125 C38 99 57 78 83 78 Z" fill="#ffffff" stroke="#b9c6d8" stroke-width="6"/>
      <circle cx="79" cy="118" r="8" fill="#243047"/>
      <circle cx="121" cy="118" r="8" fill="#243047"/>
      <path d="M95 134 Q100 139 105 134" fill="none" stroke="#d96b8e" stroke-width="5" stroke-linecap="round"/>
      <path d="M78 32 C82 48 84 62 84 75 M122 32 C118 48 116 62 116 75" stroke="#ffb2cb" stroke-width="8" stroke-linecap="round"/>
    </svg>
  `, '兔子');

  if (kind === 'panda') return svgElement(`
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="170" rx="52" ry="12" fill="rgba(32,42,58,.13)"/>
      <circle cx="64" cy="72" r="28" fill="#273142"/>
      <circle cx="136" cy="72" r="28" fill="#273142"/>
      <circle cx="100" cy="112" r="62" fill="#fffdf4" stroke="#273142" stroke-width="6"/>
      <ellipse cx="77" cy="113" rx="19" ry="26" fill="#273142" transform="rotate(-20 77 113)"/>
      <ellipse cx="123" cy="113" rx="19" ry="26" fill="#273142" transform="rotate(20 123 113)"/>
      <circle cx="80" cy="110" r="6" fill="#ffffff"/>
      <circle cx="120" cy="110" r="6" fill="#ffffff"/>
      <path d="M94 134 Q100 140 106 134" fill="none" stroke="#273142" stroke-width="5" stroke-linecap="round"/>
    </svg>
  `, '熊猫');

  const helmetCrack = helmetHits ? '<path d="M95 54 L111 78 L98 91 L115 119" fill="none" stroke="#ffffff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>' : '';
  const helmet = kind === 'helmet'
    ? `<path d="M49 88 C58 46 86 30 119 37 C145 43 161 63 164 91 L49 91 Z" fill="#4698ff" stroke="#1268c7" stroke-width="7"/>${helmetCrack}`
    : '';

  return svgElement(`
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="170" rx="52" ry="12" fill="rgba(32,42,58,.13)"/>
      <path d="M51 95 C55 56 76 40 100 40 C124 40 145 56 149 95 L151 133 C153 160 132 174 100 174 C68 174 47 160 49 133 Z" fill="#8b6047" stroke="#5b3d31" stroke-width="7"/>
      ${helmet}
      <circle cx="79" cy="109" r="8" fill="#1d2535"/>
      <circle cx="121" cy="109" r="8" fill="#1d2535"/>
      <path d="M92 130 Q100 137 108 130" fill="none" stroke="#3b2a25" stroke-width="6" stroke-linecap="round"/>
      <circle cx="61" cy="126" r="8" fill="rgba(255,152,152,.55)"/>
      <circle cx="139" cy="126" r="8" fill="rgba(255,152,152,.55)"/>
      <path d="M45 145 C32 138 25 124 27 111 M155 145 C168 138 175 124 173 111" fill="none" stroke="#5b3d31" stroke-width="8" stroke-linecap="round"/>
    </svg>
  `, kind === 'helmet' ? '戴头盔地鼠' : '地鼠');
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
  const targetColor = ((round * 3) % palette.length) + 1;
  const otherShapes = shapes.filter((shape) => shape !== targetShape);
  const shifted = (offset) => ((targetColor + offset - 1) % palette.length) + 1;
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
    button.append(gemShape(option.shape, option.color, `${shapeLabel[option.shape]}选项`));
    button.onclick = () => answer(option.correct);
    grid.append(button);
  });
  wrap.append(target, grid);
  stage.append(wrap);
}

function renderFlash() {
  promptEl.textContent = '记住亮起图形的位置，遮住后点回来';
  const targets = shuffle(Array.from({ length: 16 }, (_, index) => index)).slice(0, 3 + (round % 2));
  const selected = [];
  let recall = false;
  const board = document.createElement('div');
  board.className = 'flash-board';
  const grid = document.createElement('div');
  grid.className = 'flash-grid';

  Array.from({ length: 16 }, (_, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.append(flashBadge(index));
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

  const preview = document.createElement('div');
  preview.className = 'flash-preview';
  preview.append(flashBadge(round + 12));
  const copy = document.createElement('span');
  copy.textContent = '观察 0.9 秒后开始回忆';
  preview.append(copy);
  board.append(grid, preview);
  stage.append(board);
  feedback.textContent = '正在展示';

  window.setTimeout(() => {
    recall = true;
    startedAt = Date.now();
    feedback.textContent = '回忆位置';
    copy.textContent = '点回刚才亮起的格子';
    Array.from(grid.children).forEach((button, index) => {
      if (targets.includes(index)) button.classList.add('hidden');
    });
  }, 900);
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
