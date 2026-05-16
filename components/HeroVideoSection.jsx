'use client';
import './HeroVideoSection.css';
import { useEffect, useRef, useState } from 'react';

const HeroVideoSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Immediate check for cached video
    if (videoRef.current && videoRef.current.readyState >= 3) {
      setVideoLoaded(true);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const cards = [
    {
      img: '/images/door_sculpted_wood_1776844667211.png',
      title: 'Sculpted Wood',
      desc: 'Masterpieces in timber.'
    },
    {
      img: '/images/door_minimal_metal_1776844703459.png',
      title: 'Minimal Metal',
      desc: 'Sleek, modern entrances.'
    },
    {
      img: '/images/door_grand_pivot_1776844794720.png',
      title: 'Grand Pivot',
      desc: 'Architectural statements.'
    }
  ];

  return (
    <div className="hero-video-wrapper">
      {/* Sticky video background */}
      <div className="hero-video-sticky">
        {/* 'First Frame' Static Image Loader */}
        <div 
          className="hero-video-poster-layer"
          style={{ backgroundImage: 'url("/images/banner1img.jpeg")' }}
        ></div>

        <video
          ref={videoRef}
          className={`hero-video ${videoLoaded ? 'loaded' : ''}`}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          onCanPlay={() => setVideoLoaded(true)}
        >
          <source src="/videos/banner.mp4" type="video/mp4" />
        </video>
        <div className="hero-video-overlay"></div>
      </div>

      {/* Content that scrolls over the sticky video */}
      <div className="hero-content-scroll">

        {/* Text exactly overlaps the video at start, then scrolls up and disappears */}
        <div 
          className="hero-text-section"
          style={{
            opacity: Math.max(1 - scrollY / 500, 0),
            transform: `translateY(${scrollY * 0.4}px) scale(${Math.max(1 - scrollY / 1500, 0.9)})`,
            transition: 'opacity 0.1s ease-out, transform 0.1s ease-out'
          }}
        >
          <h1 className="hero-title fade-in delay-1">LUXE VERVE</h1>
          <p className="hero-subtitle fade-in delay-2">Beyond the Threshold</p>
        </div>

        {/* Cards slide up and cover the video as you scroll further down */}
        <div className="hero-cards-section" ref={sectionRef}>
          <div className="container">
            <div className="cards-slider-wrapper">
              <div className="cards-grid" id="rolex-cards-grid">
                {cards.map((card, index) => (
                  <div
                    key={index}
                    className={`rolex-card ${isVisible ? 'visible' : ''}`}
                    style={{ transitionDelay: `${index * 0.2}s` }}
                  >
                    <div className="rolex-card-img-wrapper hover-3d-wrapper">
                      <img src={card.img} alt={card.title} className="rolex-card-img hover-3d" />
                      <div className="rolex-card-overlay">
                        <p className="rolex-card-subtitle">{card.title}</p>
                        <h3 className="rolex-card-title">{card.desc}</h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="slider-arrow right"
                onClick={() => {
                  const grid = document.getElementById('rolex-cards-grid');
                  if (grid) grid.scrollBy({ left: window.innerWidth * 0.75, behavior: 'smooth' });
                }}
                aria-label="Next card"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroVideoSection;
