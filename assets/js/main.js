/* Laboratório Pagel 2.0 — comportamento do site (sem backend). */
(function () {
  "use strict";

  var WA_NUMBER = "5551999098303";
  var COOKIE_KEY = "pagel-cookie-ok";

  function qs(sel, root) { return (root || document).querySelector(sel); }
  function qsa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function initMenu() {
    var toggle = qs(".menu-toggle");
    var nav = qs(".nav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    qsa(".has-sub > .nav-btn").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        if (window.matchMedia("(max-width: 820px)").matches) {
          e.preventDefault();
          btn.parentElement.classList.toggle("is-open");
          btn.setAttribute("aria-expanded", btn.parentElement.classList.contains("is-open") ? "true" : "false");
        }
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  function initHero() {
    var root = qs("[data-hero]");
    if (!root) return;
    var slides = qsa(".hero-slide", root);
    var dots = qsa(".hero-dots button", root);
    var i = 0;
    var timer;
    function show(n) {
      i = (n + slides.length) % slides.length;
      slides.forEach(function (s, idx) {
        s.classList.toggle("is-active", idx === i);
        s.setAttribute("aria-hidden", idx === i ? "false" : "true");
      });
      dots.forEach(function (d, idx) {
        d.setAttribute("aria-current", idx === i ? "true" : "false");
      });
    }
    function play() {
      stop();
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      timer = setInterval(function () { show(i + 1); }, 7000);
    }
    function stop() { if (timer) clearInterval(timer); }
    dots.forEach(function (d, idx) {
      d.addEventListener("click", function () { show(idx); play(); });
    });
    var prev = qs(".hero-nav-btn.prev", root);
    var next = qs(".hero-nav-btn.next", root);
    if (prev) prev.addEventListener("click", function () { show(i - 1); play(); });
    if (next) next.addEventListener("click", function () { show(i + 1); play(); });
    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", play);
    show(0);
    play();
  }

  function initAccordion() {
    qsa("[data-accordion] .acc-btn").forEach(function (btn) {
      var item = btn.closest(".acc-item");
      var panel = qs(".acc-panel", item);
      if (!panel) return;
      var id = panel.id || ("acc-" + Math.random().toString(36).slice(2, 8));
      panel.id = id;
      btn.setAttribute("aria-controls", id);
      btn.setAttribute("aria-expanded", "false");
      btn.addEventListener("click", function () {
        var open = !item.classList.contains("is-open");
        item.classList.toggle("is-open", open);
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      });
    });
  }

  function initSearch() {
    var input = qs("[data-search]");
    var list = qs("[data-search-list]");
    if (!input || !list) return;
    var cards = qsa(".prep-card", list);
    var empty = qs("[data-search-empty]");
    var chips = qsa("[data-filter]");
    var currentFilter = "todos";

    function norm(s) {
      return (s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    function apply() {
      var q = norm(input.value.trim());
      var shown = 0;
      cards.forEach(function (card) {
        var text = norm(card.getAttribute("data-text") || card.textContent);
        var cat = card.getAttribute("data-cat") || "";
        var okCat = currentFilter === "todos" || cat.split(/\s+/).indexOf(currentFilter) !== -1;
        var okQ = !q || text.indexOf(q) !== -1;
        var vis = okCat && okQ;
        card.hidden = !vis;
        if (vis) shown += 1;
      });
      if (empty) empty.hidden = shown !== 0;
    }
    input.addEventListener("input", apply);
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        currentFilter = chip.getAttribute("data-filter") || "todos";
        chips.forEach(function (c) {
          var on = c === chip;
          c.classList.toggle("is-active", on);
          c.setAttribute("aria-pressed", on ? "true" : "false");
        });
        apply();
      });
    });
    apply();
  }

  function initAgendamento() {
    var form = qs("#form-agendamento");
    if (!form) return;
    var tipo = qs("#tipo", form);
    var unidadeWrap = qs("[data-unidade-wrap]", form);
    function toggleUnidade() {
      if (!unidadeWrap || !tipo) return;
      var show = tipo.value === "unidade";
      unidadeWrap.hidden = !show;
      var sel = qs("#unidade", form);
      if (sel) sel.required = show;
    }
    if (tipo) tipo.addEventListener("change", toggleUnidade);
    toggleUnidade();

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var nome = qs("#nome", form).value.trim();
      var tel = qs("#telefone", form).value.trim();
      var tipoVal = tipo.value;
      var unidade = (qs("#unidade", form) && qs("#unidade", form).value) || "";
      var data = (qs("#data", form) && qs("#data", form).value) || "";
      var periodo = (qs("#periodo", form) && qs("#periodo", form).value) || "";
      var obs = (qs("#obs", form) && qs("#obs", form).value.trim()) || "";

      var linhas = [
        "Olá! Gostaria de agendar um atendimento no Laboratório Pagel.",
        "Nome: " + nome,
        "Telefone: " + tel,
        "Tipo: " + (tipoVal === "domiciliar" ? "Coleta domiciliar" : "Coleta na unidade")
      ];
      if (tipoVal === "unidade" && unidade) linhas.push("Unidade: " + unidade);
      if (data) {
        var parts = data.split("-");
        var dataBr = parts.length === 3 ? parts[2] + "/" + parts[1] + "/" + parts[0] : data;
        linhas.push("Data preferida: " + dataBr);
      }
      if (periodo) linhas.push("Período: " + periodo);
      if (obs) linhas.push("Observações: " + obs);
      linhas.push("Por privacidade, não informo o nome do exame nesta mensagem.");

      var url = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(linhas.join("\n"));
      var box = qs("#agendamento-sucesso");
      if (box) {
        box.classList.add("is-visible");
        var link = qs("#agendamento-wa-link", box);
        if (link) link.href = url;
        box.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      window.open(url, "_blank", "noopener");
    });
  }

  function initContato() {
    var form = qs("#form-contato");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var nome = qs("#nome", form).value.trim();
      var email = (qs("#email", form) && qs("#email", form).value.trim()) || "";
      var tel = (qs("#telefone", form) && qs("#telefone", form).value.trim()) || "";
      var unidade = (qs("#unidade", form) && qs("#unidade", form).value) || "";
      var msg = qs("#mensagem", form).value.trim();
      var linhas = [
        "Olá! Mensagem enviada pelo site do Laboratório Pagel.",
        "Nome: " + nome
      ];
      if (email) linhas.push("E-mail: " + email);
      if (tel) linhas.push("WhatsApp: " + tel);
      if (unidade) linhas.push("Unidade: " + unidade);
      linhas.push("Mensagem: " + msg);
      var url = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(linhas.join("\n"));
      var box = qs("#contato-sucesso");
      if (box) {
        box.classList.add("is-visible");
        var link = qs("#contato-wa-link", box);
        if (link) link.href = url;
      }
      window.open(url, "_blank", "noopener");
    });
  }

  function initAvaliacao() {
    var form = qs("#form-avaliacao");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      form.hidden = true;
      var box = qs("#avaliacao-sucesso");
      if (box) {
        box.classList.add("is-visible");
        box.hidden = false;
        box.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  }

  function initCookies() {
    var bar = qs(".cookie");
    if (!bar) return;
    try {
      if (localStorage.getItem(COOKIE_KEY) === "1") return;
    } catch (err) {}
    bar.classList.add("is-visible");
    var btn = qs("[data-cookie-ok]", bar);
    if (btn) {
      btn.addEventListener("click", function () {
        try { localStorage.setItem(COOKIE_KEY, "1"); } catch (err) {}
        bar.classList.remove("is-visible");
      });
    }
  }

  qsa("[data-year]").forEach(function (el) { el.textContent = "2026"; });

  initMenu();
  initHero();
  initAccordion();
  initSearch();
  initAgendamento();
  initContato();
  initAvaliacao();
  initCookies();
})();
