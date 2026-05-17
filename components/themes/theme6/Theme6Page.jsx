'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './theme6.css';

const NAV = [
  { href: '/home', label: 'Home' },
  { href: '/collection', label: 'Collection' },
  { href: '/catalogue', label: 'Catalogue' },
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

export default function Theme6Page() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <div className="t6">
      {/* ── Navbar ── */}
      <nav className={`t6-nav${scrolled ? ' scrolled' : ''}`}>
        <Link href="/" className="t6-logo">
          <Image src="/images/logo.png" alt="Luxe Verve" width={64} height={50} style={{ filter: 'brightness(0.3) sepia(1) hue-rotate(-20deg) saturate(2)' }}/>
        </Link>
        <ul className="t6-nav-links">
          {NAV.map(l => (
            <li key={l.href}>
              <Link href={l.href} className="t6-nl">{l.label}</Link>
            </li>
          ))}
        </ul>
        <div className="t6-switcher">
          {PILLS.map(p => (
            <Link key={p.n} href={p.href} className={`t6-pill${p.n === 6 ? ' cur' : ''}`}>{p.n}</Link>
          ))}
        </div>
        <button className={`t6-hbg${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`t6-mob${menuOpen ? ' open' : ''}`}>
        <button className="t6-mob-close" onClick={() => setMenuOpen(false)}>✕</button>
        {NAV.map(l => (
          <Link key={l.href} href={l.href} className="t6-mob-link" onClick={() => setMenuOpen(false)}>{l.label}</Link>
        ))}
      </div>

      {/* ── Hero ── */}
      <section className="t6-hero">
        <img className="t6-hero-img" src="/images/luxury_doors_full_page_1776845254783.png" alt="Hero Background" />
        <div className="t6-hero-inner">
          <p className="t6-hero-eyebrow">Crafted for Excellence</p>
          <h1 className="t6-hero-title">Warm Ivory Luxury</h1>
          <p className="t6-hero-sub">
            At Luxe-Verve, we design exclusive luxury architect doors that move beyond conventional solutions. Each piece is custom-crafted to deliver modern aesthetics, architectural precision, and refined luxury.
          </p>
          <Link href="/collection" className="t6-btn-primary">Explore Collection</Link>
        </div>
      </section>

      {/* ── Door Cards ── */}
      <section className="t6-cards-section">
        <div className="t6-cards-grid">
          {[
            { img: '/images/door_sculpted_wood_1776844667211.png', label: 'Collection I', title: 'Sculpted Wood' },
            { img: '/images/door_minimal_metal_1776844703459.png', label: 'Collection II', title: 'Minimal Metal' },
            { img: '/images/door_grand_pivot_1776844794720.png',   label: 'Collection III', title: 'Grand Pivot' },
          ].map((c, i) => (
            <Link href="/catalogue" className="t6-card" key={i}>
              <img src={c.img} alt={c.title} className="t6-card-img" />
              <h3 className="t6-card-title">{c.title}</h3>
              <p className="t6-card-desc">Discover our {c.title.toLowerCase()} collection, designed with uncompromising precision and premium materials.</p>
              <span className="t6-card-link">View Details →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Section 1: Text + Image ── */}
      <section className="t6-section">
        <div className="t6-feature-card">
          <div className="t6-media">
            <img src="/images/luxury_storefront_1776848163085.png" alt="Storefront" />
          </div>
          <div>
            <p className="t6-sec-eyebrow">Architectural Intelligence</p>
            <h2 className="t6-sec-heading">Designed For Timeless Spaces</h2>
            <div className="t6-sec-text">
              <p>Every luxury door reflects our commitment to refined craftsmanship, premium materials, and contemporary architectural aesthetics. Our collections are built to elevate modern interiors and grand entrances.</p>
            </div>
            <Link href="/about" className="t6-btn-primary" style={{ marginTop: '20px' }}>Explore More</Link>
          </div>
        </div>
      </section>

      {/* ── Section 2: Image + Text ── */}
      <section className="t6-section">
        <div className="t6-feature-card rev">
          <div className="t6-media">
            <img src="/images/luxury_doors_landing_page_scrolled_1776845139099.png" alt="Luxe Verve Interior" />
          </div>
          <div>
            <p className="t6-sec-eyebrow">Our Philosophy</p>
            <h2 className="t6-sec-heading">Crafting Personal Statements</h2>
            <div className="t6-sec-text">
              <p>At Luxe-Verve, we design exclusive luxury architect doors that move beyond conventional or standard door solutions. Each door is conceived with a distinct design philosophy.</p>
              <p>Designed for high-end residences and premium spaces, setting your entrance apart.</p>
            </div>
            <Link href="/collection" className="t6-btn-primary" style={{ marginTop: '20px' }}>View Collection</Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="t6-footer">
        <div className="t6-footer-inner">
          <div className="t6-footer-top">
            <div className="t6-fcol-brand">
              <h2 className="t6-logo" style={{ color: '#E9D7C3' }}>Luxe Verve</h2>
              <p>We design exclusive luxury architect doors that move beyond conventional solutions — every piece is a bespoke architectural statement crafted for excellence.</p>
            </div>
            <div>
              <p className="t6-fcol-head">Explore</p>
              <ul className="t6-flinks">
                {NAV.map(l => <li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}
              </ul>
            </div>
            <div>
              <p className="t6-fcol-head">Services</p>
              <ul className="t6-flinks">
                {['Luxury Entrance Doors','Pivot Door Systems','Custom Wood Panels','Commercial Projects'].map(s => (
                  <li key={s}><a href="#">{s}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="t6-fcol-head">Contact Us</p>
              <ul className="t6-footer-contact" style={{ listStyle: 'none', padding: 0 }}>
                <li><span>📍</span> <span>Block A, 22 Sector-9<br/>Noida, Uttar Pradesh</span></li>
                <li><span>📞</span> <span>+91 98714 71161</span></li>
                <li><span>✉️</span> <span>info@luxe-verve.com</span></li>
              </ul>
            </div>
          </div>
          <div className="t6-footer-bottom">
            <p className="t6-fcopy">© {new Date().getFullYear()} Luxe Verve. All rights reserved.</p>
            <p className="t6-fcopy">Premium Quality · Custom Crafted · Architectural Excellence</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
