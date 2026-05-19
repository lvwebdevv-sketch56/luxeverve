'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import './Navbar.css';

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const CollectionIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="7" height="7" x="3" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="14" rx="1"></rect><rect width="7" height="7" x="3" y="14" rx="1"></rect>
  </svg>
);

const AboutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path>
  </svg>
);

const ContactIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const BlogIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
);

const navLinks = [
  { href: '/home', label: 'Home', icon: <HomeIcon /> },
  { href: '/collection', label: 'Collection', icon: <CollectionIcon /> },
  { href: '/about', label: 'About', icon: <AboutIcon /> },
  { href: '/contact', label: 'Contact', icon: <ContactIcon /> },
  { href: '/blog', label: 'Blog', icon: <BlogIcon /> },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
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
                  if (typeof window !== 'undefined' && window.playPageFlipSound) {
                    window.playPageFlipSound();
                  }
                  window.dispatchEvent(new CustomEvent('custom-nav', { detail: { route: link.href, soundPlayed: true } }));
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
        <div className="mobile-brand-name">Luxe Verve</div>
      </div>

      </nav>

      {/* ── Mobile Bottom Navigation ── */}
      <div className="mobile-bottom-nav">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`mobile-bottom-link no-click-sound ${pathname === link.href ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              if (typeof window !== 'undefined' && window.playPageFlipSound) {
                window.playPageFlipSound();
              }
              window.dispatchEvent(new CustomEvent('custom-nav', { detail: { route: link.href, soundPlayed: true } }));
            }}
          >
            <span className="mobile-bottom-icon">{link.icon}</span>
            <span className="mobile-bottom-label">{link.label}</span>
          </a>
        ))}
      </div>
    </>
  );
};

export default Navbar;
