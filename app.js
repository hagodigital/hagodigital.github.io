/* ============================================================
   DESTINATIONS — CONFIGURATION PLACEHOLDERS
   No verified booking link, contact address, social profile or legal
   page was supplied. Fill these in and the matching hooks activate.
   Anything left null stays inert rather than pointing somewhere invented.
   ============================================================ */
var DESTINATIONS = {
  book:      "https://calendar.app.google/d1jgYiEUs3yoh3Wr6",
  message:   "contact.html",
  instagram: null,
  linkedin:  null,
  email:     "mailto:jp@hagodigital.ai",
  privacy:   null,   // only if a real privacy page exists
  terms:     null    // only if real terms exist
};

(function () {
  document.querySelectorAll("[data-cta]").forEach(function (a) {
    var url = DESTINATIONS[a.getAttribute("data-cta")];
    if (url) { a.setAttribute("href", url); a.setAttribute("target", "_blank"); a.setAttribute("rel", "noopener"); }
    else { a.setAttribute("aria-disabled", "true");
           a.addEventListener("click", function (e) { e.preventDefault(); }); }
  });

  /* Everything above the SCROLL MOTION block is optional furniture, and every
     lookup below is guarded for one reason: styles.css hides [data-rise] at
     opacity:0 the moment html.js is set, and only the motion block un-hides it.
     An unguarded getElementById on a page that happens to lack #yr or #burger
     throws here, the motion block never runs, and that page ships with its
     sections permanently invisible. A missing burger must cost the burger,
     never the copy. */
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

  /* ============================================================
     SCROLL MOTION
     ============================================================ */
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealed = document.querySelectorAll("[data-rise],[data-stagger]");
  var i;

  if (reduced || !("IntersectionObserver" in window)) {
    /* Show everything at once. Anything hidden by CSS must be un-hidden here,
       or an older browser is left with a blank page. */
    for (i = 0; i < revealed.length; i++) revealed[i].classList.add("in");
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        io.unobserve(e.target);          // one-shot — no re-hide scrolling back up
      });
    /* The trigger line sits 18% above the viewport bottom. Fire any earlier and
       the reveal is finished before the element is anywhere near being read —
       which is what "I can't see any animation" actually looks like. */
    }, { rootMargin: "0px 0px -18% 0px", threshold: 0.1 });
    for (i = 0; i < revealed.length; i++) io.observe(revealed[i]);
  }

  /* Parallax + header condense share one passive listener and one frame.
     Decorative layers only. The mascot keeps its scaleX(-1) flip, which
     lives in the stylesheet and would otherwise be overwritten here. */
  var hdr     = document.querySelector(".hdr");
  var streaks = document.querySelector(".hero-streaks");
  var mascot  = document.querySelector(".hero-mascot img");
  var pending = false;

  function frame() {
    var y = window.pageYOffset;
    if (hdr) hdr.setAttribute("data-scrolled", String(y > 24));
    if (!reduced && y < 1000) {
      if (streaks) streaks.style.transform = "translate3d(0," + (y * 0.22).toFixed(1) + "px,0)";
      if (mascot)  mascot.style.transform  = "scaleX(-1) translate3d(0," + (y * -0.10).toFixed(1) + "px,0)";
    }
    pending = false;
  }
  if (hdr || streaks) {
    window.addEventListener("scroll", function () {
      if (!pending) { pending = true; requestAnimationFrame(frame); }
    }, { passive: true });
    frame();   // a reload part-way down the page starts in the right state
  }
})();
