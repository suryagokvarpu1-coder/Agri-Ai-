/**
 * Agri-AI · 3D Animation Engine v3.0
 * Three.js particle field + mouse tilt + scroll reveals + cursor trail + ripple
 */
(function () {
  'use strict';

  /* ── 1. Three.js Particle Background ─────────────────────────────── */
  function initThreeJS() {
    if (typeof THREE === 'undefined' || document.getElementById('threejs-canvas')) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'threejs-canvas';
    document.body.insertBefore(canvas, document.body.firstChild);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 6;

    /* Particles */
    const N = window.innerWidth < 768 ? 500 : 1200;
    const pos  = new Float32Array(N * 3);
    const col  = new Float32Array(N * 3);
    const vel  = new Float32Array(N * 3);
    const sz   = new Float32Array(N);

    const palette = [
      [0.00, 0.84, 0.56], // #00d68f green
      [0.49, 0.23, 0.93], // #7c3aed violet
      [0.23, 0.51, 0.96], // #3b82f6 blue
      [0.93, 0.28, 0.60], // #ec4899 pink
      [0.00, 0.84, 0.56],
      [0.49, 0.23, 0.93],
    ];

    for (let i = 0; i < N; i++) {
      const i3 = i * 3;
      pos[i3]   = (Math.random() - 0.5) * 18;
      pos[i3+1] = (Math.random() - 0.5) * 18;
      pos[i3+2] = (Math.random() - 0.5) * 12;
      vel[i3]   = (Math.random() - 0.5) * 0.004;
      vel[i3+1] = (Math.random() - 0.5) * 0.004 + 0.001;
      vel[i3+2] = (Math.random() - 0.5) * 0.002;
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i3] = c[0]; col[i3+1] = c[1]; col[i3+2] = c[2];
      sz[i] = Math.random() * 2.5 + 0.5;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(col, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    /* Mouse parallax */
    let mx = 0, my = 0, tx = 0, ty = 0;
    document.addEventListener('mousemove', e => {
      mx = (e.clientX / window.innerWidth  - 0.5) * 0.25;
      my = (e.clientY / window.innerHeight - 0.5) * 0.25;
    });

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    /* Animate */
    (function loop() {
      requestAnimationFrame(loop);
      tx += (mx - tx) * 0.04;
      ty += (my - ty) * 0.04;
      points.rotation.y = tx;
      points.rotation.x = ty;
      points.rotation.y += 0.0002;

      const p = geo.attributes.position.array;
      for (let i = 0; i < N; i++) {
        const i3 = i * 3;
        p[i3]   += vel[i3];
        p[i3+1] += vel[i3+1];
        p[i3+2] += vel[i3+2];
        if (p[i3]   >  9) p[i3]   = -9;
        if (p[i3]   < -9) p[i3]   =  9;
        if (p[i3+1] >  9) p[i3+1] = -9;
        if (p[i3+1] < -9) p[i3+1] =  9;
        if (p[i3+2] >  6) p[i3+2] = -6;
        if (p[i3+2] < -6) p[i3+2] =  6;
      }
      geo.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    })();
  }

  /* ── 2. Mouse-Tracking Card Tilt ──────────────────────────────────── */
  function initTilt() {
    if (window.matchMedia('(hover: none)').matches) return;

    const MAX = 10;

    function attach(el) {
      if (el._tilt) return;
      el._tilt = true;

      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width  - 0.5;
        const y = (e.clientY - r.top)  / r.height - 0.5;
        el.style.transform = `perspective(800px) rotateX(${-y*MAX}deg) rotateY(${x*MAX}deg) translateZ(8px) scale(1.02)`;
        el.style.boxShadow = `
          ${-x*16}px ${y*16}px 40px rgba(0,0,0,0.5),
          0 0 30px rgba(0,214,143,0.12),
          ${-x*8}px ${y*8}px 20px rgba(124,58,237,0.08)
        `;
      });

      el.addEventListener('mouseleave', () => {
        el.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.5s ease';
        el.style.transform  = '';
        el.style.boxShadow  = '';
        setTimeout(() => { el.style.transition = ''; }, 500);
      });
    }

    function scan() {
      document.querySelectorAll(
        '.bg-white, .carbon-card, .crop-card, .feedback-card, .soil-type-card, .text-center.bg-gray-800, .bg-gray-800.p-6, .bg-gray-800.p-8'
      ).forEach(attach);
    }

    scan();
    new MutationObserver(scan).observe(document.body, { childList: true, subtree: true });
  }

  /* ── 3. Scroll Reveal ─────────────────────────────────────────────── */
  function initReveal() {
    function tag() {
      document.querySelectorAll('.grid > *, section .text-center, .space-y-10 > div').forEach(el => {
        if (!el.classList.contains('reveal-3d')) el.classList.add('reveal-3d');
      });
    }

    function check() {
      document.querySelectorAll('.reveal-3d').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.93) {
          el.classList.add('visible');
        }
      });
    }

    tag(); check();
    window.addEventListener('scroll', check, { passive: true });
    new MutationObserver(() => { tag(); check(); }).observe(document.body, { childList: true, subtree: true });
  }

  /* ── 4. Button Ripple ─────────────────────────────────────────────── */
  function initRipple() {
    document.addEventListener('click', e => {
      const btn = e.target.closest('button, a.btn-primary, .login-button, .signup-button');
      if (!btn) return;
      const r    = btn.getBoundingClientRect();
      const size = Math.max(r.width, r.height);
      const dot  = document.createElement('span');
      dot.className = 'ripple';
      dot.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX-r.left-size/2}px;top:${e.clientY-r.top-size/2}px`;
      if (getComputedStyle(btn).position === 'static') btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
      btn.appendChild(dot);
      setTimeout(() => dot.remove(), 600);
    });
  }

  /* ── 5. Number Counter ────────────────────────────────────────────── */
  function initCounters() {
    const io = new IntersectionObserver(entries => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting || target._counted) return;
        target._counted = true;
        const orig  = target.textContent.trim();
        const match = orig.match(/^([\d.]+)([^\d.]*)$/);
        if (!match) return;
        const end = parseFloat(match[1]), suf = match[2] || '';
        const t0  = performance.now();
        const dur = 1600;
        (function tick(now) {
          const p = Math.min((now - t0) / dur, 1);
          const e = 1 - Math.pow(1 - p, 3);
          target.textContent = (end * e >= 1000
            ? Math.round(end * e).toLocaleString()
            : (end * e).toFixed(end < 10 ? 1 : 0)) + suf;
          if (p < 1) requestAnimationFrame(tick);
          else target.textContent = orig;
        })(t0);
      });
    }, { threshold: 0.6 });

    function attach() {
      document.querySelectorAll('.text-4xl.font-bold, .text-3xl.font-bold, .countdown-number').forEach(el => {
        if (!el._counted) io.observe(el);
      });
    }
    attach();
    new MutationObserver(attach).observe(document.body, { childList: true, subtree: true });
  }

  /* ── 6. Cursor Trail ──────────────────────────────────────────────── */
  function initCursor() {
    if (window.matchMedia('(hover: none)').matches) return;
    const N = 7;
    const dots = Array.from({ length: N }, (_, i) => {
      const d = document.createElement('div');
      const s = (N - i) * 4 + 2;
      d.className = 'cursor-trail-dot';
      d.style.cssText = `width:${s}px;height:${s}px;opacity:${0.7 - i*0.08};transition:left ${i*0.04+0.04}s ease,top ${i*0.04+0.04}s ease;`;
      document.body.appendChild(d);
      return d;
    });
    document.addEventListener('mousemove', e => {
      dots.forEach(d => { d.style.left = e.clientX + 'px'; d.style.top = e.clientY + 'px'; });
    });
  }

  /* ── 7. Page Transition ───────────────────────────────────────────── */
  function initTransitions() {
    document.addEventListener('click', e => {
      const a = e.target.closest('a[href]');
      if (!a) return;
      const h = a.getAttribute('href');
      if (!h || h[0] === '#' || h.startsWith('mailto') || h.startsWith('tel') ||
          h.startsWith('http') || a.target === '_blank') return;
      e.preventDefault();
      document.body.style.cssText = 'opacity:0;transform:perspective(1000px) rotateX(-1.5deg) scale(0.99);transition:opacity 0.3s ease,transform 0.3s ease';
      setTimeout(() => { window.location.href = h; }, 320);
    });
  }

  /* ── 8. Header Scroll Shadow ──────────────────────────────────────── */
  function initHeader() {
    const h = document.querySelector('header');
    if (!h) return;
    window.addEventListener('scroll', () => {
      h.style.boxShadow = window.scrollY > 10
        ? '0 1px 0 rgba(255,255,255,0.04), 0 8px 32px rgba(0,0,0,0.5), 0 0 40px rgba(0,214,143,0.06)'
        : '0 1px 0 rgba(255,255,255,0.04), 0 4px 24px rgba(0,0,0,0.3)';
    }, { passive: true });
  }

  /* ── Bootstrap ────────────────────────────────────────────────────── */
  function boot() {
    initTransitions();
    initRipple();

    const ready = () => {
      initReveal();
      initTilt();
      initCounters();
      initCursor();
      initHeader();

      if (!window.THREE) {
        const s = document.createElement('script');
        s.src = 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js';
        s.onload = () => setTimeout(initThreeJS, 80);
        document.head.appendChild(s);
      } else {
        initThreeJS();
      }
    };

    document.readyState === 'loading'
      ? document.addEventListener('DOMContentLoaded', ready)
      : ready();
  }

  boot();
})();
