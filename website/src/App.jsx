import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { BatteryWarning, ChevronRight, Diamond, Hexagon, MousePointer2 } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Lifespan', href: '#time-travel' },
  { label: 'Tech', href: '#tech' },
  { label: 'Mission', href: '#mission' },
  { label: 'Applications', href: '#applications' },
  { label: 'Advantage', href: '#advantage' },
  { label: 'Vision', href: '#vision' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

const useInView = (ref, { threshold = 0.2, rootMargin = '0px' } = {}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, threshold, rootMargin]);

  return isVisible;
};

const createHeroScene = (container, titleEl) => {
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000000, 0.05);

  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.z = 8;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  container.appendChild(renderer.domElement);

  const geometry = new THREE.OctahedronGeometry(2, 2);
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0,
    roughness: 0,
    transmission: 0.8,
    thickness: 2,
    clearcoat: 1,
    clearcoatRoughness: 0,
    side: THREE.DoubleSide,
  });
  const diamond = new THREE.Mesh(geometry, material);
  scene.add(diamond);

  const wireGeo = new THREE.OctahedronGeometry(2.01, 2);
  const wireMat = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    wireframe: true,
    transparent: true,
    opacity: 0.05,
  });
  const wireframe = new THREE.Mesh(wireGeo, wireMat);
  scene.add(wireframe);

  const internalLight = new THREE.PointLight(0x00f0ff, 2, 10);
  scene.add(internalLight);

  scene.add(new THREE.AmbientLight(0x222222));

  const spotLight = new THREE.SpotLight(0xffffff, 1);
  spotLight.position.set(5, 10, 5);
  scene.add(spotLight);

  let mouseX = 0;
  let mouseY = 0;
  const onMouseMove = (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  };
  window.addEventListener('mousemove', onMouseMove);

  let animationId;
  let running = false;

  const animate = () => {
    if (!running) return;
    animationId = requestAnimationFrame(animate);

    diamond.rotation.y += 0.002;
    diamond.rotation.z += 0.001;
    wireframe.rotation.y = diamond.rotation.y;
    wireframe.rotation.z = diamond.rotation.z;

    internalLight.position.x += (mouseX * 3 - internalLight.position.x) * 0.05;
    internalLight.position.y += (mouseY * 3 - internalLight.position.y) * 0.05;

    renderer.render(scene, camera);
  };

  const onResize = () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  };
  window.addEventListener('resize', onResize);

  if (titleEl) {
    setTimeout(() => {
      titleEl.style.opacity = '1';
    }, 500);
  }

  return {
    start() {
      if (running) return;
      running = true;
      animate();
    },
    stop() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
    },
    cleanup() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      container.innerHTML = '';
    },
  };
};

