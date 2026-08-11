/* ============================================================
   DESTINATIONS — CONFIGURATION PLACEHOLDERS
   No verified booking link, contact address, social profile or legal
   page was supplied. Fill these in and the matching hooks activate.
   Anything left null stays inert rather than pointing somewhere invented.
   ============================================================ */
var DESTINATIONS = {
  /* start -> the chooser; book -> the calendar itself.
     Every English CTA points at "start", because nobody should reach the calendar
     without first being offered the brief (2026-08-11). "book" is still live and
     still needed: the Spanish pages use it, because no Spanish brief exists yet
     and sending a Spanish reader to an English form is worse than sending them
     straight to the diary. start.html's own second door uses it too. */
  start:     "start.html",
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
    /* _blank only for somewhere else. It was unconditional, which threw a new tab
       for contact.html — our own page — and would now do the same for start.html,
       stranding the visitor on a dead-end tab with no way back into the site. */
    if (url) { a.setAttribute("href", url);
               if (/^https?:/.test(url)) { a.setAttribute("target", "_blank"); a.setAttribute("rel", "noopener"); } }
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
     Decorative layers only. Writing style.transform here overwrites the
     stylesheet's flip, so the flip has to be re-applied — but read from the
     --flip custom property rather than hardcoded, or every hero image in this
     slot gets mirrored whether or not its artwork has a direction in it. */
  var hdr     = document.querySelector(".hdr");
  var streaks = document.querySelector(".hero-streaks");
  var mascot  = document.querySelector(".hero-mascot img");
  var flip    = mascot
    ? (getComputedStyle(mascot).getPropertyValue("--flip").trim() || "-1")
    : "-1";
  var pending = false;

  function frame() {
    var y = window.pageYOffset;
    if (hdr) hdr.setAttribute("data-scrolled", String(y > 24));
    if (!reduced && y < 1000) {
      if (streaks) streaks.style.transform = "translate3d(0," + (y * 0.22).toFixed(1) + "px,0)";
      if (mascot)  mascot.style.transform  = "scaleX(" + flip + ") translate3d(0," + (y * -0.10).toFixed(1) + "px,0)";
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
