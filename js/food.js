/**
 * Страница еды: один день — одна плитка, переключение по дате.
 * Состояние: japan2026.foodDay.v1
 */
(function () {
  "use strict";

  const KEY = "japan2026.foodDay.v1";
  const $ = (sel, root = document) => root.querySelector(sel);

  if (typeof FOOD_PLAN === "undefined" || !FOOD_PLAN.days || !FOOD_PLAN.days.length) return;

  const days = FOOD_PLAN.days;

  function tokyoYmd(now = new Date()) {
    const fmt = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Tokyo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });
    const parts = fmt.formatToParts(now);
    const get = (t) => parts.find((p) => p.type === t).value;
    return { y: +get("year"), m: +get("month"), d: +get("day"), iso: `${get("year")}-${get("month")}-${get("day")}` };
  }

  function defaultDayN() {
    const { iso } = tokyoYmd();
    const hit = days.find((d) => d.iso === iso);
    if (hit) return hit.n;
    if (iso < days[0].iso) return days[0].n;
    return days[days.length - 1].n;
  }

  function loadDayN() {
    const q = new URLSearchParams(location.search).get("day");
    if (q) {
      const n = Number(q);
      if (days.some((d) => d.n === n)) return n;
    }
    const hash = (location.hash || "").replace(/^#day-?/, "");
    if (hash) {
      const n = Number(hash);
      if (days.some((d) => d.n === n)) return n;
    }
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const n = Number(raw);
        if (days.some((d) => d.n === n)) return n;
      }
    } catch (e) {}
    return defaultDayN();
  }

  let dayN = loadDayN();

  function saveDayN(n) {
    dayN = n;
    try { localStorage.setItem(KEY, String(n)); } catch (e) {}
    const url = new URL(location.href);
    url.searchParams.set("day", String(n));
    history.replaceState(null, "", url.pathname + url.search + "#day");
  }

  function current() {
    return days.find((d) => d.n === dayN) || days[0];
  }

  function renderChips() {
    const wrap = $("#foodChips");
    if (!wrap) return;
    const todayIso = tokyoYmd().iso;
    wrap.innerHTML = days.map((d) => {
      const isOn = d.n === dayN;
      const isToday = d.iso === todayIso;
      return `<button type="button" class="food-chip${isOn ? " is-active" : ""}${isToday ? " is-today" : ""}" data-n="${d.n}" role="tab" aria-selected="${isOn}">
        <span class="food-chip__d">${d.date.replace(" сен", "")}</span>
        <span class="food-chip__w">${d.weekday}</span>
      </button>`;
    }).join("");

    wrap.querySelectorAll(".food-chip").forEach((btn) => {
      btn.addEventListener("click", () => {
        saveDayN(Number(btn.dataset.n));
        paint();
        btn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      });
    });

    const active = wrap.querySelector(".food-chip.is-active");
    if (active) {
      requestAnimationFrame(() => {
        active.scrollIntoView({ behavior: "auto", inline: "center", block: "nearest" });
      });
    }
  }

  function renderTile() {
    const d = current();
    const tile = $("#foodTile");
    const nowDate = $("#foodNowDate");
    const nowTitle = $("#foodNowTitle");
    if (nowDate) nowDate.textContent = `${d.date} · ${d.weekday}`;
    if (nowTitle) nowTitle.textContent = `День ${d.n} · ${d.title}`;

    const todayIso = tokyoYmd().iso;
    const badge = d.iso === todayIso ? `<span class="food-tile__badge">Сегодня</span>` : "";

    const meals = (d.meals || []).map((m) => `
      <div class="food-tile__meal">
        <div class="food-tile__slot">${m.slot}${m.when ? ` · <span>${m.when}</span>` : ""}</div>
        <div class="food-tile__what">${m.what}</div>
      </div>
    `).join("");

    tile.innerHTML = `
      <header class="food-tile__head">
        <div class="food-tile__meta">
          <span class="food-tile__n">День ${d.n}</span>
          ${badge}
        </div>
        <div class="food-tile__when">${d.iso} · ${d.date} · ${d.weekday}</div>
        <h2 class="food-tile__title">${d.title}</h2>
      </header>
      <div class="food-tile__meals">${meals}</div>
      ${d.alt ? `<p class="food-tile__alt"><span>Запасной</span>${d.alt}</p>` : ""}
      ${d.skip ? `<p class="food-tile__skip"><span>Не сегодня</span>${d.skip}</p>` : ""}
    `;

    const prev = $("#foodPrev");
    const next = $("#foodNext");
    if (prev) prev.disabled = dayN <= days[0].n;
    if (next) next.disabled = dayN >= days[days.length - 1].n;
  }

  function paint() {
    renderChips();
    renderTile();
  }

  function setupNav() {
    $("#foodPrev")?.addEventListener("click", () => {
      if (dayN <= days[0].n) return;
      saveDayN(dayN - 1);
      paint();
    });
    $("#foodNext")?.addEventListener("click", () => {
      if (dayN >= days[days.length - 1].n) return;
      saveDayN(dayN + 1);
      paint();
    });

    // свайп по плитке
    const tile = $("#foodTile");
    if (tile) {
      let x0 = null;
      tile.addEventListener("touchstart", (e) => { x0 = e.changedTouches[0].clientX; }, { passive: true });
      tile.addEventListener("touchend", (e) => {
        if (x0 == null) return;
        const dx = e.changedTouches[0].clientX - x0;
        x0 = null;
        if (Math.abs(dx) < 50) return;
        if (dx < 0 && dayN < days[days.length - 1].n) { saveDayN(dayN + 1); paint(); }
        if (dx > 0 && dayN > days[0].n) { saveDayN(dayN - 1); paint(); }
      }, { passive: true });
    }
  }

  function setupRules() {
    const intro = $("#foodIntro");
    if (intro) intro.textContent = FOOD_PLAN.intro || "";
    const wrap = $("#foodRules");
    if (!wrap || !FOOD_PLAN.rules) return;
    wrap.innerHTML = FOOD_PLAN.rules.map((r) => `
      <div class="food-rule">
        <span class="food-rule__e">${r.e}</span>
        <div>
          <div class="food-rule__t">${r.t}</div>
          <div class="food-rule__d">${r.d}</div>
        </div>
      </div>
    `).join("");

    const sec = $("#rules");
    if (!sec) return;
    const btn = sec.querySelector(".fold__btn");
    const panel = sec.querySelector(".fold__panel");
    if (!btn || !panel) return;
    btn.addEventListener("click", () => {
      const open = !sec.classList.contains("is-open");
      sec.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      panel.hidden = !open;
    });
  }

  function init() {
    saveDayN(dayN);
    setupNav();
    setupRules();
    paint();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
