'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const routes = ['/home', '/collection', '/about', '/contact', '/blog'];

import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';

function FrozenRoute({ children }) {
  const context = React.useContext(LayoutRouterContext);
  const frozen = React.useRef(context).current;

  if (!frozen) return <>{children}</>;

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {children}
    </LayoutRouterContext.Provider>
  );
}

// ─────────────────────────────────────────────
// Web Audio API sound engine (iOS-safe)
// ─────────────────────────────────────────────
let audioCtx = null;
let flipBuffer = null;
let isAudioUnlocked = false;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

async function loadFlipBuffer() {
  if (flipBuffer) return flipBuffer;
  try {
    const ctx = getAudioContext();
    const response = await fetch('/page-flip.mp3');
    const arrayBuffer = await response.arrayBuffer();
    flipBuffer = await ctx.decodeAudioData(arrayBuffer);
    return flipBuffer;
  } catch (e) {
    console.warn('Could not load page-flip audio:', e);
    return null;
  }
}

function playFlipBufferNow() {
  try {
    if (!audioCtx || !flipBuffer) return;
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const source = audioCtx.createBufferSource();
    source.buffer = flipBuffer;
    const gainNode = audioCtx.createGain();
    gainNode.gain.value = 0.8;
    source.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    source.start(0);
  } catch (e) {
    console.warn('Flip sound play error:', e);
  }
}

async function unlockAndLoadAudio() {
  if (isAudioUnlocked) return;
  try {
    const ctx = getAudioContext();
    // Resume the AudioContext (required by iOS on first gesture)
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }
    // Load the audio file in the background
    await loadFlipBuffer();
    isAudioUnlocked = true;
  } catch (e) {
    console.warn('Audio unlock failed:', e);
  }
}

// ─────────────────────────────────────────────

export default function PageTransition({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const [transitionData, setTransitionData] = useState({
    dir: 1,
    scrollY: 0,
    innerHeight: 1000
  });

  // Touch tracking for swipe gestures
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const touchStartY = useRef(null);
  const touchEndY = useRef(null);
  const minSwipeDistance = 75;

  // Track previous path to conditionally disable animations
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    prevPathRef.current = pathname;
  }, [pathname]);

  const normalizePath = (p) => p === '/' ? '/home' : p;
  const isMainRoute = (p) => routes.includes(normalizePath(p));

  const isInstant = !isMainRoute(pathname) || !isMainRoute(prevPathRef.current);

  const currentTransitionData = {
    ...transitionData,
    isInstant
  };

  // Expose play function globally so Navbar can also call it
  const playPageFlipSound = () => {
    playFlipBufferNow();
  };

  // On mount: register unlock listener on first user gesture
  useEffect(() => {
    if (typeof window === 'undefined') return;

    window.playPageFlipSound = playFlipBufferNow;

    // Unlock AudioContext + preload buffer on the very first touch or click
    const handleFirstGesture = () => {
      unlockAndLoadAudio();
    };

    document.addEventListener('touchstart', handleFirstGesture, { once: true, passive: true });
    document.addEventListener('click', handleFirstGesture, { once: true });

    // Also preload immediately (works on desktop where autoplay is often allowed)
    unlockAndLoadAudio().catch(() => {});

    return () => {
      document.removeEventListener('touchstart', handleFirstGesture);
      document.removeEventListener('click', handleFirstGesture);
    };
  }, []);

  const paginate = (dir) => {
    const normalizedPath = pathname === '/' ? '/home' : pathname;
    const currentIndex = routes.indexOf(normalizedPath);
    if (currentIndex === -1) return;

    let nextIndex = currentIndex + dir;
    if (nextIndex < 0) nextIndex = routes.length - 1;
    if (nextIndex >= routes.length) nextIndex = 0;

    const nextRoute = routes[nextIndex];
    setTransitionData({
      dir,
      scrollY: window.scrollY,
      innerHeight: window.innerHeight
    });

    document.documentElement.style.scrollBehavior = 'auto';
    playPageFlipSound();
    router.push(nextRoute);
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = '';
    }, 1500);
  };

  // Listen for global custom events from Navbar links
  useEffect(() => {
    const handleCustomNav = (e) => {
      const detail = e.detail;
      const nextRoute = typeof detail === 'string' ? detail : detail.route;
      const soundPlayed = typeof detail === 'object' && detail.soundPlayed;

      if (pathname === nextRoute) return;

      const currentIndex = routes.indexOf(pathname === '/' ? '/home' : pathname);
      const nextIndex = routes.indexOf(nextRoute);
      const dir = nextIndex > currentIndex ? 1 : -1;

      setTransitionData({
        dir,
        scrollY: window.scrollY,
        innerHeight: window.innerHeight
      });

      document.documentElement.style.scrollBehavior = 'auto';
      if (!soundPlayed) {
        playPageFlipSound();
      }
      router.push(nextRoute);
      setTimeout(() => {
        document.documentElement.style.scrollBehavior = '';
      }, 1500);
    };

    window.addEventListener('custom-nav', handleCustomNav);
    return () => window.removeEventListener('custom-nav', handleCustomNav);
  }, [pathname]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight') paginate(1);
      if (e.key === 'ArrowLeft') paginate(-1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pathname]);

  // Swipe navigation removed per user request

  const variants = {
    enter: () => ({
      rotateY: 0,
      opacity: 1,
      zIndex: 0,
      position: 'relative',
      transition: { duration: 0 }
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      zIndex: 1,
      position: 'relative',
    },
    exit: ({ dir, scrollY, innerHeight, isInstant }) => {
      if (isInstant) {
        return {
          opacity: 0,
          zIndex: 0,
          position: 'absolute',
          top: 0, left: 0, right: 0,
          transition: { duration: 0 }
        };
      }
      return {
        rotateY: dir > 0 ? -180 : 180,
        opacity: [1, 1, 0],
        zIndex: 10,
        position: 'absolute',
        top: -scrollY,
        left: 0,
        right: 0,
        transformOrigin: dir > 0 ? 'left center' : 'right center',
        perspectiveOrigin: `50% ${scrollY + (innerHeight / 2)}px`,
        transition: {
          rotateY: {
            duration: 1.4,
            ease: [0.645, 0.045, 0.355, 1],
          },
          opacity: {
            duration: 1.4,
            times: [0, 0.9, 1],
            ease: 'linear',
          },
          position: { duration: 0 },
          top: { duration: 0 },
          left: { duration: 0 },
          right: { duration: 0 }
        },
      };
    },
  };

  return (
    <div style={{ display: 'grid', position: 'relative' }} className="w-full">
      <AnimatePresence custom={currentTransitionData}>
        <motion.div
          key={pathname}
          custom={currentTransitionData}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          style={{ transformStyle: 'preserve-3d', perspective: '2500px', gridArea: '1 / 1 / 2 / 2' }}
          className="w-full origin-center"
        >
          <FrozenRoute>{children}</FrozenRoute>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