const createTechScene = (container, sliderEl, labelEls) => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.set(0, 2, 8);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const assemblyGroup = new THREE.Group();
  scene.add(assemblyGroup);

  const explodeMeshes = [];

  const coreGeo = new THREE.IcosahedronGeometry(0.8, 1);
  const coreMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true });
  const core = new THREE.Mesh(coreGeo, coreMat);
  core.add(new THREE.PointLight(0x00f0ff, 1, 5));
  assemblyGroup.add(core);
  explodeMeshes.push({ mesh: core, axis: 'x', dir: 0 });

  const layerGeo = new THREE.BoxGeometry(0.5, 3, 3);
  const layerMat = new THREE.MeshPhysicalMaterial({
    color: 0x222222,
    transmission: 0.5,
    opacity: 0.8,
    transparent: true,
    roughness: 0.2,
  });
  const layerLeft = new THREE.Mesh(layerGeo, layerMat);
  const layerRight = new THREE.Mesh(layerGeo, layerMat);
  assemblyGroup.add(layerLeft);
  assemblyGroup.add(layerRight);
  explodeMeshes.push({ mesh: layerLeft, axis: 'x', dir: -1.5 });
  explodeMeshes.push({ mesh: layerRight, axis: 'x', dir: 1.5 });

  const casingGeo = new THREE.BoxGeometry(4, 4, 4);
  const casingEdges = new THREE.EdgesGeometry(casingGeo);
  const casingMat = new THREE.LineBasicMaterial({ color: 0x444444 });
  const caseLeft = new THREE.LineSegments(casingEdges, casingMat);
  const caseRight = new THREE.LineSegments(casingEdges, casingMat);
  assemblyGroup.add(caseLeft);
  assemblyGroup.add(caseRight);
  explodeMeshes.push({ mesh: caseLeft, axis: 'x', dir: -3.5 });
  explodeMeshes.push({ mesh: caseRight, axis: 'x', dir: 3.5 });

  const updateLabels = (val) => {
    if (!labelEls.length) return;
    labelEls.forEach((label) => {
      if (!label) return;
      label.classList.remove('opacity-100', 'text-cherenkov');
      label.classList.add('opacity-30');
    });

    const activeIndex = val < 0.33 ? 0 : val < 0.66 ? 1 : 2;
    if (labelEls[activeIndex]) {
      labelEls[activeIndex].classList.add('opacity-100', 'text-cherenkov');
      labelEls[activeIndex].classList.remove('opacity-30');
    }
  };

  const onSlider = (event) => {
    const val = Number(event.target.value) / 100;
    const expansionFactor = 1 - val;
    explodeMeshes.forEach((item) => {
      item.mesh.position[item.axis] = item.dir * expansionFactor * 2;
    });
    assemblyGroup.rotation.y = val * Math.PI;
    updateLabels(val);
  };

  if (sliderEl) {
    sliderEl.addEventListener('input', onSlider);
    sliderEl.dispatchEvent(new Event('input'));
  }

  let animationId;
  let running = false;

  const animate = () => {
    if (!running) return;
    animationId = requestAnimationFrame(animate);
    if (sliderEl && Number(sliderEl.value) < 90) {
      assemblyGroup.rotation.y += 0.002;
    }
    renderer.render(scene, camera);
  };

  const onResize = () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  };
  window.addEventListener('resize', onResize);

  return {
    start() {
      if (running) return;
      running = true;
      animate();
    },
    stop() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
    },
    cleanup() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
      if (sliderEl) sliderEl.removeEventListener('input', onSlider);
      renderer.dispose();
      container.innerHTML = '';
    },
  };
};

const createGlobeScene = (container, cards) => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.z = 15;
  camera.position.x = 5;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const globeGroup = new THREE.Group();
  scene.add(globeGroup);

  const geometry = new THREE.SphereGeometry(4, 32, 32);
  const material = new THREE.MeshBasicMaterial({
    color: 0x111111,
    wireframe: true,
    transparent: true,
    opacity: 0.3,
  });
  globeGroup.add(new THREE.Mesh(geometry, material));

  const particlesGeo = new THREE.BufferGeometry();
  const particlesCount = 200;
  const posArray = new Float32Array(particlesCount * 3);
  for (let i = 0; i < particlesCount * 3; i += 1) {
    posArray[i] = (Math.random() - 0.5) * 10;
  }
  particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  const particles = new THREE.Points(
    particlesGeo,
    new THREE.PointsMaterial({ size: 0.05, color: 0x555555 })
  );
  globeGroup.add(particles);

  const hotspots = [
    { id: 'ocean', pos: new THREE.Vector3(3, 2, 2) },
    { id: 'space', pos: new THREE.Vector3(-3, 3, 0) },
    { id: 'land', pos: new THREE.Vector3(1, -2, 3.5) },
  ];

  const hotspotMeshes = [];
  hotspots.forEach((hotspot) => {
    const sGeo = new THREE.SphereGeometry(0.2, 16, 16);
    const sMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    const mesh = new THREE.Mesh(sGeo, sMat);
    mesh.position.copy(hotspot.pos);
    mesh.userData = { id: hotspot.id };
    globeGroup.add(mesh);
    hotspotMeshes.push(mesh);

    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.3, 0.35, 32),
      new THREE.MeshBasicMaterial({ color: 0x00f0ff, side: THREE.DoubleSide, transparent: true, opacity: 0.5 })
    );
    ring.position.copy(hotspot.pos);
    ring.lookAt(camera.position);
    globeGroup.add(ring);
  });

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const onMouseMove = (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  };
  window.addEventListener('mousemove', onMouseMove);

  const updateCards = (activeId) => {
    Object.entries(cards).forEach(([id, card]) => {
      if (!card) return;
      if (id === activeId) {
        card.classList.remove('opacity-50', 'border-gray-700');
        card.classList.add('opacity-100', 'border-cherenkov', 'scale-105');
      } else {
        card.classList.remove('opacity-100', 'border-cherenkov', 'scale-105');
        card.classList.add('opacity-50', 'border-gray-700');
      }
    });
  };

  let animationId;
  let running = false;

  const animate = () => {
    if (!running) return;
    animationId = requestAnimationFrame(animate);

    globeGroup.rotation.y += 0.001;
    particles.rotation.y += 0.001;

    const time = Date.now() * 0.001;
    hotspotMeshes[1].position.x = Math.sin(time) * 4.5;
    hotspotMeshes[1].position.z = Math.cos(time) * 4.5;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(hotspotMeshes);
    if (intersects.length > 0) {
      const id = intersects[0].object.userData.id;
      updateCards(id);
      document.body.style.cursor = 'pointer';
    } else {
      updateCards(null);
      document.body.style.cursor = 'default';
    }

    renderer.render(scene, camera);
  };

  const onResize = () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  };
  window.addEventListener('resize', onResize);

  return {
    start() {
      if (running) return;
      running = true;
      animate();
    },
    stop() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      document.body.style.cursor = 'default';
    },
    cleanup() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      container.innerHTML = '';
      document.body.style.cursor = 'default';
    },
  };
};

