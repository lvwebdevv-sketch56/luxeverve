export const metadata = {
  title: 'Contact Us – Luxe Verve',
  description: 'Get in touch with Luxe Verve for bespoke luxury door consultations.',
};

export default function ContactPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-dark-solid)', paddingTop: '40px' }}>
      
      {/* Map Hero Section */}
      <a 
        href="https://maps.app.goo.gl/KmV96fgGTrLg3n3V6?g_st=aw" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="contact-hero-map"
        style={{ 
          display: 'block', 
          width: '90%', 
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
          <p style={{ fontSize: '1rem', letterSpacing: '4px', color: '#fff', marginBottom: '8px', textTransform: 'uppercase', fontWeight: 600 }}>HOME</p>
          <h1 className="contact-hero-title" style={{ fontFamily: 'var(--font-serif)', fontSize: '4.5rem', fontWeight: 400, color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>Contact Us</h1>
        </div>
        <iframe 
          src="https://maps.google.com/maps?q=Luxe%20verve,%20New%20Delhi&t=&z=11&ie=UTF8&iwloc=&output=embed" 
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
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 400, marginBottom: '40px', color: 'var(--primary-color)' }}>Get In Touch</h2>
            {[
              { icon: '📞', label: 'Phone', value: '+91 98714 71161' },
              { icon: '✉️', label: 'Email', value: 'INFO@LUXE-VERVE.COM' },
              { icon: '📍', label: 'Showroom', value: 'New Delhi, India' },
              { icon: '🕐', label: 'Hours', value: 'Mon–Sat: 10am – 7pm' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '20px', marginBottom: '32px' }}>
                <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                <div>
                  <p style={{ fontSize: '0.75rem', letterSpacing: '2px', color: 'var(--primary-color)', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 'bold' }}>{item.label}</p>
                  <p style={{ fontSize: '1.05rem', color: 'var(--text-main)', fontWeight: 500 }}>{item.value}</p>
                </div>
              </div>
            ))}
            <a href="https://wa.me/919871471161" target="_blank" rel="noopener noreferrer" className="whatsapp-link-btn"
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', color: '#2A160D', border: '2px solid #2A160D', padding: '4.2px 32px', borderRadius: '9999px', fontWeight: 'bold', fontSize: '1rem', transition: 'all 0.3s ease', textDecoration: 'none', marginTop: '16px' }}
            >
              Chat on WhatsApp
            </a>
          </div>

          <div style={{ flex: 1, minWidth: '280px' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 400, marginBottom: '40px', color: 'var(--primary-color)' }}>Send a Message</h2>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { id: 'contact-name', label: 'Full Name', type: 'text', placeholder: 'Your Name' },
                { id: 'contact-email', label: 'Email Address', type: 'email', placeholder: 'your@email.com' },
                { id: 'contact-phone', label: 'Phone Number', type: 'tel', placeholder: '+91 00000 00000' },
              ].map((field) => (
                <div key={field.id}>
                  <label htmlFor={field.id} style={{ display: 'block', fontSize: '0.8rem', letterSpacing: '1px', color: 'var(--primary-color)', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 'bold' }}>{field.label}</label>
                  <input id={field.id} type={field.type} placeholder={field.placeholder}
                    style={{ width: '100%', background: 'transparent', border: '1px solid var(--primary-color)', borderRadius: '4px', padding: '14px 18px', color: 'var(--text-main)', fontSize: '1rem', fontFamily: 'var(--font-sans)', outline: 'none' }} />
                </div>
              ))}
              <div>
                <label htmlFor="contact-message" style={{ display: 'block', fontSize: '0.8rem', letterSpacing: '1px', color: 'var(--primary-color)', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 'bold' }}>Message</label>
                <textarea id="contact-message" rows={5} placeholder="Describe your dream door..."
                  style={{ width: '100%', background: 'transparent', border: '1px solid var(--primary-color)', borderRadius: '4px', padding: '14px 18px', color: 'var(--text-main)', fontSize: '1rem', fontFamily: 'var(--font-sans)', outline: 'none', resize: 'vertical' }} />
              </div>
              <button type="submit" style={{ alignSelf: 'flex-start' }}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
      <style dangerouslySetInnerHTML={{
        __html: `
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
