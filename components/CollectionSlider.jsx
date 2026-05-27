"use client";

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import './CollectionSlider.css';

export default function CollectionSlider({ id, title, text, images }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Unique ID for navigation to avoid conflict between multiple sliders
  // We use the provided id prop, or fallback to a highly sanitized title string
  const sliderId = id || (title ? title.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase() : 'default-slider');

  return (
    <section className="collection-slider-section">
      <div className="collection-slider-container">
        {/* Left Side: 3D Slider */}
        <div className="collection-slider-left">
          <div className="slider-bg-effect"></div>
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            loop={images && images.filter(img => img).length >= 3}
            coverflowEffect={{
              rotate: 0,
              stretch: 50,
              depth: 150,
              modifier: 1,
              slideShadows: true,
            }}
            navigation={{
              nextEl: `.custom-next-${sliderId}`,
              prevEl: `.custom-prev-${sliderId}`,
            }}
            modules={[EffectCoverflow, Navigation]}
            className="mySwiper3D"
          >
            {images && images.filter(img => img).map((imgUrl, index) => (
              <SwiperSlide key={index} className="swiper-slide-3d">
                <div className="swiper-img-wrapper">
                  <img src={imgUrl} alt={`${title} ${index + 1}`} />
                </div>
              </SwiperSlide>
            ))}
            
            {/* Custom Navigation Arrows positioned over the 80% center slide */}
            <div className={`custom-swiper-button-prev custom-prev-${sliderId}`}>‹</div>
            <div className={`custom-swiper-button-next custom-next-${sliderId}`}>›</div>
          </Swiper>
        </div>

        {/* Right Side: Text Information */}
        <div className="collection-slider-right">
          <div className="slider-text-card">
            <h2 className="slider-item-title">{title}</h2>
            <div className={`slider-item-text-container ${isExpanded ? 'expanded' : ''}`}>
              {text && text.split('\n').map((para, i) => (
                <p key={i} className="slider-item-text">{para}</p>
              ))}
            </div>
            
            <button 
              className="view-more-btn" 
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'SHOW LESS ↑' : 'VIEW MORE ↓'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
