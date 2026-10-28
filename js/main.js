const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const cop = n => '$' + Math.round(n).toLocaleString('es-CO');
const wa = msg => window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
const norm = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const esAvanzado = (c, s) => s[2] && !c.todoAvanzado;
const AV = '<span class="av">Avanzado</span>';
const contar = c => c.g.reduce((a, g) => a + g.s.length, 0);

/* ---------- Encabezado ---------- */
function renderHeader() {
  const page = document.body.dataset.page;
  const links = [
    ['index.html', 'Inicio', 'inicio'],
    ['servicios.html', 'Servicios', 'servicios'],
    ['tienda.html', 'Tienda', 'tienda'],
    ['garantia.html', 'Garantía y términos', 'garantia'],
    ['contacto.html', 'Contacto', 'contacto']
  ];
  $('#header').outerHTML = `
  <header class="site-header">
    <nav class="container nav">
      <a href="index.html" class="logo"><img src="favicon_io/android-chrome-192x192.png" alt="Logo SIR·TECH"><span>SIR<b>·</b>TECH</span></a>
      <button class="burger" aria-label="Abrir menú"><i class="ti ti-menu-2"></i></button>
      <div class="menu">
        ${links.map(([href, txt, id]) => `<a href="${href}" class="${id === page ? 'act' : ''}">${txt}</a>`).join('')}
        <a href="tienda.html" class="cart-link" aria-label="Carrito"><i class="ti ti-shopping-cart"></i><span class="badge" id="badge"></span></a>
      </div>
    </nav>
  </header>`;
  $('.burger').addEventListener('click', () => {
    const open = $('.menu').classList.toggle('open');
    $('.burger i').className = open ? 'ti ti-x' : 'ti ti-menu-2';
  });
}

/* ---------- Pie de página ---------- */
function renderFooter() {
  $('#footer').outerHTML = `
  <section class="cta">
    <div class="container">
      <div><h3>¿Te dijeron que no tenía arreglo?</h3><div>Tráelo. Diagnóstico sin costo.</div></div>
      <button class="btn" id="cta-wa"><i class="ti ti-brand-whatsapp"></i> Escribir ahora</button>
    </div>
  </section>
  <footer class="site-footer">
    <div class="container">
      <div class="muted">© ${new Date().getFullYear()} SIR·TECH · ${CONFIG.direccion}, ${CONFIG.ciudad} · <a href="garantia.html">Términos y condiciones</a></div>
      <div class="social">
        <a href="${CONFIG.redes.instagram}" target="_blank" rel="noopener" aria-label="Instagram"><i class="ti ti-brand-instagram"></i></a>
        <a href="${CONFIG.redes.tiktok}" target="_blank" rel="noopener" aria-label="TikTok"><i class="ti ti-brand-tiktok"></i></a>
        <a href="${CONFIG.redes.facebook}" target="_blank" rel="noopener" aria-label="Facebook"><i class="ti ti-brand-facebook"></i></a>
      </div>
    </div>
  </footer>`;
  $('#cta-wa').addEventListener('click', () => wa('Hola SIR TECH, quiero hacer una consulta.'));
}

/* ---------- Carrito (se guarda entre páginas) ---------- */
const CART_KEY = 'sirtech-carrito';
const getCart = () => { try { return JSON.parse(localStorage.getItem(CART_KEY)) || {}; } catch { return {}; } };
const saveCart = c => { localStorage.setItem(CART_KEY, JSON.stringify(c)); updateBadge(); };
function updateBadge() {
  const n = Object.values(getCart()).reduce((a, b) => a + b, 0);
  const b = $('#badge');
  if (b) b.textContent = n || '';
}

/* ---------- Abierto / cerrado (hora de Colombia) ---------- */
function estaAbierto() {
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Bogota' }));
  const h = now.getHours() + now.getMinutes() / 60;
  return (CONFIG.horario[now.getDay()] || []).some(([a, b]) => h >= a && h < b);
}

