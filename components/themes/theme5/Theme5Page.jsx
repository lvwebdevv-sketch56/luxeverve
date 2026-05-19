'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './theme5.css';

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

export default function Theme5Page() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <div className="t5">
      {/* ── Navbar ── */}
      <nav className={`t5-nav${scrolled ? ' scrolled' : ''}`}>
        <Link href="/" className="t5-logo">
          <Image src="/images/logo.png" alt="Luxe Verve" width={64} height={50} />
        </Link>
        <ul className="t5-nav-links">
          {NAV.map(l => (
            <li key={l.href}><Link href={l.href} className="t5-nl">{l.label}</Link></li>
          ))}
        </ul>
        <div className="t5-switcher">
          {PILLS.map(p => (
            <Link key={p.n} href={p.href} className={`t5-pill${p.n === 5 ? ' cur' : ''}`}>{p.n}</Link>
          ))}
        </div>
        <button className={`t5-hbg${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`t5-mob${menuOpen ? ' open' : ''}`}>
        <button className="t5-mob-close" onClick={() => setMenuOpen(false)}>✕</button>
        {NAV.map(l => (
          <Link key={l.href} href={l.href} className="t5-mob-link" onClick={() => setMenuOpen(false)}>{l.label}</Link>
        ))}
      </div>

      {/* ── Hero ── */}
      <section className="t5-hero" style={{ paddingTop: 'calc(var(--nav-h) + 40px)' }}>
        <div className="t5-hero-bg" />
        <div className="t5-hero-particles" />
        <div className="t5-hero-lines" />
        <div className="t5-hero-content">
          <div className="t5-hero-left">
            <p className="t5-hero-eyebrow">Crafted for Those Who Demand Excellence</p>
            <h1 className="t5-hero-title">LUXE VERVE</h1>
            <div className="t5-hero-line" />
            <p className="t5-hero-sub">Luxury architectural doors where precision engineering meets timeless design. Each entrance a statement of refined power and understated prestige.</p>
            <Link href="/collection" className="t5-hero-cta"><span>Explore Collection</span></Link>
          </div>
          <div className="t5-hero-right">
            <div className="t5-hero-door-stack">
              <img src="/images/luxury_doors_full_page_1776845254783.png" alt="Luxury Door" />
              <span className="t5-hero-door-stack-caption">Signature Collection</span>
            </div>
            <div className="t5-hero-door-row">
              <img src="/images/door_sculpted_wood_1776844667211.png" alt="Sculpted Wood" />
              <img src="/images/door_minimal_metal_1776844703459.png" alt="Minimal Metal" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 1 ── */}
      <section className="t5-section">
        <div className="t5-section-inner">
          <div>
            <p className="t5-sec-eyebrow">Craftsmanship & Innovation</p>
            <h2 className="t5-sec-heading">An Expression of Luxury Door Design, Quality, and Craftsmanship</h2>
            <div className="t5-plat-line" />
            <div className="t5-sec-text">
              <p>Our presence at a leading industry event reflects a convergence of craftsmanship, innovation, and modern design. Engaging with architects, designers, and industry experts, we explored contemporary design trends, premium materials, and refined finishes.</p>
              <p>Our participation in curated trade shows reflects our commitment to engineered wood solutions, durable materials, and precision craftsmanship for both residential and commercial spaces.</p>
              <p>Through meaningful industry engagement, we continue to refine our vision and deliver timeless, performance-driven solutions shaped by quality, innovation, and design excellence.</p>
            </div>
            <Link href="/about" className="t5-sec-link">Know More About Premium Craftsmanship</Link>
          </div>
          <div className="t5-media-navy">
            <video controls poster="/images/luxury_doors_landing_page_scrolled_1776845139099.png" style={{ width: '100%' }}>
              <source src="/videos/demo.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* ── Section 2 ── */}
      <section className="t5-section alt">
        <div className="t5-section-inner rev">
          <div className="t5-media-navy">
            <img src="/images/luxury_storefront_1776848163085.png" alt="Luxe Verve Storefront" />
          </div>
          <div>
            <p className="t5-sec-eyebrow">Our Philosophy</p>
            <h2 className="t5-sec-heading">Personal Note</h2>
            <div className="t5-plat-line" />
            <div className="t5-sec-text">
              <p>At Luxe-Verve, we design exclusive luxury architect doors that move beyond conventional solutions. Each door is conceived with a distinct design philosophy, using carefully selected premium materials.</p>
              <p>Every Luxe-Verve door is custom-crafted to deliver modern aesthetics, architectural precision, and refined luxury for high-end residences and premium spaces.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3 ── */}
      <section className="t5-section">
        <div className="t5-section-inner">
          <div>
            <p className="t5-sec-eyebrow">Design Excellence</p>
            <h2 className="t5-sec-heading">The Art of Luxury Entrance Doors</h2>
            <div className="t5-plat-line" />
            <div className="t5-sec-text">
              <p>Discover doors conceived for those who value distinction, precision, and enduring design. Each luxury entrance door is thoughtfully engineered to balance strength, elegance, and performance.</p>
              <p>Rooted in modern design sensibilities, our designer doors are created using premium materials ensuring stability, resilience, and timeless appeal.</p>
              <p>More than architectural products, our doors serve as defining statements—enhancing entrances with quiet luxury and purposeful design.</p>
            </div>
          </div>
          <div className="t5-media-navy">
            <video controls poster="/images/door_grand_pivot_1776844794720.png" style={{ width: '100%' }}>
              <source src="/videos/demo.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* ── Luxe Details ── */}
      <section className="t5-details-header">
        <p className="t5-details-sup">The Finest in Every Detail</p>
        <h2 className="t5-details-title">THE LUXE DETAILS</h2>
      </section>
      <div className="t5-details-grid">
        <div className="t5-dgrid-col">
          <h3 className="t5-dgrid-heading">Begin Your Luxe-Verve Experience</h3>
          <div className="t5-plat-rule" />
          <p className="t5-dgrid-text">We invite you to experience refined craftsmanship and personalized design guidance. Our team is dedicated to delivering bespoke luxury door solutions that reflect elegance, architectural precision, and enduring quality.</p>
          <ul className="t5-contact-list">
            <li><span>📍</span><span>Block A, 22 Sector-9 Noida, Uttar Pradesh.</span></li>
            <li><span>📞</span><span>+91-98714 71161</span></li>
            <li><span>✉️</span><span>info@luxe-verve.com</span></li>
          </ul>
        </div>
        <div className="t5-dgrid-col">
          <h3 className="t5-dgrid-heading">A Legacy of Luxury Door Craftsmanship</h3>
          <div className="t5-plat-rule" />
          <p className="t5-dgrid-text">Backed by years of industry expertise, Luxe-Verve blends advanced engineering with timeless design principles. Every luxury door reflects our commitment to premium materials and uncompromising quality standards.</p>
        </div>
        <div className="t5-dgrid-col">
          <h3 className="t5-dgrid-heading">Architectural Intelligence in Luxury Design</h3>
          <div className="t5-plat-rule" />
          <p className="t5-dgrid-text">Our expertise is shaped by continuous innovation, refined processes, and a deep understanding of architectural design—ensuring our luxury doors elevate the character of every space they define.</p>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="t5-footer">
        <div className="t5-footer-hero">
          <p className="t5-footer-label">Crafted for Those Who Demand Excellence</p>
          <h2 className="t5-footer-wordmark">LUXE VERVE</h2>
          <p className="t5-footer-sub">Luxury Architectural Doors · Est. in Excellence</p>
        </div>
        <div className="t5-footer-grid">
          <div>
            <p className="t5-fcol-head">Luxe Verve</p>
            <p className="t5-fcol-desc">We design exclusive luxury architect doors that move beyond conventional solutions — every piece is a bespoke architectural statement.</p>
            <div className="t5-fsocials">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="t5-fsocial" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>
              </a>
              <a href="https://wa.me/919871471161" target="_blank" rel="noopener noreferrer" className="t5-fsocial" aria-label="WhatsApp">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.57-.01-.57-.01-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
              </a>
            </div>
          </div>
          <div>
            <p className="t5-fcol-head">Explore</p>
            <ul className="t5-flinks">
              {NAV.map(l => <li key={l.href}><Link href={l.href}><span className="t5-arr">→</span>{l.label}</Link></li>)}
            </ul>
          </div>
          <div>
            <p className="t5-fcol-head">Services</p>
            <ul className="t5-flinks">
              {['Luxury Entrance Doors','Pivot Door Systems','Custom Wood Panels','Commercial Projects','Design Consultation'].map(s => (
                <li key={s}><span><span className="t5-arr">→</span>{s}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="t5-fcol-head">Contact</p>
            <ul className="t5-fcontact-list">
              <li className="t5-fcontact-item"><div><span className="t5-fcontact-label">Showroom</span><span className="t5-fcontact-val">Block A, 22 Sector-9<br/>Noida, Uttar Pradesh</span></div></li>
              <li className="t5-fcontact-item"><div><span className="t5-fcontact-label">Phone</span><span className="t5-fcontact-val"><a href="tel:+919871471161">+91 98714 71161</a></span></div></li>
              <li className="t5-fcontact-item"><div><span className="t5-fcontact-label">Email</span><span className="t5-fcontact-val"><a href="mailto:info@luxe-verve.com">info@luxe-verve.com</a></span></div></li>
            </ul>
          </div>
        </div>
        <div className="t5-footer-bottom">
          <p className="t5-fcopy">© {new Date().getFullYear()} Luxe Verve. All rights reserved.</p>
          <p className="t5-fcopy">Premium Quality · Custom Crafted · Architectural Excellence</p>
        </div>
      </footer>
    </div>
  );
}
