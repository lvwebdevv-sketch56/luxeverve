'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import './Navbar.css';

const CrossIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

/* SVG lines morph ☰ → ✕ via CSS — no content swap */
const HamburgerIcon = ({ open }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`hamburger-icon ${open ? 'open' : ''}`}
  >
    {/* Top bar — rotates to \ */}
    <line className="bar bar-top" x1="3" y1="6" x2="21" y2="6" />
    {/* Middle bar — fades out */}
    <line className="bar bar-mid" x1="3" y1="12" x2="21" y2="12" />
    {/* Bottom bar — rotates to / */}
    <line className="bar bar-bot" x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const navLinks = [
  { href: '/home', label: 'Home' },
  { href: '/collection', label: 'Collection' },
  { href: '/catalogue', label: 'Catalogue' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact Us' },
  { href: '/blog', label: 'Blog' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      {/* ── Desktop Layout ── */}
      <div className="nav-area nav-left">
        <Link href="/" className="nav-logo" aria-label="Luxe Verve Home">
          <img src="/images/logo.png" alt="Luxe Verve Logo" className="navbar-logo-img" />
        </Link>
      </div>

      <div className="nav-area nav-right">
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a 
                href={link.href} 
                className={`nav-link no-click-sound ${pathname === link.href ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent('custom-nav', { detail: link.href }));
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Mobile Layout ── */}
      <div className="mobile-bar">
        <Link href="/" className="nav-logo mobile-logo" aria-label="Luxe Verve Home">
          <img src="/images/logo.png" alt="Luxe Verve Logo" className="navbar-logo-img" />
        </Link>
        <button
          className="hamburger-btn no-click-sound"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <HamburgerIcon open={menuOpen} />
        </button>
      </div>

      {/* ── Mobile Dropdown Menu ── */}
      <div className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}>
        <button
          className="close-menu-btn no-click-sound"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          <CrossIcon />
        </button>
        <ul className="mobile-nav-links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`mobile-nav-link no-click-sound ${pathname === link.href ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(false);
                  window.dispatchEvent(new CustomEvent('custom-nav', { detail: link.href }));
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
