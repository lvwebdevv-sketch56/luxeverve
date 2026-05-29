"use client";
import './HomeSections.css';
import { useState, useEffect, useRef } from 'react';

const HomeSections = ({ content = [] }) => {
  const sec1 = content.find(i => i.title === 'home_section1');
  const [section1, setSection1] = useState({
    title: sec1?.text || "An Expression of Luxury Door Design, Quality, and Craftsmanship",
    text: sec1?.description || "Our presence at a leading industry event reflects a convergence of craftsmanship, innovation, and modern design. Engaging with architects, designers, and industry experts, we explored contemporary design trends, premium materials, and refined finishes that define high-quality architectural solutions.\n\nOur participation in curated trade shows and design exhibitions reflects our commitment to engineered wood solutions, durable materials, and precision craftsmanship for both residential and commercial spaces. Staying closely aligned with evolving design sensibilities allows us to create architectural products that balance elegance, performance, and longevity.\n\nThrough meaningful industry engagement, we continue to refine our vision and deliver timeless, performance-driven solutions shaped by quality, innovation, and design excellence.",
    url: sec1?.url || "/videos/demo.mp4",
    thumbnailUrl: sec1?.thumbnailUrl || "/images/luxury_doors_landing_page_scrolled_1776845139099.png"
  });

  const sec3 = content.find(i => i.title === 'home_section3');
  const [section3, setSection3] = useState({
    title: sec3?.text || "The Art of Luxury Entrance Doors",
    text: sec3?.description || "Discover doors conceived for those who value distinction, precision, and enduring design. Crafted with meticulous attention to detail, each luxury entrance door is thoughtfully engineered to balance strength, elegance, and performance. From refined proportions to flawless finishes, every element is designed to elevate architectural character while ensuring lasting durability.\n\nRooted in modern design sensibilities, our designer doors are created using premium materials and advanced engineered wood solutions, ensuring stability, resilience, and timeless appeal. Carefully curated surfaces, textures, and finishes allow our doors to complement both contemporary and classic interiors, making them ideal for high-end residential and sophisticated commercial spaces.\n\nMore than architectural products, our doors serve as defining statements—enhancing entrances with quiet luxury and purposeful design. Each piece reflects superior craftsmanship, structural integrity, and a deep understanding of architectural form and function.",
    url: sec3?.url || "/videos/demo.mp4",
    thumbnailUrl: sec3?.thumbnailUrl || "/images/door_grand_pivot_1776844794720.png"
  });

  const sec2 = content.find(i => i.title === 'home_section2');
  const [section2, setSection2] = useState({
    title: sec2?.text || "Personal Note",
    text: sec2?.description || "At Luxe-Verve, we design exclusive luxury architect doors that move beyond conventional or standard door solutions. Each door is conceived with a distinct design philosophy, using carefully selected premium materials that set our work apart from ordinary wooden or mass-produced doors.\n\nEvery Luxe-Verve door is custom-crafted to deliver modern aesthetics, architectural precision, and refined luxury. Designed for high-end residences and premium spaces, our doors ensure your entrance stands apart with a bold, sophisticated identity—reflecting contemporary living, timeless design, and elevated craftsmanship.",
    url: sec2?.url || "/images/luxury_storefront_1776848163085.png",
  });

  const sec4 = content.find(i => i.title === 'home_section4');
  const [section4, setSection4] = useState({
    url: sec4?.url || "/images/logo.png",
  });

  const videoRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) {
          // Play video when 50% visible (with sound). Catch error if browser blocks autoplay.
          video.play().catch(e => console.log("Autoplay blocked by browser:", e));
        } else {
          // Pause when not visible
          video.pause();
        }
      });
    }, { threshold: 0.5 });

    videoRefs.current.forEach(video => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach(video => {
        if (video) observer.unobserve(video);
      });
    };
  }, [section1.url, section3.url]);

  return (
    <div className="home-sections-wrapper">

      {/* Section 1: Text Left, Video Right */}
      <section className="home-section">
        <div className="home-section-container">
          <div className="home-section-content left-content">
            <h2 className="section-heading">{section1.title}</h2>
            <div className="section-text">
              {section1.text.split('\n').filter(p => p.trim()).map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="home-section-media right-media">
            <video key={section1.url} ref={el => videoRefs.current[0] = el} className="static-media" controls poster={section1.thumbnailUrl}>
              <source src={section1.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* Section 2: Image Left, Text Right */}
      <section className="home-section bg-alt">
        <div className="home-section-container">
          <div className="home-section-media left-media hover-3d-wrapper">
            <img src={section2.url} alt="Luxe Verve Storefront" className="static-media hover-3d" />
          </div>
          <div className="home-section-content right-content">
            <h2 className="section-heading">{section2.title}</h2>
            <div className="section-text">
              {section2.text.split('\n').filter(p => p.trim()).map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Text Left, Video Right */}
      <section className="home-section">
        <div className="home-section-container">
          <div className="home-section-content left-content">
            <h2 className="section-heading">{section3.title}</h2>
            <div className="section-text">
              {section3.text.split('\n').filter(p => p.trim()).map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="home-section-media right-media">
            <video key={section3.url} ref={el => videoRefs.current[1] = el} className="static-media" controls poster={section3.thumbnailUrl}>
              <source src={section3.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* Section 4: Luxe Details Header */}
      <section className="home-section luxe-details-header">
        <div className="container" style={{ textAlign: 'center' }}>
          <img src={section4.url} alt="Luxe Verve Logo" className="luxe-header-logo" />

        </div>
      </section>

    </div>
  );
};

export default HomeSections;
