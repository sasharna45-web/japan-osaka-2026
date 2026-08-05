/**
 * Трекер дней и бюджета Кансай 2026.
 * Состояние в localStorage: japan2026-tracker-v1
 * UI как у гида: folds + sticky budget в hero.
 */

(function () {
  "use strict";

  const KEY = "japan2026-tracker-v1";
  const yen = (n) => Math.round(n).toLocaleString("ru-RU") + " ¥";

  const state = load();

  function defaultState() {
    return {
      done: {},
      expenses: [],
      softDaily: TRACKER.softDailyYen,
      viewDay: null,
      /** Факт первого обмена в KIX. null = ещё план. */
      exchange: null // { usdChanged, yenGot, usdLeft, at }
    };
  }

  function hasExchange() {
    return !!(state.exchange && state.exchange.yenGot > 0);
  }

  /** Рабочий конверт йен: факт с чека или план. */
  function envelopeYen() {
    if (hasExchange()) return Number(state.exchange.yenGot) || 0;
    return TRACKER.budgetYen;
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return defaultState();
      return Object.assign(defaultState(), JSON.parse(raw));
    } catch {
      return defaultState();
    }
  }

  function save() {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function todayIso() {
    const d = new Date();
    return [
      d.getFullYear(),
      String(d.getMonth() + 1).padStart(2, "0"),
      String(d.getDate()).padStart(2, "0")
    ].join("-");
  }

  function activeDay() {
    const iso = todayIso();
    const hit = TRACKER.days.find((d) => d.iso === iso);
    if (hit) return hit;
    if (iso < TRACKER.dateFrom) return TRACKER.days[0];
    return TRACKER.days[TRACKER.days.length - 1];
  }

  function spentTotal() {
    return state.expenses.reduce((s, e) => s + (Number(e.amount) || 0), 0);
  }

  function spentByDay(n) {
    return state.expenses
      .filter((e) => e.day === n)
      .reduce((s, e) => s + (Number(e.amount) || 0), 0);
  }

  function spentByCat() {
    const map = {};
    TRACKER.categories.forEach((c) => (map[c.id] = 0));
    state.expenses.forEach((e) => {
      map[e.cat] = (map[e.cat] || 0) + (Number(e.amount) || 0);
    });
    return map;
  }

  function daysElapsedOrToday() {
    const iso = todayIso();
    if (iso < TRACKER.dateFrom) return 0;
    if (iso > TRACKER.dateTo) return TRACKER.spendDays;
    const idx = TRACKER.days.findIndex((d) => d.iso === iso);
    return idx >= 0 ? idx + 1 : TRACKER.spendDays;
  }

  function paceStatus() {
    const spent = spentTotal();
    const envelope = envelopeYen();
    const left = envelope - spent;
    const elapsed = Math.max(1, daysElapsedOrToday());
    let daysLeft = TRACKER.spendDays;
    if (todayIso() >= TRACKER.dateFrom && todayIso() <= TRACKER.dateTo) {
      const idx = TRACKER.days.findIndex((d) => d.iso === todayIso());
      daysLeft = TRACKER.spendDays - idx;
    } else if (todayIso() > TRACKER.dateTo) {
      daysLeft = 0;
    }
    const avgLeft = daysLeft > 0 ? left / daysLeft : left;
    const softUsed = state.softDaily * elapsed;
    const vsSoft = spent - softUsed;
    return { spent, left, daysLeft, avgLeft, vsSoft, elapsed, envelope };
  }

  function openFold(id) {
    const fold = document.getElementById(id);
    if (!fold) return;
    const btn = fold.querySelector(".fold__btn");
    const panel = fold.querySelector(".fold__panel");
    fold.setAttribute("data-fold", "open");
    if (btn) btn.setAttribute("aria-expanded", "true");
    if (panel) panel.hidden = false;
  }

  function renderBudget() {
    const { spent, left, daysLeft, avgLeft, vsSoft, envelope } = paceStatus();
    const pct = envelope > 0 ? Math.min(100, (spent / envelope) * 100) : 0;
    const fill = document.getElementById("budgetFill");
    const nums = document.getElementById("budgetNums");
    const pace = document.getElementById("budgetPace");
    const bar = document.getElementById("budgetBar");
    const heroMeta = document.getElementById("heroExchangeMeta");
    const foldSub = document.getElementById("exchangeFoldSub");

    fill.style.width = pct + "%";
    fill.classList.toggle("is-warn", pct >= 70 && pct < 90);
    fill.classList.toggle("is-danger", pct >= 90);
    bar.setAttribute("aria-valuenow", String(Math.round(pct)));

    const modeLabel = hasExchange() ? "факт с чека" : "план (ещё не вводили)";
    nums.innerHTML = `
      <div><span class="muted">Потрачено ¥</span><strong>${yen(spent)}</strong></div>
      <div><span class="muted">Осталось ¥</span><strong class="${left < 0 ? "t-bad" : ""}">${yen(left)}</strong></div>
      <div><span class="muted">Конверт ¥</span><strong>${yen(envelope)}</strong></div>
    `;

    const softLabel =
      vsSoft <= 0
        ? `в спокойном темпе (запас ${yen(Math.abs(vsSoft))})`
        : `выше спокойного темпа на ${yen(vsSoft)}`;

    let moneyBit;
    if (hasExchange()) {
      const ex = state.exchange;
      const rate = ex.usdChanged > 0 ? Math.round(ex.yenGot / ex.usdChanged) : null;
      moneyBit = `Обмен: $${Number(ex.usdChanged).toLocaleString("ru-RU")} → ${yen(ex.yenGot)}${rate ? ` (~${rate} ¥/$)` : ""}. Долларов осталось: $${Number(ex.usdLeft).toLocaleString("ru-RU")} (не в трекере).`;
      if (heroMeta) heroMeta.textContent = `факт · осталось $${Number(ex.usdLeft).toLocaleString("ru-RU")}`;
      if (foldSub) foldSub.textContent = `Сохранено: $${ex.usdChanged} → ${yen(ex.yenGot)}, осталось $${ex.usdLeft}`;
    } else {
      const yenMin = TRACKER.budgetYenMin || TRACKER.budgetYen;
      const yenMax = TRACKER.budgetYenMax || TRACKER.budgetYen;
      const toMin = TRACKER.totalUsd - TRACKER.reserveUsd.max;
      const toMax = TRACKER.totalUsd - TRACKER.reserveUsd.min;
      moneyBit = `Пока план: из $${TRACKER.totalUsd} поменять ~$${toMin}–${toMax} → ≈${yenMin.toLocaleString("ru-RU")}–${yenMax.toLocaleString("ru-RU")} ¥. После KIX заполните блок «Обмен».`;
      if (heroMeta) heroMeta.textContent = "обмен ещё не введён";
      if (foldSub) foldSub.textContent = "Введите факт после первого обмена — конверт йен станет вашим";
    }

    pace.textContent =
      (daysLeft > 0
        ? `Можно ≈ ${yen(avgLeft)}/день на ${daysLeft} дн. · ${softLabel}`
        : `Дни бюджета завершены · ${softLabel}`) +
      ` · ${modeLabel}. ${moneyBit}`;
  }

  function syncExchangeInputs() {
    const ex = state.exchange;
    const usdChanged = document.getElementById("exUsdChanged");
    const yenGot = document.getElementById("exYenGot");
    const usdLeft = document.getElementById("exUsdLeft");
    if (!usdChanged) return;
    if (ex) {
      usdChanged.value = ex.usdChanged;
      yenGot.value = ex.yenGot;
      usdLeft.value = ex.usdLeft;
    }
    updateExchangeRateHint();
  }

  function updateExchangeRateHint() {
    const rateHint = document.getElementById("exchangeRateHint");
    const u = Number(document.getElementById("exUsdChanged").value);
    const y = Number(document.getElementById("exYenGot").value);
    const left = Number(document.getElementById("exUsdLeft").value || 0);
    if (!rateHint) return;
    if (u > 0 && y > 0) {
      rateHint.hidden = false;
      const sum = u + left;
      const sumNote =
        TRACKER.totalUsd && Math.abs(sum - TRACKER.totalUsd) > 50
          ? ` Сумма $${sum.toLocaleString("ru-RU")} (в плане было $${TRACKER.totalUsd}) — ок, если часть уже потратили/на карте.`
          : ` Сумма с резервом ≈ $${sum.toLocaleString("ru-RU")}.`;
      rateHint.textContent = `Курс по чеку ≈ ${Math.round(y / u)} ¥ за $1.` + sumNote;
    } else {
      rateHint.hidden = true;
    }
  }

  function renderToday() {
    const day = state.viewDay
      ? TRACKER.days.find((d) => d.n === state.viewDay) || activeDay()
      : activeDay();
    state.viewDay = day.n;

    const root = document.getElementById("todayPanel");
    const spent = spentByDay(day.n);
    const soft = day.soft || state.softDaily;

    const placesHtml = day.places
      .map((p) => {
        const checked = state.done[p.id] ? "checked" : "";
        const badges = [
          p.time ? `<span class="t-chip">${p.time}${p.fixed ? " ★" : ""}</span>` : "",
          p.prepaid ? `<span class="t-chip t-chip--ok">оплачено</span>` : "",
          p.est != null && !p.prepaid
            ? `<span class="t-chip t-chip--yen">${yen(p.est)}${p.estNote ? " · " + p.estNote : ""}</span>`
            : ""
        ].join("");
        return `
          <label class="t-place ${checked ? "is-done" : ""}">
            <input type="checkbox" data-place="${p.id}" ${checked} />
            <span>
              <span class="t-place__title">${p.emoji || ""} ${p.name}</span>
              <span class="t-place__meta">${badges}</span>
            </span>
          </label>`;
      })
      .join("");

    const dayExpenses = state.expenses
      .filter((e) => e.day === day.n)
      .sort((a, b) => b.at - a.at);

    const expHtml =
      dayExpenses.length === 0
        ? `<p class="t-empty">Пока нет трат за этот день.</p>`
        : `<ul class="t-exp-list">${dayExpenses
            .map((e) => {
              const cat = TRACKER.categories.find((c) => c.id === e.cat);
              return `<li>
                <span>${cat ? cat.emoji + " " : ""}${e.note || cat?.label || e.cat}</span>
                <strong>${yen(e.amount)}</strong>
                <button type="button" class="x" data-del="${e.id}" aria-label="Удалить">×</button>
              </li>`;
            })
            .join("")}</ul>`;

    root.innerHTML = `
      <div class="t-day-head">
        <div>
          <p class="eyebrow">День ${day.n} · ${day.date} (${day.weekday})</p>
          <h2>${day.title}</h2>
          <p class="t-goal">${day.goal || ""}</p>
        </div>
        <div class="t-day-spend ${spent > soft ? "is-over" : ""}">
          <span class="t-muted">Сегодня</span>
          <strong>${yen(spent)}</strong>
          <span class="t-muted">мягкий лимит ${yen(soft)}</span>
        </div>
      </div>
      <div class="t-day-nav">
        <button type="button" class="t-nav-btn" data-shift="-1" ${day.n <= 1 ? "disabled" : ""}>← Вчера</button>
        <button type="button" class="t-nav-btn" data-today>Сегодня</button>
        <button type="button" class="t-nav-btn" data-shift="1" ${day.n >= 16 ? "disabled" : ""}>Завтра →</button>
      </div>
      <h3 class="t-h">План дня</h3>
      <div class="t-places">${placesHtml}</div>
      <h3 class="t-h">Траты дня</h3>
      ${expHtml}
    `;
  }

  function renderDays() {
    const root = document.getElementById("daysList");
    root.innerHTML = TRACKER.days
      .map((d) => {
        const spent = spentByDay(d.n);
        const total = d.places.length;
        const done = d.places.filter((p) => state.done[p.id]).length;
        const active = state.viewDay === d.n ? "is-active" : "";
        return `
          <button type="button" class="t-day-card ${active}" data-open-day="${d.n}">
            <span class="t-day-card__n">${d.n}</span>
            <span class="t-day-card__body">
              <strong>${d.date} · ${d.weekday}</strong>
              <span>${d.title}</span>
              <span>${done}/${total} мест · ${yen(spent)}</span>
            </span>
          </button>`;
      })
      .join("");
  }

  function renderCats() {
    const map = spentByCat();
    const root = document.getElementById("catBars");
    const max = Math.max(1, ...Object.values(map));
    root.innerHTML = TRACKER.categories
      .map((c) => {
        const v = map[c.id] || 0;
        const w = (v / max) * 100;
        return `<div class="t-cat">
          <span>${c.emoji} ${c.label}</span>
          <div class="t-cat__track"><div class="t-cat__fill" style="width:${w}%"></div></div>
          <strong>${yen(v)}</strong>
        </div>`;
      })
      .join("");
  }

  function renderResearch() {
    const root = document.getElementById("researchPanel");
    const items = TRACKER.research.items
      .map(
        (it) => `
      <article class="t-research-card">
        <h3>${it.title}</h3>
        <ul>${it.facts.map((f) => `<li>${f}</li>`).join("")}</ul>
        <p class="t-source">Источник: ${it.source} · актуально: ${it.asOf}
          ${it.url ? ` · <a href="${it.url}" target="_blank" rel="noopener">открыть</a>` : ""}
        </p>
      </article>`
      )
      .join("");

    const rows = TRACKER.research.table
      .map((r) => `<tr><td>${r.item}</td><td>${r.range}</td><td>${r.source}</td></tr>`)
      .join("");

    root.innerHTML = `
      <div class="t-research">
        <p class="t-note">${TRACKER.research.disclaimer}</p>
        <p class="t-muted">Обновлено в трекере: ${TRACKER.research.updated}</p>
        ${items}
        <h3 class="t-h">Сводная таблица</h3>
        <div class="t-table-wrap">
          <table>
            <thead><tr><th>Статья</th><th>Диапазон</th><th>Источник</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </div>
    `;
  }

  function fillDaySelect() {
    const sel = document.getElementById("expDay");
    sel.innerHTML = TRACKER.days
      .map((d) => `<option value="${d.n}">День ${d.n} · ${d.date}</option>`)
      .join("");
    sel.value = String(state.viewDay || activeDay().n);
  }

  function fillCatSelect() {
    const sel = document.getElementById("expCat");
    sel.innerHTML = TRACKER.categories
      .map((c) => `<option value="${c.id}">${c.emoji} ${c.label}</option>`)
      .join("");
  }

  function renderAll() {
    renderBudget();
    renderToday();
    renderDays();
    renderCats();
    fillDaySelect();
    syncExchangeInputs();
  }

  function onReady() {
    fillCatSelect();
    renderResearch();
    state.viewDay = state.viewDay || activeDay().n;
    renderAll();

    ["exUsdChanged", "exYenGot", "exUsdLeft"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("input", updateExchangeRateHint);
    });

    document.getElementById("exchangeForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const usdChanged = Number(document.getElementById("exUsdChanged").value);
      const yenGot = Number(document.getElementById("exYenGot").value);
      const usdLeft = Number(document.getElementById("exUsdLeft").value);
      if (!(usdChanged > 0) || !(yenGot > 0) || usdLeft < 0) return;
      state.exchange = {
        usdChanged,
        yenGot,
        usdLeft,
        at: Date.now()
      };
      save();
      renderAll();
      openFold("today");
      document.getElementById("today").scrollIntoView({ behavior: "smooth", block: "start" });
    });

    document.getElementById("clearExchange").addEventListener("click", () => {
      if (!state.exchange) return;
      if (!confirm("Сбросить факт обмена и снова считать по плану (~452k ¥)?")) return;
      state.exchange = null;
      document.getElementById("exUsdChanged").value = "";
      document.getElementById("exYenGot").value = "";
      document.getElementById("exUsdLeft").value = "";
      save();
      renderAll();
    });

    document.getElementById("todayPanel").addEventListener("change", (e) => {
      const t = e.target;
      if (t.matches("[data-place]")) {
        if (t.checked) state.done[t.dataset.place] = true;
        else delete state.done[t.dataset.place];
        save();
        renderAll();
      }
    });

    document.getElementById("todayPanel").addEventListener("click", (e) => {
      const del = e.target.closest("[data-del]");
      if (del) {
        state.expenses = state.expenses.filter((x) => x.id !== del.dataset.del);
        save();
        renderAll();
        return;
      }
      const shift = e.target.closest("[data-shift]");
      if (shift) {
        state.viewDay = Math.min(16, Math.max(1, state.viewDay + Number(shift.dataset.shift)));
        renderAll();
        return;
      }
      if (e.target.closest("[data-today]")) {
        state.viewDay = activeDay().n;
        renderAll();
      }
    });

    document.getElementById("daysList").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-open-day]");
      if (!btn) return;
      state.viewDay = Number(btn.dataset.openDay);
      renderAll();
      openFold("today");
      document.getElementById("today").scrollIntoView({ behavior: "smooth", block: "start" });
    });

    document.getElementById("expForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const day = Number(document.getElementById("expDay").value);
      const cat = document.getElementById("expCat").value;
      const amount = Number(document.getElementById("expAmount").value);
      const note = document.getElementById("expNote").value.trim();
      if (!amount || amount <= 0) return;
      state.expenses.push({ id: uid(), day, cat, amount, note, at: Date.now() });
      state.viewDay = day;
      document.getElementById("expAmount").value = "";
      document.getElementById("expNote").value = "";
      save();
      renderAll();
      openFold("today");
      document.getElementById("today").scrollIntoView({ behavior: "smooth", block: "start" });
    });

    document.getElementById("quickSoft").addEventListener("click", () => {
      const day = state.viewDay || activeDay().n;
      document.getElementById("expDay").value = String(day);
      document.getElementById("expCat").value = "food";
      document.getElementById("expAmount").value = String(
        TRACKER.days.find((d) => d.n === day)?.soft || state.softDaily
      );
      document.getElementById("expNote").value = "Пакет дня (мягкий лимит)";
      openFold("add");
      document.getElementById("expAmount").focus();
    });

    document.getElementById("resetTracker").addEventListener("click", () => {
      if (!confirm("Сбросить все галочки и траты трекера?")) return;
      Object.assign(state, defaultState());
      state.viewDay = activeDay().n;
      save();
      renderAll();
    });

    document.getElementById("exportJson").addEventListener("click", () => {
      const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "kansai-tracker.json";
      a.click();
      URL.revokeObjectURL(a.href);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", onReady);
  } else {
    onReady();
  }
})();
