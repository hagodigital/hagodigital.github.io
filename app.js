
var DESTINATIONS = {

  start:     "contact.html",
  book:      "contact.html",

  message:   "contact.html#enquire",
  instagram: null,
  linkedin:  null,
  email:     "mailto:jp@hagodigital.ai",
  privacy:   null,
  terms:     null
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
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        io.unobserve(e.target);
      });

    }, { rootMargin: "0px 0px -18% 0px", threshold: 0.1 });
    for (i = 0; i < revealed.length; i++) io.observe(revealed[i]);
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
