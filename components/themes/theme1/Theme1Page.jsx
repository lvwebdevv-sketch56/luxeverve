'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './theme1.css';

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

export default function Theme1Page() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <div className="t1">
      {/* ── Navbar ── */}
      <nav className={`t1-nav${scrolled ? ' scrolled' : ''}`}>
        <Link href="/" className="t1-logo">
          <Image src="/images/logo.png" alt="Luxe Verve" width={64} height={50} />
        </Link>
        <ul className="t1-nav-links">
          {NAV.map(l => (
            <li key={l.href}>
              <Link href={l.href} className="t1-nl">{l.label}</Link>
            </li>
          ))}
        </ul>
        <div className="t1-switcher">
          {PILLS.map(p => (
            <Link key={p.n} href={p.href} className={`t1-pill${p.n === 1 ? ' cur' : ''}`}>{p.n}</Link>
          ))}
        </div>
        <button className={`t1-hbg${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`t1-mob${menuOpen ? ' open' : ''}`}>
        <button className="t1-mob-close" onClick={() => setMenuOpen(false)}>✕</button>
        {NAV.map(l => (
          <Link key={l.href} href={l.href} className="t1-mob-link" onClick={() => setMenuOpen(false)}>{l.label}</Link>
        ))}
      </div>

      {/* ── Hero ── */}
      <section className="t1-hero">
        <video className="t1-hero-video" autoPlay muted loop playsInline
          poster="/images/luxury_doors_full_page_1776845254783.png">
          <source src="/videos/demo.mp4" type="video/mp4" />
        </video>
        <div className="t1-hero-overlay" />
        <div className="t1-hero-content">
          <p className="t1-hero-eyebrow">Crafted for Those Who Demand Excellence</p>
          <h1 className="t1-hero-title">LUXE VERVE</h1>
          <div className="t1-hero-line" />
          <p className="t1-hero-sub">Luxury Architectural Doors · Beyond the Threshold</p>
          <Link href="/collection" className="t1-hero-cta"><span>Explore Collection</span></Link>
        </div>
      </section>

      {/* ── Door Cards ── */}
      <section className="t1-cards-section">
        <div className="t1-cards-grid">
          {[
            { img: '/images/door_sculpted_wood_1776844667211.png', label: 'Collection I', title: 'Sculpted Wood' },
            { img: '/images/door_minimal_metal_1776844703459.png', label: 'Collection II', title: 'Minimal Metal' },
            { img: '/images/door_grand_pivot_1776844794720.png',   label: 'Collection III', title: 'Grand Pivot' },
          ].map((c, i) => (
            <div className="t1-card" key={i}>
              <img src={c.img} alt={c.title} />
              <div className="t1-card-overlay">
                <span className="t1-card-label">{c.label}</span>
                <h3 className="t1-card-title">{c.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 1: Text + Video ── */}
      <section className="t1-section">
        <div className="t1-section-inner">
          <div>
            <p className="t1-sec-eyebrow">Craftsmanship & Innovation</p>
            <h2 className="t1-sec-heading">An Expression of Luxury Door Design, Quality, and Craftsmanship</h2>
            <div className="t1-sec-line" />
            <div className="t1-sec-text">
              <p>Our presence at a leading industry event reflects a convergence of craftsmanship, innovation, and modern design. Engaging with architects, designers, and industry experts, we explored contemporary design trends, premium materials, and refined finishes that define high-quality architectural solutions.</p>
              <p>Our participation in curated trade shows and design exhibitions reflects our commitment to engineered wood solutions, durable materials, and precision craftsmanship for both residential and commercial spaces.</p>
              <p>Through meaningful industry engagement, we continue to refine our vision and deliver timeless, performance-driven solutions shaped by quality, innovation, and design excellence.</p>
            </div>
            <Link href="/about" className="t1-sec-link">Know More About Premium Craftsmanship</Link>
          </div>
          <div className="t1-media-wrap">
            <video controls poster="/images/luxury_doors_landing_page_scrolled_1776845139099.png" style={{ width: '100%' }}>
              <source src="/videos/demo.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* ── Section 2: Image + Text ── */}
      <section className="t1-section alt">
        <div className="t1-section-inner rev">
          <div className="t1-media-wrap">
            <img src="/images/luxury_storefront_1776848163085.png" alt="Luxe Verve Storefront" />
          </div>
          <div>
            <p className="t1-sec-eyebrow">Our Philosophy</p>
            <h2 className="t1-sec-heading">Personal Note</h2>
            <div className="t1-sec-line" />
            <div className="t1-sec-text">
              <p>At Luxe-Verve, we design exclusive luxury architect doors that move beyond conventional or standard door solutions. Each door is conceived with a distinct design philosophy, using carefully selected premium materials that set our work apart from ordinary wooden or mass-produced doors.</p>
              <p>Every Luxe-Verve door is custom-crafted to deliver modern aesthetics, architectural precision, and refined luxury. Designed for high-end residences and premium spaces, our doors ensure your entrance stands apart with a bold, sophisticated identity.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: Text + Video ── */}
      <section className="t1-section">
        <div className="t1-section-inner">
          <div>
            <p className="t1-sec-eyebrow">Design Excellence</p>
            <h2 className="t1-sec-heading">The Art of Luxury Entrance Doors</h2>
            <div className="t1-sec-line" />
            <div className="t1-sec-text">
              <p>Discover doors conceived for those who value distinction, precision, and enduring design. Crafted with meticulous attention to detail, each luxury entrance door is thoughtfully engineered to balance strength, elegance, and performance.</p>
              <p>Rooted in modern design sensibilities, our designer doors are created using premium materials and advanced engineered wood solutions, ensuring stability, resilience, and timeless appeal.</p>
              <p>More than architectural products, our doors serve as defining statements—enhancing entrances with quiet luxury and purposeful design.</p>
            </div>
          </div>
          <div className="t1-media-wrap">
            <video controls poster="/images/door_grand_pivot_1776844794720.png" style={{ width: '100%' }}>
              <source src="/videos/demo.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* ── Luxe Details Header ── */}
      <section className="t1-details-header">
        <p className="t1-details-sup">The Finest in Every Detail</p>
        <h2 className="t1-details-title">THE LUXE DETAILS</h2>
      </section>

      {/* ── Luxe Details Grid ── */}
      <div className="t1-details-grid">
        <div className="t1-dgrid-col">
          <h3 className="t1-dgrid-heading">Begin Your Luxe-Verve Luxury Door Experience</h3>
          <div className="t1-dgrid-line" />
          <p className="t1-dgrid-text">We invite you to experience refined craftsmanship and personalized design guidance. Our team is dedicated to understanding your vision and delivering bespoke luxury door solutions that reflect elegance, architectural precision, and enduring quality.</p>
          <ul className="t1-contact-list">
            <li><span>📍</span><span>Block A, 22 Sector-9 Noida, Uttar Pradesh.</span></li>
            <li><span>📞</span><span>+91-98714 71161</span></li>
            <li><span>✉️</span><span>info@luxe-verve.com</span></li>
          </ul>
        </div>
        <div className="t1-dgrid-col">
          <h3 className="t1-dgrid-heading">A Legacy of Luxury Door Craftsmanship</h3>
          <div className="t1-dgrid-line" />
          <p className="t1-dgrid-text">Backed by years of industry expertise, Luxe-Verve blends advanced engineering with timeless design principles. Every luxury door reflects our commitment to premium materials, meticulous detailing, and uncompromising quality standards.</p>
        </div>
        <div className="t1-dgrid-col">
          <h3 className="t1-dgrid-heading">Architectural Intelligence in Luxury Door Design</h3>
          <div className="t1-dgrid-line" />
          <p className="t1-dgrid-text">Our expertise is shaped by continuous innovation, refined processes, and a deep understanding of architectural design—ensuring our luxury doors perform flawlessly while elevating the character of every space they define.</p>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="t1-footer">
        <div className="t1-footer-hero">
          <p className="t1-footer-label">Crafted for Those Who Demand Excellence</p>
          <h2 className="t1-footer-wordmark">LUXE VERVE</h2>
          <p className="t1-footer-sub">Luxury Architectural Doors · Est. in Excellence</p>
        </div>
        <div className="t1-footer-grid">
          <div>
            <p className="t1-fcol-head">Luxe Verve</p>
            <p className="t1-fcol-desc">We design exclusive luxury architect doors that move beyond conventional solutions — every piece is a bespoke architectural statement.</p>
            <div className="t1-fsocials">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="t1-fsocial" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>
              </a>
              <a href="https://pin.it/5esGKiEm3" target="_blank" rel="noopener noreferrer" className="t1-fsocial" aria-label="Pinterest">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61586562659611#" target="_blank" rel="noopener noreferrer" className="t1-fsocial" aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
              </a>
              <a href="https://g.page/r/CaNjSoPDd436EBM/review" target="_blank" rel="noopener noreferrer" className="t1-fsocial" aria-label="YouTube">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>
          <div>
            <p className="t1-fcol-head">Explore</p>
            <ul className="t1-flinks">
              {NAV.map(l => <li key={l.href}><Link href={l.href}><span className="arr">→</span>{l.label}</Link></li>)}
            </ul>
          </div>
          <div>
            <p className="t1-fcol-head">Services</p>
            <ul className="t1-flinks">
              {['Luxury Entrance Doors','Pivot Door Systems','Custom Wood Panels','Commercial Projects','Design Consultation'].map(s => (
                <li key={s}><span><span className="arr">→</span>{s}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="t1-fcol-head">Get In Touch</p>
            <ul className="t1-fcontact-list">
              <li className="t1-fcontact-item">
                <span className="t1-fcontact-icon">📍</span>
                <div><span className="t1-fcontact-label">Showroom</span><span className="t1-fcontact-val">Block A, 22 Sector-9<br/>Noida, Uttar Pradesh</span></div>
              </li>
              <li className="t1-fcontact-item">
                <span className="t1-fcontact-icon">📞</span>
                <div><span className="t1-fcontact-label">Phone</span><span className="t1-fcontact-val"><a href="tel:+919871471161">+91 98714 71161</a></span></div>
              </li>
              <li className="t1-fcontact-item">
                <span className="t1-fcontact-icon">✉️</span>
                <div><span className="t1-fcontact-label">Email</span><span className="t1-fcontact-val"><a href="mailto:info@luxe-verve.com">info@luxe-verve.com</a></span></div>
              </li>
            </ul>
          </div>
        </div>
        <div className="t1-footer-bottom" style={{ borderTop: '1px solid rgba(201,168,76,0.08)', padding: '24px 52px', display: 'flex', justifyContent: 'space-between', maxWidth: '1440px', margin: '0 auto' }}>
          <p className="t1-fcopy">© {new Date().getFullYear()} Luxe Verve. All rights reserved.</p>
          <p className="t1-fcopy">Premium Quality · Custom Crafted · Architectural Excellence</p>
        </div>
      </footer>
    </div>
  );
}
