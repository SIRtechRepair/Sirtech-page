/* Fondo animado: líneas de luz recorriendo pistas de circuito */
(function () {
  const cv = document.getElementById('fondo-circuito');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let W, H, paths = [], streaks = [], flashes = [], last = 0, visible = true, raf;

  const len = p => {
    let L = 0;
    for (let i = 1; i < p.length; i++) L += Math.abs(p[i][0] - p[i - 1][0]) + Math.abs(p[i][1] - p[i - 1][1]);
    return L;
  };

  function at(o, t) {
    t = Math.max(0, Math.min(1, t));
    let L = o.L * t;
    const p = o.p;
    for (let i = 1; i < p.length; i++) {
      const s = Math.abs(p[i][0] - p[i - 1][0]) + Math.abs(p[i][1] - p[i - 1][1]);
      if (L <= s) {
        const k = s ? L / s : 0;
        return [p[i - 1][0] + (p[i][0] - p[i - 1][0]) * k, p[i - 1][1] + (p[i][1] - p[i - 1][1]) * k];
      }
      L -= s;
    }
    return p[p.length - 1];
  }

  function trace(o) {
    ctx.beginPath();
    ctx.moveTo(o.p[0][0], o.p[0][1]);
    o.p.slice(1).forEach(q => ctx.lineTo(q[0], q[1]));
  }

  function newStreak() {
    const i = Math.floor(Math.random() * paths.length);
    return { i, t: Math.random() * 0.3, v: (120 + Math.random() * 220) / paths[i].L / 60, tail: 60 + Math.random() * 90 };
  }

  function build() {
    const g = 24, movil = W < 600;
    paths = [];
    for (let i = 0; i < (movil ? 24 : 42); i++) {
      let x = Math.round(Math.random() * W / g) * g, y = Math.round(Math.random() * H / g) * g;
      const p = [[x, y]];
      for (let s = 0; s < 6; s++) {
        if (Math.random() < 0.55) x += (Math.random() < 0.5 ? -1 : 1) * g * (2 + Math.floor(Math.random() * 6));
        else y += (Math.random() < 0.5 ? -1 : 1) * g * (1 + Math.floor(Math.random() * 3));
        p.push([x, y]);
      }
      paths.push({ p, L: len(p) || 1 });
    }
    streaks = Array.from({ length: movil ? 12 : 22 }, newStreak);
    flashes = [];
  }

  function size() {
    const r = cv.getBoundingClientRect(), d = Math.min(window.devicePixelRatio || 1, 2);
    W = r.width; H = r.height;
    cv.width = W * d; cv.height = H * d;
    ctx.setTransform(d, 0, 0, d, 0, 0);
    build();
    if (sinMovimiento) draw(0, true);
  }

  function draw(now, unaVez) {
    ctx.fillStyle = '#070907';
    ctx.fillRect(0, 0, W, H);

    /* Pistas base */
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = 'rgba(124,252,0,.10)';
    ctx.fillStyle = 'rgba(124,252,0,.22)';
    paths.forEach(o => {
      trace(o); ctx.stroke();
      o.p.forEach(q => ctx.fillRect(q[0] - 2.5, q[1] - 2.5, 5, 5));
    });

    /* Pistas que se iluminan de golpe */
    if (!unaVez && now - last > 500 + Math.random() * 700) {
      last = now;
      flashes.push({ i: Math.floor(Math.random() * paths.length), a: 1 });
    }
    flashes.forEach(f => {
      ctx.save();
      ctx.shadowColor = '#7CFC00'; ctx.shadowBlur = 14 * f.a;
      ctx.lineWidth = 2; ctx.strokeStyle = 'rgba(160,255,80,' + (0.55 * f.a) + ')';
      trace(paths[f.i]); ctx.stroke();
      ctx.restore();
      f.a -= 0.025;
    });
    flashes = flashes.filter(f => f.a > 0);

    /* Líneas de luz con estela */
    ctx.lineCap = 'round';
    streaks.forEach((s, k) => {
      if (!unaVez) s.t += s.v;
      const o = paths[s.i], dt = s.tail / o.L, N = 14;
      if (s.t - dt > 1) { streaks[k] = newStreak(); return; }
      for (let j = 0; j < N; j++) {
        const t1 = s.t - dt * (j / N), t2 = s.t - dt * ((j + 1) / N);
        if (t1 < 0) break;
        const a = at(o, t1), b = at(o, t2), al = 1 - j / N;
        ctx.strokeStyle = 'rgba(190,255,120,' + (al * 0.95) + ')';
        ctx.lineWidth = 2.6 * al + 0.4;
        ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
      }
      if (s.t <= 1) {
        const h = at(o, s.t), h2 = at(o, s.t - dt * 0.12);
        ctx.save();
        ctx.shadowColor = '#7CFC00'; ctx.shadowBlur = 18;
        ctx.strokeStyle = 'rgba(235,255,210,' + (0.7 + Math.random() * 0.3) + ')';
        ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(h[0], h[1]); ctx.lineTo(h2[0], h2[1]); ctx.stroke();
        ctx.restore();
      }
    });

    if (!unaVez && visible) raf = requestAnimationFrame(draw);
  }

  new ResizeObserver(size).observe(cv);
  /* Pausa la animación cuando el inicio no está en pantalla (ahorra batería) */
  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible && !sinMovimiento) { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); }
  }).observe(cv);
  size();
})();
