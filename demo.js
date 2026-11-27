(function () {
  var KEY = "zt_demo_v1";
  function load() {
    try { var s = JSON.parse(localStorage.getItem(KEY)); if (s && s.veri) return s; } catch (e) {}
    var s2 = {veri: JSON.parse(JSON.stringify(window.ZT_SEED || {})), kayitlar: []};
    save(s2); return s2;
  }
  function save(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }
  var state = load();
  var page = (location.pathname.split("/").pop() || "index.html").replace(".html", "");

  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    for (var k in attrs || {}) e.setAttribute(k, attrs[k]);
    if (html != null) e.innerHTML = html;
    return e;
  }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"}[c]; }); }

  function toast(msg) {
    var t = document.querySelector(".zt-toast");
    if (!t) { t = el("div", {"class": "zt-toast", role: "status"}); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add("on");
    clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove("on"); }, 2200);
  }

  function now() {
    var d = new Date();
    function p(n) { return (n < 10 ? "0" : "") + n; }
    return p(d.getDate()) + "." + p(d.getMonth() + 1) + "." + d.getFullYear() + " " + p(d.getHours()) + ":" + p(d.getMinutes());
  }

  function renderLog() {
    var host = document.querySelector("main") || document.querySelector(".phonebody");
    if (!host) return;
    var old = host.querySelector(".zt-log"); if (old) old.remove();
    var mine = state.kayitlar.filter(function (k) { return k.sayfa === page; });
    if (!mine.length) return;
    var box = el("section", {"class": "panel zt-log"});
    var rows = mine.slice().reverse().map(function (k) {
      return "<div class=\"row\"><div><b>" + esc(k.islem) + "</b><small>" + esc(k.not || "—") + "</small></div><div><span class=\"pill\">" + esc(k.zaman) + "</span></div></div>";
    }).join("");
    box.innerHTML = "<h2>Bu ekranda kaydedilenler</h2>" + rows;
    var foot = host.querySelector(".foot");
    host.insertBefore(box, foot || null);
  }

  function openForm(btn) {
    var label = btn.textContent.replace(/^\+\s*/, "").trim();
    var wrap = el("div", {"class": "zt-modal", role: "dialog", "aria-label": label});
    var file = /fotoğraf|dosya/i.test(label);
    wrap.innerHTML = "<div class=\"zt-box\"><h2>" + esc(label) + "</h2>" +
      (file ? "<div class=\"label\">Dosya</div><input class=\"input zt-file\" type=\"file\" accept=\"image/*,.pdf,.xlsx,.xls\">" : "") +
      "<div class=\"label\">Açıklama</div><input class=\"input zt-note\" type=\"text\" placeholder=\"Örn. kısa bir not\">" +
      "<div class=\"actions\"><button type=\"button\" class=\"btn zt-ok\">Kaydet</button><button type=\"button\" class=\"btn secondary zt-cancel\">Vazgeç</button></div></div>";
    document.body.appendChild(wrap);
    wrap.querySelector(".zt-note").focus();
    function close() { wrap.remove(); }
    wrap.querySelector(".zt-cancel").onclick = close;
    wrap.addEventListener("click", function (e) { if (e.target === wrap) close(); });
    wrap.querySelector(".zt-ok").onclick = function () {
      var note = wrap.querySelector(".zt-note").value.trim();
      var f = wrap.querySelector(".zt-file");
      if (f && f.files && f.files[0]) note = (note ? note + " · " : "") + f.files[0].name;
      state.kayitlar.push({sayfa: page, islem: label, not: note, zaman: now()});
      save(state); close(); renderLog();
      toast(label + ": kaydedildi");
    };
  }

  document.addEventListener("click", function (e) {
    var a = e.target.closest ? e.target.closest("a") : null;
    if (!a) return;
    if (a.classList.contains("zt-reset")) {
      e.preventDefault();
      localStorage.removeItem(KEY); state = load(); renderLog();
      toast("Demo başlangıç verisine döndü");
      return;
    }
    if (a.getAttribute("href") === "#" && a.classList.contains("btn")) { e.preventDefault(); openForm(a); }
  });

  document.addEventListener("DOMContentLoaded", function () {
    renderLog();
    var spot = document.querySelector(".sidefoot") || document.querySelector(".phonebody .foot");
    if (spot) {
      var r = el("a", {"class": "zt-reset", href: "#"}, "↺ Demoyu sıfırla");
      spot.appendChild(document.createElement("br"));
      spot.appendChild(r);
    }
  });
  window.ZT_DEMO = {state: function () { return state; }};
})();
