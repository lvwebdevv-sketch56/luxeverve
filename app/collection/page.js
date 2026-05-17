export const metadata = {
  title: 'Collection – Luxe Verve',
  description: 'Explore our curated collection of luxury designer doors.',
};

export default function CollectionPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-dark-solid)' }}>
      {/* First Section (Hero) */}
      <section style={{
        position: 'relative',
        height: '130vh',
        width: '100%',
      }}>
        <div style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          backgroundImage: 'url(/images/collection_1.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start', // Align content to the left
          overflow: 'hidden'
        }}>
          {/* Left Half Transparent Shadow */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '50vw',
            background: 'rgba(0, 0, 0, 0.65)',
            zIndex: 1
          }}></div>

          {/* Content */}
          <div style={{
            position: 'relative',
            zIndex: 2,
            padding: '0 5vw',
            maxWidth: '50vw', // Restrict text to the shadow area
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }} className="collection-hero-content">
            <h3 style={{ 
              fontFamily: 'var(--font-serif)', 
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', 
              fontWeight: 400, 
              color: 'var(--primary-color)', 
              margin: 0 
            }}>
              Gives You The Luxury you Deserve
            </h3>
            
            <h1 style={{ 
              fontFamily: 'var(--font-serif)', 
              fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
              fontWeight: 400, 
              color: 'var(--primary-color)', 
              lineHeight: 1.2,
              margin: '10px 0'
            }}>
              The Art of Architectural<br />Doors
            </h1>
            
            <p style={{ 
              marginTop: '16px', 
              color: '#F5E9E2', 
              fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', 
              lineHeight: 1.6,
              fontWeight: 300,
              fontStyle: 'italic'
            }}>
              "At Luxe Verve, we design doors as architectural statements where form, material, and craftsmanship come together to create entrances that feel refined, timeless, and unmistakably luxurious."
            </p>
          </div>
        </div>
      </section>

      {/* Second Section (Image Left, Text Right) */}
      <section style={{ padding: '80px 5vw', position: 'relative', zIndex: 10, backgroundColor: 'var(--bg-dark-solid)' }} className="collection-second-section">
        <div style={{
          background: 'var(--bg-sec)',
          borderRadius: '40px',
          padding: '60px',
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '60px',
          boxShadow: '0 10px 40px rgba(74,42,27,0.05)'
        }} className="collection-flex-container">
          
          {/* Image */}
          <div style={{ flex: '1', width: '100%' }} className="collection-image-wrapper">
            <img 
              src="/images/collection_2.png" 
              alt="Engineered Wood" 
              style={{ width: '100%', height: 'auto', borderRadius: '4px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }} 
            />
          </div>

          {/* Text */}
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '20px' }} className="collection-text-wrapper">
            <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-main)' }}>
              Engineered wood is a premium, high-performance material designed for exceptional strength, stability, and long-term durability. Manufactured by bonding multiple layers using advanced technology, it offers superior resistance to warping, moisture, and termite damage. Its refined, uniform structure ensures flawless surfaces and consistent quality ideal for luxury door finishes and precise detailing.
            </p>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-main)' }}>
              Engineered wood allows designers to achieve bold, elegant forms with confidence. As an eco-conscious, low-maintenance choice, it delivers the timeless beauty of solid wood while offering enhanced reliability, sophistication, and performance for high-end architectural doors and refined interior spaces.
            </p>
          </div>

        </div>
      </section>

      <style dangerouslySetInnerHTML={{
        __html: `
        @media (max-width: 900px) {
          .collection-hero-content {
            max-width: 90vw !important;
            padding: 0 5vw !important;
          }
          .collection-flex-container {
            flex-direction: column !important;
            gap: 40px !important;
          }
          .collection-image-wrapper {
            order: -1;
          }
        }
      `}} />
    </div>
  );
}
