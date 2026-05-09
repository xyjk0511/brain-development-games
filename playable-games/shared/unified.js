(function () {
  const ACTION_PATTERNS = [
    { re: /^(开始游戏|进入游戏|开始|进入训练|开始训练|准备开始|直接准备开始|直接进入小店|进入车站|进入花园|开始场景演示|开始演示)$/u, text: '开始训练', action: 'start' },
    { re: /^(开始教学|进入教学|跟着.*学习|先看教学|开始 6 屏教学|开始低压教学)$/u, text: '先看教学', action: 'teach' },
    { re: /^(怎么玩|游戏说明|玩法|查看说明|查看详情|说明|再看说明|目标是什么)$/u, text: '玩法说明', action: 'info' },
    { re: /^(直接练习|直接低压练习|先玩低压练习|低压练习|跳到低压练习|开始小练习)$/u, text: '低压练习', action: 'practice' },
    { re: /^(返回首页|进入封面页|回到首页卡片|看封面页|直接看封面|看封面|返回封面|回封面)$/u, text: '回到封面', action: 'cover' },
    { re: /^(低刺激.*|柔和模式.*|开启柔和模式|关闭柔和模式|安静模式.*|大数字.*|大目标.*|大按钮模式.*)$/u, text: null, action: 'setting' },
    { re: /^(按推荐再来|按推荐再玩|按推荐再玩一轮|按推荐训练)$/u, text: '按推荐继续', action: 'start' },
    { re: /^(重新演示|重看路线|再看一遍|播放灯光)$/u, text: '重新演示', action: 'info' }
  ];

  const DEBUG_RE = /(hasAdaptive\s*=|localStorage|__hasAdaptive|adaptive=true|当前推荐难度：.*localStorage|数据已本地保存：localStorage|保存状态：.*localStorage|页面文字和代码均包含自适应难度|本地\s*PNG\s*资产|图像资产|GPTImage|source-collage|本版包含|离线资源|任务编号)/iu;

  function appHomeHref() {
    const marker = '/playable-games/';
    const path = window.location.pathname;
    const idx = path.indexOf(marker);
    const base = idx >= 0 ? path.slice(0, idx + 1) : '/';
    return `${window.location.origin}${base}`;
  }

  function detectGameId() {
    const marker = '/playable-games/';
    const path = window.location.pathname;
    const idx = path.indexOf(marker);
    if (idx < 0) return '';
    return path.slice(idx + marker.length).split('/')[0] || '';
  }

  function addHomeLink() {
    if (document.querySelector('.unified-home-link')) return;
    const link = document.createElement('a');
    link.className = 'unified-home-link';
    link.href = appHomeHref();
    link.textContent = '全部游戏';
    link.setAttribute('aria-label', '返回全部游戏');
    document.body.appendChild(link);
  }

  function ownText(element) {
    return (element.textContent || '').replace(/\s+/g, ' ').trim();
  }

  function setButtonText(button, text) {
    if (!text) return;
    if (button.children.length === 0) {
      if (button.textContent === text) return;
      button.textContent = text;
      return;
    }

    const textNodes = [];
    const walker = document.createTreeWalker(button, NodeFilter.SHOW_TEXT);
    let node = walker.nextNode();
    while (node) {
      if ((node.textContent || '').trim()) textNodes.push(node);
      node = walker.nextNode();
    }

    if (textNodes.length === 1) {
      if (textNodes[0].textContent === text) return;
      textNodes[0].textContent = text;
    } else {
      if (button.getAttribute('aria-label') === text) return;
      button.setAttribute('aria-label', text);
    }
  }

  function normalizeButtons() {
    document.querySelectorAll('button, [role="button"]').forEach((button) => {
      const label = ownText(button);
      if (!label) return;

      const match = ACTION_PATTERNS.find((pattern) => pattern.re.test(label));
      if (!match) return;

      if (match.text) setButtonText(button, match.text);
      if (button.getAttribute('data-unified-action') !== match.action) {
        button.setAttribute('data-unified-action', match.action);
      }
    });
  }

  function hideDebugText() {
    document.querySelectorAll('p, span, small, code, footer, h1, h2, h3, h4, h5, h6, .asset-note, .asset-check, .source-box, .info-panel, .soft-card, .badge').forEach((node) => {
      if (node.children.length > 3) return;
      const text = ownText(node);
      if (!text || text.length > 260) return;
      if (!DEBUG_RE.test(text)) return;

      const target = /本版包含|离线资源/.test(text)
        ? (node.closest('.asset-note, .asset-check, .source-box, .info-panel, .soft-card, .badge') || node)
        : (node.closest('.asset-note, .asset-check, .source-box, .badge') || node);
      target.classList.add('unified-debug-hidden');
    });
  }

  function tidyDocument() {
    document.documentElement.classList.add('playable-unified');
    const gameId = detectGameId();
    if (gameId) {
      document.documentElement.dataset.game = gameId;
      document.body.dataset.game = gameId;
    }
    addHomeLink();
    normalizeButtons();
    hideDebugText();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tidyDocument);
  } else {
    tidyDocument();
  }

  const observer = new MutationObserver(() => {
    window.clearTimeout(window.__playableUnifiedTimer);
    window.__playableUnifiedTimer = window.setTimeout(tidyDocument, 40);
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
