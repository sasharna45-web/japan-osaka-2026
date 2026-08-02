/**
 * Трекер дней и бюджета Кансай 2026.
 * Состояние в localStorage: japan2026-tracker-v1
 */

(function () {
  const KEY = "japan2026-tracker-v1";
  const yen = (n) =>
    Math.round(n).toLocaleString("ru-RU") + " ¥";

  const state = load();

  function defaultState() {
    return {
      done: {}, // placeId -> true
      expenses: [], // {id, day, cat, amount, note, at}
      softDaily: TRACKER.softDailyYen
    };
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
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
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
    const left = TRACKER.budgetYen - spent;
    const elapsed = Math.max(1, daysElapsedOrToday());
    const remainingDays = Math.max(1, TRACKER.spendDays - daysElapsedOrToday() + (todayIso() >= TRACKER.dateFrom && todayIso() <= TRACKER.dateTo ? 1 : 0));
    // days left including today if during trip
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

    return { spent, left, daysLeft, avgLeft, vsSoft, elapsed };
  }

  /* ---------- render ---------- */

  function renderBudget() {
    const { spent, left, daysLeft, avgLeft, vsSoft } = paceStatus();
    const pct = Math.min(100, (spent / TRACKER.budgetYen) * 100);
    const bar = document.getElementById("budgetBar");
    const fill = document.getElementById("budgetFill");
    const nums = document.getElementById("budgetNums");
    const pace = document.getElementById("budgetPace");

    fill.style.width = pct + "%";
    fill.classList.toggle("is-warn", pct >= 70 && pct < 90);
    fill.classList.toggle("is-danger", pct >= 90);

    nums.innerHTML = `
      <div><span class="muted">Потрачено</span><strong>${yen(spent)}</strong></div>
      <div><span class="muted">Осталось</span><strong class="${left < 0 ? "bad" : ""}">${yen(left)}</strong></div>
      <div><span class="muted">Потолок</span><strong>${yen(TRACKER.budgetYen)}</strong></div>
    `;

    const softLabel =
      vsSoft <= 0
        ? `в пределах спокойного темпа (−${yen(Math.abs(vsSoft))} к плану ${yen(state.softDaily)}/день)`
        : `выше спокойного темпа на ${yen(vsSoft)}`;

    pace.textContent =
      daysLeft > 0
        ? `Можно ≈ ${yen(avgLeft)}/день на оставшиеся ${daysLeft} дн. · ${softLabel}`
        : `Поездка по бюджетируемым дням завершена · ${softLabel}`;

    bar.setAttribute("aria-valuenow", String(Math.round(pct)));
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
          p.time ? `<span class="chip">${p.time}${p.fixed ? " ★" : ""}</span>` : "",
          p.prepaid ? `<span class="chip chip--ok">оплачено</span>` : "",
          p.est != null && !p.prepaid
            ? `<span class="chip chip--yen">${yen(p.est)}${p.estNote ? " · " + p.estNote : ""}</span>`
            : ""
        ].join("");
        return `
          <label class="place ${checked ? "is-done" : ""}">
            <input type="checkbox" data-place="${p.id}" ${checked} />
            <span class="place__body">
              <span class="place__title">${p.emoji || ""} ${p.name}</span>
              <span class="place__meta">${badges}</span>
            </span>
          </label>`;
      })
      .join("");

    const dayExpenses = state.expenses
      .filter((e) => e.day === day.n)
      .sort((a, b) => b.at - a.at);

    const expHtml =
      dayExpenses.length === 0
        ? `<p class="empty">Пока нет трат за этот день.</p>`
        : `<ul class="exp-list">${dayExpenses
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
      <div class="day-head">
        <div>
          <p class="eyebrow">День ${day.n} · ${day.date} (${day.weekday})</p>
          <h2>${day.title}</h2>
          <p class="goal">${day.goal || ""}</p>
        </div>
        <div class="day-spend ${spent > soft ? "is-over" : ""}">
          <span class="muted">Сегодня</span>
          <strong>${yen(spent)}</strong>
          <span class="muted">мягкий лимит ${yen(soft)}</span>
        </div>
      </div>
      <div class="day-nav">
        <button type="button" class="btn ghost" data-shift="-1" ${day.n <= 1 ? "disabled" : ""}>← Вчера</button>
        <button type="button" class="btn ghost" data-today>Сегодня</button>
        <button type="button" class="btn ghost" data-shift="1" ${day.n >= 16 ? "disabled" : ""}>Завтра →</button>
      </div>
      <h3 class="block-title">План дня</h3>
      <div class="places">${placesHtml}</div>
      <h3 class="block-title">Траты дня</h3>
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
        const over = spent > (d.soft || state.softDaily) ? "is-over" : "";
        return `
          <button type="button" class="day-card ${active} ${over}" data-open-day="${d.n}">
            <span class="day-card__n">${d.n}</span>
            <span class="day-card__body">
              <strong>${d.date} · ${d.weekday}</strong>
              <span>${d.title}</span>
              <span class="muted">${done}/${total} мест · ${yen(spent)}</span>
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
        return `<div class="cat">
          <span>${c.emoji} ${c.label}</span>
          <div class="cat__track"><div class="cat__fill" style="width:${w}%"></div></div>
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
      <article class="research-card">
        <h3>${it.title}</h3>
        <ul>${it.facts.map((f) => `<li>${f}</li>`).join("")}</ul>
        <p class="source">Источник: ${it.source} · актуально: ${it.asOf}
          ${it.url ? ` · <a href="${it.url}" target="_blank" rel="noopener">открыть</a>` : ""}
        </p>
      </article>`
      )
      .join("");

    const rows = TRACKER.research.table
      .map(
        (r) => `<tr><td>${r.item}</td><td>${r.range}</td><td>${r.source}</td></tr>`
      )
      .join("");

    root.innerHTML = `
      <p class="lead">${TRACKER.research.disclaimer}</p>
      <p class="muted">Обновлено в трекере: ${TRACKER.research.updated}</p>
      ${items}
      <h3 class="block-title">Сводная таблица</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Статья</th><th>Диапазон</th><th>Источник</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
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
  }

  /* ---------- events ---------- */

  function onReady() {
    fillCatSelect();
    renderResearch();
    state.viewDay = activeDay().n;
    renderAll();

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
      showTab("today");
      renderAll();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    document.getElementById("expForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const day = Number(document.getElementById("expDay").value);
      const cat = document.getElementById("expCat").value;
      const amount = Number(document.getElementById("expAmount").value);
      const note = document.getElementById("expNote").value.trim();
      if (!amount || amount <= 0) return;
      state.expenses.push({
        id: uid(),
        day,
        cat,
        amount,
        note,
        at: Date.now()
      });
      state.viewDay = day;
      document.getElementById("expAmount").value = "";
      document.getElementById("expNote").value = "";
      save();
      renderAll();
      showTab("today");
    });

    document.getElementById("quickSoft").addEventListener("click", () => {
      const day = state.viewDay || activeDay().n;
      document.getElementById("expDay").value = String(day);
      document.getElementById("expCat").value = "food";
      document.getElementById("expAmount").value = String(
        TRACKER.days.find((d) => d.n === day)?.soft || state.softDaily
      );
      document.getElementById("expNote").value = "Пакет дня (мягкий лимит)";
      showTab("add");
      document.getElementById("expAmount").focus();
    });

    document.querySelectorAll("[data-tab]").forEach((btn) => {
      btn.addEventListener("click", () => showTab(btn.dataset.tab));
    });

    document.getElementById("resetTracker").addEventListener("click", () => {
      if (!confirm("Сбросить все галочки и траты трекера?")) return;
      Object.assign(state, defaultState());
      state.viewDay = activeDay().n;
      save();
      renderAll();
    });

    document.getElementById("exportJson").addEventListener("click", () => {
      const blob = new Blob([JSON.stringify(state, null, 2)], {
        type: "application/json"
      });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "kansai-tracker.json";
      a.click();
      URL.revokeObjectURL(a.href);
    });
  }

  function showTab(name) {
    document.querySelectorAll("[data-panel]").forEach((p) => {
      p.hidden = p.dataset.panel !== name;
    });
    document.querySelectorAll("[data-tab]").forEach((b) => {
      b.classList.toggle("is-active", b.dataset.tab === name);
      b.setAttribute("aria-selected", b.dataset.tab === name ? "true" : "false");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", onReady);
  } else {
    onReady();
  }
})();
