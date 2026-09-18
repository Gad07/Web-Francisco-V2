import { SceneManager } from './three/sceneManager.js';
import { SoundEngine } from './audio.js';
import gsap from 'gsap';
import Lenis from 'lenis';

// Initialize 3D Scene
const canvas = document.getElementById('webgl-canvas');
const sceneManager = new SceneManager(canvas);
sceneManager.start();

// Initialize Sound Engine
const soundEngine = new SoundEngine();

// DOM References
const loaderScreen = document.getElementById('loader-screen');
const loaderPercentage = document.getElementById('loader-percentage');
const loaderBarFill = document.getElementById('loader-bar-fill');
const loaderStatus = document.getElementById('loader-status');
const btnEnterSkip = document.getElementById('btn-enter-skip');
const audioToggle = document.getElementById('audio-toggle');
const audioIcon = document.getElementById('audio-icon');
const audioLabel = document.getElementById('audio-label');
const mainNav = document.getElementById('main-nav');
const scrollProgressLine = document.getElementById('scroll-progress-line');
const scrollChapterLabel = document.getElementById('scroll-chapter-label');
const pledgeForm = document.getElementById('pledge-form');
const pledgeSuccess = document.getElementById('pledge-success');
const btnInspectEarth = document.getElementById('btn-inspect-earth');

// Setup Smooth Scroll with Lenis
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// ----------------------------------------------------
// 1. LOADER 3D SEQUENCER (0% -> 100% -> Zoom Transition)
// ----------------------------------------------------
let loadingProgress = 0;
let isLoaded = false;

const loaderSteps = [
  { p: 25, msg: 'ESTABLECIENDO ENLACE ORBITAL...' },
  { p: 55, msg: 'MAPEO DE ELEVACIÓN Y FRESNEL ATMOSFÉRICO...' },
  { p: 80, msg: 'CALIBRANDO REDES BOTÁNICAS Y BIOMAS...' },
  { p: 100, msg: 'TELEMETRÍA GLOBAL SINCRONIZADA.' }
];

function updateLoaderUI(val) {
  loaderPercentage.textContent = `${Math.floor(val)}%`;
  loaderBarFill.style.width = `${val}%`;

  const currentStep = loaderSteps.find(s => val <= s.p) || loaderSteps[loaderSteps.length - 1];
  loaderStatus.textContent = currentStep.msg;
}

const loadTween = gsap.to({ p: 0 }, {
  p: 100,
  duration: 3.2,
  ease: 'power2.inOut',
  onUpdate: function () {
    loadingProgress = this.targets()[0].p;
    updateLoaderUI(loadingProgress);
  },
  onComplete: () => {
    executeCinematicZoom();
  }
});

function executeCinematicZoom() {
  if (isLoaded) return;
  isLoaded = true;
  sceneManager.isLoaded = true;

  // Sound cue
  soundEngine.playZoomSwoosh();

  // Zoom camera & planet
  gsap.to({ z: 0 }, {
    z: 1,
    duration: 2.2,
    ease: 'power3.out',
    onUpdate: function () {
      const zoomVal = this.targets()[0].z;
      sceneManager.setZoomProgress(zoomVal);
    }
  });

  // Fade out loader screen
  gsap.to(loaderScreen, {
    opacity: 0,
    duration: 1.2,
    delay: 0.4,
    ease: 'power2.out',
    onComplete: () => {
      loaderScreen.style.display = 'none';
    }
  });
}

btnEnterSkip?.addEventListener('click', () => {
  loadTween.progress(1);
  soundEngine.init();
});

// ----------------------------------------------------
// 2. SCROLL PROGRESS TRACKING & 3D CAMERA SYNCHRONIZATION
// ----------------------------------------------------
lenis.on('scroll', (e) => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const currentScroll = window.scrollY;
  const progress = Math.max(0, Math.min(1, currentScroll / (maxScroll || 1)));

  // Update Three.js World
  sceneManager.setScrollProgress(progress);
  soundEngine.setAudioAtmosphereByScroll(progress);

  // Update Scroll Indicator UI
  if (scrollProgressLine) {
    scrollProgressLine.style.height = `${progress * 100}%`;
  }

  // Update Nav Background
  if (currentScroll > 80) {
    mainNav.classList.add('scrolled');
  } else {
    mainNav.classList.remove('scrolled');
  }

  // Chapter Labels
  if (scrollChapterLabel) {
    if (progress < 0.25) {
      scrollChapterLabel.textContent = '01 // BIOSFERA';
      scrollChapterLabel.className = 'font-mono text-[10px] text-emerald-400 uppercase tracking-widest -rotate-90 origin-center my-6';
    } else if (progress < 0.55) {
      scrollChapterLabel.textContent = '02 // RAÍCES';
      scrollChapterLabel.className = 'font-mono text-[10px] text-teal-300 uppercase tracking-widest -rotate-90 origin-center my-6';
    } else if (progress < 0.75) {
      scrollChapterLabel.textContent = '03 // PORTAL';
      scrollChapterLabel.className = 'font-mono text-[10px] text-cyan-400 uppercase tracking-widest -rotate-90 origin-center my-6';
    } else {
      scrollChapterLabel.textContent = '04 // OCÉANO';
      scrollChapterLabel.className = 'font-mono text-[10px] text-blue-400 uppercase tracking-widest -rotate-90 origin-center my-6';
    }
  }
});

// ----------------------------------------------------
// 3. AUDIO INTERACTION
// ----------------------------------------------------
audioToggle?.addEventListener('click', () => {
  const isPlaying = soundEngine.toggle();
  if (isPlaying) {
    audioLabel.textContent = 'AUDIO ON';
    audioIcon.className = 'w-2 h-2 rounded-full bg-emerald-400 animate-pulse';
  } else {
    audioLabel.textContent = 'AUDIO OFF';
    audioIcon.className = 'w-2 h-2 rounded-full bg-slate-500';
  }
});

// ----------------------------------------------------
// 4. INTERACTIVE 3D INSPECT BUTTON
// ----------------------------------------------------
btnInspectEarth?.addEventListener('click', () => {
  gsap.to(sceneManager.earthScene.group.rotation, {
    y: sceneManager.earthScene.group.rotation.y + Math.PI * 2,
    duration: 3,
    ease: 'power2.inOut'
  });
});

// ----------------------------------------------------
// 5. PLEDGE FORM SUBMISSION
// ----------------------------------------------------
pledgeForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = pledgeForm.querySelector('button[type="submit"]');
  if (btn) {
    btn.disabled = true;
    btn.textContent = 'VERIFICANDO NODO EN LA RED...';
  }

  setTimeout(() => {
    pledgeForm.style.display = 'none';
    if (pledgeSuccess) pledgeSuccess.classList.remove('hidden');
    soundEngine.playBubblePing();
  }, 1200);
});

// Auto-start sound on first user gesture
window.addEventListener('click', () => {
  if (!soundEngine.ctx) {
    soundEngine.init();
  }
}, { once: true });
