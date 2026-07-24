/* ============================================================
   Япония 2026 — логика интерфейса.
   Отвечает за: рендер дней и мест, фильтры по интересам,
   карту Leaflet, модалку места, режим редактирования порядка
   дней с сохранением в localStorage, анимации появления.
   ============================================================ */

(function () {
  "use strict";

  // ---- Короткие помощники ----
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const el = (tag, cls, html) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (html != null) node.innerHTML = html;
    return node;
  };

  const STORAGE_KEY = "japan2026.order.v1";
  let activeFilter = "all";
  let editing = false;
  let markers = {};   // ключ "день-место" -> маркер Leaflet
  let map = null;

  // Порядок дней: массив индексов в TRIP.days. Берём из localStorage или по умолчанию.
  function loadOrder() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const arr = JSON.parse(raw);
        if (Array.isArray(arr) && arr.length === TRIP.days.length) return arr;
      }
    } catch (e) { /* ignore */ }
    return TRIP.days.map((_, i) => i);
  }
  function saveOrder(order) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(order)); } catch (e) {}
  }
  let order = loadOrder();

  // Метка тега -> emoji/label из справочника INTERESTS.
  const interestMap = Object.fromEntries(INTERESTS.map(i => [i.key, i]));

  // ======================= HERO STATS =======================
  function renderStats() {
    const days = TRIP.days.length;
    const places = TRIP.days.reduce((s, d) => s + d.places.length, 0);
    const cities = new Set(["Осака", "Киото", "Нара", "Кобе", "Химэдзи", "Авадзи"]).size;
    const stats = [
      { b: days, s: "дней" },
      { b: places, s: "локаций" },
      { b: cities, s: "городов" }
    ];
    const wrap = $("#heroStats");
    stats.forEach(x => {
      wrap.appendChild(el("div", "stat", `<b>${x.b}</b><span>${x.s}</span>`));
    });
  }

  // ======================= ФИЛЬТРЫ =======================
  function renderFilters() {
    const wrap = $("#filters");
    INTERESTS.forEach(it => {
      const chip = el("button", "chip" + (it.key === "all" ? " active" : ""),
        `<span class="emo">${it.emoji}</span>${it.label}`);
      chip.type = "button";
      chip.dataset.key = it.key;
      chip.addEventListener("click", () => setFilter(it.key));
      wrap.appendChild(chip);
    });
  }

  function setFilter(key) {
    activeFilter = key;
    $$("#filters .chip").forEach(c => c.classList.toggle("active", c.dataset.key === key));
    applyFilter();
  }

  // Подсветка дней/мест под активный фильтр.
  function applyFilter() {
    $$(".day").forEach(dayEl => {
      const idx = Number(dayEl.dataset.index);
      const day = TRIP.days[idx];
      const hasMatch = activeFilter === "all" ||
        day.places.some(p => (p.tags || []).includes(activeFilter));
      dayEl.classList.toggle("dimmed", !hasMatch && activeFilter !== "all");
      dayEl.classList.toggle("match", hasMatch && activeFilter !== "all");

      $$(".place", dayEl).forEach((pEl, i) => {
        const p = day.places[i];
        const match = activeFilter === "all" || (p.tags || []).includes(activeFilter);
        pEl.style.display = match ? "" : "none";
      });
    });
  }

  // ======================= ТАЙМЛАЙН =======================
  const LOAD_LABEL = ["", "очень лёгкий", "лёгкий", "средний", "насыщенный", "максимум"];

  function loadDots(n) {
    let out = "";
    for (let i = 1; i <= 5; i++) out += i <= n ? "●" : "○";
    return out;
  }

  function placeCard(day, place, di, pi) {
    const card = el("div", "place");
    if ((place.desc || "").length > 90) card.classList.add("full");
    card.dataset.di = di;
    card.dataset.pi = pi;

    const tagsHtml = (place.tags || []).slice(0, 4).map(t => {
      const info = interestMap[t];
      const hot = activeFilter !== "all" && t === activeFilter ? " hot" : "";
      return `<span class="tag${hot}">${info ? info.emoji + " " + info.label : t}</span>`;
    }).join("");

    const timeBadge = place.time
      ? `<span class="tag${place.fixed ? " hot" : ""}">${place.fixed ? "⏰ " : "🕒 "}${place.time}</span>`
      : "";

    const durBadge = place.duration ? `<span class="tag">⏳ ${place.duration}</span>` : "";

    const who = WHO[place.who] || WHO.both;
    const whoBadge = `<span class="who-badge ${who.cls}">${who.emoji} ${who.label}</span>`;

    card.innerHTML = `
      <div class="place__top">
        <div class="place__emoji">${place.emoji || "📍"}</div>
        <div>
          <div class="place__name">${place.name} ${whoBadge}</div>
          <div class="place__desc">${place.desc || ""}</div>
        </div>
      </div>
      <div class="place__tags">${timeBadge}${durBadge}${tagsHtml}</div>
    `;
    card.addEventListener("click", () => openModal(day, place));
    return card;
  }

  function dayCard(idx, position) {
    const day = TRIP.days[idx];
    const node = el("div", "day reveal");
    node.dataset.index = idx;

    const head = el("div", "day__head");

    const reorder = el("div", "day__reorder");
    const up = el("button", "reorder-btn", "▲"); up.type = "button"; up.title = "Выше";
    const down = el("button", "reorder-btn", "▼"); down.type = "button"; down.title = "Ниже";
    up.addEventListener("click", (e) => { e.stopPropagation(); move(position, -1); });
    down.addEventListener("click", (e) => { e.stopPropagation(); move(position, 1); });
    reorder.append(up, down);

    const num = el("div", "day__num", `<b>${position + 1}</b><span>${day.weekday}</span>`);

    const info = el("div", "day__info", `
      <div class="day__date">${day.date}</div>
      <div class="day__title">${day.title}</div>
      <div class="day__goal">${day.goal}</div>
    `);

    const load = el("div", "day__load");
    load.title = "Нагрузка: " + LOAD_LABEL[day.load];
    load.textContent = loadDots(day.load);

    const chevron = el("div", "day__chevron", "▾");

    head.append(reorder, num, info, load, chevron);

    const body = el("div", "day__body");
    const bodyWrap = el("div", "day__body-wrap");

    if (day.intro) {
      bodyWrap.appendChild(el("p", "day__intro", `<span class="day__intro-ic">🗺️</span>${day.intro}`));
    }

    const inner = el("div", "day__body-inner");
    day.places.forEach((p, pi) => inner.appendChild(placeCard(day, p, idx, pi)));
    bodyWrap.appendChild(inner);

    if (day.options && day.options.length) {
      const opt = el("div", "options");
      opt.appendChild(el("div", "options__title", "🔀 На выбор / по желанию"));
      const grid = el("div", "options__grid");
      day.options.forEach(o => {
        grid.appendChild(el("div", "opt",
          `<div class="opt__emoji">${o.emoji || "•"}</div>
           <div><div class="opt__title">${o.title}</div><div class="opt__text">${o.desc}</div></div>`));
      });
      opt.appendChild(grid);
      bodyWrap.appendChild(opt);
    }

    body.appendChild(bodyWrap);

    head.addEventListener("click", () => {
      if (editing) return;
      node.classList.toggle("open");
    });

    node.append(head, body);
    return node;
  }

  function renderTimeline() {
    const wrap = $("#timeline");
    wrap.innerHTML = "";
    order.forEach((dayIdx, position) => wrap.appendChild(dayCard(dayIdx, position)));
    applyFilter();
    observeReveals();
  }

  // Перемещение дня в режиме редактирования.
  function move(position, dir) {
    const target = position + dir;
    if (target < 0 || target >= order.length) return;
    [order[position], order[target]] = [order[target], order[position]];
    saveOrder(order);
    renderTimeline();
    if (editing) $("#timeline").classList.add("editing");
  }

  // ======================= РЕДАКТИРОВАНИЕ =======================
  function setupEdit() {
    const toggle = $("#editToggle");
    const hint = $("#editHint");
    const reset = $("#resetPlan");
    const timeline = $("#timeline");

    toggle.addEventListener("click", () => {
      editing = !editing;
      timeline.classList.toggle("editing", editing);
      hint.hidden = !editing;
      toggle.textContent = editing ? "✅ Готово" : "✏️ Изменить план";
      if (editing) $$(".day.open").forEach(d => d.classList.remove("open"));
    });

    reset.addEventListener("click", () => {
      order = TRIP.days.map((_, i) => i);
      saveOrder(order);
      renderTimeline();
      timeline.classList.toggle("editing", editing);
    });
  }

  // ======================= МОДАЛКА =======================
  function gmapsLink(p) {
    return `https://www.google.com/maps/search/?api=1&query=${p.lat},${p.lng}`;
  }

  function openModal(day, p) {
    const body = $("#modalBody");
    const who = WHO[p.who] || WHO.both;
    const rows = [];
    if (p.time)     rows.push(row(p.fixed ? "⏰" : "🕒", p.fixed ? "Забронировано" : "Время", p.time));
    rows.push(row(who.emoji, "Для кого", who.label));
    if (p.how)      rows.push(row("🚉", "Как добраться", p.how));
    if (p.duration) rows.push(row("⏳", "Сколько времени", p.duration));
    if (p.hours)    rows.push(row("🕐", "Часы работы", p.hours));
    if (p.price)    rows.push(row("💴", "Цена", p.price));
    if (p.food)     rows.push(row("🍜", "Поесть рядом", p.food));
    if (p.tips)     rows.push(row("💡", "Совет", p.tips));

    const tags = (p.tags || []).map(t => {
      const i = interestMap[t];
      return `<span class="tag">${i ? i.emoji + " " + i.label : t}</span>`;
    }).join("");

    body.innerHTML = `
      <div class="m-emoji">${p.emoji || "📍"}</div>
      <div class="m-title">${p.name}</div>
      <div class="m-desc">День ${day.n} · ${day.date} — ${p.desc || ""}</div>
      <div class="place__tags" style="margin-bottom:16px">${tags}</div>
      <div class="m-grid">${rows.join("")}</div>
      <div class="m-actions">
        <a class="m-btn primary" href="${gmapsLink(p)}" target="_blank" rel="noopener">📍 Открыть в Google Maps</a>
        <a class="m-btn ghost" href="https://www.google.com/search?tbm=isch&q=${encodeURIComponent(p.name + " Japan")}" target="_blank" rel="noopener">📷 Фотографии</a>
      </div>
    `;
    const modal = $("#placeModal");
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    // Фокус на карте: подлетаем к точке
    if (map && p.lat) map.flyTo([p.lat, p.lng], 13, { duration: .8 });
  }

  function row(ic, k, v) {
    return `<div class="m-item"><span class="ic">${ic}</span><div><div class="k">${k}</div><div class="v">${v}</div></div></div>`;
  }

  function setupModal() {
    const modal = $("#placeModal");
    modal.addEventListener("click", (e) => {
      if (e.target.hasAttribute("data-close")) closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });
  }
  function closeModal() {
    $("#placeModal").hidden = true;
    document.body.style.overflow = "";
  }

  // ======================= КАРТА (Leaflet) =======================
  function renderMap() {
    map = L.map("leafletMap", { scrollWheelZoom: false }).setView([34.75, 135.35], 9);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      maxZoom: 19
    }).addTo(map);

    const bounds = [];
    TRIP.days.forEach((day, di) => {
      day.places.forEach((p) => {
        if (p.lat == null) return;
        const icon = L.divIcon({
          className: "",
          html: `<div class="map-pin"><span>${day.n}</span></div>`,
          iconSize: [26, 26],
          iconAnchor: [13, 26]
        });
        const m = L.marker([p.lat, p.lng], { icon }).addTo(map);
        m.bindPopup(`<b>День ${day.n} · ${p.name}</b><br>${p.desc || ""}<br>
          <a href="${gmapsLink(p)}" target="_blank" rel="noopener" style="color:#ff5a67">Google Maps →</a>`);
        markers[di] = m;
        bounds.push([p.lat, p.lng]);
      });
    });
    if (bounds.length) map.fitBounds(bounds, { padding: [40, 40] });

    // включаем колесо только по клику на карту (чтобы не мешало прокрутке страницы)
    map.on("focus", () => map.scrollWheelZoom.enable());
    map.on("blur",  () => map.scrollWheelZoom.disable());
  }

  // ======================= СОВЕТЫ =======================
  const TIPS = [
    { e: "💳", t: "IC-карта ICOCA", d: "Купите в аэропорту — оплата метро, автобусов и конбини одним касанием." },
    { e: "📶", t: "eSIM заранее", d: "Активируйте eSIM ещё дома, чтобы сразу быть онлайн в KIX." },
    { e: "🧾", t: "Tax-free", d: "В крупных магазинах берите паспорт — вернут налог от 5 000 ¥ покупок." },
    { e: "💴", t: "Наличные", d: "Многие мелкие места и рынки — только кэш. Снимайте в 7-Eleven ATM." },
    { e: "🎟️", t: "Билеты онлайн", d: "USJ, Nijigen no Mori, Hello Kitty Smile — бронируйте слоты заранее." },
    { e: "🚉", t: "Google Maps + транспорт", d: "Показывает точные поезда, платформы и стоимость проезда." },
    { e: "🥢", t: "Этикет", d: "Не втыкайте палочки в рис, не чаевые, ешьте у прилавка, а не на ходу." },
    { e: "🔋", t: "Пауэрбанк", d: "Дни в парках длинные — держите заряд для карт и фото." }
  ];
  function renderTips() {
    const wrap = $("#tipsGrid");
    TIPS.forEach(t => {
      const node = el("div", "tip reveal", `
        <div class="tip__emoji">${t.e}</div>
        <div><div class="tip__title">${t.t}</div><div class="tip__text">${t.d}</div></div>
      `);
      wrap.appendChild(node);
    });
  }

  // ======================= АНИМАЦИИ / ПРОКРУТКА =======================
  let io;
  function observeReveals() {
    if (!("IntersectionObserver" in window)) {
      $$(".reveal").forEach(n => n.classList.add("in"));
      return;
    }
    if (!io) {
      io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
        });
      }, { threshold: 0.08 });
    }
    $$(".reveal:not(.in)").forEach(n => io.observe(n));
  }

  function setupScrollProgress() {
    const bar = $("#scrollProgress");
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
      bar.style.width = (scrolled * 100) + "%";
    };
    document.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // ======================= INIT =======================
  function init() {
    renderStats();
    renderFilters();
    renderMap();
    renderTimeline();
    renderTips();
    setupEdit();
    setupModal();
    setupScrollProgress();
    observeReveals();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
