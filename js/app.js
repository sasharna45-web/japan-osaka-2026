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

    card.innerHTML = `
      <div class="place__top">
        <div class="place__emoji">${place.emoji || "📍"}</div>
        <div>
          <div class="place__name">${place.name} ${whoBadge}</div>
          <div class="place__desc">${place.desc || ""}</div>
        </div>
      </div>
      ${place.hours ? `<div class="place__hours"><span>🕐</span><span>${place.hours}</span></div>` : ""}
      <div class="place__tags">${timeBadge}${durBadge}${tagsHtml}</div>
    `;
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
    if (p.hours)    rows.push(row("🕐", "Часы работы", p.hours + " · ориентир, сверяйте перед визитом"));
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
    CHECKLIST.forEach(g => {
      const group = el("div", "cl-group");
      group.appendChild(el("div", `cl-step cl-step--${g.tone}`,
        `<span class="cl-step__tag">${g.step}</span>${g.title}`));
      const list = el("div", "cl-list");
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
      group.appendChild(list);
      wrap.appendChild(group);
    });
    updateClProgress();
    if (!storageAvailable()) {
      flashClSave("⚠️ Галочки не сохранятся — откройте не в инкогнито");
    }
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
        </div>
        <p class="hs-card__text" style="margin-top:12px;margin-bottom:0">
          Покажите паспорт и адрес на экране. В аптеке: «薬局» (яккёку) / drugstore, или Maps → pharmacy.
          Страховку держите в телефоне (фото полиса).
        </p>
      </div>
      <div class="hs-card">
        <div class="hs-card__title">🎒 На каждый день</div>
        <p class="hs-card__text" style="margin-bottom:0">
          ICOCA · пауэрбанк · паспорт (для tax-free) · салфетки · вода · зарядка телефона на 100% перед USJ / дальними днями.
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
    const y = now.getFullYear();
    const m = now.getMonth();
    const d = now.getDate();
    const start = new Date(2026, 8, 9);
    const end = new Date(2026, 8, 25);
    const cur = new Date(y, m, d);
    const ms = 86400000;

    if (cur < start) {
      return { mode: "before", daysLeft: Math.round((start - cur) / ms), todayIdx: dayIndexByN(1), tomorrowIdx: dayIndexByN(2) };
    }
    if (cur > end) {
      return { mode: "after" };
    }
    const n = d - 8; // 9 сент → день 1
    const todayIdx = dayIndexByN(n);
    const tomorrowIdx = n < 17 ? dayIndexByN(n + 1) : -1;
    return { mode: "during", todayIdx, tomorrowIdx };
  }

  function openDayInTimeline(idx) {
    if (idx < 0) return;
    const card = document.querySelector(`.day[data-index="${idx}"]`);
    if (!card) return;
    card.classList.add("open");
    card.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function nextDayCard(label, idx, tone) {
    const day = TRIP.days[idx];
    if (!day) return "";
    const places = (day.places || []).slice(0, 4).map(p =>
      `<span class="next-day__chip">${p.emoji || "📍"} ${p.name}${p.time ? " · " + p.time : ""}</span>`
    ).join("");
    return `
      <article class="next-day__card next-day__card--${tone}">
        <div class="next-day__label">${label}</div>
        <div class="next-day__date">${day.date} · ${day.weekday}</div>
        <div class="next-day__title">${day.title}</div>
        <div class="next-day__goal">${day.goal || ""}</div>
        <div class="next-day__places">${places}</div>
        <button type="button" class="next-day__btn" data-open-day="${idx}">Открыть день →</button>
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

  // ======================= ПЕРВЫЙ ЧАС KIX =======================
  function renderKixSteps() {
    const wrap = $("#kixSteps");
    if (!wrap || typeof FIRST_HOUR_KIX === "undefined") return;
    wrap.innerHTML = "";
    FIRST_HOUR_KIX.forEach(s => {
      wrap.appendChild(el("div", "kix-step", `
        <div class="kix-step__n">${s.n}</div>
        <div>
          <div class="kix-step__t">${s.t}</div>
          <div class="kix-step__d">${s.d}</div>
        </div>
      `));
    });
  }

  // ======================= БИЛЕТЫ / QR (IndexedDB) =======================
  const TICKETS_DB = "japan2026.tickets.v1";
  const TICKETS_STORE = "photos";

  function openTicketsDb() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(TICKETS_DB, 1);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(TICKETS_STORE)) {
          db.createObjectStore(TICKETS_STORE, { keyPath: "id" });
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  function ticketGet(id) {
    return openTicketsDb().then(db => new Promise((resolve, reject) => {
      const tx = db.transaction(TICKETS_STORE, "readonly");
      const req = tx.objectStore(TICKETS_STORE).get(id);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    }));
  }

  function ticketPut(record) {
    return openTicketsDb().then(db => new Promise((resolve, reject) => {
      const tx = db.transaction(TICKETS_STORE, "readwrite");
      tx.objectStore(TICKETS_STORE).put(record);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    }));
  }

  function ticketDel(id) {
    return openTicketsDb().then(db => new Promise((resolve, reject) => {
      const tx = db.transaction(TICKETS_STORE, "readwrite");
      tx.objectStore(TICKETS_STORE).delete(id);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    }));
  }

  function compressImage(file, maxW = 1400, quality = 0.72) {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxW / img.width);
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);
        URL.revokeObjectURL(url);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("Не удалось прочитать фото"));
      };
      img.src = url;
    });
  }

  function openTicketView(dataUrl) {
    const view = $("#ticketView");
    const img = $("#ticketViewImg");
    if (!view || !img) return;
    img.src = dataUrl;
    view.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeTicketView() {
    const view = $("#ticketView");
    const img = $("#ticketViewImg");
    if (!view) return;
    view.hidden = true;
    if (img) img.removeAttribute("src");
    document.body.style.overflow = "";
  }

  function setupTicketView() {
    const close = $("#ticketViewClose");
    const view = $("#ticketView");
    if (close) close.addEventListener("click", closeTicketView);
    if (view) view.addEventListener("click", (e) => {
      if (e.target === view) closeTicketView();
    });
  }

  async function renderTickets() {
    const wrap = $("#ticketsGrid");
    if (!wrap || typeof TICKET_SLOTS === "undefined") return;
    wrap.innerHTML = "";

    for (const slot of TICKET_SLOTS) {
      const saved = await ticketGet(slot.id).catch(() => null);
      const card = el("div", "ticket-card" + (saved ? " has-photo" : ""));
      card.innerHTML = `
        <div class="ticket-card__head">
          <span class="ticket-card__emoji">${slot.emoji}</span>
          <span class="ticket-card__name">${slot.name}</span>
        </div>
        <div class="ticket-card__preview">
          ${saved
            ? `<img src="${saved.dataUrl}" alt="${slot.name}">`
            : `<span class="ticket-card__empty">Нет фото</span>`}
        </div>
        <div class="ticket-card__actions">
          <label class="ticket-card__btn">
            ${saved ? "↻ Заменить" : "+ Добавить"}
            <input type="file" accept="image/*" hidden data-slot="${slot.id}">
          </label>
          ${saved ? `
            <button type="button" class="ticket-card__btn ticket-card__btn--primary" data-view="${slot.id}">Показать</button>
            <button type="button" class="ticket-card__btn ticket-card__btn--danger" data-del="${slot.id}">Удалить</button>
          ` : ""}
        </div>
      `;

      const input = card.querySelector('input[type="file"]');
      input.addEventListener("change", async () => {
        const file = input.files && input.files[0];
        if (!file) return;
        try {
          const dataUrl = await compressImage(file);
          await ticketPut({ id: slot.id, name: slot.name, dataUrl, ts: Date.now() });
          renderTickets();
        } catch (e) {
          alert("Не удалось сохранить фото. Попробуйте другое изображение.");
        }
      });

      const viewBtn = card.querySelector("[data-view]");
      if (viewBtn) {
        viewBtn.addEventListener("click", async () => {
          const rec = await ticketGet(slot.id);
          if (rec) openTicketView(rec.dataUrl);
        });
      }
      const preview = card.querySelector(".ticket-card__preview");
      if (saved && preview) {
        preview.addEventListener("click", () => openTicketView(saved.dataUrl));
      }
      const delBtn = card.querySelector("[data-del]");
      if (delBtn) {
        delBtn.addEventListener("click", async () => {
          if (!confirm("Удалить это фото?")) return;
          await ticketDel(slot.id);
          renderTickets();
        });
      }

      wrap.appendChild(card);
    }
  }

  // ======================= INIT =======================
  function init() {
    renderStats();
    renderNextDay();
    renderKixSteps();
    renderFilters();
    renderTimeline();
    renderTickets();
    renderHomeSos();
    renderChecklist();
    renderPhrases();
    renderTips();
    setupEdit();
    setupModal();
    setupTicketView();
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