/* ---------- Ubicación ---------- */
function renderUbicacion() {
  const abierto = estaAbierto();
  $$('.js-ubicacion').forEach(el => {
    el.innerHTML = `
    <div class="map reveal"><iframe src="${CONFIG.mapaEmbed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Mapa de SIR·TECH"></iframe></div>
    <div class="info reveal">
      <div class="card"><i class="ti ti-map-pin"></i><div><div class="hd">Dirección</div><div class="muted">${CONFIG.direccion}<br>${CONFIG.ciudad}</div></div></div>
      <div class="card"><i class="ti ti-clock"></i><div style="flex:1"><div class="row"><div class="hd">Horario</div><span class="chip ${abierto ? '' : 'off'}">${abierto ? 'Abierto ahora' : 'Cerrado ahora'}</span></div><div class="muted">${CONFIG.horarioTexto.join('<br>')}</div></div></div>
      <div class="card"><i class="ti ti-phone"></i><div><div class="hd">Teléfono y WhatsApp</div><div class="muted">${CONFIG.telefono}</div></div></div>
      <div class="card"><i class="ti ti-star"></i><div style="flex:1"><div class="row"><div class="hd">${CONFIG.rating} en Google</div><span class="stars">★★★★★</span></div><div class="muted">${CONFIG.opiniones} opiniones</div></div></div>
      <div class="actions">
        <a class="btn" href="${CONFIG.mapsLink}" target="_blank" rel="noopener"><i class="ti ti-navigation"></i> Cómo llegar</a>
        <a class="btn2" href="https://wa.me/${CONFIG.whatsapp}" target="_blank" rel="noopener"><i class="ti ti-brand-whatsapp"></i> WhatsApp</a>
        <a class="btn2" href="tel:+57${CONFIG.telefono.replace(/\s/g, '')}"><i class="ti ti-phone-call"></i> Llamar</a>
      </div>
    </div>`;
  });
}

/* ---------- Selector "¿Qué equipo necesitas reparar?" (Inicio) ---------- */
function initSelector() {
  const root = $('#selector');
  if (!root) return;
  const sel = new Set();
  let cur = SERVICIOS[0].k;

  root.innerHTML = `
    <div class="search"><i class="ti ti-search"></i><input id="q" class="fld" placeholder="Ej: no carga, se calienta, se mojó, pantalla rota…" aria-label="Buscar servicio o síntoma"></div>
    <div class="devs" id="devs"></div>
    <div class="panel">
      <div class="panel-head" id="ph"></div>
      <div id="list"></div>
      <div class="direct">
        <div class="direct-t"><i class="ti ti-message-circle-bolt"></i><span class="hd">¿No sabes qué tiene tu equipo?</span></div>
        <textarea id="msg" class="fld" rows="2" placeholder="Mi celular se cayó y la pantalla quedó negra"></textarea>
        <small class="muted">Opcional. No tienes que marcar ningún servicio, con contarnos basta.</small>
      </div>
      <div class="panel-foot">
        <div id="st"></div>
        <div class="row"><button class="btn2 sm" id="clr" hidden>Limpiar</button><button class="btn" id="cot"></button></div>
      </div>
    </div>`;

  $('#devs').innerHTML = SERVICIOS.map(c => `<button class="dev" data-k="${c.k}"><i class="ti ${c.i}"></i>${c.n}</button>`).join('');

  const item = (c, s, mostrarCat) => {
    const on = sel.has(s[0]);
    return `<div class="sv ${on ? 'sel' : ''}" data-n="${s[0]}"><span class="bx">${on ? '✓' : ''}</span><div><div class="sn">${s[0]}${esAvanzado(c, s) ? AV : ''}</div><div class="sd">${s[1]}${mostrarCat ? ` · <span class="sd-cat">${c.n}</span>` : ''}</div></div></div>`;
  };

  function render() {
    const q = norm($('#q').value.trim());
    $$('.dev').forEach(d => d.classList.toggle('on', !q && d.dataset.k === cur));
    if (q) {
      const res = [];
      SERVICIOS.forEach(c => c.g.forEach(g => g.s.forEach(s => {
        if (norm(`${s[0]} ${s[1]} ${g.n}`).includes(q)) res.push(item(c, s, true));
      })));
      $('#ph').innerHTML = `<h3><i class="ti ti-search"></i> Resultados</h3><span class="chip">${res.length} encontrados</span>`;
      $('#list').innerHTML = res.length
        ? `<div class="sv-list">${res.join('')}</div>`
        : '<p class="muted">Sin resultados. Cuéntanos abajo qué le pasa y te cotizamos.</p>';
    } else {
      const c = SERVICIOS.find(x => x.k === cur);
      $('#ph').innerHTML = `<div><h3><i class="ti ${c.i}"></i> ${c.n}</h3><div class="muted ph-d">${c.d}</div></div><span class="chip"><i class="ti ti-clock"></i> ${c.t}</span>`;
      $('#list').innerHTML = c.g.map(g =>
        `<div class="gh"><i class="ti ${g.i}"></i>${g.n} <span>· ${g.s.length}</span></div><div class="sv-list">${g.s.map(s => item(c, s)).join('')}</div>`
      ).join('');
    }
    const n = sel.size, pl = n > 1 ? 's' : '';
    $('#st').innerHTML = n
      ? `<span class="cnt">${n}</span> <span class="muted">servicio${pl} marcado${pl}</span>`
      : '<span class="muted">Sin servicios marcados: te cotizamos igual</span>';
    $('#clr').hidden = !n;
    $('#cot').innerHTML = `<i class="ti ti-brand-whatsapp"></i> ${n ? `Cotizar ${n} servicio${pl}` : 'Cotizar directo'}`;
  }

  root.addEventListener('click', e => {
    const d = e.target.closest('.dev');
    if (d) { cur = d.dataset.k; $('#q').value = ''; return render(); }
    const r = e.target.closest('.sv');
    if (r) { const n = r.dataset.n; sel.has(n) ? sel.delete(n) : sel.add(n); return render(); }
    if (e.target.closest('#clr')) { sel.clear(); return render(); }
    if (e.target.closest('#cot')) {
      const cat = SERVICIOS.find(x => x.k === cur).n;
      const falla = $('#msg').value.trim();
      let t = sel.size
        ? 'Hola SIR TECH, quiero cotizar:\n- ' + [...sel].join('\n- ')
        : `Hola SIR TECH, quiero cotizar un servicio de ${cat}.`;
      if (falla) t += `\n\nLo que le pasa: ${falla}`;
      wa(t);
    }
  });
  $('#q').addEventListener('input', render);
  render();
}

