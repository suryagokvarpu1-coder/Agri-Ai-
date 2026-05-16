/* ═══════════════════════════════════════════════════════════════════════
   AGRI-AI · 3D ENGINE v8.0
   Three.js · Dynamic Particles · Agricultural Aura
   ═══════════════════════════════════════════════════════════════════════ */

class Agri3DEngine {
  constructor() {
    this.container = null;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.particles = null;
    this.mouse = { x: 0, y: 0 };
    
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.init());
    } else {
      this.init();
    }
  }

  async init() {
    // Inject Three.js if not present
    if (typeof THREE === 'undefined') {
      await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js');
    }

    this.setupScene();
    this.createParticles();
    this.addLights();
    this.animate();
    this.bindEvents();
    
    // Add class to body to trigger CSS transitions
    document.body.classList.add('premium-3d');
  }

  loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      document.head.appendChild(script);
    });
  }

  setupScene() {
    this.container = document.createElement('div');
    this.container.id = 'canvas-container';
    document.body.prepend(this.container);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);
  }

  createParticles() {
    const geometry = new THREE.BufferGeometry();
    const count = 2000;
    const posArray = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 15;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const material = new THREE.PointsMaterial({
      size: 0.015,
      color: 0x16a34a,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);

    // Add a glowing mesh to represent the "Sun" or "Growth Center"
    const sunGeom = new THREE.IcosahedronGeometry(2, 4);
    const sunMat = new THREE.MeshBasicMaterial({
      color: 0x16a34a,
      wireframe: true,
      transparent: true,
      opacity: 0.05
    });
    this.sun = new THREE.Mesh(sunGeom, sunMat);
    this.scene.add(this.sun);
  }

  addLights() {
    const p1 = new THREE.PointLight(0x16a34a, 1);
    p1.position.set(2, 3, 4);
    this.scene.add(p1);

    const p2 = new THREE.PointLight(0x3b82f6, 0.5);
    p2.position.set(-2, -3, -4);
    this.scene.add(p2);
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = (e.clientX / window.innerWidth) - 0.5;
      this.mouse.y = (e.clientY / window.innerHeight) - 0.5;
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const time = Date.now() * 0.0001;
    
    if (this.particles) {
      this.particles.rotation.y = time * 0.5;
      this.particles.rotation.x = this.mouse.y * 0.2;
      this.particles.rotation.y += this.mouse.x * 0.2;
    }

    if (this.sun) {
      this.sun.rotation.y -= 0.002;
      this.sun.rotation.z += 0.001;
      this.sun.scale.setScalar(1 + Math.sin(time * 5) * 0.05);
    }

    this.renderer.render(this.scene, this.camera);
  }
}

// Initialize the 3D Engine
window.agri3D = new Agri3DEngine();
