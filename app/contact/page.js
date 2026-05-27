export const metadata = {
  title: 'Contact Us – Luxe Verve',
  description: 'Get in touch with Luxe Verve for bespoke luxury door consultations.',
};

import { db } from '@/lib/firebaseAdmin';
import ContactForm from '@/components/ContactForm';

export const revalidate = 0; // Force Next.js to always fetch fresh data from Firestore

export default async function ContactPage() {
  const snapshot = await db.collection('content').get();
  const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  const banner = items.find(i => i.title === 'contact_banner') || {};
  const detailsItem = items.find(i => i.title === 'contact_details') || {};
  const mapItem = items.find(i => i.title === 'contact_map') || {};

  // Parse Contact Details
  let contactDetails = [
    { icon: '📞', label: 'Phone', value: '+91 98714 71161' },
    { icon: '✉️', label: 'Email', value: 'INFO@LUXE-VERVE.COM' },
    { icon: '📍', label: 'Showroom', value: 'Block A, 22 Sector-9 Noida, Uttar Pradesh' },
    { icon: '🕐', label: 'Hours', value: 'Mon–Sat: 10am – 7pm' },
  ];
  if (detailsItem.text) {
    try { contactDetails = JSON.parse(detailsItem.text); } catch (e) { }
  }

  // Parse Map Subheading and Link
  let mapSubheading = "HQ & STUDIO";
  let mapLink = "https://maps.app.goo.gl/KmV96fgGTrLg3n3V6?g_st=aw";
  if (mapItem.text) {
    try {
      const parsed = JSON.parse(mapItem.text);
      if (parsed.subheading) mapSubheading = parsed.subheading;
      if (parsed.link) mapLink = parsed.link;
    } catch (e) {
      mapSubheading = mapItem.text;
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-dark-solid)', paddingTop: '0' }}>

      {/* Ultra Luxury Hero Banner */}
      <section className="contact-hero-banner" style={{
        position: 'relative',
        width: '100vw',
        backgroundImage: `url(${banner.url || '/images/contact_banner.png'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', // Parallax effect
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        marginBottom: '80px'
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
            {banner.text || 'Contact Us'}
          </h1>
          <div style={{ width: '60px', height: '2px', backgroundColor: 'var(--primary-color)' }}></div>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.3rem)',
            lineHeight: 1.8,
            color: 'rgba(255,255,255,0.85)',
            fontWeight: 300,
            letterSpacing: '1px'
          }}>
            {banner.description || 'Connect with our design team to begin crafting your bespoke luxury entryway.'}
          </p>
        </div>
      </section>

      {/* Map Section */}
      <a
        href={mapLink}
        target="_blank"
        rel="noopener noreferrer"
        className="contact-hero-map"
        style={{
          display: 'block',
          width: '90vw',
          height: '60vh',
          margin: '0 auto 60px auto',
          position: 'relative',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
          textDecoration: 'none'
        }}
      >
        <div style={{ position: 'absolute', inset: 0, zIndex: 10, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', paddingLeft: '10%', backgroundColor: 'rgba(0,0,0,0.15)' }}>
          <p style={{ fontSize: '1rem', letterSpacing: '4px', color: '#fff', marginBottom: '8px', textTransform: 'uppercase', fontWeight: 600 }}>{mapSubheading}</p>
          <h2 className="contact-hero-title" style={{ fontFamily: 'var(--font-knockout)', fontSize: '3.5rem', fontWeight: 400, color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>{mapItem.description || 'Luxe Verve, New Delhi'}</h2>
        </div>
        <iframe
          src={mapItem.url || "https://maps.google.com/maps?q=Luxe%20verve,%20New%20Delhi&t=&z=11&ie=UTF8&iwloc=&output=embed"}
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(100%) opacity(0.9)', pointerEvents: 'none' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </a>


      <section className="container" style={{ padding: '40px 5vw' }}>
        <div className="contact-themed-container">
          <div style={{ flex: 1, minWidth: '280px' }}>
            <h2 style={{ fontFamily: 'var(--font-knockout)', fontSize: '2rem', fontWeight: 400, marginBottom: '40px', color: 'var(--primary-color)' }}>{detailsItem.description || 'Get In Touch'}</h2>
            {contactDetails.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '20px', marginBottom: '32px' }}>
                <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                <div>
                  <p style={{ fontSize: '0.75rem', letterSpacing: '2px', color: 'var(--primary-color)', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 'bold' }}>{item.label}</p>
                  <p style={{ fontSize: '1.05rem', color: 'var(--text-main)', fontWeight: 500 }}>{item.value}</p>
                </div>
              </div>
            ))}
            <a href={detailsItem.url || "https://wa.me/919871471161"} target="_blank" rel="noopener noreferrer" className="whatsapp-link-btn"
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', color: '#2A160D', border: '2px solid #2A160D', padding: '4.2px 32px', borderRadius: '9999px', fontWeight: 'bold', fontSize: '1rem', transition: 'all 0.3s ease', textDecoration: 'none', marginTop: '16px' }}
            >
              Chat on WhatsApp
            </a>
          </div>

          <div style={{ flex: 1, minWidth: '280px' }}>
            <h2 style={{ fontFamily: 'var(--font-knockout)', fontSize: '2rem', fontWeight: 400, marginBottom: '40px', color: 'var(--primary-color)' }}>Send a Message</h2>
            <ContactForm />
          </div>
        </div>
      </section>
      <style dangerouslySetInnerHTML={{
        __html: `
        .contact-hero-banner {
          height: 85vh;
          min-height: 600px;
        }
        @media (max-width: 768px) {
          .contact-hero-banner {
            height: 60vh;
            min-height: 450px;
          }
        }
        .contact-themed-container {
          background: var(--bg-sec);
          border-radius: 40px;
          padding: 60px;
          display: flex;
          gap: 80px;
          flex-wrap: wrap;
          align-items: flex-start;
          box-shadow: 0 10px 40px rgba(74,42,27,0.05);
        }
        .whatsapp-link-btn:hover {
          background-color: var(--primary-color) !important;
          color: #ffffff !important;
          border-color: var(--primary-color) !important;
        }
        @media (max-width: 768px) {
          .contact-themed-container {
            padding: 30px 20px !important;
            border-radius: 24px !important;
            gap: 40px !important;
          }
          .contact-hero-map {
            height: 40vh !important;
            width: 100% !important;
            margin: 0 auto 30px auto !important;
            border-radius: 0 !important;
          }
          .contact-hero-title {
            font-size: clamp(2rem, 8vw, 3rem) !important;
          }
          .contact-themed-container h2 {
            font-size: 1.6rem !important;
            margin-bottom: 24px !important;
          }
        }
      `}} />
    </div>
  );
}