/* ---------- Página de servicios ---------- */
function initServicios() {
  const el = $('#lista-servicios');
  if (!el) return;
  const saltos = $('#saltos');
  if (saltos) saltos.innerHTML = SERVICIOS.map(c => `<a class="chip" href="#${c.k}"><i class="ti ${c.i}"></i>${c.n}</a>`).join('');

  el.innerHTML = SERVICIOS.map(c => `
    <article class="card cat reveal" id="${c.k}">
      <div class="cat-top">
        <div class="cat-ico"><i class="ti ${c.i}"></i></div>
        <div><h3>${c.n}</h3><div class="muted">${c.d}</div></div>
        <div class="cat-info"><span class="chip">${contar(c)} servicios</span><span class="chip"><i class="ti ti-clock"></i> ${c.t}</span></div>
      </div>
      <div class="groups">
        ${c.g.map(g => `
          <div class="grp">
            <div class="gh"><i class="ti ${g.i}"></i>${g.n}</div>
            ${g.s.map(s => `<div class="it"><div class="sn">${s[0]}${esAvanzado(c, s) ? AV : ''}</div><div class="sd">${s[1]}</div></div>`).join('')}
          </div>`).join('')}
      </div>
      <div class="cat-cta"><button class="btn" data-cat="${c.n}"><i class="ti ti-brand-whatsapp"></i> Cotizar ${c.n.toLowerCase()}</button></div>
    </article>`).join('');

  el.addEventListener('click', e => {
    const b = e.target.closest('[data-cat]');
    if (b) wa(`Hola SIR TECH, quiero cotizar un servicio de ${b.dataset.cat}.`);
  });
}

