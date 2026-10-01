
var DESTINATIONS = {

  start:     "contact.html",
  book:      "contact.html",

  message:   "contact.html#enquire",
  instagram: null,
  linkedin:  null,

  privacy:   "privacy.html",
  terms:     "terms.html",
  email:     "mailto:jp@hagodigital.ai"
};

(function () {
  document.querySelectorAll("[data-cta]").forEach(function (a) {
    var url = DESTINATIONS[a.getAttribute("data-cta")];

    if (url) { a.setAttribute("href", url);
               if (/^https?:/.test(url)) { a.setAttribute("target", "_blank"); a.setAttribute("rel", "noopener"); } }
    else { a.setAttribute("aria-disabled", "true");
           a.addEventListener("click", function (e) { e.preventDefault(); }); }
  });

  var yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();

  var burger = document.getElementById("burger"), nav = document.getElementById("nav");
  function setOpen(open) {
    nav.setAttribute("data-open", String(open));
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : "";
  }
  if (burger && nav) {
    burger.addEventListener("click", function () { setOpen(burger.getAttribute("aria-expanded") !== "true"); });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && burger.getAttribute("aria-expanded") === "true") { setOpen(false); burger.focus(); }
    });
  }

  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealed = document.querySelectorAll("[data-rise],[data-stagger]");
  var i;

  if (reduced || !("IntersectionObserver" in window)) {

    for (i = 0; i < revealed.length; i++) revealed[i].classList.add("in");
  } else {

    var watch = [];
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        for (var k = 0; k < watch.length; k++) {
          if (watch[k][0] === e.target) watch[k][1].classList.add("in");
        }
        io.unobserve(e.target);
      });

    }, { rootMargin: "0px 0px -18% 0px", threshold: 0.1 });
    for (i = 0; i < revealed.length; i++) {
      var box = revealed[i];
      while (box.parentElement && getComputedStyle(box).display === "contents") box = box.parentElement;
      watch.push([box, revealed[i]]);
      io.observe(box);
    }
  }

  var hdr     = document.querySelector(".hdr");
  var streaks = document.querySelector(".hero-streaks");

  var mascot  = document.querySelector(".hero-mascot img, .hero-mascot video");
  var flip    = mascot
    ? (getComputedStyle(mascot).getPropertyValue("--flip").trim() || "-1")
    : "-1";
  var pending = false;

  function parallaxAmount() {
    if (!mascot) return 0;
    var v = parseFloat(getComputedStyle(mascot).getPropertyValue("--mascot-parallax"));
    return isNaN(v) ? -0.10 : v;
  }
  var slide = parallaxAmount();

  function frame() {
    var y = window.pageYOffset;
    if (hdr) hdr.setAttribute("data-scrolled", String(y > 24));
    if (!reduced && y < 1000) {
      if (streaks) streaks.style.transform = "translate3d(0," + (y * 0.22).toFixed(1) + "px,0)";

      if (mascot)  mascot.style.transform  = "scaleX(" + flip + ") translate3d(0," + (y * slide).toFixed(1) + "px,0)";
    }
    pending = false;
  }

  function upgradeHeroToVideo() {
    var fig = document.querySelector(".hero-mascot");
    var still = fig && fig.querySelector(".hero-still");
    if (!still || !still.getAttribute("data-video") || reduced) return;

    var probe = document.createElement("video");
    probe.muted = true;
    probe.defaultMuted = true;
    probe.setAttribute("muted", "");
    probe.playsInline = true;
    probe.setAttribute("playsinline", "");
    probe.preload = "auto";
    probe.loop = true;

    probe.style.cssText = "position:absolute;width:1px;height:1px;opacity:0;" +
                          "pointer-events:none;left:-9999px;top:0;";
    probe.setAttribute("aria-hidden", "true");
    probe.src = "data:video/webm;base64,GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQJChYECGFOAZwEAAAAAAAIhEU2bdLpNu4tTq4QVSalmU6yBoU27i1OrhBZUrmtTrIHWTbuMU6uEElTDZ1OsggE2TbuMU6uEHFO7a1OsggIL7AEAAAAAAABZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmsCrXsYMPQkBNgIxMYXZmNjMuMS4xMDBXQYxMYXZmNjMuMS4xMDBEiYhARAAAAAAAABZUrmvbrgEAAAAAAABS14EBc8WIxc4EmX4fv4KcgQAitZyDdW5kiIEAhoVWX1ZQOYOBASPjg4QCYloA4JSwgRC6gRCagQJTwIEBVbCEVbmBAVXugQHsAQAAAAAAAAIAABJUw2f+c3OfY8CAZ8iZRaOHRU5DT0RFUkSHjExhdmY2My4xLjEwMHNz2WPAi2PFiMXOBJl+H7+CZ8ikRaOHRU5DT0RFUkSHl0xhdmM2My4xLjEwMCBsaWJ2cHgtdnA5Z8ihRaOIRFVSQVRJT05Eh5MwMDowMDowMC4wNDAwMDAwMDAAH0O2dc3ngQCgyKGggQAAAIJJg0IAAPAA9gA4JBwYjAAAMGAAABC///qN4AB1oaOmoe6BAaWcgkmDQgAA8AD2ADgkHBiMAAAwYAAAEL//+2hoABxTu2uRu4+zgQC3iveBAfGCAbnwgQM=";
    document.body.appendChild(probe);

    var settled = false;
    function cleanup() { if (probe.parentNode) probe.parentNode.removeChild(probe); }

    function decide(ok) {
      if (settled) return;
      settled = true;
      cleanup();
      if (!ok) return;
      mount();
    }

    function mount() {
      var v = document.createElement("video");
      v.className = "hero-video";

      v.width = parseInt(still.getAttribute("width"), 10) || 580;
      v.height = parseInt(still.getAttribute("height"), 10) || 900;
      v.muted = true; v.defaultMuted = true; v.setAttribute("muted", "");
      v.playsInline = true; v.setAttribute("playsinline", "");

      if (!still.hasAttribute("data-video-once")) {
        v.loop = true; v.setAttribute("loop", "");
      }
      v.autoplay = true; v.setAttribute("autoplay", "");
      v.preload = "auto";

      v.poster = still.getAttribute("src");
      v.setAttribute("aria-label", still.getAttribute("alt") || "");

      v.src = still.getAttribute("data-video");

      v.addEventListener("error", function () {
        if (v.parentNode) v.parentNode.replaceChild(still, v);
        mascot = still;
      }, { once: true });

      fig.replaceChild(v, still);
      mascot = v;
      var p = v.play();
      if (p && p.catch) p.catch(function () {  });
    }

    function test() {
      if (settled) return;

      if (!probe.videoWidth) return;
      try {
        var c = document.createElement("canvas");
        c.width = c.height = 4;
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, 4, 4);
        ctx.drawImage(probe, 0, 0, 4, 4);
        decide(ctx.getImageData(1, 1, 1, 1).data[3] < 200);
      } catch (e) { decide(false); }
    }

    ["loadeddata", "canplay", "playing", "timeupdate"].forEach(function (ev) {
      probe.addEventListener(ev, test);
    });
    probe.addEventListener("error", function () { decide(false); }, { once: true });

    try { probe.load(); } catch (e) {}
    var pp = probe.play();
    if (pp && pp.catch) pp.catch(function () {  });

    var polls = 0;
    var iv = setInterval(function () {
      polls++;
      test();
      if (settled || polls > 40) { clearInterval(iv); decide(false); }
    }, 150);
  }
  upgradeHeroToVideo();

  (function conditionalFields() {
    var deps = document.querySelectorAll("[data-when]");
    if (!deps.length) return;
    Array.prototype.forEach.call(deps, function (dep) {
      var radios = document.querySelectorAll(
        'input[type="radio"][name="' + dep.getAttribute("data-when") + '"]');
      if (!radios.length) return;
      function sync() {
        var on = null;
        Array.prototype.forEach.call(radios, function (r) { if (r.checked) on = r; });
        var show = !!(on && on.hasAttribute("data-yes"));
        dep.hidden = !show;

        if (!show) {
          var f = dep.querySelector("input, textarea");
          if (f) f.value = "";
        }
      }
      Array.prototype.forEach.call(radios, function (r) {
        r.addEventListener("change", sync);
      });
      sync();
    });
  })();

  (function enquirySubject() {
    var form = document.querySelector("form.leadform");
    if (!form) return;
    form.addEventListener("submit", function () {
      var subj = form.querySelector('input[name="subject"]');
      var who = form.querySelector('input[name="name"]');
      var biz = form.querySelector('input[name="business"]');
      if (!subj || !who) return;
      var base = subj.getAttribute("data-base") || subj.value;
      subj.setAttribute("data-base", base);
      var tail = [who.value.trim(), biz ? biz.value.trim() : ""].filter(Boolean).join(", ");
      subj.value = tail ? base + ": " + tail : base;
    });
  })();

  if (hdr || streaks) {
    window.addEventListener("scroll", function () {
      if (!pending) { pending = true; requestAnimationFrame(frame); }
    }, { passive: true });
    window.addEventListener("resize", function () {
      slide = parallaxAmount();
      if (!pending) { pending = true; requestAnimationFrame(frame); }
    }, { passive: true });
    frame();
  }
})();

