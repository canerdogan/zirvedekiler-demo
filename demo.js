(function () {
  var KEY = "zt_demo_v2";
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


  // Bir firmanın birden çok servisi: firma ekranında listelenir ve eklenir; hakediş ve firma görünümü aynı listeyi okur.
  function tl(n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " ₺"; }
  function servisleri(firma) { return (state.veri.servisler || []).filter(function (x) { return x.firma === firma; }); }
  function toplam(list, alan) { return list.reduce(function (t, x) { return t + x.sefer * (alan ? x[alan] : 1); }, 0); }

  function renderServisler() {
    document.querySelectorAll("[data-zt-servis-say]").forEach(function (e) {
      e.textContent = servisleri(e.getAttribute("data-zt-servis-say")).length;
    });
    document.querySelectorAll("[data-zt-servisler]").forEach(function (box) {
      var firma = box.getAttribute("data-zt-firma") || "kayalar";
      var gorunum = box.getAttribute("data-zt-servisler");   // yonetici | hakedis | musteri
      var list = servisleri(firma);
      var musteri = gorunum === "musteri";
      var head = "<tr><th>SERVİS</th><th>GÜZERGÂH / VARDİYA</th><th>ARAÇ</th><th>SEFER</th><th>" +
        (musteri ? "TEK YÖN BEDELİ</th><th>TUTAR" : "FABRİKA</th><th>TEDARİKÇİ") + "</th></tr>";
      var rows = list.map(function (x) {
        return "<tr><td><b>" + esc(x.kod) + "</b></td><td>" + esc(x.guzergah) + "<small>" + esc(x.vardiya) + "</small></td><td>" +
          esc(x.arac) + "</td><td>" + x.sefer + "</td><td>" +
          (musteri ? tl(x.fabrika) + "</td><td>" + tl(x.sefer * x.fabrika)
                   : tl(x.sefer * x.fabrika) + "<small>" + x.sefer + " × " + tl(x.fabrika) + "</small></td><td>" +
                     tl(x.sefer * x.tedarikci) + "<small>" + x.sefer + " × " + tl(x.tedarikci) + "</small>") + "</td></tr>";
      }).join("");
      var sum = "<tr class=\"zt-sum\"><td><b>Toplam</b></td><td>" + list.length + " servis</td><td></td><td>" + toplam(list) + "</td><td>" +
        (musteri ? "</td><td><b>" + tl(toplam(list, "fabrika")) + "</b>"
                 : "<b>" + tl(toplam(list, "fabrika")) + "</b></td><td><b>" + tl(toplam(list, "tedarikci")) + "</b>") + "</td></tr>";
      var title = {yonetici: "Servisler · " + list.length + " servis", hakedis: "Firma toplamı · " + list.length + " servis",
                   musteri: "Servisleriniz · " + list.length + " servis"}[gorunum];
      var note = {yonetici: "Her servis kendi güzergâhı, vardiyası, aracı ve fiyatıyla ayrı hesaplanır.",
                  hakedis: "Aşağıdaki kartlar ve PDF örneği yalnız K-01 Kaynarca servisine aittir.",
                  musteri: "Tutarlar firmanıza ait fiyatlardır. Tedarikçi fiyatları bu görünümde yoktur."}[gorunum];
      box.innerHTML = "<div class=\"zt-head\"><h2>" + esc(title) + "</h2>" +
        (gorunum === "yonetici" ? "<a class=\"btn zt-servis-ekle\" href=\"#\">+ Servis ekle</a>" : "") + "</div>" +
        "<p class=\"muted\">" + esc(note) + "</p><table class=\"zt-servis-tablo\"><thead>" + head + "</thead><tbody>" + rows + sum + "</tbody></table>";
      // Telefonda her servis bir kart olur: hücre başlığı hücrenin üstünde yazar.
      var basliklar = [].map.call(box.querySelectorAll("thead th"), function (th) { return th.textContent; });
      box.querySelectorAll("tbody tr").forEach(function (tr) {
        [].forEach.call(tr.children, function (td, i) { td.setAttribute("data-label", basliklar[i] || ""); });
      });
    });
    var kart = document.querySelector("[data-zt-firma-kartlar]");
    if (kart) {
      var f = kart.getAttribute("data-zt-firma-kartlar"), list = servisleri(f);
      kart.innerHTML =
        "<div class=\"card\"><small>Servis sayısı</small><strong>" + list.length + " servis</strong><em>" + toplam(list) + " tek yön sefer · örnek ay</em></div>" +
        "<div class=\"card\"><small>Fabrikaya hizmet tutarı</small><strong>" + tl(toplam(list, "fabrika")) + "</strong><em>Tüm servislerin toplamı</em></div>" +
        "<div class=\"card\"><small>Tedarikçi hakedişi</small><strong>" + tl(toplam(list, "tedarikci")) + "</strong><em>Tüm servislerin toplamı</em></div>" +
        "<div class=\"card\"><small>Firma yetkilisi</small><strong>Salt okunur</strong><em>E-posta ile giriş</em></div>";
    }
  }

  function servisFormu() {
    var wrap = el("div", {"class": "zt-modal zt-servis-form", role: "dialog", "aria-label": "Servis ekle"});
    function alan(ad, cls, ph, tip) {
      return "<div class=\"label\">" + ad + "</div><input class=\"input " + cls + "\" type=\"" + (tip || "text") + "\" placeholder=\"" + ph + "\">";
    }
    wrap.innerHTML = "<div class=\"zt-box\"><h2>Servis ekle</h2>" +
      alan("Güzergâh", "zt-guzergah", "Örn. Tuzla → Sancaktepe") +
      "<div class=\"label\">Vardiya</div><select class=\"input zt-vardiya\"><option>08:00 vardiyası</option><option>16:00 vardiyası</option><option>24:00 vardiyası</option></select>" +
      alan("Araç plakası", "zt-arac", "Örn. 34 ZT 030") +
      alan("Fabrika tek yön fiyatı (₺)", "zt-fabrika", "1466", "number") +
      alan("Tedarikçi tek yön fiyatı (₺)", "zt-tedarikci", "1150", "number") +
      "<div class=\"actions\"><button type=\"button\" class=\"btn zt-ok\">Kaydet</button><button type=\"button\" class=\"btn secondary zt-cancel\">Vazgeç</button></div></div>";
    document.body.appendChild(wrap);
    wrap.querySelector(".zt-guzergah").focus();
    function close() { wrap.remove(); }
    wrap.querySelector(".zt-cancel").onclick = close;
    wrap.addEventListener("click", function (e) { if (e.target === wrap) close(); });
    wrap.querySelector(".zt-ok").onclick = function () {
      function v(c) { return wrap.querySelector(c).value.trim(); }
      var guz = v(".zt-guzergah");
      if (!guz) { wrap.querySelector(".zt-guzergah").focus(); toast("Güzergâh yazın"); return; }
      var firma = "kayalar", list = servisleri(firma);
      var no = list.reduce(function (m, x) { return Math.max(m, parseInt(x.kod.split("-")[1], 10) || 0); }, 0) + 1;
      var yeni = {kod: "K-" + (no < 10 ? "0" : "") + no, firma: firma, guzergah: guz, vardiya: v(".zt-vardiya"),
                  arac: v(".zt-arac") || "Araç atanmadı", sefer: 44,
                  fabrika: Number(v(".zt-fabrika")) || 1466, tedarikci: Number(v(".zt-tedarikci")) || 1150};
      state.veri.servisler.push(yeni);
      state.kayitlar.push({sayfa: page, islem: "Servis eklendi: " + yeni.kod, not: yeni.guzergah + " · " + yeni.vardiya, zaman: now()});
      save(state); close(); renderServisler(); renderLog();
      toast(yeni.kod + " servisi eklendi");
    };
  }

  document.addEventListener("click", function (e) {
    var a = e.target.closest ? e.target.closest("a") : null;
    if (!a) return;
    if (a.classList.contains("zt-servis-ekle")) { e.preventDefault(); servisFormu(); return; }
    if (a.classList.contains("zt-reset")) {
      e.preventDefault();
      localStorage.removeItem(KEY); state = load(); renderServisler(); renderLog();
      toast("Demo başlangıç verisine döndü");
      return;
    }
    if (a.getAttribute("href") === "#" && a.classList.contains("btn")) { e.preventDefault(); openForm(a); }
  });

  document.addEventListener("DOMContentLoaded", function () {
    renderServisler();
    renderLog();
    // Telefonda menü yatay kayar: seçili ekranı görünür yap.
    var sel = document.querySelector(".navs .nav.sel"), navs = document.querySelector(".navs");
    if (sel && navs && navs.scrollWidth > navs.clientWidth) navs.scrollLeft = sel.offsetLeft - navs.offsetLeft - 16;
    var spot = document.querySelector(".sidefoot") || document.querySelector(".phonebody .foot");
    if (spot) {
      var r = el("a", {"class": "zt-reset", href: "#"}, "↺ Demoyu sıfırla");
      spot.appendChild(document.createElement("br"));
      spot.appendChild(r);
    }
  });
  window.ZT_DEMO = {state: function () { return state; }};
})();
