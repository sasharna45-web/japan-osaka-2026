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

  function photosFor(place) {
    if (!place || typeof PLACE_PHOTOS === "undefined") return [];
    const list = PLACE_PHOTOS[place.name];
    return Array.isArray(list) ? list.filter(Boolean) : [];
  }

  function galleryStripHtml(urls, name) {
    if (!urls.length) return "";
    const imgs = urls.map((src, i) =>
      `<button type="button" class="pgal__thumb" data-gidx="${i}" aria-label="Фото ${i + 1}">
        <img src="${src}" alt="${name}" loading="lazy" decoding="async">
      </button>`
    ).join("");
    return `<div class="pgal" data-gallery>${imgs}</div>`;
  }

  let galleryState = { urls: [], idx: 0, title: "" };

  function openGallery(urls, idx, title) {
    if (!urls || !urls.length) return;
    galleryState = { urls, idx: idx || 0, title: title || "" };
    const view = $("#galleryView");
    const img = $("#galleryImg");
    const cap = $("#galleryCap");
    if (!view || !img) return;
    img.src = urls[galleryState.idx];
    img.alt = title || "";
    if (cap) cap.textContent = `${title || ""} · ${galleryState.idx + 1}/${urls.length}`;
    view.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function stepGallery(dir) {
    const { urls } = galleryState;
    if (!urls.length) return;
    galleryState.idx = (galleryState.idx + dir + urls.length) % urls.length;
    const img = $("#galleryImg");
    const cap = $("#galleryCap");
    if (img) img.src = urls[galleryState.idx];
    if (cap) cap.textContent = `${galleryState.title || ""} · ${galleryState.idx + 1}/${urls.length}`;
  }

  function closeGallery() {
    const view = $("#galleryView");
    const img = $("#galleryImg");
    if (view) view.hidden = true;
    if (img) img.removeAttribute("src");
    document.body.style.overflow = "";
  }

  function setupGallery() {
    const view = $("#galleryView");
    if (!view || view.dataset.ready) return;
    view.dataset.ready = "1";
    const close = $("#galleryClose");
    if (close) close.addEventListener("click", closeGallery);
    const prev = $("#galleryPrev");
    const next = $("#galleryNext");
    if (prev) prev.addEventListener("click", (e) => { e.stopPropagation(); stepGallery(-1); });
    if (next) next.addEventListener("click", (e) => { e.stopPropagation(); stepGallery(1); });
    view.addEventListener("click", (e) => {
      if (e.target === view) closeGallery();
    });
    document.addEventListener("keydown", (e) => {
      const g = $("#galleryView");
      if (!g || g.hidden) return;
      if (e.key === "Escape") closeGallery();
      if (e.key === "ArrowLeft") stepGallery(-1);
      if (e.key === "ArrowRight") stepGallery(1);
    });
  }

  function bindGalleryClicks(root, urls, title) {
    if (!root) return;
    root.querySelectorAll("[data-gidx]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        openGallery(urls, Number(btn.dataset.gidx) || 0, title);
      });
    });
  }

  function placeCard(day, place, di, pi) {
    const card = el("div", "place" + (place.fixed ? " place--fixed" : ""));
    if ((place.desc || "").length > 90) card.classList.add("full");
    card.dataset.di = di;
    card.dataset.pi = pi;

    const tagsHtml = (place.tags || []).slice(0, 4).map(t => {
      const info = interestMap[t];
      const hot = activeFilter !== "all" && t === activeFilter ? " hot" : "";
      return `<span class="tag${hot}">${info ? info.emoji + " " + info.label : t}</span>`;
    }).join("");

    const timeBadge = place.time
      ? `<span class="tag${place.fixed ? " hot fixed-tag" : ""}">${place.fixed ? "⏰ ФИКС · " : "🕒 "}${place.time}</span>`
      : (place.fixed ? `<span class="tag hot fixed-tag">⏰ ФИКС</span>` : "");

    const durBadge = place.duration ? `<span class="tag">⏳ ${place.duration}</span>` : "";

    const who = WHO[place.who] || WHO.both;
    const whoBadge = `<span class="who-badge ${who.cls}">${who.emoji} ${who.label}</span>`;
    const photos = photosFor(place);

    card.innerHTML = `
      <div class="place__top">
        <div class="place__emoji">${place.emoji || "📍"}</div>
        <div>
          <div class="place__name">${place.name} ${whoBadge}</div>
          <div class="place__desc">${place.desc || ""}</div>
        </div>
      </div>
      ${galleryStripHtml(photos, place.name)}
      ${place.hours ? `<div class="place__hours"><span>🕐</span><span>${place.hours}</span></div>` : ""}
      <div class="place__tags">${timeBadge}${durBadge}${tagsHtml}</div>
    `;
    bindGalleryClicks(card, photos, place.name);
    card.addEventListener("click", () => openModal(day, place));
    return card;
  }

  function dayCard(idx, position) {
    const day = TRIP.days[idx];
    const hasFixed = (day.places || []).some(p => p.fixed);
    const node = el("div", "day reveal" + (hasFixed ? " day--fixed" : ""));
    node.dataset.index = idx;

    const head = el("div", "day__head");

    const reorder = el("div", "day__reorder");
    const up = el("button", "reorder-btn", "▲"); up.type = "button"; up.title = "Выше";
    const down = el("button", "reorder-btn", "▼"); down.type = "button"; down.title = "Ниже";
    up.addEventListener("click", (e) => { e.stopPropagation(); move(position, -1); });
    down.addEventListener("click", (e) => { e.stopPropagation(); move(position, 1); });
    reorder.append(up, down);

    const num = el("div", "day__num", `<b>${position + 1}</b><span>${day.weekday}</span>`);

    const fixedBadge = hasFixed
      ? `<span class="day__fixed-badge" title="Есть фиксированные брони / пункты">⏰ ФИКС</span>`
      : "";

    const info = el("div", "day__info", `
      <div class="day__date">${day.date}${fixedBadge}</div>
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

    // Краткая шпаргалка — всегда сверху при открытии
    const brief = (typeof DAY_BRIEFS !== "undefined" && DAY_BRIEFS[day.n]) || null;
    if (brief) {
      bodyWrap.appendChild(el("div", "day-brief", `
        <div class="day-brief__row">
          <span class="day-brief__k">Главное</span>
          <span class="day-brief__v">${brief.main}</span>
        </div>
        <div class="day-brief__row">
          <span class="day-brief__k">Когда выходить</span>
          <span class="day-brief__v">${brief.leave}</span>
        </div>
        <div class="day-brief__row">
          <span class="day-brief__k">Не забыть</span>
          <span class="day-brief__v">${brief.remember}</span>
        </div>
      `));
    }

    const details = el("div", "day-details");
    details.hidden = true;

    // KIX / вылет — только в «Подробнее», чтобы не засорять день
    if (day.n === 1 && typeof FIRST_HOUR_KIX !== "undefined") {
      const kixBox = el("div", "day-kix");
      kixBox.appendChild(el("div", "day-kix__title", "Первый час в KIX · прилёт"));
      const kixList = el("div", "day-kix__list");
      FIRST_HOUR_KIX.forEach(s => {
        kixList.appendChild(el("div", "day-kix__item",
          `<b>${s.n}. ${s.t}</b><span>${s.d}</span>`));
      });
      kixBox.appendChild(kixList);
      details.appendChild(kixBox);
    }

    if (day.n === 17 && typeof DEPARTURE_DAY !== "undefined") {
      const dep = DEPARTURE_DAY;
      const depBox = el("div", "day-dep");
      depBox.innerHTML = `
        <div class="day-dep__title">${dep.title}</div>
        <div class="day-dep__flight">✈️ ${dep.flight}</div>
        <div class="day-dep__list">
          ${dep.steps.map((st, i) => `
            <div class="day-dep__item">
              <b>${i + 1}. ${st.t} · ${st.title}</b>
              <span>${st.d}</span>
            </div>`).join("")}
        </div>
        <a class="day-dep__cn" href="china.html">Дальше → слайд Китай / Шанхай</a>
      `;
      details.appendChild(depBox);
    }

    if (day.intro) {
      details.appendChild(el("p", "day__intro", day.intro));
    }

    const inner = el("div", "day__body-inner");
    day.places.forEach((p, pi) => inner.appendChild(placeCard(day, p, idx, pi)));
    details.appendChild(inner);

    if (day.options && day.options.length) {
      const opt = el("div", "options");
      opt.appendChild(el("div", "options__title", "На выбор"));
      const grid = el("div", "options__grid");
      day.options.forEach(o => {
        grid.appendChild(el("div", "opt",
          `<div class="opt__emoji">${o.emoji || "•"}</div>
           <div><div class="opt__title">${o.title}</div><div class="opt__text">${o.desc}</div></div>`));
      });
      opt.appendChild(grid);
      details.appendChild(opt);
    }

    const moreBtn = el("button", "day-more");
    moreBtn.type = "button";
    moreBtn.textContent = "Подробнее";
    moreBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = details.hidden;
      details.hidden = !open;
      moreBtn.textContent = open ? "Скрыть подробности" : "Подробнее";
      moreBtn.classList.toggle("is-open", open);
    });

    bodyWrap.append(moreBtn, details);
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
    applyTodayOnly();
    observeReveals();
  }

  // ======================= 6. РЕЖИМ «ТОЛЬКО СЕГОДНЯ» =======================
  const TODAY_ONLY_KEY = "japan2026.todayOnly.v1";

  /** Календарная дата в Asia/Tokyo (YYYY-MM-DD), не локаль устройства. */
  function tokyoYmd(now = new Date()) {
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Tokyo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).formatToParts(now);
    const get = (type) => Number(parts.find((p) => p.type === type).value);
    return { y: get("year"), m: get("month"), d: get("day") };
  }

  function tokyoIso(now = new Date()) {
    const { y, m, d } = tokyoYmd(now);
    return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  }

  function isDuringTrip(now = new Date()) {
    const cur = tokyoIso(now);
    return cur >= "2026-09-09" && cur <= "2026-09-25";
  }

  // По умолчанию во время поездки — только сегодняшний день (если пользователь ещё не выбирал)
  let todayOnly = false;
  try {
    const stored = localStorage.getItem(TODAY_ONLY_KEY);
    if (stored === null) todayOnly = isDuringTrip();
    else todayOnly = stored === "1";
  } catch (e) {
    todayOnly = isDuringTrip();
  }

  function focusDayIndex() {
    const focus = tripFocus();
    if (focus.mode === "during" && focus.todayIdx >= 0) return focus.todayIdx;
    if (focus.mode === "before" && focus.todayIdx >= 0) return focus.todayIdx;
    if (focus.mode === "after") return dayIndexByN(17);
    return 0;
  }

  function applyTodayOnly() {
    const btn = $("#todayOnlyBtn");
    const hint = $("#todayOnlyHint");
    const idx = focusDayIndex();
    $$(".day").forEach(dayEl => {
      if (!todayOnly) {
        dayEl.hidden = false;
        return;
      }
      dayEl.hidden = Number(dayEl.dataset.index) !== idx;
    });
    if (btn) {
      btn.classList.toggle("is-on", todayOnly);
      btn.setAttribute("aria-pressed", todayOnly ? "true" : "false");
      btn.textContent = todayOnly ? "✓ Только сегодня" : "Только сегодня";
    }
    if (hint) {
      hint.textContent = todayOnly
        ? "Скрыты остальные дни · нажмите ещё раз, чтобы показать все"
        : "Показать все 17 дней";
    }
  }

  function setupTodayOnly() {
    const btn = $("#todayOnlyBtn");
    if (!btn) return;
    applyTodayOnly();
    // Во время поездки сразу раскрыть сегодняшний день
    if (todayOnly && isDuringTrip()) {
      const card = document.querySelector(`.day[data-index="${focusDayIndex()}"]`);
      if (card) card.classList.add("open");
    }
    btn.addEventListener("click", () => {
      todayOnly = !todayOnly;
      try { localStorage.setItem(TODAY_ONLY_KEY, todayOnly ? "1" : "0"); } catch (e) {}
      applyTodayOnly();
      if (todayOnly) {
        const card = document.querySelector(`.day[data-index="${focusDayIndex()}"]`);
        if (card) {
          card.classList.add("open");
          card.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
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

  // ======================= МОДАЛКА + МАРШРУТ ИЗ ДОМА =======================
  function gmapsLink(p) {
    if (p.lat != null && p.lng != null) {
      return `https://www.google.com/maps/search/?api=1&query=${p.lat},${p.lng}`;
    }
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((p.maps || p.name) + " Osaka")}`;
  }

  /** 2. Маршрут из квартиры → место (метро/пешком в Google Maps). */
  function directionsFromHome(p) {
    const h = TRIP.home || {};
    const origin = (h.lat != null && h.lng != null)
      ? `${h.lat},${h.lng}`
      : encodeURIComponent(h.maps || "Tanimachi 6-chome Osaka");
    const destination = (p.lat != null && p.lng != null)
      ? `${p.lat},${p.lng}`
      : encodeURIComponent(p.maps || (p.name + " Osaka"));
    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=transit`;
  }

  function openModal(day, p) {
    const body = $("#modalBody");
    const who = WHO[p.who] || WHO.both;
    const rows = [];
    if (p.time)     rows.push(row(p.fixed ? "⏰" : "🕒", p.fixed ? "Забронировано" : "Время", p.time));
    rows.push(row(who.emoji, "Для кого", who.label));
    if (p.how)      rows.push(row("🚉", "Как добраться", p.how));
    if (p.duration) rows.push(row("⏳", "Сколько времени", p.duration));
    if (p.hours)    rows.push(row("🕐", "Часы работы", p.hours + " · ориентир, сверяйте перед визитом"));
    if (p.price)    rows.push(row("💴", "Цена", p.price));
    if (p.food)     rows.push(row("🍜", "Поесть рядом", p.food));
    if (p.tips)     rows.push(row("💡", "Совет", p.tips));

    const tags = (p.tags || []).map(t => {
      const i = interestMap[t];
      return `<span class="tag">${i ? i.emoji + " " + i.label : t}</span>`;
    }).join("");

    const canRoute = p.lat != null || p.maps || p.name;
    const photos = photosFor(p);

    body.innerHTML = `
      <div class="m-emoji">${p.emoji || "📍"}</div>
      <div class="m-title">${p.name}</div>
      <div class="m-desc">День ${day.n} · ${day.date} — ${p.desc || ""}</div>
      ${photos.length ? `
        <div class="m-gallery">
          ${photos.map((src, i) => `
            <button type="button" class="m-gallery__item" data-gidx="${i}">
              <img src="${src}" alt="${p.name}" loading="lazy" decoding="async">
            </button>`).join("")}
        </div>
        <p class="m-gallery__hint">Нажмите фото — на весь экран · свайпните в стороны</p>
      ` : ""}
      <div class="place__tags" style="margin-bottom:16px">${tags}</div>
      <div class="m-grid">${rows.join("")}</div>
      <div class="m-actions">
        ${canRoute ? `<a class="m-btn primary" href="${directionsFromHome(p)}" target="_blank" rel="noopener">🚇 Из дома → сюда</a>` : ""}
        <a class="m-btn ghost" href="${gmapsLink(p)}" target="_blank" rel="noopener">📍 Точка на карте</a>
      </div>
    `;
    bindGalleryClicks(body, photos, p.name);
    const modal = $("#placeModal");
    modal.hidden = false;
    document.body.style.overflow = "hidden";
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
    const g = $("#galleryView");
    if (!g || g.hidden) document.body.style.overflow = "";
  }

  function renderTransitOut() {
    const wrap = $("#transitBody");
    if (!wrap || typeof TRANSIT_OUT === "undefined") return;
    const t = TRANSIT_OUT;
    wrap.innerHTML = `
      <p class="transit__note">${t.note}</p>
      <div class="transit__hotel">
        <div class="transit__hotel-name">🏨 ${t.hotel.name}</div>
        <div class="transit__hotel-meta">${t.hotel.branch} · ${t.hotel.nights}</div>
        <p class="transit__hotel-tip">${t.hotel.tip}</p>
      </div>
      <div class="transit__steps">
        ${t.steps.map((s, i) => `
          <div class="transit__step">
            <div class="transit__n">${i + 1}</div>
            <div>
              <div class="transit__time">${s.t}</div>
              <div class="transit__title">${s.title}</div>
              <div class="transit__d">${s.d}</div>
            </div>
          </div>`).join("")}
      </div>
      <a class="transit__link" href="#route">Дальше → день 1 в Осаке</a>
    `;
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
    { e: "💳", t: "Mobile PASMO", d: "На обоих iPhone: пополнить ~15 000 ¥ — метро, JR, автобусы и конбини." },
    { e: "📶", t: "eSIM", d: "Установите профиль eSIM дома. Активацию (включить линию) удобнее в KIX на Wi‑Fi аэропорта — так и в чек-листе." },
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

  // ======================= ЧЕКЛИСТ ПОДГОТОВКИ =======================
  const CL_KEY = "japan2026.checklist.v2";
  const CL_DONE_DEFAULT = { abeno: true, cash: true }; // уже закрыто по факту

  function storageAvailable() {
    try {
      const k = "__jp2026_test__";
      localStorage.setItem(k, "1");
      localStorage.removeItem(k);
      return true;
    } catch (e) {
      return false;
    }
  }

  function loadChecklistState() {
    try {
      const raw = localStorage.getItem(CL_KEY);
      if (raw) return JSON.parse(raw) || {};
    } catch (e) {}
    return { ...CL_DONE_DEFAULT };
  }

  function saveChecklistState() {
    const ok = storageAvailable();
    if (!ok) {
      flashClSave("⚠️ Не сохраняется (режим инкогнито?)");
      return false;
    }
    try {
      localStorage.setItem(CL_KEY, JSON.stringify(clState));
      flashClSave("✓ Сохранено на этом устройстве");
      return true;
    } catch (e) {
      flashClSave("⚠️ Ошибка сохранения");
      return false;
    }
  }

  let clSaveTimer = null;
  function flashClSave(msg) {
    const label = $("#clProgressLabel");
    if (!label) return;
    const base = label.dataset.base || label.textContent;
    label.dataset.base = base;
    label.textContent = msg;
    clearTimeout(clSaveTimer);
    clSaveTimer = setTimeout(() => {
      label.textContent = label.dataset.base || base;
    }, 1600);
  }

  let clState = loadChecklistState();

  function collectClIds() {
    const ids = [];
    CHECKLIST.forEach(g => g.items.forEach(it => {
      if (it.sub && it.sub.length) it.sub.forEach(s => ids.push(s.id));
      else if (it.id) ids.push(it.id);
    }));
    return ids;
  }

  function updateClProgress() {
    const ids = collectClIds();
    const done = ids.filter(id => clState[id]).length;
    const pct = ids.length ? Math.round(done / ids.length * 100) : 0;
    const bar = $("#clBarFill");
    const label = $("#clProgressLabel");
    const text = `${done} из ${ids.length} выполнено · ${pct}%`;
    if (bar) bar.style.width = pct + "%";
    if (label) {
      label.textContent = text;
      label.dataset.base = text;
    }
  }

  function makeCheckItem(id, text) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "cl-item" + (clState[id] ? " done" : "");
    btn.setAttribute("aria-pressed", clState[id] ? "true" : "false");
    const box = el("span", "cl-box", clState[id] ? "✓" : "");
    const txt = el("span", "cl-text", text);
    btn.append(box, txt);

    const toggle = () => {
      const next = !clState[id];
      clState[id] = next;
      btn.classList.toggle("done", next);
      btn.setAttribute("aria-pressed", next ? "true" : "false");
      box.textContent = next ? "✓" : "";
      updateClProgress();
      saveChecklistState();
    };

    btn.addEventListener("click", toggle);
    return btn;
  }

  function renderChecklist() {
    const wrap = $("#checklist-body");
    if (!wrap || typeof CHECKLIST === "undefined") return;
    wrap.innerHTML = "";
    CHECKLIST.forEach((g, gi) => {
      const group = el("div", "cl-group fold-group");
      const head = document.createElement("button");
      head.type = "button";
      head.className = `cl-step cl-step--${g.tone} fold-group__btn`;
      head.innerHTML = `<span class="cl-step__tag">${g.step}</span><span class="fold-group__label">${g.title}</span><span class="fold-group__chevron">▾</span>`;
      const list = el("div", "cl-list fold-group__panel");
      list.hidden = true;
      g.items.forEach(it => {
        if (it.sub && it.sub.length) {
          list.appendChild(el("div", "cl-subhead", it.text));
          const subwrap = el("div", "cl-sub");
          it.sub.forEach(s => subwrap.appendChild(makeCheckItem(s.id, s.text)));
          list.appendChild(subwrap);
        } else if (it.id) {
          list.appendChild(makeCheckItem(it.id, it.text));
        }
      });
      bindGroupFold(group, head, list, `cl-${gi}`, gi === 0);
      group.append(head, list);
      wrap.appendChild(group);
    });
    updateClProgress();
    if (!storageAvailable()) {
      flashClSave("⚠️ Галочки не сохранятся — откройте не в инкогнито");
    }
  }

  // ======================= ЧЕК-ЛИСТ ПЕРЕД ПОЕЗДКОЙ =======================
  const PACK_KEY = "japan2026.packing.ru-depart.v2";
  let packState = {};
  try { packState = JSON.parse(localStorage.getItem(PACK_KEY)) || {}; } catch (e) { packState = {}; }

  function savePackState() {
    try { localStorage.setItem(PACK_KEY, JSON.stringify(packState)); } catch (e) {}
  }

  function packingIds() {
    const ids = [];
    if (typeof PACKING === "undefined") return ids;
    PACKING.forEach(g => g.items.forEach(it => {
      if (it.sub && it.sub.length) it.sub.forEach(s => ids.push(s.id));
      else if (it.id) ids.push(it.id);
    }));
    return ids;
  }

  function updatePackProgress() {
    const ids = packingIds();
    const done = ids.filter(id => packState[id]).length;
    const pct = ids.length ? Math.round(done / ids.length * 100) : 0;
    const bar = $("#packBarFill");
    const label = $("#packProgressLabel");
    if (bar) bar.style.width = pct + "%";
    if (label) label.textContent = `${done} из ${ids.length} · ${pct}%`;
  }

  function makePackItem(id, text) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "cl-item" + (packState[id] ? " done" : "");
    const box = document.createElement("span");
    box.className = "cl-box";
    box.textContent = packState[id] ? "✓" : "";
    const txt = document.createElement("span");
    txt.className = "cl-text";
    txt.textContent = text;
    btn.append(box, txt);
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      packState[id] = !packState[id];
      btn.classList.toggle("done", !!packState[id]);
      box.textContent = packState[id] ? "✓" : "";
      savePackState();
      updatePackProgress();
    });
    return btn;
  }

  function renderPacking() {
    const wrap = $("#packingBody");
    if (!wrap) return;
    if (typeof PACKING === "undefined") {
      wrap.innerHTML = `<p class="qr-empty">Список не загрузился. Обновите страницу или откройте сайт заново.</p>`;
      return;
    }
    wrap.innerHTML = "";
    PACKING.forEach((g, gi) => {
      const group = el("div", "pack-group fold-group");
      const head = document.createElement("button");
      head.type = "button";
      head.className = "pack-group__head fold-group__btn";
      head.innerHTML = `<span class="fold-group__label">${g.title}</span><span class="fold-group__chevron">▾</span>`;
      const list = el("div", "pack-group__list fold-group__panel");
      list.hidden = true;
      g.items.forEach(it => {
        if (it.sub && it.sub.length) {
          list.appendChild(el("div", "cl-subhead", it.text));
          const subwrap = el("div", "cl-sub");
          it.sub.forEach(s => subwrap.appendChild(makePackItem(s.id, s.text)));
          list.appendChild(subwrap);
        } else if (it.id) {
          list.appendChild(makePackItem(it.id, it.text));
        }
      });
      bindGroupFold(group, head, list, `pack-${g.id || gi}`, false);
      group.append(head, list);
      wrap.appendChild(group);
    });
    updatePackProgress();
  }

  // ======================= ВЫКИДУШКИ (сворачиваемые блоки) =======================
  const FOLD_KEY = "japan2026.folds.v1";
  const GROUP_FOLD_KEY = "japan2026.groupFolds.v1";
  let foldState = {};
  let groupFoldState = {};
  try { foldState = JSON.parse(localStorage.getItem(FOLD_KEY)) || {}; } catch (e) { foldState = {}; }
  try { groupFoldState = JSON.parse(localStorage.getItem(GROUP_FOLD_KEY)) || {}; } catch (e) { groupFoldState = {}; }

  function saveFolds() {
    try { localStorage.setItem(FOLD_KEY, JSON.stringify(foldState)); } catch (e) {}
  }
  function saveGroupFolds() {
    try { localStorage.setItem(GROUP_FOLD_KEY, JSON.stringify(groupFoldState)); } catch (e) {}
  }

  function setSectionOpen(sec, open) {
    if (!sec) return;
    const btn = sec.querySelector(":scope > .fold__btn");
    const panel = sec.querySelector(":scope > .fold__panel");
    if (!btn || !panel) return;
    sec.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    panel.hidden = !open;
    if (open && sec.id === "map" && typeof map !== "undefined" && map) {
      setTimeout(() => { try { map.invalidateSize(); } catch (e) {} }, 180);
    }
  }

  function openSection(id) {
    const sec = document.getElementById(id);
    if (!sec || !sec.classList.contains("fold")) return;
    setSectionOpen(sec, true);
    foldState[id] = true;
    saveFolds();
  }

  function setupSectionFolds() {
    $$("main > .section.fold").forEach(sec => {
      const id = sec.id;
      const btn = sec.querySelector(":scope > .fold__btn");
      if (!btn || btn.dataset.ready) return;
      btn.dataset.ready = "1";

      const defOpen = sec.dataset.fold === "open";
      const open = foldState[id] !== undefined ? !!foldState[id] : defOpen;
      setSectionOpen(sec, open);

      btn.addEventListener("click", () => {
        const next = !sec.classList.contains("is-open");
        setSectionOpen(sec, next);
        foldState[id] = next;
        saveFolds();
      });
    });

    // Пункт меню сразу раскрывает нужный блок
    $$(".nav__links a[href^='#']").forEach(a => {
      a.addEventListener("click", () => {
        const id = (a.getAttribute("href") || "").slice(1);
        if (id) openSection(id);
      });
    });

    const hash = (location.hash || "").replace("#", "");
    if (hash) openSection(hash);
  }

  function bindGroupFold(group, head, panel, key, defaultOpen) {
    const open = groupFoldState[key] !== undefined ? !!groupFoldState[key] : !!defaultOpen;
    group.classList.toggle("is-open", open);
    panel.hidden = !open;
    head.setAttribute("aria-expanded", open ? "true" : "false");
    head.addEventListener("click", () => {
      const next = !group.classList.contains("is-open");
      group.classList.toggle("is-open", next);
      panel.hidden = !next;
      head.setAttribute("aria-expanded", next ? "true" : "false");
      groupFoldState[key] = next;
      saveGroupFolds();
    });
  }

  function setupComfort() {
    const btn = $("#comfortToggle");
    if (!btn) return;
    let on = false;
    try { on = localStorage.getItem("japan2026.comfort") === "1"; } catch (e) {}
    const apply = () => {
      document.body.classList.toggle("comfort", on);
      btn.classList.toggle("is-on", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      btn.textContent = on ? "Aa ✓" : "Aa";
    };
    apply();
    btn.addEventListener("click", () => {
      on = !on;
      try { localStorage.setItem("japan2026.comfort", on ? "1" : "0"); } catch (e) {}
      apply();
    });
  }

  // ======================= ЯПОНСКИЕ ФРАЗЫ =======================
  let activePhraseCat = "basics";

  function renderPhrases() {
    const tabs = $("#phraseTabs");
    const grid = $("#phraseGrid");
    if (!tabs || !grid || typeof PHRASES === "undefined") return;
    tabs.innerHTML = "";
    grid.innerHTML = "";

    PHRASES.forEach(cat => {
      const tab = el("button", "chip" + (cat.key === activePhraseCat ? " active" : ""),
        `<span class="emo">${cat.emoji}</span>${cat.title}`);
      tab.type = "button";
      tab.addEventListener("click", () => {
        activePhraseCat = cat.key;
        renderPhrases();
      });
      tabs.appendChild(tab);
    });

    const cat = PHRASES.find(c => c.key === activePhraseCat) || PHRASES[0];
    cat.cards.forEach(card => {
      const node = el("button", "phrase-card");
      node.type = "button";
      node.innerHTML = `
        <div class="phrase-card__jp">${card.jp}</div>
        <div class="phrase-card__reading">${card.reading}</div>
        <div class="phrase-card__ru">${card.ru}</div>
        ${card.tip ? `<div class="phrase-card__tip">💡 ${card.tip}</div>` : ""}
      `;
      node.addEventListener("click", () => node.classList.toggle("open"));
      grid.appendChild(node);
    });
  }

  // ======================= КАРТА (Leaflet) — безопасно =======================
  function renderMapSafe() {
    try {
      if (typeof L === "undefined") {
        const mapEl = $("#leafletMap");
        if (mapEl) mapEl.innerHTML = "<p style='padding:20px;color:#a2a2ad;text-align:center'>Карта временно недоступна (нет сети или блокировка CDN).</p>";
        return;
      }
      renderMap();
    } catch (err) {
      console.warn("Map failed:", err);
      const mapEl = $("#leafletMap");
      if (mapEl) mapEl.innerHTML = "<p style='padding:20px;color:#a2a2ad;text-align:center'>Карта не загрузилась — остальной путеводитель работает.</p>";
    }
  }

  // ======================= ДОМ + SOS =======================
  function renderHomeSos() {
    const wrap = $("#homeSos");
    if (!wrap || !TRIP.home) return;
    const h = TRIP.home;
    const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.maps)}`;

    const taxiLine = `この住所までお願いします。\n${h.ja}`;

    wrap.innerHTML = `
      <div class="hs-card">
        <div class="hs-card__title">🏠 ${h.title}</div>
        <p class="hs-card__text">${h.tip}</p>
        <div class="hs-card__zh" id="homeJa">${h.ja}</div>
        <div class="hs-card__text" style="margin-top:-4px">${h.en}</div>
        <div class="hs-actions">
          <button type="button" class="hs-btn" id="copyHomeJa">📋 Копировать адрес</button>
          <button type="button" class="hs-btn hs-btn--ghost" id="copyTaxi">🚕 Фраза для такси</button>
          <a class="hs-btn hs-btn--ghost" href="${maps}" target="_blank" rel="noopener">📍 Google Maps</a>
        </div>
      </div>
      <div class="hs-card hs-card--sos">
        <div class="hs-card__title">🆘 Экстренные номера (Япония)</div>
        <div class="hs-nums">
          <a class="hs-num" href="tel:110"><b>110</b><span>Полиция</span></a>
          <a class="hs-num" href="tel:119"><b>119</b><span>Скорая / пожарные</span></a>
          <a class="hs-num" href="tel:+81668483451"><b>+81-6-6848-3451</b><span>Консульство РФ · Осака</span></a>
          <a class="hs-num" href="tel:+818083166088"><b>+81-80-8316-6088</b><span>Консульство · экстренный</span></a>
        </div>
        <p class="hs-card__text" style="margin-top:12px;margin-bottom:8px">
          Покажите паспорт и адрес на экране. В аптеке: «薬局» (яккёку) / drugstore, или Maps → pharmacy.
          Консульство РФ в Осаке: <a href="https://osaka.kdmid.ru/" target="_blank" rel="noopener">osaka.kdmid.ru</a>.
        </p>
        <p class="hs-card__text" style="margin-bottom:0">
          Страховка / ассистанс: <a href="#" id="insuranceAssistLink">добавить ссылку на полис</a>
          (фото полиса и номер ассистанса — в телефоне).
        </p>
      </div>
      <div class="hs-card">
        <div class="hs-card__title">🎒 На каждый день</div>
        <p class="hs-card__text" style="margin-bottom:0">
          PASMO · пауэрбанк · паспорт (для tax-free) · салфетки · вода · зарядка телефона на 100% перед USJ / дальними днями.
        </p>
      </div>
    `;

    const bindCopy = (sel, text, okLabel, idleLabel) => {
      const btn = $(sel);
      if (!btn) return;
      btn.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(text);
          btn.textContent = okLabel;
          setTimeout(() => { btn.textContent = idleLabel; }, 1600);
        } catch (e) {
          prompt("Скопируйте:", text);
        }
      });
    };
    bindCopy("#copyHomeJa", h.ja + "\n" + h.en, "✓ Скопировано", "📋 Копировать адрес");
    bindCopy("#copyTaxi", taxiLine, "✓ Скопировано", "🚕 Фраза для такси");
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

  // ======================= СЕГОДНЯ / ЗАВТРА =======================
  function dayIndexByN(n) {
    return TRIP.days.findIndex(d => d.n === n);
  }

  function tripFocus(now = new Date()) {
    const { y, m, d } = tokyoYmd(now);
    const curUtc = Date.UTC(y, m - 1, d);
    const startUtc = Date.UTC(2026, 8, 9);
    const endUtc = Date.UTC(2026, 8, 25);
    const ms = 86400000;

    if (curUtc < startUtc) {
      return { mode: "before", daysLeft: Math.round((startUtc - curUtc) / ms), todayIdx: dayIndexByN(1), tomorrowIdx: dayIndexByN(2) };
    }
    if (curUtc > endUtc) {
      return { mode: "after" };
    }
    const n = Math.round((curUtc - startUtc) / ms) + 1; // 9 сент → день 1
    const todayIdx = dayIndexByN(n);
    const tomorrowIdx = n < 17 ? dayIndexByN(n + 1) : -1;
    return { mode: "during", todayIdx, tomorrowIdx };
  }

  function openDayInTimeline(idx) {
    if (idx < 0) return;
    openSection("route");
    const card = document.querySelector(`.day[data-index="${idx}"]`);
    if (!card) return;
    card.classList.add("open");
    card.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function nextDayCard(label, idx, tone) {
    const day = TRIP.days[idx];
    if (!day) return "";
    const brief = (typeof DAY_BRIEFS !== "undefined" && DAY_BRIEFS[day.n]) || null;
    const briefHtml = brief ? `
      <div class="day-brief day-brief--compact">
        <div class="day-brief__row"><span class="day-brief__k">Главное</span><span class="day-brief__v">${brief.main}</span></div>
        <div class="day-brief__row"><span class="day-brief__k">Выходить</span><span class="day-brief__v">${brief.leave}</span></div>
        <div class="day-brief__row"><span class="day-brief__k">Не забыть</span><span class="day-brief__v">${brief.remember}</span></div>
      </div>` : `<div class="next-day__goal">${day.goal || ""}</div>`;
    return `
      <article class="next-day__card next-day__card--${tone}">
        <div class="next-day__label">${label}</div>
        <div class="next-day__date">${day.date} · ${day.weekday}</div>
        <div class="next-day__title">${day.title}</div>
        ${briefHtml}
        <button type="button" class="next-day__btn" data-open-day="${idx}">Открыть день</button>
      </article>
    `;
  }

  function renderNextDay() {
    const wrap = $("#nextDay");
    if (!wrap) return;
    const focus = tripFocus();

    if (focus.mode === "after") {
      wrap.innerHTML = `<div class="next-day__empty">Поездка уже позади. Хороших воспоминаний 🌸</div>`;
      return;
    }

    let html = "";
    if (focus.mode === "before") {
      html += `<div class="next-day__countdown">До вылета в Осаку: <b>${focus.daysLeft}</b> ${pluralDays(focus.daysLeft)}</div>`;
      html += nextDayCard("Старт · день 1", focus.todayIdx, "today");
      if (focus.tomorrowIdx >= 0) html += nextDayCard("Потом · день 2", focus.tomorrowIdx, "tomorrow");
    } else {
      html += nextDayCard("СЕГОДНЯ", focus.todayIdx, "today");
      if (focus.tomorrowIdx >= 0) html += nextDayCard("ЗАВТРА", focus.tomorrowIdx, "tomorrow");
      else html += `<div class="next-day__empty">Последний день в Японии — дальше Китай 🇨🇳</div>`;
    }

    const focusDay = focus.todayIdx >= 0 ? TRIP.days[focus.todayIdx] : null;
    if (focusDay && focusDay.n === 7) {
      html += `
        <div class="next-day__usj">
          <div class="next-day__usj-title">⚡ USJ сегодня · слот Nintendo 11:50 · билеты в приложении</div>
        </div>`;
    }

    wrap.innerHTML = html;
    wrap.querySelectorAll("[data-open-day]").forEach(btn => {
      btn.addEventListener("click", () => openDayInTimeline(Number(btn.dataset.openDay)));
    });
  }

  function pluralDays(n) {
    const a = Math.abs(n) % 100;
    const b = a % 10;
    if (a > 10 && a < 20) return "дней";
    if (b === 1) return "день";
    if (b >= 2 && b <= 4) return "дня";
    return "дней";
  }

  // ======================= ДЕНЬГИ / БЮДЖЕТ =======================
  function renderBudget() {
    const wrap = $("#budgetBody");
    if (!wrap || typeof BUDGET === "undefined") return;
    const b = BUDGET;
    wrap.innerHTML = `
      <div class="wx-card wx-card--hero">
        <div class="wx-card__title">${b.title}</div>
        <p class="wx-card__text">${b.note}</p>
        <p class="wx-card__text">${b.rateNote}</p>
      </div>
      <div class="budget-hero">
        <div class="budget-hero__num">${b.calm.perDay}</div>
        <div class="budget-hero__who">${b.calm.who}</div>
        <p class="budget-hero__text">${b.calm.meaning}</p>
        <p class="budget-hero__reserve">${b.calm.reserve}</p>
      </div>
      <div class="wx-card">
        <div class="wx-card__title">📌 Правило</div>
        <p class="wx-card__text">${b.rule}</p>
      </div>
      <div class="wx-grid budget-grid">
        ${b.envelopes.map(x => `
          <div class="wx-card">
            <div class="wx-card__title">${x.e} ${x.t}</div>
            <p class="wx-card__text">${x.d}</p>
          </div>`).join("")}
      </div>
      <div class="wx-card">
        <div class="wx-card__title">📅 По типам дней</div>
        <ul class="wx-list">
          ${b.dayTypes.map(x => `<li><b>${x.t}:</b> ${x.d}</li>`).join("")}
        </ul>
      </div>
      <div class="wx-card">
        <div class="wx-card__title">💱 Если меняете сразу</div>
        <ul class="wx-list">
          ${b.exchange.map(i => `<li>${i}</li>`).join("")}
        </ul>
      </div>
      <div class="wx-card wx-card--rain">
        <div class="wx-card__title">✅ Проверка раз в 3 дня</div>
        <p class="wx-card__text">${b.check}</p>
      </div>
    `;
  }

  // ======================= 1. ПОГОДА =======================
  function renderWeather() {
    const wrap = $("#weatherBody");
    if (!wrap || typeof WEATHER === "undefined") return;
    const w = WEATHER;
    wrap.innerHTML = `
      <div class="wx-card wx-card--hero">
        <div class="wx-card__title">${w.title}</div>
        <p class="wx-card__text">${w.summary}</p>
        <a class="wx-link" href="${w.forecastUrl}" target="_blank" rel="noopener">Актуальный прогноз Осаки →</a>
      </div>
      <div class="wx-grid">
        ${w.feel.map(x => `
          <div class="wx-card">
            <div class="wx-card__title">${x.e} ${x.t}</div>
            <p class="wx-card__text">${x.d}</p>
          </div>`).join("")}
      </div>
      <div class="wx-card">
        <div class="wx-card__title">👕 Что надеть</div>
        <ul class="wx-list">${w.wear.map(i => `<li>${i}</li>`).join("")}</ul>
      </div>
      <div class="wx-card wx-card--rain">
        <div class="wx-card__title">☔ Если дождь — план Б</div>
        <div class="wx-rain">
          ${w.rainPlans.map(r => `
            <div class="wx-rain__item">
              <b>${r.e} ${r.t}</b>
              <span>${r.d}</span>
            </div>`).join("")}
        </div>
      </div>
    `;
  }

  // ======================= 8. РЯДОМ С ДОМОМ =======================
  let nearbyFilter = "all";

  function renderNearby() {
    const wrap = $("#nearbyGrid");
    const filters = $("#nearbyFilters");
    if (!wrap || typeof NEARBY === "undefined") return;

    if (filters && !filters.dataset.ready) {
      const cats = [
        { key: "all", label: "Всё" },
        { key: "konbini", label: "7️⃣ Конбини" },
        { key: "pharmacy", label: "💊 Аптеки" },
        { key: "charge", label: "🔋 Зарядка" }
      ];
      cats.forEach(c => {
        const b = el("button", "chip" + (c.key === "all" ? " active" : ""), c.label);
        b.type = "button";
        b.addEventListener("click", () => {
          nearbyFilter = c.key;
          $$("#nearbyFilters .chip").forEach(x => x.classList.remove("active"));
          b.classList.add("active");
          paintNearby();
        });
        filters.appendChild(b);
      });
      filters.dataset.ready = "1";
    }
    paintNearby();
  }

  function paintNearby() {
    const wrap = $("#nearbyGrid");
    if (!wrap) return;
    wrap.innerHTML = "";
    NEARBY.filter(n => nearbyFilter === "all" || n.cat === nearbyFilter).forEach(n => {
      const card = el("div", "nearby-card");
      card.innerHTML = `
        <div class="nearby-card__emoji">${n.emoji}</div>
        <div class="nearby-card__body">
          <div class="nearby-card__name">${n.name}</div>
          <div class="nearby-card__where">${n.where}</div>
          <p class="nearby-card__d">${n.d}</p>
          <div class="nearby-card__actions">
            <a class="hs-btn" href="${directionsFromHome(n)}" target="_blank" rel="noopener">🚇 Из дома</a>
            <a class="hs-btn hs-btn--ghost" href="${gmapsLink(n)}" target="_blank" rel="noopener">📍 Карта</a>
          </div>
        </div>
      `;
      wrap.appendChild(card);
    });
  }

  // ======================= INIT =======================
  function init() {
    setupSectionFolds();
    renderStats();
    renderNextDay();
    renderTransitOut();
    renderBudget();
    renderNearby();
    renderWeather();
    renderFilters();
    renderTimeline();
    setupTodayOnly();
    renderHomeSos();
    renderChecklist();
    renderPacking();
    renderPhrases();
    renderTips();
    setupEdit();
    setupModal();
    setupGallery();
    setupComfort();
    setupScrollProgress();
    renderMapSafe();
    observeReveals();
    highlightToday();
  }

  // Подсветка «сегодня», если дата устройства совпадает с днём поездки (сент 2026).
  function highlightToday() {
    const focus = tripFocus();
    if (focus.mode !== "during" || focus.todayIdx < 0) return;
    const card = document.querySelector(`.day[data-index="${focus.todayIdx}"]`);
    if (!card) return;
    card.classList.add("day--today");
    const dateEl = card.querySelector(".day__date");
    if (dateEl && !dateEl.textContent.includes("СЕГОДНЯ")) {
      dateEl.insertAdjacentHTML("beforeend", ` <span class="day__today-badge">СЕГОДНЯ</span>`);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
