/* Китай · Шанхай — отдельный слайд (не смешивать с Японией) */
(function () {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);

  function el(tag, cls, html) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function mapsUrl(q) {
    return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);
  }

  function renderIntro() {
    const node = $("#chinaIntro");
    if (node && CHINA.intro) node.textContent = CHINA.intro;
  }

  function renderHotel() {
    const wrap = $("#chinaHotel");
    const h = CHINA.hotel;
    if (!wrap || !h) return;

    const card = el("div", "c-hotel");
    card.innerHTML = `
      <div class="c-hotel__badge">🏨 база транзита</div>
      <div class="c-hotel__name">${h.name}</div>
      <div class="c-hotel__branch">${h.branch}</div>
      <div class="c-hotel__zh" id="hotelZh">${h.nameZh}</div>
      <div class="c-hotel__nights">${h.nights}</div>
      <p class="c-hotel__tip">${h.tip}</p>
      <div class="c-hotel__actions">
        <button type="button" class="c-btn" id="copyHotelZh">📋 Копировать китайский адрес</button>
        <a class="c-btn c-btn--ghost" href="${mapsUrl(h.mapsQuery)}" target="_blank" rel="noopener">📍 Google Maps</a>
      </div>
      <div class="c-toast" id="hotelToast" hidden>Скопировано</div>
    `;
    wrap.appendChild(card);

    const btn = $("#copyHotelZh");
    const toast = $("#hotelToast");
    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(h.nameZh);
        toast.hidden = false;
        setTimeout(() => { toast.hidden = true; }, 1600);
      } catch (e) {
        prompt("Скопируйте название:", h.nameZh);
      }
    });
  }

  function renderDays() {
    const wrap = $("#chinaDays");
    if (!wrap) return;

    CHINA.days.forEach((d, idx) => {
      const card = el("article", "c-day" + (d.fixed ? " c-day--fixed" : "") + (idx === 0 ? " is-open" : ""));

      const fixedBadge = d.fixed
        ? `<span class="c-fixed-badge">⏰ ФИКС</span>`
        : "";

      const head = el("button", "c-day__head");
      head.type = "button";
      head.innerHTML = `
        <div class="c-day__num">${d.n}</div>
        <div class="c-day__info">
          <div class="c-day__date">${d.date} · ${d.weekday} ${fixedBadge}</div>
          <div class="c-day__title">${d.title}</div>
          <div class="c-day__goal">${d.goal || ""}</div>
        </div>
        <div class="c-day__load">${d.load}</div>
        <div class="c-day__chev">▾</div>
      `;

      const body = el("div", "c-day__body");
      let html = "";
      if (d.intro) html += `<p class="c-day__intro">${d.intro}</p>`;
      html += `<ul class="c-day__list">`;
      d.items.forEach(i => {
        html += `<li class="${i.fixed ? "is-fixed" : ""}">
          <strong>${i.fixed ? "⏰ " : ""}${i.t}</strong>
          <span>${i.d}</span>
        </li>`;
      });
      html += `</ul>`;

      if (d.options && d.options.length) {
        html += `<div class="c-opts"><div class="c-opts__title">На выбор</div>`;
        d.options.forEach(o => {
          html += `<div class="c-opt"><span>${o.e}</span><div><b>${o.t}</b><p>${o.d}</p></div></div>`;
        });
        html += `</div>`;
      }

      body.innerHTML = html;
      head.addEventListener("click", () => card.classList.toggle("is-open"));
      card.append(head, body);
      wrap.appendChild(card);
    });
  }

  function renderFirstHour() {
    const wrap = $("#chinaFirst");
    if (!wrap || !CHINA.firstHour) return;
    CHINA.firstHour.forEach(s => {
      wrap.appendChild(el("div", "c-step", `
        <div class="c-step__n">${s.n}</div>
        <div>
          <div class="c-step__t">${s.t}</div>
          <div class="c-step__d">${s.d}</div>
        </div>
      `));
    });
  }

  function renderCardGrid(sel, items) {
    const wrap = $(sel);
    if (!wrap || !items) return;
    items.forEach(x => {
      const steps = (x.steps || []).map(s => `<li>${s}</li>`).join("");
      wrap.appendChild(el("div", "c-card" + (x.fixed ? " c-card--fixed" : ""), `
        <div class="c-card__e">${x.e}</div>
        <div>
          <div class="c-card__t">${x.t}${x.fixed ? ' <span class="c-fixed-badge">⏰ ФИКС</span>' : ""}</div>
          <div class="c-card__d">${x.d}</div>
          ${steps ? `<ol class="c-card__steps">${steps}</ol>` : ""}
        </div>
      `));
    });
  }

  let activePhrase = "basics";
  function renderPhrases() {
    const tabs = $("#chinaPhraseTabs");
    const grid = $("#chinaPhraseGrid");
    if (!tabs || !grid) return;
    tabs.innerHTML = "";
    grid.innerHTML = "";

    CHINA.phrases.forEach(cat => {
      const b = el("button", "c-chip" + (cat.key === activePhrase ? " is-on" : ""), cat.title);
      b.type = "button";
      b.addEventListener("click", () => { activePhrase = cat.key; renderPhrases(); });
      tabs.appendChild(b);
    });

    const cat = CHINA.phrases.find(c => c.key === activePhrase) || CHINA.phrases[0];
    cat.cards.forEach(c => {
      const card = el("button", "c-phrase");
      card.type = "button";
      card.innerHTML = `
        <div class="c-phrase__zh">${c.zh}</div>
        <div class="c-phrase__rd">${c.reading}</div>
        <div class="c-phrase__ru">${c.ru}</div>
        ${c.tip ? `<div class="c-phrase__tip">💡 ${c.tip}</div>` : ""}
      `;
      card.addEventListener("click", () => card.classList.toggle("is-open"));
      grid.appendChild(card);
    });
  }

  function setupFolds() {
    const KEY = "japan2026demo.chinaFolds.v1";
    let state = {};
    try { state = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) {}

    function setOpen(sec, open) {
      const btn = sec.querySelector(":scope > .fold__btn");
      const panel = sec.querySelector(":scope > .fold__panel");
      if (!btn || !panel) return;
      sec.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      panel.hidden = !open;
    }

    document.querySelectorAll("main > .c-section.fold").forEach(sec => {
      const id = sec.id;
      const btn = sec.querySelector(":scope > .fold__btn");
      if (!btn || btn.dataset.ready) return;
      btn.dataset.ready = "1";
      const defOpen = sec.dataset.fold === "open";
      const open = state[id] !== undefined ? !!state[id] : defOpen;
      setOpen(sec, open);
      btn.addEventListener("click", () => {
        const next = !sec.classList.contains("is-open");
        setOpen(sec, next);
        state[id] = next;
        try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
      });
    });

    document.querySelectorAll(".c-nav__inner a[href^='#']").forEach(a => {
      a.addEventListener("click", () => {
        const id = (a.getAttribute("href") || "").slice(1);
        const sec = document.getElementById(id);
        if (!sec || !sec.classList.contains("fold")) return;
        setOpen(sec, true);
        state[id] = true;
        try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
      });
    });

    const hash = (location.hash || "").replace("#", "");
    if (hash) {
      const sec = document.getElementById(hash);
      if (sec && sec.classList.contains("fold")) {
        setOpen(sec, true);
        state[hash] = true;
        try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
      }
    }
  }

  function init() {
    if (typeof CHINA === "undefined") return;
    document.body.classList.add("china-slide-in");
    setupFolds();
    renderIntro();
    renderHotel();
    renderDays();
    renderFirstHour();
    renderCardGrid("#chinaPay", CHINA.pay);
    renderCardGrid("#chinaTransport", CHINA.transport);
    renderCardGrid("#chinaCity", CHINA.city);
    renderCardGrid("#chinaSos", CHINA.sos);
    renderPhrases();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
