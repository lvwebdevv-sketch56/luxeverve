'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './theme4.css';

const NAV = [
  { href: '/home', label: 'Home' },
  { href: '/collection', label: 'Shop' },
  { href: '/about', label: 'About us' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact us' },
];
const PILLS = [
  { n: 1, href: '/home1' },
  { n: 2, href: '/home2' },
  { n: 3, href: '/home3' },
  { n: 4, href: '/home4' },
  { n: 5, href: '/home5' },
  { n: 6, href: '/home6' },
];

export default function Theme4Page() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <div className="t4">
      {/* ── Navbar ── */}
      <nav className={`t4-nav${scrolled ? ' scrolled' : ''}`}>
        <Link href="/" className="t4-logo">
          <Image src="/images/logo.png" alt="Luxe Verve" width={64} height={50} />
        </Link>
        <ul className="t4-nav-links">
          {NAV.map(l => (
            <li key={l.href}>
              <Link href={l.href} className="t4-nl">{l.label}</Link>
            </li>
          ))}
        </ul>
        <div className="t4-switcher">
          {PILLS.map(p => (
            <Link key={p.n} href={p.href} className={`t4-pill${p.n === 4 ? ' cur' : ''}`}>{p.n}</Link>
          ))}
        </div>
        <button className={`t4-hbg${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`t4-mob${menuOpen ? ' open' : ''}`}>
        <button className="t4-mob-close" onClick={() => setMenuOpen(false)}>✕</button>
        {NAV.map(l => (
          <Link key={l.href} href={l.href} className="t4-mob-link" onClick={() => setMenuOpen(false)}>{l.label}</Link>
        ))}
      </div>

      {/* ── Hero ── */}
      <section className="t4-hero">
        <div className="t4-hero-inner">
          <div className="t4-hero-content">
            <h1 className="t4-hero-title">Modern Architectural Doors</h1>
            <p className="t4-hero-sub">
              Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique.
            </p>
            <div className="t4-hero-buttons">
              <Link href="/collection" className="t4-btn-primary">Shop Now</Link>
              <Link href="/about" className="t4-btn-outline">Explore</Link>
            </div>
          </div>
          <div className="t4-hero-image">
            {/* Using a modern door image instead of couch */}
            <img src="/images/door_grand_pivot_1776844794720.png" alt="Modern Door" />
          </div>
        </div>
      </section>

      {/* ── Cards Section ── */}
      <section className="t4-cards-section">
        <div className="t4-cards-grid">
          <div className="t4-cards-intro">
            <h2>Crafted with excellent material.</h2>
            <p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique.</p>
            <Link href="/collection" className="t4-btn-primary">Explore</Link>
          </div>
          
          <div className="t4-product-list">
            <Link href="/collection" className="t4-product-card">
              <img src="/images/door_sculpted_wood_1776844667211.png" alt="Nordic Door" />
              <h3 className="t4-product-title">Nordic Door</h3>
              <p className="t4-product-price">$500.00</p>
            </Link>
            <Link href="/collection" className="t4-product-card">
              <img src="/images/door_minimal_metal_1776844703459.png" alt="Aero Door" />
              <h3 className="t4-product-title">Kruzo Aero Door</h3>
              <p className="t4-product-price">$780.00</p>
            </Link>
            <Link href="/collection" className="t4-product-card">
              <img src="/images/luxury_doors_landing_page_scrolled_1776845139099.png" alt="Ergonomic Door" />
              <h3 className="t4-product-title">Ergonomic Pivot</h3>
              <p className="t4-product-price">$430.00</p>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="t4-why-section">
        <div className="t4-why-content">
          <h2>Why Choose Us</h2>
          <p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique.</p>
          
          <div className="t4-why-grid">
            <div className="t4-why-item">
              <div className="t4-why-icon">
                {/* SVG Icon Truck */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2f2f2f" strokeWidth="2"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
              </div>
              <h3>Fast & Free Shipping</h3>
              <p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.</p>
            </div>
            <div className="t4-why-item">
              <div className="t4-why-icon">
                {/* SVG Icon Bag */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2f2f2f" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
              </div>
              <h3>Easy to Shop</h3>
              <p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.</p>
            </div>
            <div className="t4-why-item">
              <div className="t4-why-icon">
                {/* SVG Icon Support */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2f2f2f" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
              </div>
              <h3>24/7 Support</h3>
              <p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.</p>
            </div>
            <div className="t4-why-item">
              <div className="t4-why-icon">
                {/* SVG Icon Return */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2f2f2f" strokeWidth="2"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
              </div>
              <h3>Hassle Free Returns</h3>
              <p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.</p>
            </div>
          </div>
        </div>
        <div className="t4-why-img">
          <img src="/images/luxury_doors_full_page_1776845254783.png" alt="Why Choose Us" />
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="t4-footer">
        <div className="t4-footer-inner">
          <div className="t4-footer-top">
            <div className="t4-footer-newsletter">
              <h3>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                Subscribe to Newsletter
              </h3>
              <div className="t4-footer-form">
                <input type="email" placeholder="Enter your email" />
                <button type="button">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </button>
              </div>
            </div>
          </div>
          
          <div className="t4-footer-grid">
            <div className="t4-fcol-brand">
              <h2 className="t4-logo" style={{ color: '#3b5d50' }}>Luxe Verve<span style={{ color: '#f9bf29' }}>.</span></h2>
              <p>Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. Pellentesque habitant.</p>
              <div className="t4-fsocials">
                <a href="#"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
                <a href="#"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
                <a href="#"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg></a>
                <a href="#"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
              </div>
            </div>
            
            <div>
              <ul className="t4-flinks">
                <li><a href="#">About us</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Contact us</a></li>
              </ul>
            </div>
            <div>
              <ul className="t4-flinks">
                <li><a href="#">Support</a></li>
                <li><a href="#">Knowledge base</a></li>
                <li><a href="#">Live chat</a></li>
              </ul>
            </div>
            <div>
              <ul className="t4-flinks">
                <li><a href="#">Jobs</a></li>
                <li><a href="#">Our team</a></li>
                <li><a href="#">Leadership</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <ul className="t4-flinks">
                <li><a href="#">Nordic Door</a></li>
                <li><a href="#">Kruzo Aero</a></li>
                <li><a href="#">Ergonomic</a></li>
              </ul>
            </div>
          </div>
          
          <div className="t4-footer-bottom">
            <p className="t4-fcopy">Copyright © {new Date().getFullYear()}. All Rights Reserved. — Designed with love by <a href="https://untree.co" target="_blank" rel="noopener noreferrer">Untree.co</a></p>
            <div>
              <ul className="t4-flinks" style={{ display: 'flex', gap: '20px' }}>
                <li><a href="#">Terms & Conditions</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
