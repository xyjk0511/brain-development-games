(function () {
  const base = '/brain-development-games/';
  const games = [
    {
      id: 'color-shape-stroop',
      name: '幻色图形',
      desc: '按规则只看颜色或形状，在干扰选项里选出正确图形。',
      tag: '干扰抑制',
      art: 'training-assets/image2/stroop/circle_01.png',
      hash: '#color-shape-stroop',
    },
    {
      id: 'flash-shape',
      name: '快闪图形',
      desc: '短暂记住闪现图形的位置，遮住后把位置点回来。',
      tag: '瞬时记忆',
      art: 'training-assets/image2/flash/badge_large_01.png',
      hash: '#flash-shape',
    },
    {
      id: 'eye-quick',
      name: '眼疾手快',
      desc: '目标出现时快速点击，炸弹和干扰角色出现时忍住不点。',
      tag: '反应控制',
      art: 'training-assets/image2/eye/mole_normal_idle.png',
      hash: '#eye-quick',
    },
  ];

  function card(game) {
    const article = document.createElement('article');
    article.className = 'overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-xl';
    article.setAttribute('role', 'listitem');

    const link = document.createElement('a');
    link.className = 'block w-full text-left';
    link.href = `${base}playable-games/cognitive-three/index.html${game.hash}`;

    link.innerHTML = `
      <div class="aspect-[4/3] overflow-hidden bg-amber-50">
        <img src="${base}${game.art}" alt="${game.name} 封面" class="h-full w-full object-cover transition-transform duration-300 hover:scale-105" loading="lazy">
      </div>
      <div class="p-4">
        <div class="mb-2 flex flex-wrap items-center gap-2">
          <h3 class="text-lg font-black text-slate-950">${game.name}</h3>
          <span class="rounded-full bg-sky-100 px-2 py-1 text-xs font-bold text-sky-700">新增任务</span>
        </div>
        <p class="mb-3 text-sm leading-relaxed text-slate-600">${game.desc}</p>
        <div class="rounded-lg bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">
          <strong>训练什么能力：</strong>${game.tag}
        </div>
        <div class="mt-3 flex items-center justify-between">
          <span class="text-xs text-slate-400">新增</span>
          <span class="text-sm font-black text-slate-950">打开</span>
        </div>
      </div>`;

    article.appendChild(link);
    return article;
  }

  function inject() {
    const list = document.querySelector('[aria-label="可用认知训练游戏"]');
    if (!list || list.dataset.cognitiveThreeInjected === 'true') {
      return Boolean(list);
    }
    list.dataset.cognitiveThreeInjected = 'true';
    games.forEach((game) => list.appendChild(card(game)));

    const badge = document.querySelector('[aria-label="游戏选择"] .rounded-full');
    if (badge && /个可爱认知训练小游戏/.test(badge.textContent || '')) {
      badge.textContent = '20 个可爱认知训练小游戏';
    }
    return true;
  }

  let tries = 0;
  function wait() {
    tries += 1;
    if (inject() || tries > 120) {
      return;
    }
    window.requestAnimationFrame(wait);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wait);
  } else {
    wait();
  }
})();
