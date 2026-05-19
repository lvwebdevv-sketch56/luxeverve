import Link from 'next/link';
import Image from 'next/image';
import './Footer.css';

const navLinks = [
  { href: '/home',       label: 'Home' },
  { href: '/collection', label: 'Collection' },
  { href: '/about',      label: 'About Us' },
  { href: '/contact',    label: 'Contact Us' },
  { href: '/blog',       label: 'Blog' },
];

const services = [
  'Luxury Entrance Doors',
  'Pivot Door Systems',
  'Custom Wood Panels',
  'Commercial Projects',
  'Design Consultation',
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">

      {/* ── Top accent line ── */}
      <div className="footer-accent-line" />

      {/* ── Large Brand Statement ── */}
      <div className="footer-hero-band">
        <div className="container footer-hero-inner">
          <p className="footer-hero-label">Crafted For Those Who Demand Excellence</p>
          <h2 className="footer-hero-wordmark">LUXE VERVE</h2>
          <p className="footer-hero-sub">Luxury Architectural Doors · Est. in Excellence</p>
        </div>
      </div>

      {/* ── Main Grid ── */}
      <div className="footer-main">
        <div className="container footer-grid">

          {/* Column 1 — Brand */}
          <div className="footer-col footer-col--brand">
            <Link href="/home" aria-label="Luxe Verve Home" className="footer-logo-link" style={{ textDecoration: 'none' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#E9D7C3', margin: 0, letterSpacing: '2px', fontWeight: 500 }}>Luxe Verve.</h3>
            </Link>
            <p className="footer-brand-desc">
              We design exclusive luxury architect doors that move beyond conventional solutions —
              every piece is a bespoke architectural statement.
            </p>

            {/* Social Icons */}
            <div className="footer-socials">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="footer-social-btn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                </svg>
              </a>
              {/* WhatsApp */}
              <a
                href="https://wa.me/919871471161"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="footer-social-btn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
              </a>
              {/* Pinterest */}
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
                className="footer-social-btn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2 — Navigation */}
          <div className="footer-col">
            <h4 className="footer-col-heading">Explore</h4>
            <ul className="footer-link-list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-nav-link">
                    <span className="footer-link-arrow">→</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Services */}
          <div className="footer-col">
            <h4 className="footer-col-heading">Services</h4>
            <ul className="footer-link-list">
              {services.map((s) => (
                <li key={s}>
                  <span className="footer-service-item">
                    <span className="footer-link-arrow">→</span>
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div className="footer-col">
            <h4 className="footer-col-heading">Contact</h4>
            <ul className="footer-contact-list">
              <li className="footer-contact-item">
                <span className="footer-contact-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </span>
                <div>
                  <span className="footer-contact-label">Showroom</span>
                  <span className="footer-contact-value">Block A, 22 Sector-9<br/>Noida, Uttar Pradesh</span>
                </div>
              </li>
              <li className="footer-contact-item">
                <span className="footer-contact-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.57 3.4 2 2 0 0 1 3.54 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.58a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.73 15.5Z"/>
                  </svg>
                </span>
                <div>
                  <span className="footer-contact-label">Phone</span>
                  <a href="tel:+919871471161" className="footer-contact-value footer-contact-link">+91 98714 71161</a>
                </div>
              </li>
              <li className="footer-contact-item">
                <span className="footer-contact-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                </span>
                <div>
                  <span className="footer-contact-label">Email</span>
                  <a href="mailto:info@luxe-verve.com" className="footer-contact-value footer-contact-link">info@luxe-verve.com</a>
                </div>
              </li>
              <li className="footer-contact-item">
                <span className="footer-contact-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                </span>
                <div>
                  <span className="footer-contact-label">Hours</span>
                  <span className="footer-contact-value">Mon–Sat: 10am – 7pm</span>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* ── Divider ── */}
      <div className="footer-divider-line">
        <div className="container">
          <div className="footer-divider-inner" />
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p className="footer-copy">© {year} Luxe Verve. All rights reserved.</p>
          <div className="footer-bottom-badges">
            <span className="footer-badge">Premium Quality</span>
            <span className="footer-badge-dot">·</span>
            <span className="footer-badge">Custom Crafted</span>
            <span className="footer-badge-dot">·</span>
            <span className="footer-badge">Architectural Excellence</span>
          </div>
          <p className="footer-copy footer-copy--right">Crafted with precision &amp; elegance.</p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
