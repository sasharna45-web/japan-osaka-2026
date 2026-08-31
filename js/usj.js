/**
 * USJ: маршрут (без Flying Dinosaur) + справочник зон / ивентов.
 * Состояние: japan2026.usjZone.v2
 */
(function () {
  "use strict";

  const KEY = "japan2026.usjZone.v2";
  const $ = (sel, root = document) => root.querySelector(sel);

  if (typeof USJ_PLAN === "undefined" || !USJ_PLAN.zones) {
    const fail = () => {
      const title = document.getElementById("usjNowTitle");
      const tile = document.getElementById("usjTile");
      if (title) title.textContent = "Данные не загрузились";
      if (tile) {
        tile.innerHTML = `<p class="usj-note">Справочник USJ не загрузился. Откройте <a href="update.html">update.html</a> или обновите страницу.</p>`;
      }
    };
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fail);
    else fail();
    return;
  }

  const zones = USJ_PLAN.zones;
  const SPECIAL = ["route", "halloween", "all", "events"];
  const KIND = {
    ride: "Райд",
    show: "Шоу / 4D",
    interactive: "Интерактив",
    food: "Еда",
    shop: "Магазин",
    area: "Зона / прогулка"
  };

  function isValid(key) {
    return SPECIAL.includes(key) || zones.some((z) => z.key === key);
  }

  function loadZone() {
    const params = new URLSearchParams(location.search);
    const hash = (location.hash || "").replace(/^#/, "");
    // Старые закладки #park → все зоны
    if (hash === "park" && !params.get("zone") && !params.get("z")) return "all";
    if (hash === "halloween" || hash === "hhn") return "halloween";
    if (hash === "events" && !params.get("zone") && !params.get("z")) return "events";
    const q = params.get("zone") || params.get("z");
    if (q && isValid(q)) return q;
    try {
      const raw = localStorage.getItem(KEY);
      if (raw && isValid(raw)) return raw;
    } catch (e) {}
    return USJ_PLAN.route ? "route" : "all";
  }

  let active = loadZone();

  function saveZone(key) {
    active = key;
    try { localStorage.setItem(KEY, key); } catch (e) {}
    const url = new URL(location.href);
    url.searchParams.set("zone", key);
    url.searchParams.delete("plan");
    const hash = key === "halloween" ? "halloween" : key === "events" ? "events" : key === "all" ? "zones" : key === "route" ? "route" : "route";
    history.replaceState(null, "", url.pathname + url.search + "#" + hash);
  }

  function thrillDots(n) {
    const v = Math.max(0, Math.min(5, Number(n) || 0));
    return "●".repeat(v) + "○".repeat(5 - v);
  }

  function tabKeys() {
    return ["route", "halloween", "all", "events", ...zones.map((z) => z.key)].filter((k) => k !== "route" || USJ_PLAN.route);
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
    const chips = [
      ...(USJ_PLAN.route ? [{ key: "route", title: "📍 Маршрут дня" }] : []),
      { key: "halloween", title: "🧟 Halloween 2026" },
      { key: "all", title: "🏰 Все зоны" },
      { key: "events", title: "🍁 Ивенты осени" },
      ...zones.map((z) => ({ key: z.key, title: z.emoji + " " + z.name.replace(/^The |^SUPER /, "").slice(0, 22) }))
    ];
    wrap.innerHTML = chips.map((c) => `
      <button type="button" class="usj-chip${c.key === active ? " is-active" : ""}" data-key="${c.key}" role="tab" aria-selected="${c.key === active}">
        <span class="usj-chip__t">${c.title}</span>
      </button>
    `).join("");

    wrap.querySelectorAll(".usj-chip").forEach((btn) => {
      btn.addEventListener("click", () => {
        saveZone(btn.dataset.key);
        paint();
        btn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      });
    });

    const on = wrap.querySelector(".usj-chip.is-active");
    if (on) {
      requestAnimationFrame(() => {
        on.scrollIntoView({ behavior: "auto", inline: "center", block: "nearest" });
      });
    }
  }

  function previewText(text, max = 90) {
    const t = String(text || "").trim();
    if (t.length <= max) return t;
    return t.slice(0, max - 1).trim() + "…";
  }

  function moreList(more, tip) {
    const items = (more && more.length) ? more : (tip ? [tip] : []);
    if (!items.length) return "";
    return `<ul class="usj-tap__more">${items.map((x) => `<li>${x}</li>`).join("")}</ul>`;
  }

  function attrCard(a) {
    const badges = [];
    if (a.yourExpress) badges.push('<span class="usj-badge usj-badge--express">ваш Express</span>');
    if (a.seasonal) badges.push('<span class="usj-badge usj-badge--season">сезон</span>');
    const preview = previewText(a.tip || (a.more && a.more[0]) || "");
    return `
      <button type="button" class="usj-tap usj-attr" aria-expanded="false">
        <div class="usj-tap__bar">
          <div class="usj-tap__main">
            <div class="usj-attr__top">
              <span class="usj-attr__kind">${KIND[a.kind] || a.kind}</span>
              ${a.kind === "ride" || a.thrill != null ? `<span class="usj-attr__thrill" title="Жёсткость">${thrillDots(a.thrill)}</span>` : ""}
            </div>
            <h3 class="usj-attr__name">${a.name}</h3>
            <div class="usj-attr__badges">${badges.join("")}</div>
            <p class="usj-tap__preview">${preview}</p>
          </div>
          <span class="usj-tap__chev" aria-hidden="true">▾</span>
        </div>
        <div class="usj-tap__panel" hidden>
          ${a.tip && a.more ? `<p class="usj-tap__lead">${a.tip}</p>` : ""}
          ${moreList(a.more, a.tip)}
        </div>
      </button>
    `;
  }

  function zoneBlock(z) {
    return `
      <section class="usj-zone" id="zone-${z.key}">
        <header class="usj-zone__head">
          <div class="usj-zone__emoji">${z.emoji}</div>
          <div>
            <h2 class="usj-zone__name">${z.name}</h2>
            <p class="usj-zone__blurb">${z.blurb}</p>
          </div>
        </header>
        <div class="usj-attrs">
          ${(z.attractions || []).map(attrCard).join("")}
        </div>
      </section>
    `;
  }

  function renderHalloweenPanel() {
    const h = USJ_PLAN.halloween;
    if (!h) return "";
    return `
      <header class="usj-tile__head">
        <p class="usj-tile__score">${h.badge || "Halloween 2026"}</p>
        <h2 class="usj-tile__title">${h.title}</h2>
        <p class="usj-tile__best">${h.lead}</p>
      </header>
      <div class="usj-hhn-grid">
        ${(h.items || []).map((item) => `
          <div class="usj-hhn-card${item.highlight ? " usj-hhn-card--highlight" : ""}${item.isWarning ? " usj-hhn-card--warn" : ""}">
            <div class="usj-hhn-card__head">
              <span class="usj-hhn-card__emoji">${item.emoji}</span>
              <div>
                <h3 class="usj-hhn-card__name">${item.name}</h3>
                <span class="usj-hhn-card__time">${item.time} · <b>${item.status}</b></span>
              </div>
            </div>
            <p class="usj-hhn-card__desc">${item.desc}</p>
            ${item.advice ? `<div class="usj-hhn-card__advice">💡 <b>Совет:</b> ${item.advice}</div>` : ""}
          </div>
        `).join("")}
      </div>
    `;
  }

  function renderEventsPanel() {
    const ev = USJ_PLAN.events;
    if (!ev) return "";
    return `
      <section class="usj-events-panel">
        <h2 class="usj-zone__name">${ev.title}</h2>
        <p class="usj-zone__blurb">${ev.lead}</p>
        <div class="usj-guide-cards">
          ${(ev.items || []).map((e) => `
            <button type="button" class="usj-tap usj-guide-card" aria-expanded="false">
              <div class="usj-tap__bar">
                <div class="usj-tap__main">
                  <div class="usj-guide-card__when">${e.when} · ${e.kind}</div>
                  <h3 class="usj-guide-card__name">${e.name}</h3>
                  <p class="usj-tap__preview">${previewText(e.tip)}</p>
                </div>
                <span class="usj-tap__chev" aria-hidden="true">▾</span>
              </div>
              <div class="usj-tap__panel" hidden>
                ${e.tip ? `<p class="usj-tap__lead">${e.tip}</p>` : ""}
                ${moreList(e.more, e.tip)}
              </div>
            </button>
          `).join("")}
        </div>
      </section>
    `;
  }

  function renderRoutePanel() {
    const r = USJ_PLAN.route;
    if (!r) return "";
    return `
      <header class="usj-tile__head">
        <p class="usj-tile__score">${r.vibe}</p>
        <h2 class="usj-tile__title">${r.title}</h2>
        <p class="usj-tile__best">${r.bestFor}</p>
        ${r.note ? `<p class="usj-tile__focus">${r.note}</p>` : ""}
      </header>

      ${r.blueprint ? `
        <div class="usj-blueprint">
          <div class="usj-blueprint__title">🗺️ Итоговая схема дня</div>
          <div class="usj-blueprint__list">
            ${r.blueprint.map((b) => `
              <div class="usj-blueprint__item">
                <div class="usj-blueprint__icon">${b.icon}</div>
                <div class="usj-blueprint__body">
                  <div class="usj-blueprint__meta"><b>${b.phase}</b> <span class="usj-blueprint__time">${b.time}</span></div>
                  <div class="usj-blueprint__text">${b.text}</div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      ` : ""}

      ${(r.skip || []).length ? `
        <div class="usj-skip">
          <div class="usj-skip__title">🚫 Что смело пропускаем (не тратим силы)</div>
          <ul class="usj-skip__list">
            ${r.skip.map((s) => `
              <li><b>${s.name}</b> — ${s.reason}</li>
            `).join("")}
          </ul>
        </div>
      ` : ""}

      <div class="usj-phases-head">
        <h3 class="usj-phases-title">📋 Пошаговый план по фазам дня</h3>
        <p class="usj-tap-hint">Нажмите на любой блок — откроются подробности и советы.</p>
      </div>

      <div class="usj-phases">
        ${(r.phases || []).map((phase, idx) => `
          <button type="button" class="usj-tap usj-phase-card${idx === 0 || idx === 1 ? " is-open" : ""}" aria-expanded="${idx === 0 || idx === 1 ? "true" : "false"}">
            <div class="usj-tap__bar">
              <span class="usj-phase-card__emoji">${phase.emoji}</span>
              <div class="usj-tap__main">
                <div class="usj-phase-card__time">${phase.time}</div>
                <h4 class="usj-phase-card__title">${phase.title}</h4>
                <div class="usj-phase-card__badges">
                  ${(phase.badges || []).map((b) => `<span class="usj-badge ${b.includes('Express') ? 'usj-badge--express' : b.includes('HHN') ? 'usj-badge--season' : ''}">${b}</span>`).join("")}
                </div>
                <p class="usj-tap__preview">${previewText(phase.lead, 80)}</p>
              </div>
              <span class="usj-tap__chev" aria-hidden="true">▾</span>
            </div>
            <div class="usj-tap__panel"${idx === 0 || idx === 1 ? "" : " hidden"}>
              <p class="usj-phase-card__lead">${phase.lead}</p>
              <ul class="usj-phase-card__steps">
                ${(phase.steps || []).map((s) => `<li>${s}</li>`).join("")}
              </ul>
              ${phase.tip ? `<div class="usj-phase-card__tip">💡 <b>Лайфхак:</b> ${phase.tip}</div>` : ""}
            </div>
          </button>
        `).join("")}
      </div>
    `;
  }

  function renderPark() {
    const tile = $("#usjTile");
    const label = $("#usjNowLabel");
    const title = $("#usjNowTitle");
    if (!tile) return;

    if (active === "route") {
      if (label) label.textContent = "Ваш день";
      if (title) title.textContent = "Маршрут и тайминги";
      tile.innerHTML = renderRoutePanel();
      return;
    }

    if (active === "halloween" || active === "hhn") {
      if (label) label.textContent = "15 сен · с 18:00";
      if (title) title.textContent = "Halloween Horror Nights";
      tile.innerHTML = renderHalloweenPanel();
      return;
    }

    if (active === "events") {
      if (label) label.textContent = "15 сен 2026";
      if (title) title.textContent = "Все ивенты осени";
      tile.innerHTML = renderEventsPanel();
      return;
    }

    if (active === "all") {
      if (label) label.textContent = zones.length + " зон";
      if (title) title.textContent = "Справочник всех зон";
      tile.innerHTML = zones.map(zoneBlock).join("");
      return;
    }

    const z = zones.find((x) => x.key === active) || zones[0];
    if (label) label.textContent = z.emoji + " зона";
    if (title) title.textContent = z.name;
    tile.innerHTML = zoneBlock(z);
  }

  function renderPass() {
    const wrap = $("#usjPass");
    if (!wrap || !USJ_PLAN.pass) return;
    const pass = USJ_PLAN.pass;
    wrap.innerHTML = `
      <p class="usj-head__pass">${pass.name}</p>
      <p class="usj-head__studio">${pass.studio}</p>
      <p class="usj-head__date">${USJ_PLAN.date}</p>
      <div class="usj-slots">
        ${(pass.slots || []).map((s) => `
          <div class="usj-slot">
            <div class="usj-slot__time">${s.time}</div>
            <div class="usj-slot__label">${s.label}</div>
            <div class="usj-slot__note">${s.note}</div>
          </div>
        `).join("")}
      </div>
      <div class="usj-express">
        <div class="usj-express__title">В вашем Express Pass 4</div>
        <ul>${(pass.express || []).map((x) => `<li><b>${x.name}</b> — ${x.tip}</li>`).join("")}</ul>
      </div>
      ${pass.note ? `<p class="usj-guide__lead">${pass.note}</p>` : ""}
      ${(USJ_PLAN.gone || []).length ? `
        <div class="usj-not usj-not--gone">
          <div class="usj-express__title">Закрыто навсегда — не ищите</div>
          <ul>${USJ_PLAN.gone.map((g) => `<li><b>${g.name}</b> — ${g.note}</li>`).join("")}</ul>
        </div>
      ` : ""}
    `;
  }

  function renderFoodGuide() {
    const wrap = $("#usjFoodGuide");
    if (!wrap || !USJ_PLAN.foodGuide) return;
    const g = USJ_PLAN.foodGuide;
    wrap.innerHTML = `
      <p class="usj-guide__lead">${g.lead}</p>
      <p class="usj-tap-hint">Нажмите плашку — подробности.</p>
      <div class="usj-guide-cards">
        ${(g.spots || []).map((s) => `
          <button type="button" class="usj-tap usj-guide-card" aria-expanded="false">
            <div class="usj-tap__bar">
              <div class="usj-tap__main">
                <div class="usj-guide-card__when">${s.when}</div>
                <h3 class="usj-guide-card__name">${s.name}</h3>
                <p class="usj-tap__preview">${previewText(s.what)}</p>
              </div>
              <span class="usj-tap__chev" aria-hidden="true">▾</span>
            </div>
            <div class="usj-tap__panel" hidden>
              <p class="usj-tap__lead">${s.what}</p>
              ${s.tip ? `<ul class="usj-tap__more"><li>${s.tip}</li></ul>` : ""}
            </div>
          </button>
        `).join("")}
      </div>
    `;
    bindTapCards(wrap);
  }

  function bindTapCards(root) {
    const scope = root || document;
    scope.querySelectorAll(".usj-tap").forEach((btn) => {
      if (btn.dataset.tapReady) return;
      btn.dataset.tapReady = "1";
      btn.addEventListener("click", () => {
        const open = btn.getAttribute("aria-expanded") === "true";
        const next = !open;
        btn.setAttribute("aria-expanded", next ? "true" : "false");
        btn.classList.toggle("is-open", next);
        const panel = btn.querySelector(".usj-tap__panel");
        if (panel) panel.hidden = !next;
      });
    });
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
    const idx = () => Math.max(0, tabKeys().indexOf(active));

    $("#usjPrev")?.addEventListener("click", () => {
      const keys = tabKeys();
      const i = idx();
      if (i <= 0) return;
      saveZone(keys[i - 1]);
      paint();
    });
    $("#usjNext")?.addEventListener("click", () => {
      const keys = tabKeys();
      const i = idx();
      if (i >= keys.length - 1) return;
      saveZone(keys[i + 1]);
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
        const keys = tabKeys();
        const i = idx();
        if (dx < 0 && i < keys.length - 1) { saveZone(keys[i + 1]); paint(); }
        if (dx > 0 && i > 0) { saveZone(keys[i - 1]); paint(); }
      }, { passive: true });
    }
  }

  function updateArrows() {
    const keys = tabKeys();
    const i = Math.max(0, keys.indexOf(active));
    const prev = $("#usjPrev");
    const next = $("#usjNext");
    if (prev) prev.disabled = i <= 0;
    if (next) next.disabled = i >= keys.length - 1;
  }

  function paint() {
    renderChips();
    renderPark();
    updateArrows();
    bindTapCards($("#usjTile"));
  }

  function init() {
    saveZone(active);
    setupFolds();
    setupNav();
    renderIdea();
    renderPass();
    renderFoodGuide();
    paint();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
