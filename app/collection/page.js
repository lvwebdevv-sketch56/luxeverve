export const metadata = {
  title: 'Luxury CNC & Wooden Doors Collection | Noida & Delhi NCR',
  description: 'Discover the Luxe Verve collection of bespoke CNC doors, modern pivot doors, and premium wooden entrance doors. Elevate your architecture.',
};

const collectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Luxe Verve Luxury Door Collection',
  description: 'Premium collection of modern luxury wooden doors, CNC doors, and pivot doors.',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'Product',
        name: 'Modern Pivot Doors',
        description: 'Sculptural interpretation of modern luxury entrance door design.',
        brand: { '@type': 'Brand', name: 'Luxe Verve' }
      }
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'Product',
        name: 'Custom CNC Wooden Doors',
        description: 'High-end CNC carved panel doors and decorative entrance doors.',
        brand: { '@type': 'Brand', name: 'Luxe Verve' }
      }
    }
  ]
};

export const revalidate = 0; // Force Next.js to always fetch fresh data from Firestore

import CatalogueFlipbooks from '../../components/CatalogueFlipbooks';
import CollectionSlider from '../../components/CollectionSlider';
import { db } from '../../lib/firebaseAdmin';

export default async function CollectionPage() {
  const snapshot = await db.collection('content').get();
  const content = snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title || null,
      url: data.url || null,
      description: data.description || null,
      text: data.text || null,
      order: data.order || 0
    };
  });

  const banner = content.find(i => i.title === 'coll_banner') || { description: "The Art of Architectural\nDoors", text: "Gives You The Luxury you Deserve", url: "/images/collection_1.png" };
  const sec2 = content.find(i => i.title === 'coll_sec2') || { description: "Our Philosophy of Bespoke Entrance Architecture", text: "Every designer door we construct represents an intensive dialogue between technical engineering and pure aesthetics..." };

  const getSlider = (id, defaultTitle, defaultText) => {
    const data = content.find(i => i.title === id);
    if (data) {
      let imgs = ["", "", "", "", "", ""];
      try { imgs = JSON.parse(data.url); } catch(e) {}
      return { title: data.description || defaultTitle, text: data.text || defaultText, images: imgs };
    }
    // Default placeholders
    const defaultImages = [
      "/images/door_sculpted_wood_1776844667211.png",
      "/images/door_minimal_metal_1776844703459.png",
      "/images/door_grand_pivot_1776844794720.png",
      "/images/door_classic_glass_1776844734600.png",
      "/images/door_stone_texture_1776844837858.png",
      "/images/collection_2.png"
    ];
    return { title: defaultTitle, text: defaultText, images: defaultImages };
  };

  const slider1 = getSlider('coll_slider1', "Thread Line Door", "The THREADLINE DOOR is a bold expression of contemporary luxury door design...");
  const slider2 = getSlider('coll_slider2', "MORPHIC DOOR", "The MORPHIC DOOR is a sculptural interpretation of modern luxury entrance door design...");
  const slider3 = getSlider('coll_slider3', "CUBIX DOOR", "The CUBIX DOOR is a bold luxury architectural door statement defined by structure, rhythm, and precision...");

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-dark-solid)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      {/* First Section (Hero) */}
      <section style={{
        position: 'relative',
        height: '130vh',
        width: '100%',
      }} className="collection-hero-wrapper">
        <div style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          backgroundImage: `url(${banner.url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start', // Align content to the left
          overflow: 'hidden'
        }} className="collection-hero-bg">
          {/* Left Half Transparent Shadow */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '50vw',
            background: 'rgba(0, 0, 0, 0.65)',
            zIndex: 1
          }} className="collection-hero-shadow"></div>

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
              fontFamily: 'var(--font-knockout)', 
              fontSize: 'clamp(1rem, 3vw, 2.5rem)', 
              fontWeight: 400, 
              color: 'var(--primary-color)', 
              margin: 0 
            }} className="collection-h3">
              {banner.text}
            </h3>
            
            <h1 style={{ 
              fontFamily: 'var(--font-knockout)', 
              fontSize: 'clamp(1.8rem, 5vw, 4rem)', 
              fontWeight: 400, 
              color: 'var(--primary-color)', 
              lineHeight: 1.2,
              margin: '10px 0'
            }} className="collection-h1">
              {banner.description.split('\\n').map((line, i) => (
                <span key={i}>
                  {line}<br />
                </span>
              ))}
            </h1>
            
            <p style={{ 
              marginTop: '16px', 
              color: '#F5E9E2', 
              fontSize: 'clamp(0.9rem, 1.5vw, 1.25rem)', 
              lineHeight: 1.6,
              fontWeight: 300,
              fontStyle: 'italic'
            }} className="collection-p">
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
              src={sec2.url || "/images/collection_2.png"} 
              alt="Engineered Wood" 
              style={{ width: '100%', height: 'auto', borderRadius: '4px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }} 
            />
          </div>

          {/* Text */}
            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '20px' }} className="collection-text-wrapper">
              <h2 style={{ fontSize: '2rem', color: 'var(--primary-color)', fontFamily: 'var(--font-knockout)' }}>{sec2.description}</h2>
              {sec2.text.split('\\n').map((para, i) => (
                <p key={i} style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-muted)', textAlign: 'justify' }}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        </section>

        <CollectionSlider title={slider1.title} text={slider1.text} images={slider1.images} />
        <CollectionSlider title={slider2.title} text={slider2.text} images={slider2.images} />
        <CollectionSlider title={slider3.title} text={slider3.text} images={slider3.images} />

        <CatalogueFlipbooks content={content} />

      <style dangerouslySetInnerHTML={{
        __html: `
        @media (max-width: 900px) {
          .collection-hero-wrapper {
            height: 50vh !important;
          }
          .collection-hero-bg {
            height: 50vh !important;
          }
          .collection-hero-content {
            max-width: 50vw !important;
            padding: 0 4vw !important;
          }
          .collection-hero-shadow {
            width: 50vw !important;
            background: rgba(0, 0, 0, 0.65) !important;
          }
          .collection-h3 {
            font-size: clamp(0.75rem, 2.5vw, 1rem) !important;
          }
          .collection-h1 {
            font-size: clamp(1.2rem, 4.5vw, 2rem) !important;
            margin: 5px 0 !important;
          }
          .collection-p {
            font-size: clamp(0.65rem, 2vw, 0.9rem) !important;
            line-height: 1.4 !important;
            margin-top: 8px !important;
          }

          .collection-flex-container {
            flex-direction: column !important;
            gap: 40px !important;
            padding: 30px !important;
          }
          .collection-image-wrapper {
            order: -1;
          }
          .collection-second-section {
            padding: 40px 5vw !important;
          }
        }
      `}} />
    </div>
  );
}
