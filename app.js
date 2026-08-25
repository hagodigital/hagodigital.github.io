/* ============================================================
   DESTINATIONS — CONFIGURATION PLACEHOLDERS
   No verified booking link, contact address, social profile or legal
   page was supplied. Fill these in and the matching hooks activate.
   Anything left null stays inert rather than pointing somewhere invented.
   ============================================================ */
var DESTINATIONS = {
  /* start AND book are now the same door: the free 15-minute call.
     2026-08-20 REPLACES 2026-08-14. The model split in two — a 15-minute intro
     call anyone may book, and the 30-minute discovery call that follows once
     they are a client and is arranged by hand (the free Google plan allows only
     ONE booking page with ONE duration, so the 30 cannot be public).
     "The call is earned" still holds for the 30; the 15 is the front door and
     nothing is lost if a non-fit books it.
     contact.html is NOT retired — it is the write-first door, reached from the
     secondary CTA and the nav, for people who would rather type than talk.
     Every EN primary CTA routes through data-cta="start", including the ones on
     about/thanks/404 that used to hardcode contact.html and would have been left
     behind by this switch. To put the form back in front, set start to
     "contact.html" — that one line is still the whole switch. */
  start:     "https://calendar.app.google/d1jgYiEUs3yoh3Wr6",
  book:      "https://calendar.app.google/d1jgYiEUs3yoh3Wr6",
  /* Deep-links past the hero to the form itself, so the secondary CTA is not a
     duplicate of the primary one now that both live on contact.html. */
  message:   "contact.html#enquire",
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
       for contact.html — our own page — stranding the visitor on a dead-end tab
       with no way back into the site. The test is the scheme, not the name, so it
       keeps working as destinations change. */
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
  /* img OR video: the homepage hero swaps its still for a <video> once alpha
     support is confirmed (see below). Re-queried after the swap. A selector
     naming only one of them does not throw — it silently drops the parallax,
     which nothing reports. */
  var mascot  = document.querySelector(".hero-mascot img, .hero-mascot video");
  var flip    = mascot
    ? (getComputedStyle(mascot).getPropertyValue("--flip").trim() || "-1")
    : "-1";
  var pending = false;

  /* The slide amount is a CSS custom property, not a constant here, so the
     breakpoint that switches it off lives in the stylesheet with every other
     breakpoint. Phones set it to 0: stacked, the mascot sits under the CTA and
     a negative slide walks it into the button. Re-read on resize because a
     media query changes underneath a value cached at load. */
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
      /* When slide is 0 the transform is still written, and still carries the
         flip — dropping the whole assignment would leave the last transform
         from before a resize painted on the element forever. */
      if (mascot)  mascot.style.transform  = "scaleX(" + flip + ") translate3d(0," + (y * slide).toFixed(1) + "px,0)";
    }
    pending = false;
  }
  /* ---- hero animation, only where transparency actually works ----
     The hero animation is a VP9 WebM with an alpha channel. Chrome, Edge and
     Firefox composite that alpha; SAFARI DECODES THE FILE AND IGNORES IT, which
     would paint the #D8005A keying ground on screen instead of a cutout — worse
     than no animation at all.

     There is no feature query for this, so it is measured: a 593-byte fully
     transparent WebM is decoded to a canvas and one pixel is read back. Alpha
     under 200 means the browser composited it and the real file is worth
     fetching. Anything else — no support, an error, a decode that never
     starts — leaves the still in place, and the 380KB animation is never
     requested. Failure is silent and correct by construction.

     prefers-reduced-motion skips the whole thing: a five-second loop is exactly
     the unattended repeat that setting exists to stop, and the still already
     shows the character. */
  function upgradeHeroToVideo() {
    var fig = document.querySelector(".hero-mascot");
    var still = fig && fig.querySelector(".hero-still");
    if (!still || reduced) return;

    var probe = document.createElement("video");
    probe.muted = true; probe.playsInline = true; probe.preload = "auto";
    probe.src = "data:video/webm;base64,GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQJChYECGFOAZwEAAAAAAAIhEU2bdLpNu4tTq4QVSalmU6yBoU27i1OrhBZUrmtTrIHWTbuMU6uEElTDZ1OsggE2TbuMU6uEHFO7a1OsggIL7AEAAAAAAABZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmsCrXsYMPQkBNgIxMYXZmNjMuMS4xMDBXQYxMYXZmNjMuMS4xMDBEiYhARAAAAAAAABZUrmvbrgEAAAAAAABS14EBc8WIxc4EmX4fv4KcgQAitZyDdW5kiIEAhoVWX1ZQOYOBASPjg4QCYloA4JSwgRC6gRCagQJTwIEBVbCEVbmBAVXugQHsAQAAAAAAAAIAABJUw2f+c3OfY8CAZ8iZRaOHRU5DT0RFUkSHjExhdmY2My4xLjEwMHNz2WPAi2PFiMXOBJl+H7+CZ8ikRaOHRU5DT0RFUkSHl0xhdmM2My4xLjEwMCBsaWJ2cHgtdnA5Z8ihRaOIRFVSQVRJT05Eh5MwMDowMDowMC4wNDAwMDAwMDAAH0O2dc3ngQCgyKGggQAAAIJJg0IAAPAA9gA4JBwYjAAAMGAAABC///qN4AB1oaOmoe6BAaWcgkmDQgAA8AD2ADgkHBiMAAAwYAAAEL//+2hoABxTu2uRu4+zgQC3iveBAfGCAbnwgQM=";

    var settled = false;
    function decide(ok) {
      if (settled) return;
      settled = true;
      if (!ok) return;
      var v = document.createElement("video");
      v.className = "hero-video";
      v.width = 580; v.height = 900;
      v.autoplay = true; v.muted = true; v.loop = true;
      v.playsInline = true; v.preload = "auto";
      v.setAttribute("aria-label", still.getAttribute("alt") || "");
      v.src = "assets/videos/hago-hero.webm";
      /* Swap only once the animation can actually paint, so the still never
         blinks out to an empty column on a slow connection. */
      v.addEventListener("canplay", function () {
        if (!still.parentNode) return;
        fig.replaceChild(v, still);
        mascot = v;
        v.play().catch(function () { /* autoplay refused: the frame still shows */ });
      }, { once: true });
    }

    probe.addEventListener("loadeddata", function () {
      try {
        var c = document.createElement("canvas");
        c.width = c.height = 4;
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, 4, 4);
        ctx.drawImage(probe, 0, 0, 4, 4);
        decide(ctx.getImageData(1, 1, 1, 1).data[3] < 200);
      } catch (e) { decide(false); }
    }, { once: true });
    probe.addEventListener("error", function () { decide(false); }, { once: true });
    setTimeout(function () { decide(false); }, 2500);
  }
  upgradeHeroToVideo();

  if (hdr || streaks) {
    window.addEventListener("scroll", function () {
      if (!pending) { pending = true; requestAnimationFrame(frame); }
    }, { passive: true });
    window.addEventListener("resize", function () {
      slide = parallaxAmount();
      if (!pending) { pending = true; requestAnimationFrame(frame); }
    }, { passive: true });
    frame();   // a reload part-way down the page starts in the right state
  }
})();
