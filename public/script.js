// Cosmic Nebula, Stars, and 3D Spheres for Portfolio
// - Uses lavender field as base background, overlays cosmic nebula, stars, and particles
// - 3D tech stack spheres, rolling and bouncing
// - Fade-in animations for sections
// - Hamburger menu for mobile

// 1. Cosmic Nebula, Stars, and Particles Overlay
(function cosmicOverlay() {
  let canvas = document.createElement('canvas');
  canvas.id = 'cosmic-overlay';
  document.body.appendChild(canvas);
  let ctx = canvas.getContext('2d');
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Nebula swirl (radial gradients)
  function drawNebula() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    // Deep blue base
    let grad1 = ctx.createRadialGradient(canvas.width*0.3, canvas.height*0.4, 80, canvas.width*0.3, canvas.height*0.4, canvas.width*0.7);
    grad1.addColorStop(0, '#4B0082cc');
    grad1.addColorStop(0.5, '#0A0F2Dcc');
    grad1.addColorStop(1, 'transparent');
    ctx.globalAlpha = 0.7;
    ctx.beginPath(); ctx.arc(canvas.width*0.3, canvas.height*0.4, canvas.width*0.7, 0, 2*Math.PI); ctx.closePath();
    ctx.fillStyle = grad1; ctx.fill();
    // Magenta swirl
    let grad2 = ctx.createRadialGradient(canvas.width*0.7, canvas.height*0.6, 60, canvas.width*0.7, canvas.height*0.6, canvas.width*0.5);
    grad2.addColorStop(0, '#FF00FFcc');
    grad2.addColorStop(0.5, '#4B0082cc');
    grad2.addColorStop(1, 'transparent');
    ctx.globalAlpha = 0.5;
    ctx.beginPath(); ctx.arc(canvas.width*0.7, canvas.height*0.6, canvas.width*0.5, 0, 2*Math.PI); ctx.closePath();
    ctx.fillStyle = grad2; ctx.fill();
    ctx.globalAlpha = 1;
  }

  // Stars
  let stars = Array.from({length: 60}, () => ({
    x: Math.random(), y: Math.random(), r: 0.7+Math.random()*1.5, tw: Math.random()*Math.PI*2, speed: 0.008+Math.random()*0.008
  }));
  // Green floating particles
  let particles = Array.from({length: 30}, () => ({
    x: Math.random(), y: Math.random(), r: 1.5+Math.random()*2.5, dx: (Math.random()-0.5)*0.1, dy: (Math.random()-0.5)*0.1, alpha: 0.3+Math.random()*0.3
  }));

  function drawStarsAndParticles(time) {
    // Stars
    for (let s of stars) {
      let twinkle = 0.5 + 0.5*Math.sin(time*0.002 + s.tw);
      ctx.beginPath();
      ctx.arc(s.x*canvas.width, s.y*canvas.height, s.r*twinkle, 0, 2*Math.PI);
      ctx.fillStyle = '#FFFFFF50';
      ctx.shadowColor = '#fff';
      ctx.shadowBlur = 8*twinkle;
      ctx.globalAlpha = 0.7+0.3*twinkle;
      ctx.fill();
      ctx.shadowBlur = 0; ctx.globalAlpha = 1;
      s.tw += s.speed;
    }
    // Green particles
    for (let p of particles) {
      ctx.beginPath();
      ctx.arc(p.x*canvas.width, p.y*canvas.height, p.r, 0, 2*Math.PI);
      ctx.fillStyle = '#00FF88';
      ctx.globalAlpha = p.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
      // Move
      p.x += p.dx; p.y += p.dy;
      if (p.x < 0 || p.x > 1) p.dx *= -1;
      if (p.y < 0 || p.y > 1) p.dy *= -1;
    }
  }

  function animate(time) {
    drawNebula();
    drawStarsAndParticles(time);
    requestAnimationFrame(animate);
  }
  animate(0);
})();

// 2. 3D Tech Stack Cubes (Three.js)
(function techStackCubes() {
  const techs = [
    { label: 'HTML', icon: 'assets/html-icon.png' },
    { label: 'CSS', icon: 'assets/css-icon.png' },
    { label: 'JavaScript', icon: 'assets/javascript-icon.png' },
    { label: 'Node.js', icon: 'assets/nodejs-icon.png' },
    { label: 'Express.js', icon: 'assets/expressjs-icon.png' },
    { label: 'React', icon: 'assets/react-icon.png' },
    { label: 'MongoDB', icon: 'assets/mongodb-icon.png' },
    { label: 'Python', icon: 'assets/python-icon.png' },
    { label: 'TensorFlow', icon: 'assets/tensorflow-icon.png' }
  ];
  const container = document.getElementById('tech3d');
  if (!container || !window.THREE) return;
  let width = container.offsetWidth, height = container.offsetHeight;
  let renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setSize(width, height);
  container.appendChild(renderer.domElement);
  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera(60, width/height, 0.1, 1000);
  camera.position.z = 16;
  // Cubes
  let cubes = [];
  let xStart = -((techs.length-1)/2)*3.2;
  for (let i = 0; i < techs.length; i++) {
    let geo = new THREE.BoxGeometry(2,2,2, 6,6,6);
    let materials = [];
    for (let j = 0; j < 6; j++) {
      let tex = new THREE.TextureLoader().load(techs[i].icon);
      materials.push(new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0.92, color: 0xffffff }));
    }
    let mesh = new THREE.Mesh(geo, materials);
    mesh.position.x = xStart + i*3.2;
    mesh.position.y = 0;
    mesh.userData = { label: techs[i].label };
    scene.add(mesh);
    cubes.push(mesh);
  }
  // Lighting
  let ambient = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambient);
  let dir = new THREE.DirectionalLight(0x00A3FF, 0.5);
  dir.position.set(5, 8, 10);
  scene.add(dir);
  // Animate
  function animate() {
    let t = performance.now()*0.001;
    for (let i = 0; i < cubes.length; i++) {
      let c = cubes[i];
      c.rotation.x = Math.sin(t + i)*0.5;
      c.rotation.y = Math.cos(t + i)*0.7;
      c.position.y = Math.sin(t*1.2 + i)*0.7;
    }
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();
  // Responsive
  window.addEventListener('resize', () => {
    width = container.offsetWidth; height = container.offsetHeight;
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });
})();

