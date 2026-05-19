'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './theme2.css';

const NAV = [
  { href: '/home', label: 'Home' },
  { href: '/collection', label: 'Collection' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact Us' },
  { href: '/blog', label: 'Blog' },
];
const PILLS = [
  { n: 1, href: '/home1' },
  { n: 2, href: '/home2' },
  { n: 3, href: '/home3' },
  { n: 4, href: '/home4' },
  { n: 5, href: '/home5' },
  { n: 6, href: '/home6' },
];

export default function Theme2Page() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <div className="t2">
      {/* ── Navbar ── */}
      <nav className={`t2-nav${scrolled ? ' scrolled' : ''}`}>
        <Link href="/" className="t2-logo">
          <Image src="/images/logo.png" alt="Luxe Verve" width={64} height={50} />
        </Link>
        <ul className="t2-nav-links">
          {NAV.map(l => (
            <li key={l.href}>
              <Link href={l.href} className="t2-nl">{l.label}</Link>
            </li>
          ))}
        </ul>
        <div className="t2-switcher">
          {PILLS.map(p => (
            <Link key={p.n} href={p.href} className={`t2-pill${p.n === 2 ? ' cur' : ''}`}>{p.n}</Link>
          ))}
        </div>
        <button className={`t2-hbg${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`t2-mob${menuOpen ? ' open' : ''}`}>
        <button className="t2-mob-close" onClick={() => setMenuOpen(false)}>✕</button>
        {NAV.map(l => (
          <Link key={l.href} href={l.href} className="t2-mob-link" onClick={() => setMenuOpen(false)}>{l.label}</Link>
        ))}
      </div>

      {/* ── Hero ── */}
      <section className="t2-hero">
        <video className="t2-hero-video" autoPlay muted loop playsInline
          poster="/images/luxury_doors_full_page_1776845254783.png">
          <source src="/videos/demo.mp4" type="video/mp4" />
        </video>
        <div className="t2-hero-overlay" />
        <div className="t2-hero-content">
          <p className="t2-hero-eyebrow">Crafted for Those Who Demand Excellence</p>
          <h1 className="t2-hero-title">LUXE VERVE</h1>
          <div className="t2-hero-line" />
          <p className="t2-hero-sub">Luxury Architectural Doors · Beyond the Threshold</p>
          <Link href="/collection" className="t2-hero-cta"><span>Explore Collection</span></Link>
        </div>
      </section>

      {/* ── Door Cards ── */}
      <section className="t2-cards-section">
        <div className="t2-cards-grid">
          {[
            { img: '/images/door_sculpted_wood_1776844667211.png', label: 'Collection I', title: 'Sculpted Wood' },
            { img: '/images/door_minimal_metal_1776844703459.png', label: 'Collection II', title: 'Minimal Metal' },
            { img: '/images/door_grand_pivot_1776844794720.png',   label: 'Collection III', title: 'Grand Pivot' },
          ].map((c, i) => (
            <div className="t2-card" key={i}>
              <img src={c.img} alt={c.title} />
              <div className="t2-card-overlay">
                <span className="t2-card-label">{c.label}</span>
                <h3 className="t2-card-title">{c.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 1: Text + Video ── */}
      <section className="t2-section">
        <div className="t2-section-inner">
          <div>
            <p className="t2-sec-eyebrow">Craftsmanship & Innovation</p>
            <h2 className="t2-sec-heading">An Expression of Luxury Door Design, Quality, and Craftsmanship</h2>
            <div className="t2-sec-line" />
            <div className="t2-sec-text">
              <p>Our presence at a leading industry event reflects a convergence of craftsmanship, innovation, and modern design. Engaging with architects, designers, and industry experts, we explored contemporary design trends, premium materials, and refined finishes that define high-quality architectural solutions.</p>
              <p>Our participation in curated trade shows and design exhibitions reflects our commitment to engineered wood solutions, durable materials, and precision craftsmanship for both residential and commercial spaces.</p>
              <p>Through meaningful industry engagement, we continue to refine our vision and deliver timeless, performance-driven solutions shaped by quality, innovation, and design excellence.</p>
            </div>
            <Link href="/about" className="t2-sec-link">Know More About Premium Craftsmanship</Link>
          </div>
          <div className="t2-media-wrap">
            <video controls poster="/images/luxury_doors_landing_page_scrolled_1776845139099.png" style={{ width: '100%' }}>
              <source src="/videos/demo.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* ── Section 2: Image + Text ── */}
      <section className="t2-section alt">
        <div className="t2-section-inner rev">
          <div className="t2-media-wrap">
            <img src="/images/luxury_storefront_1776848163085.png" alt="Luxe Verve Storefront" />
          </div>
          <div>
            <p className="t2-sec-eyebrow">Our Philosophy</p>
            <h2 className="t2-sec-heading">Personal Note</h2>
            <div className="t2-sec-line" />
            <div className="t2-sec-text">
              <p>At Luxe-Verve, we design exclusive luxury architect doors that move beyond conventional or standard door solutions. Each door is conceived with a distinct design philosophy, using carefully selected premium materials that set our work apart from ordinary wooden or mass-produced doors.</p>
              <p>Every Luxe-Verve door is custom-crafted to deliver modern aesthetics, architectural precision, and refined luxury. Designed for high-end residences and premium spaces, our doors ensure your entrance stands apart with a bold, sophisticated identity.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: Text + Video ── */}
      <section className="t2-section">
        <div className="t2-section-inner">
          <div>
            <p className="t2-sec-eyebrow">Design Excellence</p>
            <h2 className="t2-sec-heading">The Art of Luxury Entrance Doors</h2>
            <div className="t2-sec-line" />
            <div className="t2-sec-text">
              <p>Discover doors conceived for those who value distinction, precision, and enduring design. Crafted with meticulous attention to detail, each luxury entrance door is thoughtfully engineered to balance strength, elegance, and performance.</p>
              <p>Rooted in modern design sensibilities, our designer doors are created using premium materials and advanced engineered wood solutions, ensuring stability, resilience, and timeless appeal.</p>
              <p>More than architectural products, our doors serve as defining statements—enhancing entrances with quiet luxury and purposeful design.</p>
            </div>
          </div>
          <div className="t2-media-wrap">
            <video controls poster="/images/door_grand_pivot_1776844794720.png" style={{ width: '100%' }}>
              <source src="/videos/demo.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* ── Luxe Details Header ── */}
      <section className="t2-details-header">
        <p className="t2-details-sup">The Finest in Every Detail</p>
        <h2 className="t2-details-title">THE LUXE DETAILS</h2>
      </section>

      {/* ── Luxe Details Grid ── */}
      <div className="t2-details-grid">
        <div className="t2-dgrid-col">
          <h3 className="t2-dgrid-heading">Begin Your Luxe-Verve Luxury Door Experience</h3>
          <div className="t2-dgrid-line" />
          <p className="t2-dgrid-text">We invite you to experience refined craftsmanship and personalized design guidance. Our team is dedicated to understanding your vision and delivering bespoke luxury door solutions that reflect elegance, architectural precision, and enduring quality.</p>
          <ul className="t2-contact-list">
            <li><span>📍</span><span>Block A, 22 Sector-9 Noida, Uttar Pradesh.</span></li>
            <li><span>📞</span><span>+91-98714 71161</span></li>
            <li><span>✉️</span><span>info@luxe-verve.com</span></li>
          </ul>
        </div>
        <div className="t2-dgrid-col">
          <h3 className="t2-dgrid-heading">A Legacy of Luxury Door Craftsmanship</h3>
          <div className="t2-dgrid-line" />
          <p className="t2-dgrid-text">Backed by years of industry expertise, Luxe-Verve blends advanced engineering with timeless design principles. Every luxury door reflects our commitment to premium materials, meticulous detailing, and uncompromising quality standards.</p>
        </div>
        <div className="t2-dgrid-col">
          <h3 className="t2-dgrid-heading">Architectural Intelligence in Luxury Door Design</h3>
          <div className="t2-dgrid-line" />
          <p className="t2-dgrid-text">Our expertise is shaped by continuous innovation, refined processes, and a deep understanding of architectural design—ensuring our luxury doors perform flawlessly while elevating the character of every space they define.</p>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="t2-footer">
        <div className="t2-footer-hero">
          <p className="t2-footer-label">Crafted for Those Who Demand Excellence</p>
          <h2 className="t2-footer-wordmark">LUXE VERVE</h2>
          <p className="t2-footer-sub">Luxury Architectural Doors · Est. in Excellence</p>
        </div>
        <div className="t2-footer-grid">
          <div>
            <p className="t2-fcol-head">Luxe Verve</p>
            <p className="t2-fcol-desc">We design exclusive luxury architect doors that move beyond conventional solutions — every piece is a bespoke architectural statement.</p>
            <div className="t2-fsocials">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="t2-fsocial" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>
              </a>
              <a href="https://wa.me/919871471161" target="_blank" rel="noopener noreferrer" className="t2-fsocial" aria-label="WhatsApp">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.57-.01-.57-.01-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
              </a>
            </div>
          </div>
          <div>
            <p className="t2-fcol-head">Explore</p>
            <ul className="t2-flinks">
              {NAV.map(l => <li key={l.href}><Link href={l.href}><span className="arr">→</span>{l.label}</Link></li>)}
            </ul>
          </div>
          <div>
            <p className="t2-fcol-head">Services</p>
            <ul className="t2-flinks">
              {['Luxury Entrance Doors','Pivot Door Systems','Custom Wood Panels','Commercial Projects','Design Consultation'].map(s => (
                <li key={s}><span><span className="arr">→</span>{s}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="t2-fcol-head">Contact</p>
            <ul className="t2-fcontact-list">
              <li className="t2-fcontact-item">
                <span className="t2-fcontact-icon">📍</span>
                <div><span className="t2-fcontact-label">Showroom</span><span className="t2-fcontact-val">Block A, 22 Sector-9<br/>Noida, Uttar Pradesh</span></div>
              </li>
              <li className="t2-fcontact-item">
                <span className="t2-fcontact-icon">📞</span>
                <div><span className="t2-fcontact-label">Phone</span><span className="t2-fcontact-val"><a href="tel:+919871471161">+91 98714 71161</a></span></div>
              </li>
              <li className="t2-fcontact-item">
                <span className="t2-fcontact-icon">✉️</span>
                <div><span className="t2-fcontact-label">Email</span><span className="t2-fcontact-val"><a href="mailto:info@luxe-verve.com">info@luxe-verve.com</a></span></div>
              </li>
            </ul>
          </div>
        </div>
        <div className="t2-footer-bottom" style={{ borderTop: '1px solid rgba(0,0,0,0.05)', padding: '24px 52px', display: 'flex', justifyContent: 'space-between', maxWidth: '1440px', margin: '0 auto' }}>
          <p className="t2-fcopy">© {new Date().getFullYear()} Luxe Verve. All rights reserved.</p>
          <p className="t2-fcopy">Premium Quality · Custom Crafted · Architectural Excellence</p>
        </div>
      </footer>
    </div>
  );
}
