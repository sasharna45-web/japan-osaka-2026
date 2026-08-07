/**
 * USJ: справочник зон / аттракционов / ивентов (без маршрутов).
 * Состояние фильтра зоны: japan2026.usjZone.v1
 */
(function () {
  "use strict";

  const KEY = "japan2026.usjZone.v1";
  const $ = (sel, root = document) => root.querySelector(sel);

  if (typeof USJ_PLAN === "undefined" || !USJ_PLAN.zones) return;

  const zones = USJ_PLAN.zones;
  const KIND = {
    ride: "Райд",
    show: "Шоу / 4D",
    interactive: "Интерактив",
    food: "Еда",
    shop: "Магазин",
    area: "Зона / прогулка"
  };

  function loadZone() {
    const params = new URLSearchParams(location.search);
    const q = params.get("zone") || params.get("z");
    if (q === "all" || q === "events") return q;
    if (q && zones.some((z) => z.key === q)) return q;
    try {
      const raw = localStorage.getItem(KEY);
      if (raw === "all" || raw === "events") return raw;
      if (raw && zones.some((z) => z.key === raw)) return raw;
    } catch (e) {}
    return "all";
  }

  let active = loadZone();

  function saveZone(key) {
    active = key;
    try { localStorage.setItem(KEY, key); } catch (e) {}
    const url = new URL(location.href);
    url.searchParams.set("zone", key);
    if (zones.some((z) => z.key === url.searchParams.get("v")) || url.searchParams.get("plan")) {
      url.searchParams.delete("plan");
    }
    history.replaceState(null, "", url.pathname + url.search + "#park");
  }

  function thrillDots(n) {
    const v = Math.max(0, Math.min(5, Number(n) || 0));
    return "●".repeat(v) + "○".repeat(5 - v);
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
      { key: "all", title: "Все зоны" },
      { key: "events", title: "Ивенты" },
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

  function attrCard(a) {
    const badges = [];
    if (a.yourExpress) badges.push('<span class="usj-badge usj-badge--express">ваш Express</span>');
    if (a.seasonal) badges.push('<span class="usj-badge usj-badge--season">сезон</span>');
    return `
      <article class="usj-attr">
        <div class="usj-attr__top">
          <span class="usj-attr__kind">${KIND[a.kind] || a.kind}</span>
          ${a.kind === "ride" || a.thrill ? `<span class="usj-attr__thrill" title="Жёсткость">${thrillDots(a.thrill)}</span>` : ""}
        </div>
        <h3 class="usj-attr__name">${a.name}</h3>
        <div class="usj-attr__badges">${badges.join("")}</div>
        <p class="usj-attr__tip">${a.tip || ""}</p>
      </article>
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

  function renderEventsPanel() {
    const ev = USJ_PLAN.events;
    if (!ev) return "";
    return `
      <section class="usj-events-panel">
        <h2 class="usj-zone__name">${ev.title}</h2>
        <p class="usj-zone__blurb">${ev.lead}</p>
        <div class="usj-guide-cards">
          ${(ev.items || []).map((e) => `
            <article class="usj-guide-card">
              <div class="usj-guide-card__when">${e.when} · ${e.kind}</div>
              <h3 class="usj-guide-card__name">${e.name}</h3>
              <p class="usj-guide-card__what">${e.tip}</p>
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }

  function renderPark() {
    const tile = $("#usjTile");
    const label = $("#usjNowLabel");
    const title = $("#usjNowTitle");
    if (!tile) return;

    if (active === "events") {
      if (label) label.textContent = "15 сен 2026";
      if (title) title.textContent = "Ивенты и сезон";
      tile.innerHTML = renderEventsPanel();
      return;
    }

    if (active === "all") {
      if (label) label.textContent = zones.length + " зон";
      if (title) title.textContent = "Весь парк";
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
      <div class="usj-guide-cards">
        ${(g.spots || []).map((s) => `
          <article class="usj-guide-card">
            <div class="usj-guide-card__when">${s.when}</div>
            <h3 class="usj-guide-card__name">${s.name}</h3>
            <p class="usj-guide-card__what">${s.what}${s.tip ? " · " + s.tip : ""}</p>
          </article>
        `).join("")}
      </div>
    `;
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
    const keys = ["all", "events", ...zones.map((z) => z.key)];
    const idx = () => Math.max(0, keys.indexOf(active));

    $("#usjPrev")?.addEventListener("click", () => {
      const i = idx();
      if (i <= 0) return;
      saveZone(keys[i - 1]);
      paint();
    });
    $("#usjNext")?.addEventListener("click", () => {
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
        const i = idx();
        if (dx < 0 && i < keys.length - 1) { saveZone(keys[i + 1]); paint(); }
        if (dx > 0 && i > 0) { saveZone(keys[i - 1]); paint(); }
      }, { passive: true });
    }
  }

  function updateArrows() {
    const keys = ["all", "events", ...zones.map((z) => z.key)];
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
