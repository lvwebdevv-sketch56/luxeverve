export const metadata = {
  title: 'About Us – Luxe Verve',
  description: 'Learn about Luxe Verve – our story, vision, and commitment to luxury architectural design.',
};

export default function AboutPage() {
  return (
    <div style={{ paddingTop: '40px', minHeight: '100vh', backgroundColor: 'var(--bg-dark-solid)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

      {/* Main Container (90vw) */}
      <div style={{ width: '90vw', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '100px', paddingBottom: '100px' }}>

        {/* Hero Section */}
        <section style={{ marginTop: '60px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '4.5rem', fontWeight: 400, color: '#773344', lineHeight: 1.2, textAlign: 'center', marginBottom: '60px' }}>
            ABOUT US
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'justify', maxWidth: '1200px', margin: '0 auto' }}>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-main)', fontWeight: 400 }}>
              At Luxe Verve, we believe that every space carries a story and every story deserves a door that feels deeply personal, intentional, and enduring. A door is not merely an entryway; it is the beginning of an experience, the first visual and emotional connection to a luxury home, villa, or premium architectural space.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-main)', fontWeight: 400 }}>
              We collaborate closely with architects, interior designers, builders, and luxury homeowners, transforming creative concepts and client emotions into bespoke luxury door solutions and custom entrance doors. Every design is approached with sensitivity respecting the architectural vision, spatial harmony, and the individuality of each project. Our process is collaborative, detail-driven, and guided by purpose rather than trends.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-main)', fontWeight: 400 }}>
              Each Luxe Verve luxury door is crafted using premium materials, high-end finishes, and precision engineering, balancing aesthetics with performance. From designer doors and modern entrance doors to architectural statement doors and custom-made doors, our creations elevate luxury villas, premium residences, and high-end commercial projects. Functionality, durability, and craftsmanship remain at the core of every design.
            </p>
          </div>
        </section>

        {/* Section 2: Image Left, Text Right */}
        <section style={{ display: 'flex', gap: '80px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div className="hover-3d-wrapper" style={{ flex: '1 1 400px', maxWidth: '600px' }}>
            <div className="hover-3d" style={{ borderRadius: '8px', overflow: 'hidden' }}>
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop"
                alt="Once Upon a Time"
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover', aspectRatio: '1/1' }}
              />
            </div>
          </div>
          <div style={{ flex: '2 1 500px' }}>
            <div style={{ width: '80px', height: '2px', backgroundColor: '#cfa052', marginBottom: '24px' }}></div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', fontWeight: 400, marginBottom: '30px', color: '#773344' }}>
              Once Upon a Time
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'justify' }}>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-main)' }}>
                Luxe-Verve was born from the belief that doors are not boundaries, but expressions of taste, confidence, and timeless design. Each creation carries this philosophy forward inviting you to look beyond what a door is, and imagine what a luxury architectural door can become.
              </p>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-main)' }}>
                Long before walls defined spaces, there existed a desire to create something lasting a harmony of strength and elegance, of structure and soul. Form meets ambition at Luxe-Verve through a simple truth: an entrance is never merely a doorway. It is the moment where the outside world recedes and a story begins. True luxury is not always seen; it is felt the moment you arrive.
              </p>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-main)' }}>
                Created for spaces that speak without words, our luxury entrance doors are designed for presence even in silence. Where premium materials meet meaning, craftsmanship becomes character. Every door is designed not only to be seen, but to be experienced a quiet statement of permanence in a fleeting world. Crafted with intent.
              </p>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-main)' }}>
                Defined by detail and shaped for those who understand that design is not decoration, but identity. Every surface, every proportion, every finish is considered not to follow trends, but to outlast them. This is where architecture meets emotion. This is Luxe-Verve.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Text Left, Image Right */}
        <section style={{ display: 'flex', gap: '80px', alignItems: 'center', flexWrap: 'wrap-reverse' }}>
          <div style={{ flex: '2 1 500px' }}>
            <div style={{ width: '80px', height: '2px', backgroundColor: '#cfa052', marginBottom: '24px' }}></div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', fontWeight: 400, marginBottom: '30px', color: '#773344' }}>
              A Logo That Represents the Story of Luxe-Verve
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'justify' }}>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-main)' }}>
                Every enduring legacy begins with a mark not created to be seen, but to be remembered. The Luxe-Verve emblem draws from the principles of classical craftsmanship, where form followed purpose and beauty was born from restraint. Its lines are deliberate, balanced, and unwavering a reflection of traditions refined over time.
              </p>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-main)' }}>
                The L represents foundation and continuity. It stands for knowledge passed down, skills honed through discipline, and an uncompromising respect for structure. It is the anchor of the mark grounded, assured, and enduring.
              </p>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-main)' }}>
                The V signifies vision and evolution. It speaks of progress guided by wisdom, of innovation shaped by experience rather than impulse. A forward gaze that honors the past while shaping the future. Between them lies the threshold space long revered in architecture as a place of transition and meaning. A space where homes are welcomed, values are protected, and generations pass through.
              </p>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-main)' }}>
                Together, the symbol embodies permanence, dignity, and trust. A mark not defined by time, but strengthened by it.
              </p>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-main)' }}>
                Luxe-Verve carries this legacy forward through luxury architectural doors crafted to stand quietly, age gracefully, and tell stories long after they are first opened.
              </p>
            </div>
          </div>
          <div className="hover-3d-wrapper" style={{ flex: '1 1 400px', maxWidth: '600px' }}>
            <div className="hover-3d" style={{ borderRadius: '8px', overflow: 'hidden' }}>
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop"
                alt="Luxe Verve Logo Story"
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover', aspectRatio: '4/5' }}
              />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section style={{ backgroundColor: '#0B0014', padding: '60px 20px', borderRadius: '4px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', textAlign: 'center' }}>
            {[
              { number: '500+', label: 'Projects Delivered' },
              { number: '15+', label: 'Years of Expertise' },
              { number: '200+', label: 'Bespoke Designs' },
              { number: '98%', label: 'Client Satisfaction' },
            ].map((stat, i) => (
              <div key={i}>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '4.5rem', fontWeight: 400, color: '#F5E9E2', lineHeight: 1 }}>{stat.number}</p>
                <p style={{ marginTop: '16px', color: 'rgba(245, 233, 226, 0.7)', fontSize: '1rem', letterSpacing: '2px', textTransform: 'uppercase' }}>{stat.label}</p>
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
