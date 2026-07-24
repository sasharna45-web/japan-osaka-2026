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

  function renderDays() {
    const wrap = $("#chinaDays");
    if (!wrap) return;
    CHINA.days.forEach(d => {
      const card = el("article", "c-day");
      card.innerHTML = `
        <div class="c-day__head">
          <div class="c-day__num">${d.n}</div>
          <div>
            <div class="c-day__date">${d.date} · ${d.weekday}</div>
            <div class="c-day__title">${d.title}</div>
          </div>
          <div class="c-day__load">${d.load}</div>
        </div>
        <ul class="c-day__list">
          ${d.items.map(i => `<li><strong>${i.t}</strong><span>${i.d}</span></li>`).join("")}
        </ul>
      `;
      wrap.appendChild(card);
    });
  }

  function renderCardGrid(id, items) {
    const wrap = $(id);
    if (!wrap) return;
    items.forEach(x => {
      wrap.appendChild(el("div", "c-card", `
        <div class="c-card__e">${x.e}</div>
        <div>
          <div class="c-card__t">${x.t}</div>
          <div class="c-card__d">${x.d}</div>
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
        ${c.tip ? `<div class="c-phrase__tip">${c.tip}</div>` : ""}
      `;
      card.addEventListener("click", () => card.classList.toggle("is-open"));
      grid.appendChild(card);
    });
  }

  function init() {
    document.body.classList.add("china-slide-in");
    renderDays();
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
