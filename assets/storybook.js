// Storybook theme helpers shared by every page.
// Splits each <h1> into letters so the theme can colour and tilt them like a picture-book title.
(() => {
  for (const h of document.querySelectorAll('h1')){
    if (h.dataset.split) continue;
    const text = h.textContent.trim();
    h.dataset.split = '1';
    h.setAttribute('aria-label', text);
    h.textContent = '';
    let k = 0;
    for (const word of text.split(' ')){
      if (k) h.appendChild(document.createTextNode(' '));
      const w = document.createElement('span');
      w.style.whiteSpace = 'nowrap'; w.setAttribute('aria-hidden', 'true');
      for (const ch of word){
        const s = document.createElement('span');
        s.className = 'ltr ltr-' + (k % 4);
        s.style.setProperty('--r', (((k * 37) % 7) - 3) * 1.1 + 'deg');
        s.style.setProperty('--y', (((k * 53) % 5) - 2) * .025 + 'em');
        s.textContent = ch; w.appendChild(s); k++;
      }
      h.appendChild(w);
    }
  }
})();

// Paints a storybook face (dot eyes, watercolour cheeks, hand-drawn mouth) onto a canvas.
// Moods: happy, rest, sleep, tired, ouch, full, charging.
window.storyFace = function (x, W, H, mood){
  const ink = '#3a2f3a', cx = W / 2, ey = H * .44, ex = W * .17, lw = Math.max(3, W * .018);
  const TAU = Math.PI * 2;
  x.clearRect(0, 0, W, H);
  x.lineCap = 'round'; x.lineJoin = 'round'; x.strokeStyle = ink; x.fillStyle = ink; x.lineWidth = lw;
  // watercolour cheeks
  for (const s of [-1, 1]){
    const gx = cx + s * W * .3, gy = H * .62, r = W * .1;
    const g = x.createRadialGradient(gx, gy, 0, gx, gy, r);
    g.addColorStop(0, 'rgba(214,92,86,.5)'); g.addColorStop(.6, 'rgba(214,92,86,.22)'); g.addColorStop(1, 'rgba(214,92,86,0)');
    x.fillStyle = g; x.beginPath(); x.ellipse(gx, gy, r * 1.15, r * .8, 0, 0, TAU); x.fill();
  }
  x.fillStyle = ink;
  const dot = (px, py, s = 1) => { x.beginPath(); x.ellipse(px, py, W * .024 * s, W * .032 * s, 0, 0, TAU); x.fill(); };
  const brow = (px, py, tilt) => { x.lineWidth = lw * .7; x.beginPath(); x.moveTo(px - W * .035, py + tilt); x.quadraticCurveTo(px, py - H * .03, px + W * .035, py - tilt); x.stroke(); x.lineWidth = lw; };
  const smile = (w, d) => { x.beginPath(); x.moveTo(cx - w, H * .64); x.bezierCurveTo(cx - w * .4, H * .64 + d, cx + w * .5, H * .64 + d * 1.05, cx + w * 1.04, H * .635); x.stroke(); };
  const zz = () => { x.fillStyle = '#5b4b8a'; x.font = `400 ${Math.round(W * .13)}px "Londrina Solid", "Comic Sans MS", sans-serif`; x.fillText('z', W * .8, H * .26); x.font = `400 ${Math.round(W * .09)}px "Londrina Solid", "Comic Sans MS", sans-serif`; x.fillText('z', W * .89, H * .14); x.fillStyle = ink; };
  const star = (px, py, r) => { x.fillStyle = '#e2a93b'; x.beginPath(); for (let i = 0; i < 8; i++){ const a = i * Math.PI / 4, rr = i % 2 ? r * .32 : r; x.lineTo(px + Math.cos(a) * rr, py + Math.sin(a) * rr); } x.closePath(); x.fill(); x.fillStyle = ink; };
  if (mood === 'happy'){
    dot(cx - ex, ey); dot(cx + ex, ey); brow(cx - ex, ey - H * .13, 2); brow(cx + ex, ey - H * .13, -2); smile(W * .09, H * .09);
  } else if (mood === 'rest'){
    for (const s of [-1, 1]){ x.beginPath(); x.arc(cx + s * ex, ey - H * .02, W * .035, .15 * Math.PI, .85 * Math.PI); x.stroke(); }
    smile(W * .06, H * .05);
  } else if (mood === 'sleep'){
    for (const s of [-1, 1]){
      const px = cx + s * ex; x.beginPath(); x.arc(px, ey - H * .03, W * .036, .1 * Math.PI, .9 * Math.PI); x.stroke();
      x.lineWidth = lw * .55; for (const d of [-.6, 0, .6]){ x.beginPath(); x.moveTo(px + d * W * .03, ey + H * .035); x.lineTo(px + d * W * .04, ey + H * .065); x.stroke(); } x.lineWidth = lw;
    }
    x.beginPath(); x.ellipse(cx, H * .7, W * .022, H * .03, 0, 0, TAU); x.stroke(); zz();
  } else if (mood === 'tired'){
    for (const s of [-1, 1]){ const px = cx + s * ex; x.beginPath(); x.moveTo(px - W * .04, ey - H * .005); x.lineTo(px + W * .04, ey + H * .005); x.stroke(); x.beginPath(); x.ellipse(px, ey + H * .02, W * .02, H * .022, 0, 0, Math.PI); x.fill(); }
    x.beginPath(); x.moveTo(cx - W * .06, H * .68); x.quadraticCurveTo(cx, H * .66, cx + W * .06, H * .685); x.stroke();
  } else if (mood === 'ouch'){
    for (const s of [-1, 1]){ const px = cx + s * ex; x.lineWidth = lw * .75; x.beginPath(); for (let i = 0; i <= 40; i++){ const a = i / 40 * 2.6 * TAU, r = W * .045 * i / 40; i ? x.lineTo(px + Math.cos(a) * r, ey + Math.sin(a) * r) : x.moveTo(px, ey); } x.stroke(); x.lineWidth = lw; }
    x.beginPath(); x.moveTo(cx - W * .1, H * .7); for (let i = 1; i <= 6; i++) x.lineTo(cx - W * .1 + i * W * .2 / 6, H * .7 + (i % 2 ? -1 : 1) * H * .035); x.stroke();
  } else if (mood === 'full'){
    for (const s of [-1, 1]){ x.beginPath(); x.arc(cx + s * ex, ey + H * .03, W * .038, 1.1 * Math.PI, 1.9 * Math.PI); x.stroke(); }
    x.beginPath(); x.moveTo(cx - W * .085, H * .61); x.bezierCurveTo(cx - W * .05, H * .76, cx + W * .05, H * .76, cx + W * .085, H * .61); x.closePath(); x.fill();
    star(W * .14, H * .2, W * .04); star(W * .86, H * .22, W * .03); star(W * .8, H * .08, W * .02);
  } else if (mood === 'charging'){
    dot(cx - ex, ey, 1.15); dot(cx + ex, ey, 1.15); brow(cx - ex, ey - H * .15, 4); brow(cx + ex, ey - H * .15, -4);
    x.beginPath(); x.ellipse(cx, H * .69, W * .03, H * .045, 0, 0, TAU); x.fill();
    x.fillStyle = '#e2a93b'; const bx = W * .84, by = H * .08, k = W / 512;
    x.beginPath(); x.moveTo(bx + 18 * k, by); x.lineTo(bx - 18 * k, by + 70 * k); x.lineTo(bx + 6 * k, by + 70 * k); x.lineTo(bx - 8 * k, by + 128 * k); x.lineTo(bx + 40 * k, by + 46 * k); x.lineTo(bx + 14 * k, by + 46 * k); x.lineTo(bx + 34 * k, by); x.closePath(); x.fill();
  }
};
