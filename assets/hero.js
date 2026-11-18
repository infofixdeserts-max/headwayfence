/* Home page hero: a herd grazes, one cow walks to the virtual line, hears the tone and turns back. Plain motion, no effects. */
(function () {
  var herd = document.getElementById("herd"), cue = document.getElementById("cue"), cap = document.getElementById("cap");
  if (!herd || !cue || !cap) return;
  var still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var NS = "http://www.w3.org/2000/svg", cows = [];
  for (var i = 0; i < 18; i++) {
    var c = document.createElementNS(NS, "circle");
    c.setAttribute("r", 6);
    c.setAttribute("fill", i ? "#1D2214" : "#8B3A22");
    herd.appendChild(c);
    var x = 170 + Math.random() * 120, y = 150 + Math.random() * 110;
    cows.push({ el: c, x: x, y: y, tx: x, ty: y });
  }
  var w = cows[0];
  var lines = ["The line is drawn in the app and sent to every tag.", "One cow walks toward the line.", "Her tag plays a tone. She stops.", "She turns back. The tone was enough."];
  var t0 = performance.now();
  function place() { cows.forEach(function (c) { c.el.setAttribute("cx", c.x.toFixed(1)); c.el.setAttribute("cy", c.y.toFixed(1)); }); }
  function frame(now) {
    var t = ((now - t0) / 1000) % 14, p, s;
    for (var i = 1; i < cows.length; i++) {
      var c = cows[i];
      if (Math.hypot(c.tx - c.x, c.ty - c.y) < 1 && Math.random() < 0.02) { c.tx = 170 + Math.random() * 120; c.ty = 150 + Math.random() * 110; }
      c.x += (c.tx - c.x) * 0.01; c.y += (c.ty - c.y) * 0.01;
    }
    if (t < 3) { p = 0; s = 0; } else if (t < 7) { p = (t - 3) / 4; s = 1; } else if (t < 9) { p = 1; s = 2; } else { p = 1 - Math.min(1, (t - 9) / 4); s = 3; }
    var e = p * p * (3 - 2 * p);
    w.x = 260 + e * 125; w.y = 220 - e * 20;
    if (s === 2) {
      var k = (t - 7) / 2, r = 8 + ((k * 3) % 1) * 30;
      cue.setAttribute("cx", w.x); cue.setAttribute("cy", w.y); cue.setAttribute("r", r); cue.setAttribute("opacity", 1 - ((k * 3) % 1));
    } else cue.setAttribute("opacity", 0);
    if (cap.getAttribute("data-s") !== String(s)) { cap.setAttribute("data-s", s); cap.textContent = lines[s]; }
    place();
    requestAnimationFrame(frame);
  }
  if (still) place(); else requestAnimationFrame(frame);
})();
