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

  document.getElementById("yr").textContent = new Date().getFullYear();

  var burger = document.getElementById("burger"), nav = document.getElementById("nav");
  function setOpen(open) {
    nav.setAttribute("data-open", String(open));
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : "";
  }
  burger.addEventListener("click", function () { setOpen(burger.getAttribute("aria-expanded") !== "true"); });
  nav.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && burger.getAttribute("aria-expanded") === "true") { setOpen(false); burger.focus(); }
  });
})();