var MEASURE = {
  ga4: "G-BD2JLV83WR",
  ads: "",
  adsLeadLabel: "",
  adsWhatsappLabel: "",
  meta: ""
};
(function measurement() {
  if (!MEASURE.ga4 && !MEASURE.ads && !MEASURE.meta) return;
  var STRICT = ["AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IE","IT","LV","LT","LU",
    "MT","NL","PL","PT","RO","SK","SI","ES","SE","IS","LI","NO","GB","CH","CO","CL","AR"];
  var es = (document.documentElement.lang || "").indexOf("es") === 0;
  var T = es
    ? { text: "Usamos cookies para medir visitas y la publicidad, solo si aceptas.", more: "Privacidad",
        yes: "Aceptar", no: "Rechazar", link: "Cookies", label: "Cookies" }
    : { text: "We use cookies to measure visits and advertising, only if you accept.", more: "Privacy",
        yes: "Accept", no: "Reject", link: "Cookies", label: "Cookies" };
  var choice = null;
  try { choice = localStorage.getItem("hd-consent"); } catch (e) {}

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { dataLayer.push(arguments); };
  var all = function (v) { return { ad_storage: v, analytics_storage: v, ad_user_data: v, ad_personalization: v }; };
  gtag("consent", "default", all("granted"));
  var strict = all("denied"); strict.region = STRICT; strict.wait_for_update = 500;
  gtag("consent", "default", strict);
  if (choice === "granted" || choice === "denied") gtag("consent", "update", all(choice));
  gtag("js", new Date());
  var cfg = { allow_google_signals: false, allow_ad_personalization_signals: false };
  if (MEASURE.ga4) gtag("config", MEASURE.ga4, cfg);
  if (MEASURE.ads) gtag("config", MEASURE.ads, cfg);
  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + (MEASURE.ga4 || MEASURE.ads);
  document.head.appendChild(s);

  var metaOn = false;
  function loadMeta() {
    if (!MEASURE.meta || metaOn) return;
    metaOn = true;
    !function(f,b,e,v,n,t,x){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version="2.0";n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;x=b.getElementsByTagName(e)[0];x.parentNode.insertBefore(t,x)}(window,
    document,"script","https://connect.facebook.net/en_US/fbevents.js");
    fbq("init", MEASURE.meta);
    fbq("track", "PageView");
  }
  var tz = "";
  try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch (e) {}
  var needsAsk = /^(Europe\/|Atlantic\/(Canary|Madeira|Azores|Reykjavik|Faroe)|Africa\/Ceuta|Asia\/(Nicosia|Famagusta)|America\/(Bogota|Santiago|Punta_Arenas|Argentina\/|Buenos_Aires|Cordoba|Mendoza|Guadeloupe|Martinique|Cayenne)|Pacific\/Easter|Indian\/(Reunion|Mayotte))/.test(tz);

  if (choice === "granted" || (!choice && !needsAsk)) loadMeta();

  var box = document.createElement("div");
  box.className = "consent";
  box.setAttribute("role", "region");
  box.setAttribute("aria-label", T.label);
  box.hidden = true;
  box.innerHTML = '<p class="consent-text">' + T.text + ' <a href="' + (es ? '/es/privacy.html' : '/privacy.html') + '">' + T.more + '</a></p>' +
    '<div class="consent-actions"><button type="button" class="consent-btn" data-consent="denied">' + T.no +
    '</button><button type="button" class="consent-btn consent-btn--yes" data-consent="granted">' + T.yes + '</button></div>';
  document.body.appendChild(box);
  box.addEventListener("click", function (e) {
    var b = e.target.closest("[data-consent]");
    if (!b) return;
    var c = b.getAttribute("data-consent");
    try { localStorage.setItem("hd-consent", c); } catch (err) {}
    box.hidden = true;
    gtag("consent", "update", all(c));
    if (c === "granted") loadMeta();
  });
  if (!choice && needsAsk) box.hidden = false;

  var legal = document.querySelector(".ftr .legal");
  if (legal) {
    var a = document.createElement("a");
    a.href = "#cookies";
    a.textContent = T.link;
    a.addEventListener("click", function (e) { e.preventDefault(); box.hidden = false; box.querySelector("button").focus(); });
    legal.appendChild(a);
  }

  document.addEventListener("click", function (e) {
    var l = e.target.closest("a[href]");
    if (!l) return;
    var h = l.getAttribute("href");
    if (h.indexOf("wa.me/") !== -1) {
      gtag("event", "whatsapp_click");
      if (MEASURE.ads && MEASURE.adsWhatsappLabel) gtag("event", "conversion", { send_to: MEASURE.ads + "/" + MEASURE.adsWhatsappLabel });
      if (window.fbq) fbq("track", "Contact");
    } else if (h.indexOf("mailto:") === 0) {
      gtag("event", "contact_email");
    }
  });
  if (/\/thanks(\.html)?$/.test(location.pathname)) {
    gtag("event", "generate_lead");
    if (MEASURE.ads && MEASURE.adsLeadLabel) gtag("event", "conversion", { send_to: MEASURE.ads + "/" + MEASURE.adsLeadLabel });
    if (window.fbq) fbq("track", "Lead");
  }
})();
