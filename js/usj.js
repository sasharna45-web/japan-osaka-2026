/**
 * Страница USJ: сценарии + справочники еды/шоу/приоритетов.
 * Состояние: japan2026.usjVariant.v1
 */
(function () {
  "use strict";

  const KEY = "japan2026.usjVariant.v1";
  const $ = (sel, root = document) => root.querySelector(sel);

  if (typeof USJ_PLAN === "undefined" || !USJ_PLAN.variants || !USJ_PLAN.variants.length) return;

  const variants = USJ_PLAN.variants;

  function loadKey() {
    const params = new URLSearchParams(location.search);
    // plan=max|shows|chill — основной ключ. Старый ?v=max|chill тоже читаем,
    // но числовой ?v=50 (cache-bust) игнорируем.
    for (const name of ["plan", "v"]) {
      const q = params.get(name);
      if (q && variants.some((x) => x.key === q)) return q;
    }
    try {
      const raw = localStorage.getItem(KEY);
      if (raw && variants.some((x) => x.key === raw)) return raw;
    } catch (e) {}
    // Старые ключи (default/nintendo) → новый макс-план
    const max = variants.find((x) => x.key === "max");
    return max ? max.key : variants[0].key;
  }

  let activeKey = loadKey();

  function saveKey(key) {
    activeKey = key;
    try { localStorage.setItem(KEY, key); } catch (e) {}
    const url = new URL(location.href);
    url.searchParams.set("plan", key);
    if (variants.some((x) => x.key === url.searchParams.get("v"))) {
      url.searchParams.delete("v");
    }
    history.replaceState(null, "", url.pathname + url.search + "#plan");
  }

  function current() {
    return variants.find((x) => x.key === activeKey) || variants[0];
  }

  function idx() {
    return Math.max(0, variants.findIndex((x) => x.key === activeKey));
  }

  function renderIdea() {
    const wrap = $("#usjIdea");
    if (!wrap || !USJ_PLAN.idea) return;
    const idea = USJ_PLAN.idea;
    wrap.innerHTML = `
      <h2 class="usj-idea__title">${idea.title}</h2>
      <p class="usj-idea__lead">${idea.lead}</p>
      <ul class="usj-idea__points">
        ${(idea.points || []).map((p) => `<li>${p}</li>`).join("")}
      </ul>
    `;
  }

  function renderChips() {
    const wrap = $("#usjChips");
    if (!wrap) return;
    wrap.innerHTML = variants.map((v) => `
      <button type="button" class="usj-chip${v.key === activeKey ? " is-active" : ""}" data-key="${v.key}" role="tab" aria-selected="${v.key === activeKey}">
        <span class="usj-chip__t">${v.title}</span>
      </button>
    `).join("");

    wrap.querySelectorAll(".usj-chip").forEach((btn) => {
      btn.addEventListener("click", () => {
        saveKey(btn.dataset.key);
        paint();
        btn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      });
    });

    const active = wrap.querySelector(".usj-chip.is-active");
    if (active) {
      requestAnimationFrame(() => {
        active.scrollIntoView({ behavior: "auto", inline: "center", block: "nearest" });
      });
    }
  }

  function blockList(title, items, mapFn) {
    if (!items || !items.length) return "";
    return `
      <div class="usj-block">
        <div class="usj-block__title">${title}</div>
        <ul class="usj-block__list">
          ${items.map(mapFn).join("")}
        </ul>
      </div>
    `;
  }

  function renderTile() {
    const v = current();
    const label = $("#usjNowLabel");
    const title = $("#usjNowTitle");
    if (label) label.textContent = v.vibe;
    if (title) title.textContent = v.title;

    const tile = $("#usjTile");
    tile.innerHTML = `
      <header class="usj-tile__head">
        <p class="usj-tile__score">${v.score}</p>
        <h2 class="usj-tile__title">${v.title}</h2>
        <p class="usj-tile__best">${v.bestFor}</p>
        ${v.focus ? `<p class="usj-tile__focus">${v.focus}</p>` : ""}
      </header>
      <ol class="usj-timeline">
        ${v.timeline.map((step) => `
          <li class="usj-step">
            <div class="usj-step__t">${step.t}</div>
            <div class="usj-step__body">
              <div class="usj-step__what">${step.what}</div>
              <div class="usj-step__detail">${step.detail}</div>
            </div>
          </li>
        `).join("")}
      </ol>
      ${blockList("Еда в этом сценарии", v.food, (f) => `
        <li><b>${f.when}</b> — ${f.what}${f.tip ? `<span class="usj-block__tip">${f.tip}</span>` : ""}</li>
      `)}
      ${blockList("Шоу / атмосфера", v.shows, (s) => `
        <li><b>${s.when}</b> — ${s.what}${s.tip ? `<span class="usj-block__tip">${s.tip}</span>` : ""}</li>
      `)}
      ${v.skip && v.skip.length ? `
        <div class="usj-skip">
          <div class="usj-skip__title">Не сегодня</div>
          <ul>${v.skip.map((s) => `<li>${s}</li>`).join("")}</ul>
        </div>
      ` : ""}
    `;

    const i = idx();
    const prev = $("#usjPrev");
    const next = $("#usjNext");
    if (prev) prev.disabled = i <= 0;
    if (next) next.disabled = i >= variants.length - 1;
  }

  function renderPass() {
    const wrap = $("#usjPass");
    if (!wrap) return;
    const pass = USJ_PLAN.pass;
    wrap.innerHTML = `
      <p class="usj-head__pass">${pass.name}</p>
      <p class="usj-head__studio">${pass.studio}</p>
      <p class="usj-head__date">${USJ_PLAN.date}</p>
      <div class="usj-slots">
        ${pass.slots.map((s) => `
          <div class="usj-slot">
            <div class="usj-slot__time">${s.time}</div>
            <div class="usj-slot__label">${s.label}</div>
            <div class="usj-slot__note">${s.note}</div>
          </div>
        `).join("")}
      </div>
      <div class="usj-express">
        <div class="usj-express__title">В Express Pass 4</div>
        <ul>${pass.express.map((x) => `<li><b>${x.name}</b> — ${x.tip}</li>`).join("")}</ul>
      </div>
      <div class="usj-not">
        <div class="usj-express__title">Не в этом Express</div>
        <ul>${pass.notIncluded.map((x) => `<li>${x}</li>`).join("")}</ul>
      </div>
      ${pass.gone && pass.gone.length ? `
      <div class="usj-not usj-not--gone">
        <div class="usj-express__title">Закрыто навсегда — не ищите</div>
        <ul>${pass.gone.map((x) => `<li>${x}</li>`).join("")}</ul>
      </div>` : ""}
    `;
  }

  function renderTiers() {
    const wrap = $("#usjTiers");
    if (!wrap || !USJ_PLAN.tiers) return;
    const t = USJ_PLAN.tiers;
    const section = (label, items, cls) => `
      <div class="usj-tier ${cls || ""}">
        <div class="usj-tier__label">${label}</div>
        <ul>${(items || []).map((x) => `
          <li><b>${x.name}</b><span>${x.why}</span></li>
        `).join("")}</ul>
      </div>
    `;
    wrap.innerHTML = `
      <p class="usj-guide__lead">${t.title}: must закрываем почти всегда; optional — по силам и очередям.</p>
      ${section("Must · билет и пик", t.must, "usj-tier--must")}
      ${section("Сильные standby", t.strong)}
      ${section("Опции", t.optional)}
      <div class="usj-tier usj-tier--skip">
        <div class="usj-tier__label">Спокойно пропускаем</div>
        <ul>${(t.skipOk || []).map((x) => `<li>${x}</li>`).join("")}</ul>
      </div>
    `;
  }

  function renderFoodGuide() {
    const wrap = $("#usjFoodGuide");
    if (!wrap || !USJ_PLAN.foodGuide) return;
    const g = USJ_PLAN.foodGuide;
    wrap.innerHTML = `
      <p class="usj-guide__lead">${g.lead}</p>
      <div class="usj-guide-cards">
        ${(g.spots || []).map((s) => `
          <article class="usj-guide-card">
            <div class="usj-guide-card__when">${s.when}</div>
            <h3 class="usj-guide-card__name">${s.name}</h3>
            <p class="usj-guide-card__what">${s.what}</p>
            ${s.tip ? `<p class="usj-guide-card__tip">${s.tip}</p>` : ""}
          </article>
        `).join("")}
      </div>
    `;
  }

  function renderShowsGuide() {
    const wrap = $("#usjShowsGuide");
    if (!wrap || !USJ_PLAN.showsGuide) return;
    const g = USJ_PLAN.showsGuide;
    wrap.innerHTML = `
      <p class="usj-guide__lead">${g.lead}</p>
      <div class="usj-guide-cards">
        ${(g.items || []).map((s) => `
          <article class="usj-guide-card">
            <div class="usj-guide-card__when">${s.kind}</div>
            <h3 class="usj-guide-card__name">${s.name}</h3>
            <p class="usj-guide-card__what">${s.tip}</p>
          </article>
        `).join("")}
      </div>
      ${USJ_PLAN.shopGuide ? `
        <div class="usj-shop">
          <div class="usj-express__title">${USJ_PLAN.shopGuide.title}</div>
          <p class="usj-guide__lead">${USJ_PLAN.shopGuide.lead}</p>
          <ul>${USJ_PLAN.shopGuide.tips.map((t) => `<li>${t}</li>`).join("")}</ul>
        </div>
      ` : ""}
    `;
  }

  function renderRules() {
    const wrap = $("#usjRules");
    if (!wrap || !USJ_PLAN.rules) return;
    wrap.innerHTML = USJ_PLAN.rules.map((r) => `
      <div class="food-rule">
        <span class="food-rule__e">${r.e}</span>
        <div>
          <div class="food-rule__t">${r.t}</div>
          <div class="food-rule__d">${r.d}</div>
        </div>
      </div>
    `).join("");
  }

  function setupFolds() {
    document.querySelectorAll(".fold").forEach((sec) => {
      const btn = sec.querySelector(".fold__btn");
      const panel = sec.querySelector(".fold__panel");
      if (!btn || !panel || btn.dataset.ready) return;
      btn.dataset.ready = "1";
      const defOpen = sec.dataset.fold === "open";
      sec.classList.toggle("is-open", defOpen);
      btn.setAttribute("aria-expanded", defOpen ? "true" : "false");
      panel.hidden = !defOpen;
      btn.addEventListener("click", () => {
        const open = !sec.classList.contains("is-open");
        sec.classList.toggle("is-open", open);
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        panel.hidden = !open;
      });
    });
  }

  function setupNav() {
    $("#usjPrev")?.addEventListener("click", () => {
      const i = idx();
      if (i <= 0) return;
      saveKey(variants[i - 1].key);
      paint();
    });
    $("#usjNext")?.addEventListener("click", () => {
      const i = idx();
      if (i >= variants.length - 1) return;
      saveKey(variants[i + 1].key);
      paint();
    });

    const tile = $("#usjTile");
    if (tile) {
      let x0 = null;
      tile.addEventListener("touchstart", (e) => { x0 = e.changedTouches[0].clientX; }, { passive: true });
      tile.addEventListener("touchend", (e) => {
        if (x0 == null) return;
        const dx = e.changedTouches[0].clientX - x0;
        x0 = null;
        if (Math.abs(dx) < 50) return;
        const i = idx();
        if (dx < 0 && i < variants.length - 1) { saveKey(variants[i + 1].key); paint(); }
        if (dx > 0 && i > 0) { saveKey(variants[i - 1].key); paint(); }
      }, { passive: true });
    }
  }

  function paint() {
    renderChips();
    renderTile();
  }

  function init() {
    saveKey(activeKey);
    setupFolds();
    setupNav();
    renderIdea();
    renderPass();
    renderTiers();
    renderFoodGuide();
    renderShowsGuide();
    renderRules();
    paint();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
