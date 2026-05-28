'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  const [data, setData] = useState({
    logoText: "Luxe Verve.",
    brandDescription: "We design exclusive luxury architect doors that move beyond conventional solutions — every piece is a bespoke architectural statement.",
    socialInstagram: "https://www.instagram.com/luxe_verve?igsh=MW5xZDFka3BjeHpmeg==",
    socialPinterest: "https://pin.it/5esGKiEm3",
    socialFacebook: "https://www.facebook.com/profile.php?id=61586562659611#",
    socialYoutube: "https://g.page/r/CaNjSoPDd436EBM/review",
    navHeading: "Explore",
    navLinks: [
      { href: '/home', label: 'Home' },
      { href: '/collection', label: 'Collection' },
      { href: '/about', label: 'About Us' },
      { href: '/contact', label: 'Contact Us' },
      { href: '/blog', label: 'Blog' },
    ],
    servicesHeading: "Services",
    services: [
      'Luxury Entrance Doors',
      'Pivot Door Systems',
      'Custom Wood Panels',
      'Commercial Projects',
      'Design Consultation',
    ],
    contactHeading: "Get In Touch",
    showroomLabel: "Showroom",
    contactShowroom: "Block A, 22 Sector-9\nNoida, Uttar Pradesh",
    phoneLabel: "Phone",
    contactPhone: "+91 98714 71161",
    emailLabel: "Email",
    contactEmail: "info@luxe-verve.com",
    hoursLabel: "Hours",
    contactHours: "Mon–Sat: 10am – 7pm",
    copyright: `© ${year} Luxe Verve. All rights reserved.`,
    badge1: "Premium Quality",
    badge2: "Custom Crafted",
    badge3: "Architectural Excellence",
    bottomRightText: "Crafted with precision & elegance."
  });

  useEffect(() => {
    fetch('/api/content')
      .then(async res => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        const text = await res.text();
        try {
          return JSON.parse(text);
        } catch (e) {
          throw new Error("Invalid JSON returned: " + text.slice(0, 50));
        }
      })
      .then(items => {
        if (!Array.isArray(items)) {
          console.error("API returned non-array:", items);
          return;
        }
        const footerDoc = items.find(i => i.title === 'footer_config');
        if (footerDoc && footerDoc.text) {
          try {
            const parsed = JSON.parse(footerDoc.text);
            setData(prev => ({
              ...prev,
              ...parsed,
              // handle defaults if missing
              navLinks: parsed.navLinks || prev.navLinks,
              services: parsed.services || prev.services
            }));
          } catch (e) { console.error(e); }
        }
      })
      .catch(e => console.warn("Could not load footer data:", e.message));
  }, []);

  return (
    <footer className="footer">

      {/* ── Main Grid ── */}
      <div className="footer-main">
        <div className="container footer-grid">

          {/* Column 1 — Brand */}
          <div className="footer-col footer-col--brand">
            <Link href="/home" aria-label="Luxe Verve Home" className="footer-logo-link" style={{ textDecoration: 'none' }}>
              <h3 style={{ fontFamily: 'var(--font-knockout)', fontSize: '2rem', color: '#E9D7C3', margin: 0, letterSpacing: '2px', fontWeight: 500 }}>{data.logoText}</h3>
            </Link>
            <p className="footer-brand-desc">
              {data.brandDescription}
            </p>

            {/* Social Icons */}
            <div className="footer-socials">
              {/* Instagram */}
              {data.socialInstagram && (
                <a
                  href={data.socialInstagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="footer-social-btn"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                  </svg>
                </a>
              )}
              {/* Pinterest */}
              {data.socialPinterest && (
                <a
                  href={data.socialPinterest}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Pinterest"
                  className="footer-social-btn"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                  </svg>
                </a>
              )}
              {/* Facebook */}
              {data.socialFacebook && (
                <a
                  href={data.socialFacebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="footer-social-btn"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </a>
              )}
              {/* YouTube / Google Reviews */}
              {data.socialYoutube && (
                <a
                  href={data.socialYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="footer-social-btn"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Column 2 — Navigation */}
          <div className="footer-col">
            <h4 className="footer-col-heading">{data.navHeading}</h4>
            <ul className="footer-link-list">
              {data.navLinks.map((link) => (
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
            <h4 className="footer-col-heading">{data.servicesHeading}</h4>
            <ul className="footer-link-list">
              {data.services.map((s, index) => (
                <li key={index}>
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
            <h4 className="footer-col-heading">{data.contactHeading}</h4>
            <ul className="footer-contact-list">
              <li className="footer-contact-item">
                <span className="footer-contact-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <div>
                  <span className="footer-contact-label">{data.showroomLabel}</span>
                  <span className="footer-contact-value" style={{ whiteSpace: 'pre-line' }}>{data.contactShowroom}</span>
                </div>
              </li>
              <li className="footer-contact-item">
                <span className="footer-contact-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.57 3.4 2 2 0 0 1 3.54 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.58a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.73 15.5Z" />
                  </svg>
                </span>
                <div>
                  <span className="footer-contact-label">{data.phoneLabel}</span>
                  <a href={`tel:${data.contactPhone.replace(/\s/g, '')}`} className="footer-contact-value footer-contact-link">{data.contactPhone}</a>
                </div>
              </li>
              <li className="footer-contact-item">
                <span className="footer-contact-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <div>
                  <span className="footer-contact-label">{data.emailLabel}</span>
                  <a href={`mailto:${data.contactEmail}`} className="footer-contact-value footer-contact-link">{data.contactEmail}</a>
                </div>
              </li>
              <li className="footer-contact-item">
                <span className="footer-contact-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                  </svg>
                </span>
                <div>
                  <span className="footer-contact-label">{data.hoursLabel}</span>
                  <span className="footer-contact-value">{data.contactHours}</span>
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
          <p className="footer-copy">{data.copyright}</p>
          <div className="footer-bottom-badges">
            <span className="footer-badge">{data.badge1}</span>
            <span className="footer-badge-dot">·</span>
            <span className="footer-badge">{data.badge2}</span>
            <span className="footer-badge-dot">·</span>
            <span className="footer-badge">{data.badge3}</span>
          </div>
          <p className="footer-copy footer-copy--right">{data.bottomRightText}</p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
