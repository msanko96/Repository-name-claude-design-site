/* BEX — app.js */
(function () {
  const root = document.documentElement;
  const LS_KEY = "bex-tweaks";

  // Merge persisted values with defaults
  const defaults = window.__TWEAKS || { accent: "cyan", hero: "scanner", motion: "full", theme: "dark" };
  let state = { ...defaults };
  try {
    const saved = JSON.parse(localStorage.getItem(LS_KEY) || "{}");
    state = { ...state, ...saved };
  } catch (e) {}

  function applyState() {
    root.setAttribute("data-theme", state.theme);
    root.setAttribute("data-accent", state.accent);
    root.setAttribute("data-motion", state.motion);
    root.setAttribute("data-hero", state.hero);
  }

  function saveState(partial) {
    const prev = { ...state };
    state = { ...state, ...partial };
    localStorage.setItem(LS_KEY, JSON.stringify(state));
    applyState();
    // notify host for persistence
    try { window.parent.postMessage({ type: "__edit_mode_set_keys", edits: partial }, "*"); } catch (e) {}
    // hero variant switching — start/stop anims
    if (partial.hero && partial.hero !== prev.hero) {
      const stops = window.__heroStop || {};
      const starts = window.__heroStart || {};
      Object.values(stops).forEach(fn => { try { fn(); } catch(e){} });
      const fn = starts[partial.hero];
      if (fn) try { fn(); } catch(e){}
    }
  }

  // ---------- Theme toggle ----------
  document.getElementById("theme-toggle").addEventListener("click", () => {
    saveState({ theme: state.theme === "dark" ? "light" : "dark" });
  });

  

  applyState();

  // ---------- Reveal on scroll ----------
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add("in");
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

  // ---------- Odometer numbers (Trust) ----------
  function animateOdo(el) {
    const target = parseFloat(el.dataset.value);
    const prefix = el.dataset.prefix || "";
    const suffix = el.dataset.suffix || "";
    const fmt = el.dataset.format;
    const dur = 1400;
    const start = performance.now();
    function frame(now) {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = target * eased;
      let out;
      if (fmt === "k") {
        out = v >= 1000 ? (v / 1000).toFixed(0) + "k" : Math.round(v).toString();
      } else {
        out = Math.round(v).toString();
      }
      el.textContent = prefix + out + suffix;
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  const odoIo = new IntersectionObserver((entries) => {
    entries.forEach(en => { if (en.isIntersecting) { animateOdo(en.target); odoIo.unobserve(en.target); } });
  }, { threshold: 0.4 });
  document.querySelectorAll("[data-odo]").forEach(el => odoIo.observe(el));

  // ---------- Signal viewer: feed stream ----------
  const jobs = [
    ["React dev · analytics SaaS",        "$12k · fx", 94, true],
    ["Quick Figma to HTML export",        "$60 · hr",  28, false],
    ["AI agent integration, LangChain",   "$8k · fx",  89, true],
    ["Data entry · 20 spreadsheets",      "$5 · hr",   12, false],
    ["Webflow migration from WordPress",  "$4k · fx",  78, true],
    ["WordPress bug fix",                 "$30 · fx",  22, false],
    ["Shopify theme customization",       "$1k · fx",  55, false],
    ["Stripe billing dashboard",          "$15k · fx", 92, true],
    ["Logo for my cafe",                  "$80 · fx",  18, false],
    ["Fullstack Next.js + Supabase",      "$9k · fx",  86, true],
    ["Translate 2 pages EN→ES",           "$25 · fx",  14, false],
    ["Senior mobile · React Native",      "$18k · fx", 91, true],
  ];

  const noiseEl = document.getElementById("sv-noise");
  const signalEl = document.getElementById("sv-signal");
  signalEl && signalEl.classList.add("signal");
  let feedIdx = 0;
  let feedTimer = null;

  function pushJob() {
    if (state.motion === "off") return;
    const [title, meta, score, pass] = jobs[feedIdx % jobs.length];
    feedIdx++;
    const li = document.createElement("li");
    li.innerHTML = `<span>${title}</span><span class="s">${score}</span>`;
    noiseEl.prepend(li);
    // keep list short
    while (noiseEl.children.length > 7) {
      const last = noiseEl.lastElementChild;
      last.classList.add("out");
      setTimeout(() => last.remove(), 400);
      break;
    }
    // after a delay, if pass, move to signal; else fade
    setTimeout(() => {
      li.classList.add("out");
      setTimeout(() => {
        li.remove();
        if (pass) {
          const li2 = document.createElement("li");
          li2.innerHTML = `<span>${title}</span><span class="s">${score}</span>`;
          signalEl.prepend(li2);
          while (signalEl.children.length > 6) signalEl.lastElementChild.remove();
          setTimeout(() => {
            // auto remove eventually
            if (li2.parentNode) { li2.classList.add("out"); setTimeout(() => li2.remove(), 400); }
          }, 6000);
        }
      }, 380);
    }, 1700 + Math.random() * 800);
  }
  function startFeed() {
    if (feedTimer) clearInterval(feedTimer);
    pushJob();
    feedTimer = setInterval(pushJob, 900);
  }
  if (noiseEl) startFeed();

  // ---------- Hero Orbit variant ----------
  const ovStage = document.getElementById("ov-stage");
  const ovNodes = document.getElementById("ov-nodes");
  if (ovStage && ovNodes) {
    let ovTimer = null;
    let ovIdx = 0;
    function spawnOrbitNode() {
      if (state.motion === "off" || state.hero !== "orbit") return;
      const [title, meta, score, pass] = jobs[ovIdx % jobs.length];
      ovIdx++;
      const node = document.createElement("div");
      node.className = "ov-node " + (pass ? "match" : "noise");
      // angle and distance from center
      const angle = Math.random() * Math.PI * 2;
      // ellipse radii roughly matching the outer ring
      const rect = ovStage.getBoundingClientRect();
      const rx = Math.min(rect.width, 600) * 0.42;
      const ry = Math.min(rect.height, 360) * 0.4;
      const x = Math.cos(angle) * rx;
      const y = Math.sin(angle) * ry;
      node.style.setProperty("--x", x + "px");
      node.style.setProperty("--y", y + "px");
      node.innerHTML = `<span>${title.length > 28 ? title.slice(0,26)+"…" : title}</span><span class="s">${score}</span>`;
      ovNodes.appendChild(node);
      requestAnimationFrame(() => node.classList.add("in"));
      setTimeout(() => node.remove(), pass ? 2500 : 2100);
    }
    function startOrbit() {
      if (ovTimer) clearInterval(ovTimer);
      if (state.hero !== "orbit" || state.motion === "off") return;
      for (let i = 0; i < 3; i++) setTimeout(spawnOrbitNode, i * 250);
      ovTimer = setInterval(spawnOrbitNode, 520);
    }
    function stopOrbit() { if (ovTimer) { clearInterval(ovTimer); ovTimer = null; } }
    window.__heroStart = window.__heroStart || {};
    window.__heroStart.orbit = startOrbit;
    window.__heroStop  = window.__heroStop  || {};
    window.__heroStop.orbit  = stopOrbit;
    if (state.hero === "orbit") startOrbit();
  }

  // ---------- Hero Stream variant ----------
  const stFeed = document.getElementById("st-feed");
  const stSignal = document.getElementById("st-signal");
  const stNoise  = document.getElementById("st-noise");
  if (stFeed && stSignal && stNoise) {
    let stTimer = null;
    let stIdx = 0;
    function spawnStreamJob() {
      if (state.motion === "off" || state.hero !== "stream") return;
      const [title, meta, score, pass] = jobs[stIdx % jobs.length];
      stIdx++;
      const row = document.createElement("div");
      row.className = "st-job" + (pass ? " match" : "");
      row.style.setProperty("--fly", (pass ? -180 : 180) + "px");
      row.style.setProperty("--dur", (3.8 + Math.random() * 0.8) + "s");
      row.innerHTML = `<span>${title.length > 24 ? title.slice(0,22)+"…" : title}</span><span class="s">${score}</span>`;
      stFeed.appendChild(row);
      // after crossing filter, drop into lane list
      setTimeout(() => {
        if (state.hero !== "stream") return;
        const li = document.createElement("li");
        li.innerHTML = `<span>${title.length > 22 ? title.slice(0,20)+"…" : title}</span><span class="s">${score}</span>`;
        const target = pass ? stSignal : stNoise;
        target.prepend(li);
        while (target.children.length > 5) target.lastElementChild.remove();
        setTimeout(() => { if (li.parentNode) li.remove(); }, 7000);
      }, 2400);
      setTimeout(() => row.remove(), 5000);
    }
    function startStream() {
      if (stTimer) clearInterval(stTimer);
      if (state.hero !== "stream" || state.motion === "off") return;
      spawnStreamJob();
      stTimer = setInterval(spawnStreamJob, 780);
    }
    function stopStream() {
      if (stTimer) { clearInterval(stTimer); stTimer = null; }
      stFeed.innerHTML = "";
    }
    window.__heroStart = window.__heroStart || {};
    window.__heroStart.stream = startStream;
    window.__heroStop  = window.__heroStop  || {};
    window.__heroStop.stream  = stopStream;
    if (state.hero === "stream") startStream();
  }

  // ---------- viz-score bars fill on reveal ----------
  const scoreIo = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.querySelectorAll(".viz-row").forEach(row => {
        const s = parseInt(row.dataset.score, 10);
        const bar = row.querySelector(".bar i");
        if (bar) setTimeout(() => { bar.style.width = s + "%"; }, 80);
      });
      scoreIo.unobserve(en.target);
    });
  }, { threshold: 0.4 });
  document.querySelectorAll(".viz-score").forEach(el => scoreIo.observe(el));

  // ---------- Feature cards: static (no expand/collapse) ----------

  // ---------- Letter typer (hover-triggered, loops) ----------
  const letterEl = document.getElementById("letter-typer");
  if (letterEl) {
    const LETTER = {
      en: {
        pre: [
          { t: "Hi Alex,", cls: "t", br: true },
          { t: "", br: true },
          { t: "I reviewed your posting for the " },
          { t: "React dashboard for analytics SaaS", cls: "t" },
          { t: " — we shipped a similar build for a fintech last quarter (2-week MVP, $12k).", br: true },
          { t: "", br: true },
          { t: "A few quick thoughts on your requirements: we'd start with the auth + billing skeleton, then wire up the " },
          { t: "charting layer", cls: "t" },
          { t: " with typed schemas.", br: true },
          { t: "", br: true },
        ],
        type: [
          "Happy to share a similar shipped project on a quick call.",
          "Best, Maya — Lead engineer at Northline.",
        ],
      },
      ru: {
        pre: [
          { t: "Здравствуйте, Алекс!", cls: "t", br: true },
          { t: "", br: true },
          { t: "Посмотрел ваш проект — " },
          { t: "React-дашборд для аналитики SaaS", cls: "t" },
          { t: " — в прошлом квартале мы отгрузили похожий для финтеха (2-недельный MVP, $12k).", br: true },
          { t: "", br: true },
          { t: "Пара мыслей по требованиям: начнём со скелета auth + биллинга, потом подключим " },
          { t: "графический слой", cls: "t" },
          { t: " с типизированными схемами.", br: true },
          { t: "", br: true },
        ],
        type: [
          "Готов на коротком созвоне показать похожий запущенный проект.",
          "С уважением, Майя — ведущий инженер, Northline.",
        ],
      },
    };
    function curLang() {
      return (document.documentElement.getAttribute("data-lang") === "ru") ? "ru" : "en";
    }
    let preLines = LETTER[curLang()].pre;
    let typeLines = LETTER[curLang()].type;

    const card = letterEl.closest('.feature');
    let runToken = 0;

    function renderStatic() {
      letterEl.innerHTML = "";
      preLines.forEach((ln) => {
        if (ln.t) {
          const sp = document.createElement("span");
          if (ln.cls) sp.className = ln.cls;
          sp.textContent = ln.t;
          letterEl.appendChild(sp);
        }
        if (ln.br) letterEl.appendChild(document.createElement("br"));
      });
    }

    async function typeCycle(token) {
      const cursor = document.createElement("span");
      cursor.className = "cursor";
      letterEl.appendChild(cursor);

      for (const line of typeLines) {
        const tail = document.createElement("span");
        letterEl.insertBefore(tail, cursor);
        for (let i = 0; i < line.length; i++) {
          if (token !== runToken) return;
          tail.textContent += line[i];
          await new Promise(r => setTimeout(r, 22 + Math.random() * 26));
        }
        letterEl.insertBefore(document.createElement("br"), cursor);
        if (token !== runToken) return;
        await new Promise(r => setTimeout(r, 350));
      }
      // pause at end
      if (token !== runToken) return;
      await new Promise(r => setTimeout(r, 1400));
      // erase + loop
      if (token !== runToken) return;
      renderStatic();
      if (token !== runToken) return;
      typeCycle(token);
    }

    function startLoop() {
      runToken++;
      renderStatic();
      typeCycle(runToken);
    }
    function stopLoop() {
      runToken++;
      renderStatic();
    }

    // Static by default; on hover — loop
    renderStatic();
    if (state.motion !== "off" && card) {
      card.addEventListener("mouseenter", startLoop);
      card.addEventListener("mouseleave", stopLoop);
      card.addEventListener("focusin", startLoop);
      card.addEventListener("focusout", stopLoop);
    }

    // Re-render when language changes
    const prevHandler = window.__onLangChange;
    window.__onLangChange = function (lang) {
      preLines = LETTER[lang === "ru" ? "ru" : "en"].pre;
      typeLines = LETTER[lang === "ru" ? "ru" : "en"].type;
      runToken++;
      renderStatic();
      if (prevHandler) try { prevHandler(lang); } catch (e) {}
    };
  }

  // ---------- Why: chaos vs order — concrete UI metaphors ----------
  function drawChaos() {
    document.querySelectorAll(".chaos-stage").forEach(stage => {
      if (stage.childElementCount) return;
      // 5 messy "tabs/windows" scattered, each a different Upwork view
      const tabs = [
        { t: "upwork.com — find work",     x: 4,  y: 6,   r: -3, n: 3,  miss: true  },
        { t: "telegram — leads channel",   x: 38, y: 28,  r: 2,  n: 12, miss: false },
        { t: "notion — clients pipeline",  x: 8,  y: 64,  r: -2, n: 0,  miss: false },
        { t: "upwork.com — saved jobs",    x: 46, y: 96,  r: 4,  n: 7,  miss: true  },
        { t: "vpn — switching node…",      x: 22, y: 130, r: -4, n: 0,  miss: false, err: true },
      ];
      tabs.forEach((tab, i) => {
        const w = document.createElement("div");
        w.className = "chaos-win" + (tab.err ? " chaos-win-err" : "");
        w.style.left = tab.x + "%";
        w.style.top = tab.y + "px";
        w.style.transform = `rotate(${tab.r}deg)`;
        w.style.zIndex = i + 1;
        w.innerHTML = `
          <div class="chaos-bar">
            <span class="chaos-dots"><i></i><i></i><i></i></span>
            <span class="chaos-title">${tab.t}</span>
            ${tab.n > 0 ? `<span class="chaos-badge">${tab.n}</span>` : ""}
          </div>
          <div class="chaos-body">
            ${tab.err
              ? `<div class="chaos-err">⚠ connection failed · retry</div>`
              : `<div class="chaos-line"></div>
                 <div class="chaos-line"></div>
                 <div class="chaos-line short"></div>`
            }
          </div>
        `;
        stage.appendChild(w);
      });
      // floating "missed" markers
      [
        { x: 70, y: 14, t: "missed · 2h" },
        { x: 76, y: 86, t: "missed · 5h" },
        { x: 4,  y: 152, t: "blocked" },
      ].forEach(m => {
        const tag = document.createElement("div");
        tag.className = "chaos-tag";
        tag.style.left = m.x + "%";
        tag.style.top = m.y + "px";
        tag.textContent = "✕ " + m.t;
        stage.appendChild(tag);
      });
    });
  }
  function drawOrder() {
    document.querySelectorAll(".order-stage").forEach(stage => {
      if (stage.childElementCount) return;
      const win = document.createElement("div");
      win.className = "order-win";
      win.innerHTML = `
        <div class="order-bar">
          <span class="chaos-dots"><i></i><i></i><i></i></span>
          <span class="order-title">bex.app — inbox</span>
          <span class="order-pill">sorted by score</span>
        </div>
        <div class="order-body">
          <div class="vc-card order-row order-row-hi">
            <div class="vc-card-tags"><span class="vc-chip vc-chip-good">94 · match</span></div>
            <div class="vc-card-title">Senior Next.js + Supabase engineer</div>
            <div class="vc-card-meta">$9,000 · 2 hr ago</div>
          </div>
          <div class="vc-card order-row">
            <div class="vc-card-tags"><span class="vc-chip vc-chip-good">88 · match</span></div>
            <div class="vc-card-title">Stripe billing dashboard · TypeScript</div>
            <div class="vc-card-meta">$15,000 · 4 hr ago</div>
          </div>
          <div class="vc-card order-row">
            <div class="vc-card-tags"><span class="vc-chip vc-chip-mid">72 · review</span></div>
            <div class="vc-card-title">React Native checkout flow</div>
            <div class="vc-card-meta">$6,000 · 6 hr ago</div>
          </div>
          <div class="vc-card order-row">
            <div class="vc-card-tags"><span class="vc-chip vc-chip-mid">68 · review</span></div>
            <div class="vc-card-title">Webflow → Next.js port</div>
            <div class="vc-card-meta">$4,000 · 8 hr ago</div>
          </div>
        </div>
      `;
      stage.appendChild(win);
    });
  }
  drawChaos();
  drawOrder();

  // ---------- Hero FEED variant (stream-layout, real Upwork-style cards) ----------
  const fvFeed   = document.getElementById("fv-feed");
  const fvSignal = document.getElementById("fv-signal");
  const fvNoise  = document.getElementById("fv-noise");
  if (fvFeed && fvSignal && fvNoise) {
    const feedJobs = [
      { age: "3 min ago",   title: "CRM Development for Dog Trainers",           flag: "🇨🇦", price: "$30–55",  score: 69 },
      { age: "5 min ago",   title: "Front End Developer — Fashion E‑Commerce",   flag: "🇨🇦", price: "$15–35",  score: 49 },
      { age: "15 min ago",  title: "HubSpot Integration & Dashboard Build",       flag: "🇺🇸", price: "$5",      score: 72 },
      { age: "27 min ago",  title: "Full Stack Developer | React & Node.js",      flag: "🇷🇸", price: "$10,000", score: 98 },
      { age: "31 min ago",  title: "Custom Slack and HubSpot App",                flag: "🇨🇦", price: "$15–35",  score: 66 },
      { age: "34 min ago",  title: "AI Mobile App Developer for Startup",         flag: "🇺🇸", price: "$150",    score: 76 },
      { age: "37 min ago",  title: "Mobile App Development for a Clinic",         flag: "🇺🇸", price: "$120",    score: 87 },
      { age: "38 min ago",  title: "APK Maker & Application Testing",             flag: "🇺🇸", price: "$5–15",   score: 42 },
      { age: "43 min ago",  title: "Doctor appointment booking Mobile app",       flag: "🇩🇪", price: "$15–25",  score: 88 },
      { age: "an hour ago", title: "Logo design for coffee shop",                 flag: "🇫🇷", price: "$80",     score: 22 },
      { age: "an hour ago", title: "Help with Booking Koala",                     flag: "🇺🇸", price: "$35",     score: 53 },
      { age: "an hour ago", title: "Build B2B Outbound System (LinkedIn + AI)",   flag: "🇷🇸", price: "$200",    score: 72 },
      { age: "2 hr ago",    title: "WordPress plugin bug fix · urgent",           flag: "🇮🇳", price: "$30",     score: 24 },
      { age: "2 hr ago",    title: "Senior Next.js + Supabase engineer",          flag: "🇺🇸", price: "$9,000",  score: 91 },
      { age: "2 hr ago",    title: "Translate 2 product pages EN → ES",           flag: "🇪🇸", price: "$25",     score: 14 },
      { age: "2 hr ago",    title: "Stripe billing dashboard · TypeScript",       flag: "🇺🇸", price: "$15,000", score: 94 },
    ];
    function scoreClass(s) { return s >= 70 ? "s-high" : s >= 55 ? "s-mid" : "s-low"; }
    function cardMarkup(j, variant) {
      const verdict = variant === "match"
        ? `<span class="fv-verdict-label">● matched</span>`
        : variant === "noise"
        ? `<span class="fv-verdict-label">× rejected</span>`
        : ``;
      return `
        <div class="fv-job-top">
          <span>${j.age}</span>
          ${verdict}
        </div>
        <div class="fv-job-title">${j.title}</div>
        <div class="fv-job-foot">
          <div class="fv-job-left">
            <span class="fv-flag">${j.flag}</span>
            <span>${j.price}</span>
          </div>
          <span class="fv-score ${scoreClass(j.score)}">${j.score}%</span>
        </div>`;
    }

    let fvTimer = null;
    let fvNextTimer = null;
    let fvIdx = 0;
    let fvActive = []; // active cards on screen { el, t0, dur, pass, drop }
    let fvRaf = null;
    let fvStageHeight = 0;
    let fvStageWidth = 0;
    let fvCardHeight = 78;
    let fvFilterTargetY = 0;

    function fvMeasure() {
      if (!fvFeed) return;
      const r = fvFeed.getBoundingClientRect();
      fvStageHeight = r.height;
      fvStageWidth = r.width;
      // measure filter position relative to the feed-stage so cards land exactly inside it
      const filter = document.querySelector(".feed-viz .fv-filter");
      const sample = fvFeed.querySelector(".fv-job");
      fvCardHeight = sample ? sample.getBoundingClientRect().height : 78;
      if (filter) {
        const fr = filter.getBoundingClientRect();
        // top of the filter content area (inside its 8px padding) relative to fvFeed
        const filterInnerTop = fr.top + 8 - r.top;
        fvFilterTargetY = filterInnerTop;
      } else {
        fvFilterTargetY = (fvStageHeight - fvCardHeight) / 2;
      }
    }

    function fvStep(now) {
      fvRaf = null;
      const filterY = fvFilterTargetY;
      const cardH = fvCardHeight || 78;
      const slideOut = Math.max(fvStageWidth, 260) + 100;
      const stillActive = [];

      fvActive.forEach(job => {
        const elapsed = now - job.t0;
        const t = Math.min(elapsed / job.dur, 1);

        if (t >= 1) {
          // card fully exited — NOW add to column (appears just as card disappears)
          if (!job.verdictApplied) { job.verdictApplied = true; }
          job.drop(); // always call drop at end, regardless of earlier state
          if (!job.nextScheduled) {
            job.nextScheduled = true;
            if (state.hero === "feed") fvNextTimer = setTimeout(spawnFeedJob, 200);
          }
          job.el.remove();
          return;
        }

        let x = 0, y = 0, o = 0;

        // A (0 → 0.42): slide in from above, fade 0→1
        // B (0.42 → 0.64): rest at filter, verdict
        // C (0.64 → 1.0): slide into column, opacity stays 1
        if (t < 0.42) {
          const p = t / 0.42;
          const eased = 1 - Math.pow(1 - p, 2.4);
          y = -cardH * (1 - eased) + filterY * eased;
          o = Math.min(1, p * 2.5); // 0→1 ramp in first ~40%
          if (!job.driftApplied) { job.el.classList.add("drifting"); job.driftApplied = true; }

        } else if (t < 0.64) {
          y = filterY; o = 1; x = 0;
          if (!job.onFilterApplied) {
            job.el.classList.remove("drifting");
            job.el.classList.add("on-filter");
            job.el.classList.add(job.pass ? "verdict-match" : "verdict-reject");
            const top = job.el.querySelector(".fv-job-top");
            if (top && !top.querySelector(".fv-verdict-label")) {
              const span = document.createElement("span");
              span.className = "fv-verdict-label";
              span.textContent = job.pass ? "● matched" : "× rejected";
              top.appendChild(span);
            }
            job.onFilterApplied = true;
            // NOTE: drop() is NOT called here — it fires at t=1 when card fully exits
          }

        } else {
          // Phase C — slide into column, NO fade (stays fully visible)
          const p = (t - 0.64) / 0.36;
          const eased = Math.pow(p, 1.5); // ease-in
          y = filterY;
          x = (job.pass ? -1 : 1) * slideOut * eased;
          o = 1; // fully visible throughout exit

          // schedule next card only when THIS one is almost gone (90% through C)
          if (!job.nextScheduled && p > 0.88) {
            job.nextScheduled = true;
            if (state.hero === "feed") fvNextTimer = setTimeout(spawnFeedJob, 180);
          }
        }

        job.el.style.setProperty("--x", x + "px");
        job.el.style.setProperty("--y", y + "px");
        job.el.style.setProperty("--o", o);
        stillActive.push(job);
      });

      fvActive = stillActive;
      if (fvActive.length) fvRaf = requestAnimationFrame(fvStep);
    }

    // Heartbeat: if loop dies (tab switch, page bg), restart after 5s
    let fvHeartbeat = null;

    function spawnFeedJob() {
      if (state.motion === "off" || state.hero !== "feed") return;
      const j = feedJobs[fvIdx % feedJobs.length];
      fvIdx++;
      const pass = j.score >= 70;
      const card = document.createElement("article");
      card.className = "fv-job drifting";
      card.innerHTML = cardMarkup(j);
      fvFeed.appendChild(card);
      fvMeasure();
      const drop = () => {
        if (state.hero !== "feed") return;
        const target = pass ? fvSignal : fvNoise;
        const item = document.createElement("div");
        item.className = "fv-list-item" + (pass ? " fv-item-from-right" : " fv-item-from-left");
        item.innerHTML = cardMarkup(j, pass ? "match" : "noise");
        target.prepend(item);
        // keep max 5 items, no timeout removal — items stay until pushed out
        while (target.children.length > 5) target.lastElementChild.remove();
      };
      const dur = 3400 + Math.random() * 200; // ~3.4s total
      const job = { el: card, t0: performance.now(), dur, pass, drop,
                    nextScheduled: false, verdictApplied: false,
                    driftApplied: false, onFilterApplied: false };
      fvActive.push(job);
      if (!fvRaf) fvRaf = requestAnimationFrame(fvStep);
    }

    function startFeedVariant() {
      if (state.hero !== "feed" || state.motion === "off") return;
      if (fvTimer) clearInterval(fvTimer);
      if (fvNextTimer) { clearTimeout(fvNextTimer); fvNextTimer = null; }
      if (fvHeartbeat) { clearInterval(fvHeartbeat); fvHeartbeat = null; }
      fvMeasure();
      spawnFeedJob();
      // heartbeat: restart loop if it dies (tab switch, etc.)
      fvHeartbeat = setInterval(() => {
        if (state.hero !== "feed" || state.motion === "off") return;
        if (fvActive.length === 0 && !fvNextTimer) {
          spawnFeedJob();
        }
      }, 5000);
    }
    function stopFeedVariant() {
      if (fvTimer) { clearInterval(fvTimer); fvTimer = null; }
      if (fvNextTimer) { clearTimeout(fvNextTimer); fvNextTimer = null; }
      if (fvHeartbeat) { clearInterval(fvHeartbeat); fvHeartbeat = null; }
      if (fvRaf) { cancelAnimationFrame(fvRaf); fvRaf = null; }
      fvActive.forEach(j => j.el.remove());
      fvActive = [];
      fvFeed.innerHTML = "";
    }
    window.addEventListener("resize", fvMeasure);
    window.__heroStart = window.__heroStart || {};
    window.__heroStart.feed = startFeedVariant;
    window.__heroStop  = window.__heroStop  || {};
    window.__heroStop.feed  = stopFeedVariant;
    if (state.hero === "feed") startFeedVariant();
  }

  // ---------- CTA form: waitlist submission ----------
  const ctaForm = document.getElementById("cta-form");
  if (ctaForm) {
    const emailInput = document.getElementById("cta-email");
    const submitBtn = document.getElementById("cta-submit");
    const btnLabel = submitBtn ? submitBtn.querySelector(".cta-btn-label") : null;

    function t(key) {
      const lang = document.documentElement.getAttribute("data-lang") || "en";
      const dict = (window.__bexI18n && window.__bexI18n.T) || {};
      const entry = dict[key];
      if (!entry) return key;
      return entry[lang] || entry.en || key;
    }

    let busy = false;
    ctaForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (busy) return;
      if (!emailInput.value || !emailInput.checkValidity()) {
        emailInput.reportValidity();
        return;
      }
      busy = true;
      submitBtn.disabled = true;
      emailInput.disabled = true;
      if (btnLabel) btnLabel.textContent = t("cta.btn.loading");
      try {
        const res = await fetch("/.netlify/functions/waitlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: emailInput.value }),
        });
        if (!res.ok) throw new Error("Request failed");
        if (btnLabel) btnLabel.textContent = t("cta.btn.done");
        emailInput.value = "";
      } catch (err) {
        if (btnLabel) btnLabel.textContent = t("cta.btn.error");
        setTimeout(() => {
          if (btnLabel) btnLabel.textContent = t("cta.btn");
          submitBtn.disabled = false;
          emailInput.disabled = false;
          busy = false;
        }, 2500);
        return;
      }
      submitBtn.disabled = false;
      emailInput.disabled = false;
      busy = false;
    });
  }

  // ---------- Scroll-driven A/B/C/D highlight on ui-mock ----------
  const mock = document.querySelector(".ui-mock");
  const mockWrap = document.querySelector(".ui-mock-wrap");
  const notes = document.querySelectorAll(".inside-notes .inote");
  const annos = document.querySelectorAll(".ui-anno");
  const annoRegions = mock ? mock.querySelectorAll("[data-anno]") : [];
  if (mock && notes.length) {
    const letters = ["A","B","C","D"];
    notes.forEach((n, i) => n.dataset.annoKey = letters[i] || "");
    function updateActive() {
      const mockRect = mock.getBoundingClientRect();
      // only activate when the mock is comfortably inside the viewport
      const inView = mockRect.bottom > 160 && mockRect.top < window.innerHeight - 160;
      if (!inView) {
        mock.classList.remove("has-focus");
        if (mockWrap) mockWrap.classList.remove("has-focus");
        notes.forEach(n => n.classList.remove("is-active"));
        annos.forEach(a => a.classList.remove("is-active"));
        annoRegions.forEach(r => r.classList.remove("is-active"));
        return;
      }
      mock.classList.add("has-focus");
      if (mockWrap) mockWrap.classList.add("has-focus");
      const focus = window.innerHeight * 0.5;
      let best = null, bestDist = Infinity;
      annoRegions.forEach(region => {
        const r = region.getBoundingClientRect();
        const mid = r.top + r.height / 2;
        const d = Math.abs(mid - focus);
        if (d < bestDist) { bestDist = d; best = region.dataset.anno; }
      });
      notes.forEach(n => n.classList.toggle("is-active", n.dataset.annoKey === best));
      annos.forEach(a => a.classList.toggle("is-active", a.dataset.anno === best));
      annoRegions.forEach(r => r.classList.toggle("is-active", r.dataset.anno === best));
    }
    let raf = null;
    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(() => { raf = null; updateActive(); });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    updateActive();
  }
})();