/* ---------- Tienda ---------- */
function initTienda() {
  const el = $('#tienda');
  if (!el) return;
  let cat = 'Todo';
  const cats = ['Todo', ...new Set(PRODUCTOS.map(p => p.c))];
  const find = n => PRODUCTOS.find(x => x.n === n);

  function render() {
    $('#cat-chips').innerHTML = cats.map(c => `<button class="chip ${c === cat ? 'on' : ''}" data-c="${c}">${c}</button>`).join('');
    $('#prods').innerHTML = PRODUCTOS.filter(p => cat === 'Todo' || p.c === cat).map(p => `
      <div class="prod">
        <div class="prod-img">${p.img ? `<img src="${p.img}" alt="${p.n}">` : `<i class="ti ${p.i}"></i>`}${p.b ? `<span class="pro">${p.b}</span>` : ''}</div>
        <div class="prod-body">
          <small>${p.c}</small>
          <div class="prod-name">${p.n}</div>
          <div class="prod-row"><span class="price">${cop(p.p)}</span><button class="add" data-add="${p.n}" aria-label="Agregar ${p.n}"><i class="ti ti-plus"></i></button></div>
        </div>
      </div>`).join('');

    let total = 0;
    const items = Object.entries(getCart()).map(([n, q]) => {
      const p = find(n);
      if (!p) return '';
      total += p.p * q;
      return `<div class="ci"><div>${n}<br><small class="muted">${cop(p.p * q)}</small></div><button class="qb" data-dec="${n}" aria-label="Quitar uno">−</button><span>${q}</span><button class="qb" data-add="${n}" aria-label="Agregar uno">+</button></div>`;
    }).join('');
    $('#cart-items').innerHTML = items || '<p class="muted">Tu carrito está vacío. Agrega productos con el botón +</p>';
    $('#cart-total').textContent = cop(total);
  }

  el.addEventListener('click', e => {
    const c = e.target.closest('[data-c]');
    if (c) { cat = c.dataset.c; return render(); }
    const a = e.target.closest('[data-add]');
    if (a) { const cart = getCart(); cart[a.dataset.add] = (cart[a.dataset.add] || 0) + 1; saveCart(cart); $('#cart-err').textContent = ''; return render(); }
    const d = e.target.closest('[data-dec]');
    if (d) { const cart = getCart(), n = d.dataset.dec; cart[n]--; if (cart[n] <= 0) delete cart[n]; saveCart(cart); return render(); }
    if (e.target.closest('#cart-clear')) { saveCart({}); return render(); }
    if (e.target.closest('#cart-send')) {
      const entries = Object.entries(getCart()).filter(([n]) => find(n));
      if (!entries.length) { $('#cart-err').textContent = 'Agrega al menos un producto.'; return; }
      let total = 0;
      const lines = entries.map(([n, q]) => { const p = find(n); total += p.p * q; return `- ${q} x ${n} (${cop(p.p * q)})`; });
      wa(`Hola SIR TECH, quiero hacer este pedido:\n${lines.join('\n')}\nTotal: ${cop(total)}`);
    }
  });
  render();
}

/* ---------- Formulario de contacto ---------- */
function initContacto() {
  const f = $('#form-contacto');
  if (!f) return;
  $('#f-equipo').innerHTML = '<option value="">Tipo de equipo</option>' + SERVICIOS.map(c => `<option>${c.n}</option>`).join('');
  const campos = { 'f-nombre': 'Escribe tu nombre', 'f-equipo': 'Elige el tipo de equipo', 'f-mensaje': 'Cuéntanos qué le pasa a tu equipo' };
  f.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;
    Object.entries(campos).forEach(([id, msg]) => {
      const v = $('#' + id).value.trim();
      $('#e-' + id).textContent = v ? '' : msg;
      if (!v) ok = false;
    });
    if (!ok) return;
    wa(`Hola SIR TECH, soy ${$('#f-nombre').value.trim()}.\nEquipo: ${$('#f-equipo').value}\n${$('#f-mensaje').value.trim()}`);
  });
  ['input', 'change'].forEach(ev => f.addEventListener(ev, e => {
    const er = $('#e-' + e.target.id);
    if (er) er.textContent = '';
  }));
}

/* ---------- Reseñas estilo Google ---------- */
function haceCuanto(fecha) {
  const dias = Math.floor((Date.now() - new Date(fecha + 'T12:00:00')) / 86400000);
  if (dias < 1) return 'hoy';
  if (dias < 7) return `hace ${dias} día${dias > 1 ? 's' : ''}`;
  const sem = Math.floor(dias / 7);
  if (sem < 9) return `hace ${sem} semana${sem > 1 ? 's' : ''}`;
  const mes = Math.floor(dias / 30);
  if (mes < 12) return `hace ${mes} mes${mes > 1 ? 'es' : ''}`;
  const an = Math.floor(dias / 365);
  return `hace ${an} año${an > 1 ? 's' : ''}`;
}