// 3D Background Orb/Particles using Three.js
(function() {
  const container = document.getElementById('bg3d');
  if (!container) return;
  let width = window.innerWidth, height = window.innerHeight;
  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera(60, width/height, 0.1, 1000);
  camera.position.z = 7;
  let renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setClearColor(0x000000, 0); // transparent
  renderer.setSize(width, height);
  container.appendChild(renderer.domElement);

  // Glowing orb
  let orbGeo = new THREE.SphereGeometry(2.5, 64, 64);
  let orbMat = new THREE.MeshPhysicalMaterial({
    color: 0x00eaff,
    roughness: 0.2,
    transmission: 0.95,
    thickness: 1.2,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    emissive: 0x00eaff,
    emissiveIntensity: 0.25,
    opacity: 0.85,
    transparent: true
  });
  let orb = new THREE.Mesh(orbGeo, orbMat);
  scene.add(orb);

  // Glow effect
  let glowGeo = new THREE.SphereGeometry(2.7, 64, 64);
  let glowMat = new THREE.MeshBasicMaterial({
    color: 0x00eaff,
    transparent: true,
    opacity: 0.18
  });
  let glow = new THREE.Mesh(glowGeo, glowMat);
  scene.add(glow);

  // Floating particles
  let particles = [];
  let pGeo = new THREE.SphereGeometry(0.07, 12, 12);
  let pMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 });
  for (let i = 0; i < 32; i++) {
    let p = new THREE.Mesh(pGeo, pMat.clone());
    let phi = Math.random() * Math.PI * 2;
    let theta = Math.random() * Math.PI;
    let r = 3.5 + Math.random() * 1.5;
    p.position.set(
      Math.sin(theta) * Math.cos(phi) * r,
      Math.cos(theta) * r * 0.7,
      Math.sin(theta) * Math.sin(phi) * r
    );
    scene.add(p);
    particles.push({ mesh: p, phi, theta, r, speed: 0.003 + Math.random() * 0.003 });
  }

  // Lighting
  let ambient = new THREE.AmbientLight(0x00eaff, 0.7);
  scene.add(ambient);
  let dir = new THREE.DirectionalLight(0xffffff, 0.25);
  dir.position.set(5, 8, 10);
  scene.add(dir);

  // Animate
  function animate() {
    orb.rotation.y += 0.003;
    glow.rotation.y -= 0.0015;
    particles.forEach(p => {
      p.phi += p.speed;
      p.mesh.position.x = Math.sin(p.theta) * Math.cos(p.phi) * p.r;
      p.mesh.position.z = Math.sin(p.theta) * Math.sin(p.phi) * p.r;
    });
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();

  // Responsive
  window.addEventListener('resize', () => {
    width = window.innerWidth; height = window.innerHeight;
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });
})();

// 3D Tilt Effect for Project Cards
(function() {
  const cards = document.querySelectorAll('.project-card[data-tilt]');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xc = rect.width/2, yc = rect.height/2;
      const dx = (x - xc)/xc, dy = (y - yc)/yc;
      card.style.transform = `rotateY(${dx*10}deg) rotateX(${-dy*10}deg) scale(1.03)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

// Glowing Animation for Contact Icons
(function() {
  const icons = document.querySelectorAll('.contact-icon');
  icons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
      icon.style.boxShadow = '0 0 32px 0 #00eaffcc, 0 4px 24px 0 #00eaff55';
    });
    icon.addEventListener('mouseleave', () => {
      icon.style.boxShadow = '';
    });
  });
})();

// 4. Hamburger Menu for Mobile
(function hamburgerMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (!hamburger || !navLinks) return;
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
})();

// 5. Fade-in Animation for Sections
(function fadeInSections() {
  const sections = document.querySelectorAll('section, .about-card, .project-card, .contact-card');
  const observer = new window.IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  sections.forEach(sec => {
    sec.classList.add('fade-in');
    observer.observe(sec);
  });
})();