function App() {
  const faqItems = [
    {
      question: 'Is this a nuclear battery?',
      answer: 'Yes. It uses controlled beta decay to generate electrical energy continuously.',
    },
    {
      question: 'Is it dangerous?',
      answer:
        'No. The radiation is fully contained inside the device. Nothing is emitted externally. There is no chain reaction, no combustion, and no meltdown scenario.',
    },
    {
      question: 'Does it produce radiation outside the system?',
      answer:
        'No. The beta particles are absorbed internally and converted into electrical energy. External exposure is effectively zero.',
    },
    {
      question: 'Can it explode or overheat?',
      answer:
        'No. The system is solid-state, non-pressurized, and passively stable. It does not rely on chemical reactions or thermal runaway.',
    },
    {
      question: 'What happens if the device is damaged?',
      answer:
        'The fuel is sealed within multiple containment layers designed to prevent leakage under mechanical stress, heat, and corrosion.',
    },
    {
      question: 'How long does it actually last?',
      answer:
        'Power output follows predictable decay curves measured in decades. There is no sudden failure point.',
    },
    {
      question: 'Is this the same as a reactor?',
      answer:
        'No. There is no fission chain reaction, no critical mass, and no active control system. It is fundamentally different from a nuclear reactor.',
    },
    {
      question: 'Why use nuclear at all?',
      answer:
        'Because chemical batteries fail. When replacement is impossible, nuclear physics becomes the simplest solution.',
    },
    {
      question: 'Is this legal?',
      answer:
        'Yes. Deployment depends on application and jurisdiction, but regulatory frameworks already exist for radioisotope power systems.',
    },
  ];
  const heroSectionRef = useRef(null);
  const heroCanvasRef = useRef(null);
  const heroTitleRef = useRef(null);
  const timeTravelRef = useRef(null);
  const techSectionRef = useRef(null);
  const techCanvasRef = useRef(null);
  const globeSectionRef = useRef(null);
  const globeCanvasRef = useRef(null);

  const sliderRef = useRef(null);
  const labelRefs = useRef([]);

  const yearCounterRef = useRef(null);
  const batteryBarRef = useRef(null);
  const stdYearRef = useRef(null);
  const diamondYearRef = useRef(null);
  const quoteRef = useRef(null);
  const batteryIconRef = useRef(null);

  const oceanCardRef = useRef(null);
  const spaceCardRef = useRef(null);
  const landCardRef = useRef(null);

  const heroActive = useInView(heroSectionRef, { threshold: 0.2 });
  const techActive = useInView(techSectionRef, { threshold: 0.2 });
  const globeActive = useInView(globeSectionRef, { threshold: 0.2 });
  const timeTravelActive = useInView(timeTravelRef, { threshold: 0.5 });

  const heroStateRef = useRef(null);
  const techStateRef = useRef(null);
  const globeStateRef = useRef(null);
  const timeStartedRef = useRef(false);

  useEffect(() => {
    if (!heroCanvasRef.current) return undefined;
    heroStateRef.current = createHeroScene(heroCanvasRef.current, heroTitleRef.current);
    return () => heroStateRef.current?.cleanup();
  }, []);

  useEffect(() => {
    if (!techCanvasRef.current) return undefined;
    techStateRef.current = createTechScene(
      techCanvasRef.current,
      sliderRef.current,
      labelRefs.current
    );
    return () => techStateRef.current?.cleanup();
  }, []);

  useEffect(() => {
    if (!globeCanvasRef.current) return undefined;
    globeStateRef.current = createGlobeScene(globeCanvasRef.current, {
      ocean: oceanCardRef.current,
      space: spaceCardRef.current,
      land: landCardRef.current,
    });
    return () => globeStateRef.current?.cleanup();
  }, []);

  useEffect(() => {
    if (!heroStateRef.current) return;
    if (heroActive) heroStateRef.current.start();
    else heroStateRef.current.stop();
  }, [heroActive]);

  useEffect(() => {
    if (!techStateRef.current) return;
    if (techActive) techStateRef.current.start();
    else techStateRef.current.stop();
  }, [techActive]);

  useEffect(() => {
    if (!globeStateRef.current) return;
    if (globeActive) globeStateRef.current.start();
    else globeStateRef.current.stop();
  }, [globeActive]);

  useEffect(() => {
    if (!timeTravelActive || timeStartedRef.current) return undefined;
    timeStartedRef.current = true;
    let year = 0;

    const interval = setInterval(() => {
      year += 1;
      if (yearCounterRef.current) {
        yearCounterRef.current.innerText = year < 10 ? `0${year}` : `${year}`;
      }
      if (diamondYearRef.current) {
        diamondYearRef.current.innerText = `${year}`;
      }

      if (year <= 3) {
        if (stdYearRef.current) stdYearRef.current.innerText = `Year ${year}`;
        if (batteryBarRef.current) batteryBarRef.current.style.width = `${100 - year * 30}%`;
      }
      if (year === 4) {
        if (stdYearRef.current) {
          stdYearRef.current.innerText = 'FAILED';
          stdYearRef.current.classList.add('text-alert');
        }
        if (batteryBarRef.current) batteryBarRef.current.style.width = '0%';
        if (batteryIconRef.current) batteryIconRef.current.style.opacity = '0.3';
      }

      if (year === 50) {
        clearInterval(interval);
        if (quoteRef.current) quoteRef.current.style.opacity = '1';
      }
    }, 100);

    return () => clearInterval(interval);
  }, [timeTravelActive]);

  return (
    <div className="bg-void text-white">
      <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center mix-blend-difference pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <Hexagon className="text-cherenkov h-8 w-8 animate-pulse-slow" />
          <span className="font-display font-bold text-lg tracking-widest text-white">ALT ENERGY LABS</span>
        </div>
        <div className="hidden md:flex gap-6 font-mono text-xs text-gray-400 pointer-events-auto">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-cherenkov transition-colors">
              {link.label}
            </a>
          ))}
        </div>
      </nav>

      <section id="hero" ref={heroSectionRef} className="artboard bg-void">
        <div ref={heroCanvasRef} className="canvas-container" />
        <div className="content-overlay">
          <h1
            ref={heroTitleRef}
            className="font-display text-5xl md:text-8xl font-black text-center text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-800 tracking-tighter opacity-0 transition-opacity duration-1000 delay-500"
          >
            ENERGY SHOULD<br />BE ETERNAL.
          </h1>
          <p className="mt-6 text-center font-mono text-sm text-gray-300 max-w-xl">
            Power that does not age, recharge, or retreat.
          </p>
          <div className="absolute bottom-12 text-center">
            <p className="font-mono text-cherenkov text-xs uppercase tracking-[0.2em] mb-2 animate-pulse">
              <MousePointer2 className="inline w-3 h-3 mr-1" />
              Interact with Light Source
            </p>
            <div className="h-12 w-[1px] bg-gradient-to-b from-cherenkov to-transparent mx-auto" />
          </div>
        </div>
      </section>

      <section
        id="time-travel"
        ref={timeTravelRef}
        className="artboard bg-black bg-[size:50px_50px] bg-grid-pattern relative"
      >
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center h-full max-w-6xl z-10">
          <div className="space-y-12">
            <div className="border border-gray-800 bg-gray-900/50 p-8 rounded-sm relative overflow-hidden group">
              <div className="flex justify-between items-end mb-4 font-mono text-xs text-gray-500">
                <span>STANDARD LI-ION</span>
                <span ref={stdYearRef}>Year 3</span>
              </div>
              <div className="flex items-center gap-4">
                <BatteryWarning ref={batteryIconRef} className="w-12 h-12 text-alert" />
                <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                  <div ref={batteryBarRef} className="h-full bg-alert w-[20%] transition-all duration-1000" />
                </div>
              </div>
              <p className="mt-4 font-mono text-sm text-alert">CRITICAL FAILURE IMMINENT</p>
            </div>

            <div className="border border-cherenkov/30 bg-gray-900/50 p-8 rounded-sm relative overflow-hidden glow-box">
              <div className="flex justify-between items-end mb-4 font-mono text-xs text-cherenkov">
                <span>ALT DIAMOND BETA</span>
                <span>
                  Year <span ref={diamondYearRef}>50</span>
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Diamond className="w-12 h-12 text-cherenkov animate-pulse-slow" />
                <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-cherenkov w-full shadow-[0_0_10px_#00F0FF]" />
                </div>
              </div>
              <p className="mt-4 font-mono text-sm text-cherenkov">OUTPUT STABLE. NO DEGRADATION.</p>
            </div>
          </div>

          <div className="text-right flex flex-col items-end justify-center pointer-events-none">
            <p className="font-mono text-cherenkov text-sm mb-2">Elapsed Time Simulation</p>
            <div
              ref={yearCounterRef}
              className="font-display text-9xl font-black text-white leading-none tracking-tighter tabular-nums"
            >
              00
            </div>
            <div className="font-display text-4xl text-gray-700 font-bold">Years</div>
            <p
              ref={quoteRef}
              className="mt-8 font-display text-2xl text-white max-w-md leading-relaxed opacity-0 transition-opacity duration-1000"
            >
              “Generations pass. We remain.”
            </p>
          </div>
        </div>
      </section>

      <section id="tech" ref={techSectionRef} className="artboard bg-void">
        <div ref={techCanvasRef} className="canvas-container" />
        <div className="content-overlay justify-end pb-24 pointer-events-none">
          <div className="pointer-events-auto bg-black/80 backdrop-blur-md border border-gray-800 p-8 max-w-2xl w-full mx-4 relative">
            <div className="absolute -top-3 left-0 w-full flex justify-center">
              <span className="bg-black border border-cherenkov text-cherenkov font-mono text-xs px-2 py-1 uppercase tracking-widest">
                System Architecture
              </span>
            </div>
            <div className="flex justify-between mb-2 font-mono text-xs text-gray-400">
              <span>DISASSEMBLED</span>
              <span>DEPLOY READY</span>
            </div>
            <input ref={sliderRef} type="range" min="0" max="100" defaultValue="0" className="w-full mb-6" />
            <div className="grid grid-cols-3 gap-4 text-center font-mono text-xs transition-opacity duration-300">
              {['THE FUEL', 'TRANSDUCER', 'THE SHIELD'].map((label, index) => (
                <div
                  key={label}
                  ref={(el) => {
                    labelRefs.current[index] = el;
                  }}
                  className={index === 0 ? 'opacity-100 text-cherenkov' : 'opacity-30'}
                >
                  <strong className="block text-white mb-1">{label}</strong>
                  {index === 0 && 'Beta Emitters'}
                  {index === 1 && 'Semiconductors'}
                  {index === 2 && 'Zero leakage'}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="mission" ref={globeSectionRef} className="artboard bg-void relative">
        <div ref={globeCanvasRef} className="canvas-container" />
        <div className="absolute top-1/2 left-4 md:left-24 -translate-y-1/2 pointer-events-none z-20">
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">GLOBAL<br />DEPLOYMENT</h2>
          <div className="flex flex-col gap-4 w-64">
            <div
              ref={oceanCardRef}
              className="mission-card opacity-50 bg-black/50 border-l-2 border-gray-700 p-4 backdrop-blur-sm transition-all duration-300"
            >
              <h3 className="font-display text-cherenkov mb-1">DEEP OCEAN</h3>
              <p className="font-mono text-xs text-gray-300">
                Depth: 10 km<br />Maintenance: Impossible<br />Status: <span className="text-cherenkov">Online</span>
              </p>
            </div>
            <div
              ref={spaceCardRef}
              className="mission-card opacity-50 bg-black/50 border-l-2 border-gray-700 p-4 backdrop-blur-sm transition-all duration-300"
            >
              <h3 className="font-display text-cherenkov mb-1">GEO ORBIT</h3>
              <p className="font-mono text-xs text-gray-300">
                Eclipse: 0 s<br />Power: Continuous<br />Link: <span className="text-cherenkov">Stable</span>
              </p>
            </div>
            <div
              ref={landCardRef}
              className="mission-card opacity-50 bg-black/50 border-l-2 border-gray-700 p-4 backdrop-blur-sm transition-all duration-300"
            >
              <h3 className="font-display text-cherenkov mb-1">AUTONOMOUS</h3>
              <p className="font-mono text-xs text-gray-300">
                Mission: 48 Days<br />Fuel: 99.9%<br />Mode: <span className="text-cherenkov">Stealth</span>
              </p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 right-10 font-mono text-xs text-gray-500 text-right pointer-events-none">
          Coordinates locked<br />
          <span className="text-cherenkov">Select hotspot on globe</span>
        </div>
      </section>

      <section id="impact" className="artboard bg-black bg-[size:60px_60px] bg-grid-pattern relative">
        <div className="container mx-auto px-6 max-w-6xl grid md:grid-cols-[1.2fr_0.8fr] gap-12 items-center z-10">
          <div>
            <p className="font-mono text-cherenkov text-xs uppercase tracking-[0.3em] mb-4">Maintenance is the enemy</p>
            <h2 className="font-display text-4xl md:text-6xl font-black text-white leading-tight mb-6">
              Perpetual power is not a luxury.
              <span className="block">It is the only scalable path.</span>
            </h2>
            <p className="font-mono text-sm text-gray-400 max-w-2xl">
              Chemical batteries force operators to design around failure: servicing hostile environments, replacing
              implants, ending missions early.
            </p>
            <p className="font-mono text-sm text-gray-400 max-w-2xl mt-3">
              Our architecture deletes the maintenance line-item forever.
            </p>
            <div className="mt-10 grid sm:grid-cols-2 gap-6">
              <div className="border border-gray-800 bg-black/60 p-6 glow-box">
                <p className="font-display text-2xl text-white mb-2">50+ years</p>
                <p className="font-mono text-xs text-gray-400">Continuous output in radiation, vacuum, and deep cold.</p>
              </div>
              <div className="border border-gray-800 bg-black/60 p-6">
                <p className="font-display text-2xl text-white mb-2">Zero recharge</p>
                <p className="font-mono text-xs text-gray-400">Sealed systems with no service cycles.</p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="border border-gray-800 bg-black/60 p-6 glow-box">
              <h3 className="font-display text-cherenkov text-xl mb-3">Remote autonomy</h3>
              <p className="font-mono text-xs text-gray-400">
                Space, arctic, deep ocean — assets operate without sunlight or human access.
              </p>
            </div>
            <div className="border border-gray-800 bg-black/60 p-6">
              <h3 className="font-display text-cherenkov text-xl mb-3">Medical reliability</h3>
              <p className="font-mono text-xs text-gray-400">
                Implants function for decades without invasive replacement.
              </p>
            </div>
            <div className="border border-gray-800 bg-black/60 p-6">
              <h3 className="font-display text-cherenkov text-xl mb-3">Industrial scale</h3>
              <p className="font-mono text-xs text-gray-400">
                Trillion-sensor deployments become economically viable.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="applications" className="artboard bg-void">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <p className="font-mono text-cherenkov text-xs uppercase tracking-[0.3em] mb-3">Deployment sectors</p>
              <h2 className="font-display text-4xl md:text-6xl font-black text-white">Where perpetual power wins</h2>
            </div>
            <p className="font-mono text-xs text-gray-500 max-w-md">
              When power is constant, the mission profile changes.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-gray-800 bg-black/60 p-8 glow-box">
              <h3 className="font-display text-cherenkov text-2xl mb-2">Space & planetary</h3>
              <p className="font-mono text-xs text-gray-400">
                Operate through eclipse cycles and high-radiation events without solar dependency.
              </p>
            </div>
            <div className="border border-gray-800 bg-black/60 p-8">
              <h3 className="font-display text-cherenkov text-2xl mb-2">Defense autonomy</h3>
              <p className="font-mono text-xs text-gray-400">
                Persistent surveillance, silent platforms, unmanned systems that outlast missions.
              </p>
            </div>
            <div className="border border-gray-800 bg-black/60 p-8">
              <h3 className="font-display text-cherenkov text-2xl mb-2">Medical implants</h3>
              <p className="font-mono text-xs text-gray-400">
                Decades-long cardiac and neural devices with zero replacement surgeries.
              </p>
            </div>
            <div className="border border-gray-800 bg-black/60 p-8">
              <h3 className="font-display text-cherenkov text-2xl mb-2">Industrial IoT</h3>
              <p className="font-mono text-xs text-gray-400">
                Remote sensing across pipelines, infrastructure, and frontier logistics.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="advantage" className="artboard bg-black bg-[size:60px_60px] bg-grid-pattern">
        <div className="container mx-auto px-6 max-w-6xl">
          <p className="font-mono text-cherenkov text-xs uppercase tracking-[0.3em] mb-4">Why Alt wins</p>
          <h2 className="font-display text-4xl md:text-6xl font-black text-white mb-10">
            Category creation with a hard-tech moat.
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-gray-800 bg-black/60 p-6">
              <h3 className="font-display text-cherenkov text-xl mb-3">Diamond-first stack</h3>
              <p className="font-mono text-xs text-gray-400">
                Radiation-hardened semiconductors resist the degradation that ends silicon lifetimes.
              </p>
            </div>
            <div className="border border-gray-800 bg-black/60 p-6">
              <h3 className="font-display text-cherenkov text-xl mb-3">Regulatory tailwind</h3>
              <p className="font-mono text-xs text-gray-400">
                New policy unlocks domestic isotopes and a strategic local supply chain.
              </p>
            </div>
            <div className="border border-gray-800 bg-black/60 p-6">
              <h3 className="font-display text-cherenkov text-xl mb-3">Process IP</h3>
              <p className="font-mono text-xs text-gray-400">
                Isotope bonding and containment methods create a defensible manufacturing moat.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="vision" className="artboard bg-void">
        <div className="container mx-auto px-6 max-w-6xl">
          <p className="font-mono text-cherenkov text-xs uppercase tracking-[0.3em] mb-4">10-year roadmap</p>
          <h2 className="font-display text-4xl md:text-6xl font-black text-white mb-10">
            From frontier missions to the trillion-sensor economy.
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-gray-800 bg-black/60 p-6">
              <p className="font-mono text-cherenkov text-xs uppercase mb-3">Now</p>
              <h3 className="font-display text-2xl text-white mb-3">Prove extreme reliability</h3>
              <p className="font-mono text-xs text-gray-400">
                Deploy in defense, space, and critical infrastructure where failure is unacceptable.
              </p>
            </div>
            <div className="border border-gray-800 bg-black/60 p-6">
              <p className="font-mono text-cherenkov text-xs uppercase mb-3">Next</p>
              <h3 className="font-display text-2xl text-white mb-3">Scale manufacturing</h3>
              <p className="font-mono text-xs text-gray-400">
                Reduce diamond wafer cost and build certified production for medical-grade devices.
              </p>
            </div>
            <div className="border border-gray-800 bg-black/60 p-6">
              <p className="font-mono text-cherenkov text-xs uppercase mb-3">Future</p>
              <h3 className="font-display text-2xl text-white mb-3">Power ubiquitous autonomy</h3>
              <p className="font-mono text-xs text-gray-400">
                Enable sealed electronics that outlive their creators.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="artboard bg-void">
        <div className="container mx-auto px-6 max-w-5xl">
          <p className="font-mono text-cherenkov text-xs uppercase tracking-[0.3em] mb-4">Public FAQ</p>
          <h2 className="font-display text-4xl md:text-6xl font-black text-white mb-10">
            Understanding perpetual nuclear power
          </h2>
          <div className="space-y-4">
            {faqItems.map((item) => (
              <details
                key={item.question}
                className="group border border-gray-800 bg-black/60 p-6 transition-all duration-300 hover:border-cherenkov/60"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between font-display text-cherenkov text-xl">
                  <span>{item.question}</span>
                  <span className="text-sm text-gray-500 group-open:text-cherenkov">+</span>
                </summary>
                <div className="mt-4 max-h-0 overflow-hidden font-mono text-xs text-gray-400 opacity-0 transition-all duration-300 group-open:max-h-40 group-open:opacity-100 group-hover:max-h-40 group-hover:opacity-100">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="artboard bg-black">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <p className="font-mono text-cherenkov text-xs uppercase tracking-[0.3em] mb-4">Initiate collaboration</p>
          <h2 className="font-display text-4xl md:text-6xl font-black text-white mb-6">
            Let’s architect the next generation of perpetual power.
          </h2>
          <p className="font-mono text-sm text-gray-400 max-w-3xl mx-auto mb-10">
            Share your mission profile and we’ll craft a power roadmap tailored to your operating environment.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a
              href="mailto:partners@altenergylabs.com"
              className="px-10 py-4 border border-cherenkov text-cherenkov font-display font-bold tracking-widest hover:bg-cherenkov hover:text-black transition-colors"
            >
              PARTNER WITH US
            </a>
            <a
              href="mailto:research@altenergylabs.com"
              className="px-10 py-4 border border-gray-700 text-gray-300 font-display font-bold tracking-widest hover:border-cherenkov hover:text-cherenkov transition-colors"
            >
              REQUEST TECH BRIEF
            </a>
          </div>
        </div>
      </section>

      <section className="artboard min-h-[50vh] bg-void border-t border-gray-900">
        <div className="text-center px-6">
          <h2 className="font-display text-5xl md:text-7xl font-black text-white mb-12 tracking-tighter glow-text">
            DEPLOY AND<br />DISAPPEAR.
          </h2>
          <button className="group relative px-12 py-4 bg-transparent overflow-hidden border border-cherenkov text-cherenkov font-display font-bold text-xl tracking-widest hover:text-black transition-colors duration-300">
            <span className="absolute inset-0 w-full h-full bg-cherenkov/0 group-hover:bg-cherenkov/100 transition-all duration-300 ease-out transform -skew-x-12 scale-x-0 group-hover:scale-x-150 origin-left" />
            <span className="relative flex items-center gap-2">
              Initiate protocol
              <ChevronRight className="w-5 h-5" />
            </span>
          </button>
          <div className="mt-24 flex flex-col md:flex-row gap-8 justify-center font-mono text-xs text-gray-600">
            <a href="mailto:partners@altenergylabs.com" className="hover:text-white transition-colors">
              Contact encrypted
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Legal Disclaimer
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Investor Relations
            </a>
          </div>
          <div className="mt-12 text-gray-800 font-mono text-[10px]">
            &copy; 2049 ALT ENERGY LABS
            <br />
            ETERNAL POWER SYSTEMS
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
