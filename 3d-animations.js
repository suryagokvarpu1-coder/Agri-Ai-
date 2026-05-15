/**
 * Agri-AI 3D Animation Engine
 * Three.js particle background + mouse-tracking card tilt + scroll reveals
 */

(function () {
    'use strict';

    // ── 1. Inject 3D CSS ──────────────────────────────────────────────────
    function injectCSS() {
        if (document.getElementById('agri-3d-css')) return;
        const link = document.createElement('link');
        link.id   = 'agri-3d-css';
        link.rel  = 'stylesheet';
        link.href = '3d-theme.css';
        document.head.appendChild(link);
    }

    // ── 2. Three.js Particle Background ──────────────────────────────────
    function initThreeJS() {
        if (typeof THREE === 'undefined') return;
        if (document.getElementById('threejs-canvas')) return;

        const canvas = document.createElement('canvas');
        canvas.id = 'threejs-canvas';
        document.body.insertBefore(canvas, document.body.firstChild);

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);

        const scene  = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        // ── Particle System ──────────────────────────────────────────────
        const PARTICLE_COUNT = window.innerWidth < 768 ? 600 : 1400;
        const positions  = new Float32Array(PARTICLE_COUNT * 3);
        const colors     = new Float32Array(PARTICLE_COUNT * 3);
        const sizes      = new Float32Array(PARTICLE_COUNT);
        const velocities = new Float32Array(PARTICLE_COUNT * 3);

        const palette = [
            new THREE.Color('#667eea'), // indigo
            new THREE.Color('#764ba2'), // purple
            new THREE.Color('#f093fb'), // pink
            new THREE.Color('#00ff88'), // neon green
            new THREE.Color('#3b82f6'), // blue
            new THREE.Color('#10b981'), // emerald
        ];

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const i3 = i * 3;
            positions[i3]     = (Math.random() - 0.5) * 20;
            positions[i3 + 1] = (Math.random() - 0.5) * 20;
            positions[i3 + 2] = (Math.random() - 0.5) * 15;

            velocities[i3]     = (Math.random() - 0.5) * 0.003;
            velocities[i3 + 1] = (Math.random() - 0.5) * 0.003 + 0.001;
            velocities[i3 + 2] = (Math.random() - 0.5) * 0.002;

            const color = palette[Math.floor(Math.random() * palette.length)];
            colors[i3]     = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;

            sizes[i] = Math.random() * 3 + 0.5;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color',    new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size',     new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.PointsMaterial({
            size: 0.06,
            vertexColors: true,
            transparent: true,
            opacity: 0.75,
            sizeAttenuation: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        // ── Connection Lines ─────────────────────────────────────────────
        const lineGeometry = new THREE.BufferGeometry();
        const linePositions = new Float32Array(PARTICLE_COUNT * 6);
        lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x667eea,
            transparent: true,
            opacity: 0.08,
            blending: THREE.AdditiveBlending,
        });
        const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
        scene.add(lines);

        // ── Mouse Parallax ───────────────────────────────────────────────
        let mouseX = 0, mouseY = 0;
        let targetX = 0, targetY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth  - 0.5) * 0.3;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 0.3;
        });

        // ── Resize Handler ───────────────────────────────────────────────
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // ── Animation Loop ───────────────────────────────────────────────
        let frame = 0;
        function animate() {
            requestAnimationFrame(animate);
            frame++;

            // Smooth mouse follow
            targetX += (mouseX - targetX) * 0.05;
            targetY += (mouseY - targetY) * 0.05;
            particles.rotation.y = targetX;
            particles.rotation.x = targetY;
            lines.rotation.y     = targetX;
            lines.rotation.x     = targetY;

            // Move particles
            const pos = geometry.attributes.position.array;
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                const i3 = i * 3;
                pos[i3]     += velocities[i3];
                pos[i3 + 1] += velocities[i3 + 1];
                pos[i3 + 2] += velocities[i3 + 2];

                // Wrap around
                if (pos[i3]     >  10) pos[i3]     = -10;
                if (pos[i3]     < -10) pos[i3]     =  10;
                if (pos[i3 + 1] >  10) pos[i3 + 1] = -10;
                if (pos[i3 + 1] < -10) pos[i3 + 1] =  10;
                if (pos[i3 + 2] >  7.5) pos[i3 + 2] = -7.5;
                if (pos[i3 + 2] < -7.5) pos[i3 + 2] =  7.5;
            }
            geometry.attributes.position.needsUpdate = true;

            // Update connection lines every 3 frames (performance)
            if (frame % 3 === 0) {
                let lineIdx = 0;
                const lp = lineGeometry.attributes.position.array;
                for (let i = 0; i < Math.min(PARTICLE_COUNT, 200); i++) {
                    const i3 = i * 3;
                    for (let j = i + 1; j < Math.min(PARTICLE_COUNT, 200); j++) {
                        const j3 = j * 3;
                        const dx = pos[i3] - pos[j3];
                        const dy = pos[i3+1] - pos[j3+1];
                        const dz = pos[i3+2] - pos[j3+2];
                        const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
                        if (dist < 2.5 && lineIdx < lp.length - 5) {
                            lp[lineIdx++] = pos[i3];
                            lp[lineIdx++] = pos[i3+1];
                            lp[lineIdx++] = pos[i3+2];
                            lp[lineIdx++] = pos[j3];
                            lp[lineIdx++] = pos[j3+1];
                            lp[lineIdx++] = pos[j3+2];
                        }
                    }
                }
                lineGeometry.attributes.position.needsUpdate = true;
                lineGeometry.setDrawRange(0, lineIdx / 3);
            }

            // Slow global rotation
            particles.rotation.y += 0.0003;
            lines.rotation.y     += 0.0003;

            renderer.render(scene, camera);
        }
        animate();
    }

    // ── 3. Mouse-Tracking Card Tilt ───────────────────────────────────────
    function initCardTilt() {
        const TILT_MAX = 12; // degrees

        function applyTilt(el) {
            if (el._tiltBound) return;
            el._tiltBound = true;

            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width  - 0.5;
                const y = (e.clientY - rect.top)  / rect.height - 0.5;
                const rotX = -y * TILT_MAX;
                const rotY =  x * TILT_MAX;
                el.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(10px) scale(1.02)`;
                el.style.boxShadow = `
                    ${-rotY * 2}px ${rotX * 2}px 40px rgba(0,0,0,0.5),
                    0 0 30px rgba(102,126,234,0.3),
                    ${-rotY}px ${rotX}px 20px rgba(240,147,251,0.15)
                `;
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = '';
                el.style.boxShadow = '';
                el.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.5s ease';
                setTimeout(() => { el.style.transition = ''; }, 500);
            });
        }

        function attachTiltToCards() {
            const selectors = [
                '.bg-white', '.carbon-card', '.crop-card',
                '.feedback-card', '.soil-type-card',
                '.text-center.bg-gray-800', '.bg-gray-800.p-6',
                '.bg-gray-800.p-8', '.add-crop-form'
            ];
            selectors.forEach(sel => {
                document.querySelectorAll(sel).forEach(el => {
                    // Skip on mobile
                    if (window.matchMedia('(hover: none)').matches) return;
                    applyTilt(el);
                });
            });
        }

        attachTiltToCards();

        // Re-attach when new cards are added (growth monitoring, etc.)
        const observer = new MutationObserver(() => attachTiltToCards());
        observer.observe(document.body, { childList: true, subtree: true });
    }

    // ── 4. Scroll Reveal Animations ───────────────────────────────────────
    function initScrollReveal() {
        // Add reveal classes to grid children
        function tagRevealElements() {
            const grids = document.querySelectorAll(
                '.grid, section > div > div.grid, .space-y-10 > div'
            );
            grids.forEach(grid => {
                Array.from(grid.children).forEach((child, i) => {
                    if (!child.classList.contains('reveal-3d') &&
                        !child.classList.contains('reveal-3d-left') &&
                        !child.classList.contains('reveal-3d-right')) {
                        child.classList.add('reveal-3d');
                    }
                });
            });

            // Also tag section headings
            document.querySelectorAll('section .text-center').forEach(el => {
                if (!el.classList.contains('reveal-3d')) {
                    el.classList.add('reveal-3d');
                }
            });
        }

        function checkVisibility() {
            document.querySelectorAll('.reveal-3d, .reveal-3d-left, .reveal-3d-right').forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
                    el.classList.add('visible');
                }
            });
        }

        tagRevealElements();
        checkVisibility(); // Run immediately for above-fold content

        window.addEventListener('scroll', checkVisibility, { passive: true });

        // Re-tag when DOM changes
        const observer = new MutationObserver(() => {
            tagRevealElements();
            checkVisibility();
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    // ── 5. Button Ripple Effect ───────────────────────────────────────────
    function initRipple() {
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('button, .login-button, .signup-button, .btn-primary, [type="submit"]');
            if (!btn) return;

            const rect   = btn.getBoundingClientRect();
            const size   = Math.max(rect.width, rect.height);
            const x      = e.clientX - rect.left - size / 2;
            const y      = e.clientY - rect.top  - size / 2;

            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px;`;

            // Ensure button has relative positioning
            const pos = getComputedStyle(btn).position;
            if (pos === 'static') btn.style.position = 'relative';
            btn.style.overflow = 'hidden';

            btn.appendChild(ripple);
            setTimeout(() => ripple.remove(), 700);
        });
    }

    // ── 6. 3D Number Counter Animation ───────────────────────────────────
    function initCounters() {
        function animateCounter(el) {
            if (el._counted) return;
            el._counted = true;

            const text   = el.textContent.trim();
            const match  = text.match(/^([\d.]+)([KMB+%]*)$/);
            if (!match) return;

            const target = parseFloat(match[1]);
            const suffix = match[2] || '';
            const duration = 1800;
            const start    = performance.now();

            function update(now) {
                const elapsed  = now - start;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = target * eased;

                el.textContent = (current >= 1000
                    ? Math.round(current).toLocaleString()
                    : current.toFixed(current < 10 ? 1 : 0)) + suffix;

                if (progress < 1) requestAnimationFrame(update);
                else el.textContent = text; // restore exact original
            }
            requestAnimationFrame(update);
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });

        function attachCounters() {
            document.querySelectorAll(
                '.text-4xl.font-bold, .text-3xl.font-bold, .countdown-number'
            ).forEach(el => {
                if (!el._counted) observer.observe(el);
            });
        }

        attachCounters();
        const mo = new MutationObserver(attachCounters);
        mo.observe(document.body, { childList: true, subtree: true });
    }

    // ── 7. Holographic Header Glow on Scroll ──────────────────────────────
    function initHeaderScroll() {
        const header = document.querySelector('header');
        if (!header) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY > 20;
            header.style.boxShadow = scrolled
                ? '0 4px 30px rgba(0,0,0,0.7), 0 0 60px rgba(102,126,234,0.2), 0 1px 0 rgba(255,255,255,0.05)'
                : '0 4px 30px rgba(0,0,0,0.5), 0 0 30px rgba(102,126,234,0.1)';
        }, { passive: true });
    }

    // ── 8. 3D Page Transition ─────────────────────────────────────────────
    function initPageTransitions() {
        // Fade-in on load
        document.body.style.opacity = '0';
        document.body.style.transform = 'perspective(1000px) rotateX(2deg) scale(0.98)';
        document.body.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.4,0,0.2,1)';

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                document.body.style.opacity = '1';
                document.body.style.transform = 'perspective(1000px) rotateX(0deg) scale(1)';
            });
        });

        // Fade-out on navigation
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href]');
            if (!link) return;
            const href = link.getAttribute('href');
            if (!href || href.startsWith('#') || href.startsWith('mailto:') ||
                href.startsWith('tel:') || href.startsWith('http') ||
                link.target === '_blank') return;

            e.preventDefault();
            document.body.style.opacity = '0';
            document.body.style.transform = 'perspective(1000px) rotateX(-2deg) scale(0.98)';
            setTimeout(() => { window.location.href = href; }, 350);
        });
    }

    // ── 9. Neon Cursor Trail ──────────────────────────────────────────────
    function initCursorTrail() {
        if (window.matchMedia('(hover: none)').matches) return; // skip touch

        const trail = [];
        const TRAIL_LENGTH = 8;

        for (let i = 0; i < TRAIL_LENGTH; i++) {
            const dot = document.createElement('div');
            const size = (TRAIL_LENGTH - i) * 3 + 2;
            dot.style.cssText = `
                position: fixed; pointer-events: none; z-index: 9999;
                width: ${size}px; height: ${size}px;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(102,126,234,${0.8 - i * 0.08}), transparent);
                transform: translate(-50%, -50%);
                transition: left ${i * 0.03 + 0.05}s ease, top ${i * 0.03 + 0.05}s ease;
                mix-blend-mode: screen;
            `;
            document.body.appendChild(dot);
            trail.push(dot);
        }

        document.addEventListener('mousemove', (e) => {
            trail.forEach(dot => {
                dot.style.left = e.clientX + 'px';
                dot.style.top  = e.clientY + 'px';
            });
        });
    }

    // ── Bootstrap ─────────────────────────────────────────────────────────
    function bootstrap() {
        injectCSS();
        initPageTransitions();
        initRipple();
        initHeaderScroll();

        // Wait for DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', onDOMReady);
        } else {
            onDOMReady();
        }
    }

    function onDOMReady() {
        initScrollReveal();
        initCardTilt();
        initCounters();
        initCursorTrail();

        // Load Three.js then init particle background
        if (!window.THREE) {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js';
            script.onload = () => {
                setTimeout(initThreeJS, 100);
            };
            document.head.appendChild(script);
        } else {
            initThreeJS();
        }
    }

    bootstrap();

})();