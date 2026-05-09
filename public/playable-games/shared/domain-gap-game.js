(function () {
  function shuffle(items) {
    return [...items].sort(() => Math.random() - 0.5);
  }

  function median(numbers) {
    const values = numbers.filter((value) => Number.isFinite(value)).sort((a, b) => a - b);
    if (!values.length) return null;
    const mid = Math.floor(values.length / 2);
    return values.length % 2 ? values[mid] : (values[mid - 1] + values[mid]) / 2;
  }

  function installStyles() {
    if (document.getElementById('domain-gap-game-style')) return;
    const style = document.createElement('style');
    style.id = 'domain-gap-game-style';
    style.textContent = `
      :root{--ink:#253047;--paper:#fffdf4;--line:rgba(37,48,71,.14);--accent:#4f8cff;--accent2:#ffb45c;--good:#41a66b;--bad:#e05c5c}
      *{box-sizing:border-box}
      html,body{margin:0;min-height:100%;font-family:"Microsoft YaHei","PingFang SC",system-ui,sans-serif;color:var(--ink);background:linear-gradient(180deg,#eaf7ff,#fff7dc)}
      button{font:inherit}
      .dg-app{min-height:100vh;padding:22px;display:flex;align-items:center;justify-content:center}
      .dg-shell{width:min(1080px,100%);min-height:min(720px,calc(100vh - 44px));border-radius:28px;background:rgba(255,253,244,.92);border:2px solid rgba(255,255,255,.9);box-shadow:0 18px 42px rgba(37,48,71,.16);overflow:hidden}
      .dg-hero{display:grid;grid-template-columns:1.05fr .95fr;min-height:720px}
      .dg-panel{padding:34px}
      .dg-art{position:relative;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,var(--tone1),var(--tone2));overflow:hidden}
      .dg-art::before{content:"";position:absolute;inset:24px;border-radius:32px;background:rgba(255,255,255,.18);border:2px solid rgba(255,255,255,.25)}
      .dg-mascot{position:relative;font-size:132px;filter:drop-shadow(0 14px 10px rgba(0,0,0,.16))}
      .dg-title{margin:0;font-size:clamp(34px,5vw,58px);line-height:1.05;color:var(--accent)}
      .dg-subtitle{font-size:22px;line-height:1.55;font-weight:800;margin:14px 0 0}
      .dg-note{margin:18px 0;padding:14px 16px;border-radius:18px;background:#fff;border:1px solid var(--line);font-size:15px;line-height:1.7}
      .dg-tags{display:flex;flex-wrap:wrap;gap:8px;margin:18px 0}
      .dg-tag{border-radius:999px;background:#eef5ff;color:#2c5d9e;padding:7px 12px;font-size:13px;font-weight:900}
      .dg-btns{display:flex;gap:12px;flex-wrap:wrap;margin-top:24px}
      .dg-btn{min-height:52px;border:0;border-radius:18px;background:#fff;padding:0 20px;font-weight:900;cursor:pointer;box-shadow:0 8px 18px rgba(37,48,71,.12);border:1px solid var(--line)}
      .dg-btn.primary{background:linear-gradient(180deg,var(--accent2),#ff8f45);color:#fff}
      .dg-btn:hover{transform:translateY(-1px)}
      .dg-top{display:flex;justify-content:space-between;gap:12px;align-items:center;padding:18px 22px;border-bottom:1px solid var(--line);background:#fff}
      .dg-pill{border-radius:999px;background:#f4f7fb;padding:8px 12px;font-size:14px;font-weight:900}
      .dg-stage{padding:24px;min-height:640px;display:flex;flex-direction:column;gap:18px}
      .dg-card{background:#fff;border:1px solid var(--line);border-radius:22px;padding:22px;box-shadow:0 10px 28px rgba(37,48,71,.08)}
      .dg-prompt{font-size:24px;font-weight:950;line-height:1.45;margin:0}
      .dg-stimulus{min-height:190px;display:flex;align-items:center;justify-content:center;text-align:center;background:linear-gradient(180deg,#fbfdff,#fff9e8)}
      .dg-stimulus-inner{font-weight:950}
      .dg-big-char{display:grid;grid-template-columns:1fr auto;gap:26px;align-items:center;color:var(--accent)}
      .dg-global-char{font-size:190px;line-height:.9}
      .dg-local-chars{display:grid;grid-template-columns:repeat(3,1fr);gap:4px;font-size:38px;color:var(--accent2);line-height:1}
      .dg-small-tiles{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;font-size:56px}
      .dg-face{font-size:138px;line-height:1}
      .dg-story{font-size:24px;line-height:1.7;font-weight:850;text-align:left;max-width:760px}
      .dg-gaze{display:grid;grid-template-columns:1fr 1fr 1fr;gap:24px;align-items:center;width:min(780px,100%)}
      .dg-gift{font-size:84px;border-radius:24px;padding:22px;background:#fff;border:2px dashed rgba(37,48,71,.18)}
      .dg-arrow{font-size:92px;color:var(--accent);font-weight:950}
      .dg-options{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px}
      .dg-option{min-height:82px;border-radius:20px;border:2px solid rgba(37,48,71,.12);background:#fff;font-size:22px;font-weight:950;cursor:pointer;padding:12px}
      .dg-option:hover{border-color:var(--accent);background:#f2f7ff}
      .dg-option:disabled{cursor:default;opacity:1}
      .dg-option.cg-answer-correct{border-color:var(--good);background:#eafff1;box-shadow:0 0 0 4px rgba(65,166,107,.14)}
      .dg-option.cg-answer-wrong{border-color:var(--bad);background:#fff0ef;animation:dg-shake .34s ease both}
      .dg-feedback{min-height:44px;font-weight:950;font-size:20px;transition:opacity .18s ease,transform .18s ease}
      @keyframes dg-shake{0%,100%{transform:translateX(0)}24%{transform:translateX(-7px)}48%{transform:translateX(6px)}72%{transform:translateX(-3px)}}
      .dg-feedback.good{color:var(--good)}
      .dg-feedback.bad{color:var(--bad)}
      .dg-result-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px;margin-top:14px}
      .dg-metric{border-radius:18px;background:#fff;border:1px solid var(--line);padding:16px}
      .dg-metric strong{display:block;font-size:32px;color:var(--accent);margin-top:4px}
      .hidden{display:none!important}
      @media(max-width:780px){.dg-app{padding:10px}.dg-hero{grid-template-columns:1fr}.dg-art{min-height:230px}.dg-panel{padding:22px}.dg-stage{padding:14px}.dg-top{align-items:flex-start;flex-direction:column}.dg-big-char{grid-template-columns:1fr}.dg-global-char{font-size:120px}.dg-local-chars{font-size:30px}.dg-small-tiles{font-size:42px}.dg-gaze{grid-template-columns:1fr}.dg-gift,.dg-arrow{text-align:center;font-size:60px}}
    `;
    document.head.appendChild(style);
  }

  function buildStimulus(trial) {
    if (trial.stimulusHtml) return trial.stimulusHtml;
    if (trial.kind === 'globalLocal') {
      return `<div class="dg-big-char" aria-label="大字${trial.big}，小字${trial.small}"><div><div class="dg-global-char">${trial.big}</div><div>大字</div></div><div><div class="dg-local-chars">${Array.from({ length: 9 }, () => `<span>${trial.small}</span>`).join('')}</div><div>小字</div></div></div>`;
    }
    if (trial.kind === 'grid') {
      return `<div class="dg-small-tiles">${trial.items.map((item) => `<span>${item}</span>`).join('')}</div>`;
    }
    if (trial.kind === 'face') return `<div class="dg-face">${trial.face}</div>`;
    if (trial.kind === 'gaze') {
      return `<div class="dg-gaze"><div class="dg-gift">${trial.left}</div><div><div class="dg-face">🙂</div><div class="dg-arrow">${trial.arrow}</div></div><div class="dg-gift">${trial.right}</div></div>`;
    }
    if (trial.kind === 'story') return `<div class="dg-story">${trial.story}</div>`;
    return `<div class="dg-face">${trial.symbol || '⭐'}</div>`;
  }

  function mount(config) {
    installStyles();
    document.documentElement.classList.add('playable-unified');
    document.documentElement.dataset.game = config.gameId;

    const root = document.getElementById('app');
    let screen = 'home';
    let index = 0;
    let trialStart = 0;
    let answerLocked = false;
    const startedAt = new Date().toISOString();
    const trialOrder = shuffle(config.trials).slice(0, config.rounds || 10);
    const trials = [];
    const events = [];

    function renderHome() {
      root.innerHTML = `
        <div class="dg-app" style="--tone1:${config.tone1};--tone2:${config.tone2};--accent:${config.accent};--accent2:${config.accent2}">
          <main class="dg-shell">
            <section class="dg-hero">
              <div class="dg-panel">
                <h1 class="dg-title">${config.title}</h1>
                <p class="dg-subtitle">${config.subtitle}</p>
                <div class="dg-tags">
                  <span class="dg-tag">${config.domainLabel}</span>
                  <span class="dg-tag">${config.primaryParadigm}</span>
                  <span class="dg-tag">MVP 可玩版</span>
                </div>
                <div class="dg-note">${config.instructions}</div>
                <div class="dg-note"><strong>设计依据：</strong>${config.basis}</div>
                <div class="dg-btns">
                  <button class="dg-btn primary" id="startBtn">开始训练</button>
                  <button class="dg-btn" id="homeBtn">返回首页</button>
                </div>
              </div>
              <div class="dg-art"><div class="dg-mascot">${config.mascot}</div></div>
            </section>
          </main>
        </div>
      `;
      document.getElementById('startBtn').onclick = () => start();
      document.getElementById('homeBtn').onclick = () => { window.location.href = window.CognitiveGameUI?.appHomeHref?.() || '/'; };
    }

    function start() {
      screen = 'play';
      index = 0;
      renderTrial();
    }

    function renderTrial(message, good) {
      if (index >= trialOrder.length) return finish();
      answerLocked = false;
      const trial = trialOrder[index];
      trialStart = Date.now();
      root.innerHTML = `
        <div class="dg-app" style="--tone1:${config.tone1};--tone2:${config.tone2};--accent:${config.accent};--accent2:${config.accent2}">
          <main class="dg-shell">
            <div class="dg-top">
              <div><strong>${config.title}</strong><div class="dg-pill">${config.primaryParadigm}</div></div>
              <div class="dg-pill">第 ${index + 1} / ${trialOrder.length} 题</div>
            </div>
            <section class="dg-stage">
              <div class="dg-card"><p class="dg-prompt">${trial.prompt}</p></div>
              <div class="dg-card dg-stimulus"><div class="dg-stimulus-inner">${buildStimulus(trial)}</div></div>
              <div class="dg-options">${shuffle(trial.options).map((option) => `<button class="dg-option" data-answer="${option}">${option}</button>`).join('')}</div>
              <div class="dg-feedback ${good ? 'good' : 'bad'}">${message || ''}</div>
            </section>
          </main>
        </div>
      `;
      root.querySelectorAll('.dg-option').forEach((button) => {
        button.addEventListener('click', () => answer(trial, button.dataset.answer, button));
      });
    }

    function answer(trial, response, button) {
      if (answerLocked) return;
      answerLocked = true;
      const rtMs = Date.now() - trialStart;
      const correct = response === trial.correct;
      const trialRecord = {
        trialId: `${config.gameId}-${index + 1}`,
        gameId: config.gameId,
        domain: config.domain,
        taskFamily: config.taskFamily,
        mode: 'training',
        level: 1,
        trialIndex: index + 1,
        stimulus: trial.stimulus || { kind: trial.kind, prompt: trial.prompt },
        condition: trial.condition || {},
        correctAnswer: trial.correct,
        response,
        correct,
        rtMs,
        errorType: correct ? null : 'wrong-choice',
        difficultyParams: {
          optionCount: trial.options.length,
          paradigm: config.primaryParadigm,
          mvpLevel: 1
        }
      };
      trials.push(trialRecord);
      events.push({
        type: 'response',
        trialId: trialRecord.trialId,
        response,
        correct,
        rtMs,
        at: new Date().toISOString()
      });
      root.querySelectorAll('.dg-option').forEach((optionButton) => {
        optionButton.disabled = true;
        if (optionButton.dataset.answer === trial.correct) optionButton.classList.add('cg-answer-correct');
      });
      if (button) {
        button.classList.add(correct ? 'cg-answer-correct' : 'cg-answer-wrong');
        window.CognitiveGameUI?.markAnswer?.(button, correct, correct ? '答对了' : '再试一题');
      }
      const feedback = root.querySelector('.dg-feedback');
      if (feedback) {
        feedback.textContent = correct ? '答对了，准备下一题。' : `这题正确答案是：${trial.correct}`;
        feedback.className = `dg-feedback ${correct ? 'good' : 'bad'}`;
      }
      index += 1;
      window.setTimeout(() => renderTrial('', correct), 720);
    }

    function finish() {
      const correctCount = trials.filter((trial) => trial.correct).length;
      const accuracy = trials.length ? correctCount / trials.length : 0;
      const medianRt = median(trials.map((trial) => trial.rtMs));
      const nextLevel = accuracy >= 0.85 ? 2 : 1;
      const completedAt = new Date().toISOString();
      const summary = {
        correct: correctCount,
        total: trials.length,
        accuracy,
        medianRt,
        errors: trials.length - correctCount,
        nextLevel
      };

      window.CognitiveGameRecorder?.record(config.gameId, {
        domain: config.domain,
        taskFamily: config.taskFamily,
        mode: 'training',
        level: 1,
        startedAt,
        completedAt,
        summary,
        trials,
        events,
        adaptive: {
          previousLevel: 1,
          recommendedLevel: nextLevel,
          reason: accuracy >= 0.85 ? 'accuracy reached upgrade threshold' : 'keep easy level until accuracy is stable',
          rules: ['increase after accuracy >= 85%', 'stay on level 1 when errors remain frequent']
        }
      });

      root.innerHTML = `
        <div class="dg-app" style="--tone1:${config.tone1};--tone2:${config.tone2};--accent:${config.accent};--accent2:${config.accent2}">
          <main class="dg-shell">
            <section class="dg-panel">
              <h1 class="dg-title">训练完成</h1>
              <p class="dg-subtitle">${config.title} 已保存本地 session 记录。</p>
              <div class="dg-result-grid">
                <div class="dg-metric">正确题数<strong>${correctCount}/${trials.length}</strong></div>
                <div class="dg-metric">正确率<strong>${Math.round(accuracy * 100)}%</strong></div>
                <div class="dg-metric">中位反应时<strong>${medianRt ?? '-'} ms</strong></div>
                <div class="dg-metric">推荐等级<strong>${nextLevel}</strong></div>
              </div>
              <div class="dg-btns">
                <button class="dg-btn primary" id="againBtn">再玩一轮</button>
                <button class="dg-btn" id="backBtn">返回首页</button>
              </div>
            </section>
          </main>
        </div>
      `;
      document.getElementById('againBtn').onclick = () => window.location.reload();
      document.getElementById('backBtn').onclick = () => { window.location.href = window.CognitiveGameUI?.appHomeHref?.() || '/'; };
    }

    if (screen === 'home') renderHome();
  }

  window.CognitiveDomainGame = { mount };
})();
