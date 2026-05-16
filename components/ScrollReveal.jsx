'use client';
import { useEffect } from 'react';

/**
 * ScrollReveal — attaches an IntersectionObserver to every element with
 * the class `reveal`. When the element enters the viewport it gains the
 * `revealed` class which triggers the CSS fade-up transition defined in
 * globals.css.
 */
const ScrollReveal = () => {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');

    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target); // fire once
          }
        });
      },
      { threshold: 0.12 }
    );

    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null; // purely side-effect
};

export default ScrollReveal;