function initResenas() {
  const track = $('#resenas');
  if (!track || typeof RESENAS === 'undefined') return;
  const vp = track.parentElement;
  const colores = ['#1a73e8', '#e8710a', '#9334e6', '#188038', '#d93025', '#12b5cb'];
  const inicial = n => (n.match(/[A-Za-zÁÉÍÓÚÑáéíóúñ0-9]/) || ['?'])[0].toUpperCase();

  if ($('#res-ver')) $('#res-ver').href = CONFIG.mapsLink;
  if ($('#res-dejar')) $('#res-dejar').href = CONFIG.resenaLink || CONFIG.mapsLink;

  track.innerHTML = RESENAS.map((r, i) => `
    <div class="rc"><div class="rcard">
      <div class="r-top">
        <div class="r-av" style="background:${colores[i % colores.length]}">${inicial(r.nombre)}</div>
        <div><div class="r-name">${r.nombre}</div><div class="r-date">${haceCuanto(r.fecha)}</div></div>
        <i class="ti ti-brand-google r-g"></i>
      </div>
      <div class="r-stars">★★★★★</div>
      <p class="r-text clamp">${r.texto}</p>
      <button class="r-more" hidden>Leer más</button>
    </div></div>`).join('');

  let pg = 0, timer;
  const per = () => vp.offsetWidth < 600 ? 1 : vp.offsetWidth < 900 ? 2 : 3;
  const pages = () => Math.max(1, Math.ceil(RESENAS.length / per()));

  function go(p) {
    const n = pages();
    pg = (p + n) % n;
    track.style.setProperty('--per', per());
    track.style.transform = `translateX(-${pg * 100}%)`;
    const dots = $('#res-dots');
    if (dots) dots.innerHTML = Array.from({ length: n }, (_, i) =>
      `<button class="res-dot ${i === pg ? 'on' : ''}" data-i="${i}" aria-label="Página ${i + 1}"></button>`).join('');
  }

  function checkMore() {
    $$('.rcard', track).forEach(c => {
      const p = $('.r-text', c), b = $('.r-more', c);
      if (p.classList.contains('clamp')) b.hidden = p.scrollHeight <= p.clientHeight + 2;
    });
  }

  const start = () => { clearInterval(timer); timer = setInterval(() => go(pg + 1), 6000); };
  const stop = () => clearInterval(timer);

  if ($('#res-prev')) $('#res-prev').addEventListener('click', () => { go(pg - 1); start(); });
  if ($('#res-next')) $('#res-next').addEventListener('click', () => { go(pg + 1); start(); });
  if ($('#res-dots')) $('#res-dots').addEventListener('click', e => {
    const d = e.target.closest('.res-dot');
    if (d) { go(+d.dataset.i); start(); }
  });
  track.addEventListener('click', e => {
    const b = e.target.closest('.r-more');
    if (!b) return;
    const p = $('.r-text', b.parentElement);
    const cerrado = p.classList.toggle('clamp');
    b.textContent = cerrado ? 'Leer más' : 'Leer menos';
    cerrado ? start() : stop();
  });

  vp.addEventListener('mouseenter', stop);
  vp.addEventListener('mouseleave', start);
  let x0 = null;
  vp.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; stop(); }, { passive: true });
  vp.addEventListener('touchend', e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) go(dx < 0 ? pg + 1 : pg - 1);
    x0 = null; start();
  });

  new ResizeObserver(() => { go(Math.min(pg, pages() - 1)); checkMore(); }).observe(vp);
  go(0); checkMore(); start();
}

/* ---------- Animación al hacer scroll ---------- */
function initReveal() {
  if (!('IntersectionObserver' in window)) { $$('.reveal').forEach(el => el.classList.add('show')); return; }
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); }
  }), { threshold: 0.08 });
  $$('.reveal').forEach(el => io.observe(el));
}

/* ---------- Arranque (si una parte falla, las demás siguen funcionando) ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const pasos = [
    renderHeader, renderFooter, updateBadge,
    () => $$('[data-cfg]').forEach(el => el.textContent = CONFIG[el.dataset.cfg]),
    renderUbicacion, initSelector, initServicios, initTienda, initContacto, initResenas, initReveal
  ];
  pasos.forEach(fn => {
    try { fn(); } catch (err) { console.error('Error en', fn.name || 'paso', err); }
  });
});
