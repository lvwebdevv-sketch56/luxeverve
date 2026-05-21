export const metadata = {
  title: 'About Us – Luxe Verve',
  description: 'Learn about Luxe Verve – our story, vision, and commitment to luxury architectural design.',
};

import { db } from '@/lib/firebaseAdmin';

export default async function AboutPage() {
  const snapshot = await db.collection('content').get();
  const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  const heroBanner = items.find(i => i.title === 'about_banner') || {};
  const mainSec = items.find(i => i.title === 'about_main') || {};
  const sec2 = items.find(i => i.title === 'about_sec2') || {};
  const sec3 = items.find(i => i.title === 'about_sec3') || {};
  const statsItem = items.find(i => i.title === 'about_stats') || {};

  // Parse Main Section Paragraphs
  let mainParagraphs = [
    "At Luxe Verve, we collaborate closely with architects, interior designers, builders, and luxury homeowners, transforming creative concepts and client emotions into bespoke luxury door solutions and custom entrance doors. Every design is approached with sensitivity respecting the architectural vision, spatial harmony, and the individuality of each project.",
    "Each Luxe Verve luxury door is crafted using premium materials, high-end finishes, and precision engineering, balancing aesthetics with performance. From designer doors and modern entrance doors to architectural statement doors and custom-made doors, our creations elevate luxury villas, premium residences, and high-end commercial projects."
  ];
  if (mainSec.text) {
    try { mainParagraphs = JSON.parse(mainSec.text); } catch(e) {}
  }

  // Parse Section 2 Paragraphs
  const sec2Paragraphs = sec2.description ? sec2.description.split('\n').filter(p => p.trim()) : [
    "Luxe-Verve was born from the belief that doors are not boundaries, but expressions of taste, confidence, and timeless design. Each creation carries this philosophy forward inviting you to look beyond what a door is, and imagine what a luxury architectural door can become.",
    "Long before walls defined spaces, there existed a desire to create something lasting a harmony of strength and elegance, of structure and soul. Form meets ambition at Luxe-Verve through a simple truth: an entrance is never merely a doorway. It is the moment where the outside world recedes and a story begins. True luxury is not always seen; it is felt the moment you arrive.",
    "Created for spaces that speak without words, our luxury entrance doors are designed for presence even in silence. Where premium materials meet meaning, craftsmanship becomes character. Every door is designed not only to be seen, but to be experienced a quiet statement of permanence in a fleeting world. Crafted with intent.",
    "Defined by detail and shaped for those who understand that design is not decoration, but identity. Every surface, every proportion, every finish is considered not to follow trends, but to outlast them. This is where architecture meets emotion. This is Luxe-Verve."
  ];

  // Parse Section 3 Paragraphs
  const sec3Paragraphs = sec3.description ? sec3.description.split('\n').filter(p => p.trim()) : [
    "Every enduring legacy begins with a mark not created to be seen, but to be remembered. The Luxe-Verve emblem draws from the principles of classical craftsmanship, where form followed purpose and beauty was born from restraint. Its lines are deliberate, balanced, and unwavering a reflection of traditions refined over time.",
    "The L represents foundation and continuity. It stands for knowledge passed down, skills honed through discipline, and an uncompromising respect for structure. It is the anchor of the mark grounded, assured, and enduring.",
    "The V signifies vision and evolution. It speaks of progress guided by wisdom, of innovation shaped by experience rather than impulse. A forward gaze that honors the past while shaping the future. Between them lies the threshold space long revered in architecture as a place of transition and meaning. A space where homes are welcomed, values are protected, and generations pass through.",
    "Together, the symbol embodies permanence, dignity, and trust. A mark not defined by time, but strengthened by it.",
    "Luxe-Verve carries this legacy forward through luxury architectural doors crafted to stand quietly, age gracefully, and tell stories long after they are first opened."
  ];

  // Parse Stats
  let stats = [
    { number: '500+', label: 'Projects Delivered' },
    { number: '15+', label: 'Years of Expertise' },
    { number: '200+', label: 'Bespoke Designs' },
    { number: '98%', label: 'Client Satisfaction' },
  ];
  if (statsItem.text) {
    try { stats = JSON.parse(statsItem.text); } catch(e) {}
  }

  return (
    <div style={{ paddingTop: '40px', minHeight: '100vh', backgroundColor: 'var(--bg-dark-solid)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

      {/* Ultra Luxury Hero Banner */}
      <section style={{
        position: 'relative',
        width: '100vw',
        height: '80vh',
        minHeight: '600px',
        marginTop: '-40px', // Compensate for the parent's 40px padding
        backgroundImage: `url(${heroBanner.url || '/images/about_us_banner.png'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', // Parallax effect
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {/* Dark Gradient Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 100%)',
          zIndex: 1
        }}></div>

        {/* Banner Content */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: '800px',
          padding: '0 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px'
        }}>
          <h1 style={{ 
            fontFamily: 'var(--font-knockout)', 
            fontSize: 'clamp(3rem, 6vw, 5.5rem)', 
            fontWeight: 400, 
            color: '#fff', 
            letterSpacing: '6px',
            textTransform: 'uppercase',
            margin: 0,
            textShadow: '0 10px 30px rgba(0,0,0,0.5)'
          }}>
            {heroBanner.text || 'About Us'}
          </h1>
          <div style={{ width: '60px', height: '2px', backgroundColor: 'var(--primary-color)' }}></div>
          <p style={{ 
            fontSize: 'clamp(1rem, 2vw, 1.3rem)', 
            lineHeight: 1.8, 
            color: 'rgba(255,255,255,0.85)', 
            fontWeight: 300,
            letterSpacing: '1px'
          }}>
            {heroBanner.description || 'Every space carries a story and every story deserves a door that feels deeply personal, intentional, and enduring.'}
          </p>
        </div>
      </section>

      {/* Main Container (90vw) */}
      <div style={{ width: '90vw', margin: '80px auto 0', display: 'flex', flexDirection: 'column', gap: '100px', paddingBottom: '100px' }}>

        <section style={{ 
          background: 'var(--bg-sec)',
          borderRadius: '40px',
          padding: '60px',
          boxShadow: '0 10px 40px rgba(74,42,27,0.05)'
        }}>
          <h2 style={{ fontFamily: 'var(--font-knockout)', fontSize: '2.5rem', fontWeight: 400, color: 'var(--primary-color)', lineHeight: 1.2, textAlign: 'center', marginBottom: '40px' }}>
            {mainSec.description || 'Our Philosophy'}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'justify', maxWidth: '1200px', margin: '0 auto' }}>
            {mainParagraphs.map((para, i) => (
              <p key={i} style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-muted)', fontWeight: 400, textAlign: 'justify' }}>
                {para}
              </p>
            ))}
          </div>
        </section>

        {/* Section 2: Image Left, Text Right */}
        <section style={{ 
          display: 'flex', 
          gap: '80px', 
          alignItems: 'center', 
          flexWrap: 'wrap',
          background: 'var(--bg-sec)',
          borderRadius: '40px',
          padding: '60px',
          boxShadow: '0 10px 40px rgba(74,42,27,0.05)'
        }}>
          <div className="hover-3d-wrapper" style={{ flex: '1 1 400px', maxWidth: '600px' }}>
            <div className="hover-3d" style={{ borderRadius: '8px', overflow: 'hidden' }}>
              <img
                src={sec2.url || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop"}
                alt={sec2.text || "Once Upon a Time"}
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover', aspectRatio: '1/1' }}
              />
            </div>
          </div>
          <div style={{ flex: '2 1 500px' }}>
            <div style={{ width: '80px', height: '2px', backgroundColor: '#cfa052', marginBottom: '24px' }}></div>
            <h2 style={{ fontFamily: 'var(--font-knockout)', fontSize: '3rem', fontWeight: 400, marginBottom: '30px', color: 'var(--primary-color)' }}>
              {sec2.text || 'Once Upon a Time'}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'justify' }}>
              {sec2Paragraphs.map((para, i) => (
                <p key={i} style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: '16px', fontWeight: 400, textAlign: 'justify' }}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Text Left, Image Right */}
        <section style={{ 
          display: 'flex', 
          gap: '80px', 
          alignItems: 'center', 
          flexWrap: 'wrap-reverse',
          background: 'var(--bg-sec)',
          borderRadius: '40px',
          padding: '60px',
          boxShadow: '0 10px 40px rgba(74,42,27,0.05)'
        }}>
          <div style={{ flex: '2 1 500px' }}>
            <div style={{ width: '80px', height: '2px', backgroundColor: '#cfa052', marginBottom: '24px' }}></div>
            <h2 style={{ fontFamily: 'var(--font-knockout)', fontSize: '3rem', fontWeight: 400, marginBottom: '30px', color: 'var(--primary-color)' }}>
              {sec3.text || 'A Logo That Represents the Story of Luxe-Verve'}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'justify' }}>
              {sec3Paragraphs.map((para, i) => (
                <p key={i} style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: '16px', fontWeight: 400, textAlign: 'justify' }}>
                  {para}
                </p>
              ))}
            </div>
          </div>
          <div className="hover-3d-wrapper" style={{ flex: '1 1 400px', maxWidth: '600px' }}>
            <div className="hover-3d" style={{ borderRadius: '8px', overflow: 'hidden', backgroundColor: '#2A160D', border: '1px solid rgba(207, 160, 82, 0.3)', padding: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center', aspectRatio: '4/5' }}>
              <img
                src={sec3.url || "/images/logo.png"}
                alt={sec3.text || "Luxe Verve Logo Story"}
                style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }}
              />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section style={{ 
          background: 'var(--bg-sec)', 
          padding: '60px 20px', 
          borderRadius: '40px',
          boxShadow: '0 10px 40px rgba(74,42,27,0.05)'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', textAlign: 'center' }}>
            {stats.map((stat, i) => (
              <div key={i}>
                <p style={{ fontFamily: 'var(--font-knockout)', fontSize: '4.5rem', fontWeight: 400, color: 'var(--primary-color)', lineHeight: 1 }}>{stat.number}</p>
                <p style={{ marginTop: '16px', color: 'var(--text-main)', fontSize: '1rem', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 500 }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Inline styles for 3D hover transition */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .hover-3d-wrapper {
          perspective: 1000px;
          cursor: pointer;
        }
        .hover-3d {
          transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .hover-3d-wrapper:hover .hover-3d {
          transform: rotateX(5deg) rotateY(5deg) scale(1.03);
          box-shadow: -10px 20px 40px rgba(0,0,0,0.4);
        }
      `}} />
    </div>
  );
}
