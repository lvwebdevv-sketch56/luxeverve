'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
// FrozenRoute has been replaced by manual delayed routing logic.

const routes = ['/home', '/collection', '/catalogue', '/about', '/contact', '/blog'];

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

// Removed duplicate routes definition

// Removed duplicate FrozenRoute definition

// Removed duplicate routes definition

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

  const playPageFlipSound = () => {
    try {
      const audio = new Audio('/page-flip.mp3');
      audio.volume = 0.8;
      audio.play().catch(e => console.error("Could not play page flip sound", e));
    } catch (e) {
      console.error(e);
    }
  };

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
    
    // Temporarily disable smooth scroll so Next.js instantly snaps to the top without visible scrolling
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
      const nextRoute = e.detail;
      if (pathname === nextRoute) return;
      
      const currentIndex = routes.indexOf(pathname === '/' ? '/home' : pathname);
      const nextIndex = routes.indexOf(nextRoute);
      const dir = nextIndex > currentIndex ? 1 : -1;
      
      setTransitionData({
        dir,
        scrollY: window.scrollY,
        innerHeight: window.innerHeight
      });
      
      // Temporarily disable smooth scroll so Next.js instantly snaps to the top without visible scrolling
      document.documentElement.style.scrollBehavior = 'auto';
      playPageFlipSound();
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

  // Swipe navigation
  useEffect(() => {
    const onTouchStart = (e) => {
      touchEndX.current = null;
      touchEndY.current = null;
      touchStartX.current = e.targetTouches[0].clientX;
      touchStartY.current = e.targetTouches[0].clientY;
    };

    const onTouchMove = (e) => {
      touchEndX.current = e.targetTouches[0].clientX;
      touchEndY.current = e.targetTouches[0].clientY;
    };

    const onTouchEnd = () => {
      if (!touchStartX.current || !touchEndX.current) return;
      
      const distanceX = touchStartX.current - touchEndX.current;
      const distanceY = touchStartY.current - touchEndY.current;
      
      if (Math.abs(distanceX) > Math.abs(distanceY) && Math.abs(distanceX) > minSwipeDistance) {
        if (distanceX > 0) paginate(1);
        else paginate(-1);
      }
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [pathname]);

  const variants = {
    // New page appears instantly in the background
    enter: () => ({
      rotateY: 0,
      opacity: 1,
      zIndex: 0,
      position: 'relative',
      transition: { duration: 0 } // Snap instantly
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      zIndex: 1,
      position: 'relative',
      // Framer Motion automatically clears transform if 0
    },
    // Old page freezes at current scroll position and flips out over the new page
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
        perspectiveOrigin: `50% ${scrollY + (innerHeight / 2)}px`, // Anchor 3D camera to user's viewport
        transition: {
          rotateY: {
            duration: 1.4,
            ease: [0.645, 0.045, 0.355, 1],
          },
          opacity: {
            duration: 1.4,
            times: [0, 0.9, 1],
            ease: "linear",
          },
          position: { duration: 0 },
          top: { duration: 0 },
          left: { duration: 0 },
          right: { duration: 0 }
        },
      };
    },
  };

  // We move perspective into the motion elements so the idle page loses the transform context
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
          // Adding perspective here forces the 3D effect on the child's own rotation
          style={{ transformStyle: 'preserve-3d', perspective: '2500px', gridArea: '1 / 1 / 2 / 2' }}
          className="w-full origin-center"
        >
          <FrozenRoute>{children}</FrozenRoute>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
