/* Headway site script. Loaded with defer on every page. No inline scripts, so the page CSP can block them. */
(function () {
  // Clickjacking guard: GitHub Pages cannot send frame-ancestors, so refuse to run inside a frame.
  if (window.self !== window.top) { try { window.top.location = window.self.location; } catch (e) { document.documentElement.style.display = "none"; } }

  // Cookieless counting config, read by /assets/seo.js (loaded after this file).
  window.SEO_OPS = { ns: "headwayfence.com", goatcounter: "https://headwayfence.goatcounter.com/count", privacy: "/privacy.html", brand: "#556B2F" };

  function ready(fn) { if (document.readyState !== "loading") fn(); else document.addEventListener("DOMContentLoaded", fn); }
  ready(function () {
    var b = document.querySelector(".menu-btn"), p = document.getElementById("menu-panel");
    if (b && p) {
      var set = function (o) { b.setAttribute("aria-expanded", o ? "true" : "false"); p.hidden = !o; };
      b.addEventListener("click", function (e) { e.stopPropagation(); set(p.hidden); });
      document.addEventListener("click", function (e) { if (!p.hidden && !p.contains(e.target)) set(false); });
      document.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
    }
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach(function (el) { el.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
  });
})();
