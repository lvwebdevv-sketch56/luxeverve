'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';
import { posts } from '@/lib/blogData';

export default function BlogContent({ postsData = [], banner = {}, categoriesItem = {}, newsletter = {} }) {
  const categoriesStr = categoriesItem.text || 'All, Design Trends, Materials, Craftsmanship, Interiors, Transparency, Industry';
  const categories = categoriesStr.split(',').map(s => s.trim()).filter(Boolean);
  
  // Set default first category (usually 'All')
  const defaultCategory = categories.length > 0 ? categories[0] : 'All';
  const [activeFilter, setActiveFilter] = useState(defaultCategory);
  const [visible, setVisible] = useState(true);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [emailError, setEmailError] = useState('');
  const gridRef = useRef(null);

  // Default to showing all if the filter is the first item (usually 'All')
  const isAllFilter = activeFilter === categories[0];
  const filteredPosts = isAllFilter ? postsData : postsData.filter(p => p.tag === activeFilter);
  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const gridPosts = filteredPosts.length > 1 ? filteredPosts.slice(1) : [];

  const handleFilterChange = (tag) => {
    if (tag === activeFilter) return;
    setVisible(false);
    setTimeout(() => {
      setActiveFilter(tag);
      setVisible(true);
    }, 300);
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');
    
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      
      if (res.ok) {
        setSubscribed(true);
        setEmail('');
      } else {
        let errorData = {};
        try {
          errorData = await res.json();
        } catch (e) {
          errorData = { error: 'Server error (HTML response)' };
        }
        setEmailError(errorData.error || 'Failed to subscribe. Please try again.');
      }
    } catch (e) {
      setEmailError('Network error. Please try again.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-dark-solid)', paddingTop: '0px', overflowX: 'hidden', width: '100%', maxWidth: '100%' }}>

      {/* ── Hero Header ── */}
      <section className="blog-hero-banner" style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url('${banner.url || '/images/door_grand_pivot_1776844794720.png'}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          filter: 'brightness(0.35)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(42, 22, 13,0.3) 0%, rgba(245,233,226,0.15) 100%)',
        }} />
        <div style={{
          position: 'relative', zIndex: 1,
          textAlign: 'center',
          padding: '0 20px',
        }}>
          <p style={{
            fontSize: '0.75rem', letterSpacing: '5px',
            color: '#d4af37', textTransform: 'uppercase',
            marginBottom: '18px', fontFamily: 'var(--font-sans)',
          }}>
            {banner.description || 'Insights & Stories'}
          </p>
          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(2.8rem, 6vw, 5rem)',
            fontWeight: 400, color: '#ffffff',
            letterSpacing: '2px', lineHeight: 1.1,
            marginBottom: '20px',
            wordWrap: 'break-word', overflowWrap: 'break-word', maxWidth: '100%'
          }}>
            {banner.title ? (
              <span dangerouslySetInnerHTML={{ __html: banner.title.replace('Blog', '<em style="color: #d4af37; font-style: italic;">Blog</em>') }} />
            ) : (
              <>The&nbsp;<em style={{ color: '#d4af37', fontStyle: 'italic' }}>Blog</em></>
            )}
          </h1>
          <div style={{ width: '60px', height: '2px', background: 'var(--primary-color)', margin: '0 auto 20px' }} />
          <p style={{
            color: 'rgba(255,255,255,0.7)', fontSize: '1rem',
            maxWidth: '500px', lineHeight: 1.7,
            fontFamily: 'var(--font-sans)', fontWeight: 300,
          }}>
            {banner.text || 'Explore the world of luxury architectural design, material innovation, and bespoke craftsmanship.'}
          </p>
        </div>
      </section>

      {/* ── Filter Bar ── */}
      <section style={{
        backgroundColor: 'rgba(189, 180, 180, 0.96)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        padding: '0',
        position: 'sticky', top: '72px', zIndex: 50,
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.15)',
      }}>
        <div style={{
          maxWidth: '1440px', margin: '0 auto',
          padding: '10px 20px', width: '100%', boxSizing: 'border-box',
          display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center',
          overflowX: 'hidden'
        }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleFilterChange(cat)}
              style={{
                flexShrink: 0,
                padding: '14px 22px',
                border: 'none',
                borderRadius: 0,
                borderBottom: activeFilter === cat ? '3px solid var(--primary-color)' : '3px solid transparent',
                backgroundColor: 'transparent',
                color: activeFilter === cat ? 'var(--primary-color)' : 'rgba(42, 22, 13,0.6)',
                fontSize: '0.72rem',
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-sans)',
                fontWeight: activeFilter === cat ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                whiteSpace: 'nowrap',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ── Content ── */}
      <div style={{
        maxWidth: '1440px', margin: '0 auto', padding: '70px 20px',
        width: '100%', boxSizing: 'border-box',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
      }}>

        {/* ── Featured Post ── */}
        {featuredPost && (
          <article
              className="blog-featured-card"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                backgroundColor: 'var(--bg-dark-solid)',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(42, 22, 13, 0.12)',
                minHeight: '340px',
              }}
            >
              <div style={{ overflow: 'hidden', minHeight: '380px' }}>
                <img
                  src={featuredPost.img}
                  alt={featuredPost.title}
                  className="blog-featured-img"
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover', display: 'block',
                    transition: 'transform 0.8s cubic-bezier(0.25,1,0.5,1)',
                  }}
                />
              </div>
              <div style={{
                padding: 'clamp(24px, 4vw, 55px) clamp(20px, 4vw, 48px)',
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
                backgroundColor: 'var(--bg-dark-solid)',
              }}>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '20px' }}>
                  <span style={{
                    fontSize: '0.68rem', letterSpacing: '2.5px',
                    color: '#fff', backgroundColor: 'var(--primary-color)',
                    padding: '5px 12px', borderRadius: '2px',
                    textTransform: 'uppercase', fontWeight: 600,
                  }}>
                    {featuredPost.tag}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'rgba(42, 22, 13, 0.45)' }}>
                    {featuredPost.date} · {featuredPost.readTime}
                  </span>
                </div>
                <h2 style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 'clamp(1.1rem, 2vw, 2.1rem)',
                  fontWeight: 400, color: '#2A160D',
                  lineHeight: 1.3, marginBottom: '16px',
                  wordWrap: 'break-word', overflowWrap: 'break-word'
                }}>
                  {featuredPost.title}
                </h2>
                <div style={{ width: '40px', height: '2px', backgroundColor: 'var(--primary-color)', marginBottom: '20px' }} />
                <p style={{
                  fontSize: 'clamp(0.78rem, 1.3vw, 0.97rem)', color: 'rgba(42, 22, 13, 0.65)',
                  lineHeight: 1.75, marginBottom: '28px',
                  fontFamily: 'var(--font-sans)', fontWeight: 300,
                  wordWrap: 'break-word', overflowWrap: 'break-word'
                }}>
                  {featuredPost.excerpt}
                </p>
                <Link href={`/read_more/${featuredPost.id}`} className="blog-read-more" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  fontSize: '0.78rem', letterSpacing: '2px',
                  textTransform: 'uppercase', fontWeight: 600,
                  color: 'var(--primary-color)', textDecoration: 'none',
                  fontFamily: 'var(--font-sans)',
                }}>
                  Read Article
                  <span style={{ fontSize: '1.1rem', transition: 'transform 0.3s ease' }}>→</span>
                </Link>
              </div>
            </article>
        )}

        {/* ── Blog Grid ── */}
        {gridPosts.length > 0 && (
          <div ref={gridRef} className="blog-grid">
              {gridPosts.map((post, i) => (
                <article
                  key={post.id}
                  className="blog-card"
                  style={{
                    backgroundColor: 'var(--bg-dark-solid)',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: '0 8px 30px rgba(42, 22, 13, 0.08)',
                    display: 'flex', flexDirection: 'column',
                    animationDelay: `${i * 0.07}s`,
                  }}
                >
                <div style={{ position: 'relative', overflow: 'hidden', height: '230px' }}>
                  <img
                    src={post.img}
                    alt={post.title}
                    className="blog-card-img"
                    style={{
                      width: '100%', height: '100%',
                      objectFit: 'cover', display: 'block',
                      transition: 'transform 0.7s cubic-bezier(0.25,1,0.5,1)',
                    }}
                  />
                  <span style={{
                    position: 'absolute', top: '16px', left: '16px',
                    fontSize: '0.62rem', letterSpacing: '2px',
                    color: '#fff', backgroundColor: 'var(--primary-color)',
                    padding: '4px 10px', borderRadius: '2px',
                    textTransform: 'uppercase', fontWeight: 600,
                  }}>
                    {post.tag}
                  </span>
                </div>
                <div style={{
                  padding: '28px 28px 32px',
                  display: 'flex', flexDirection: 'column', flex: 1,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <span style={{ fontSize: '0.72rem', color: 'rgba(42, 22, 13,0.45)' }}>{post.date}</span>
                    <span style={{ fontSize: '0.72rem', color: 'rgba(42, 22, 13,0.35)' }}>{post.readTime}</span>
                  </div>
                  <h2 style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '1.2rem', fontWeight: 400,
                    color: '#2A160D', lineHeight: 1.4,
                    marginBottom: '12px',
                    wordWrap: 'break-word', overflowWrap: 'break-word'
                  }}>
                    {post.title}
                  </h2>
                  <p style={{
                    fontSize: '0.88rem', color: 'rgba(42, 22, 13,0.6)',
                    lineHeight: 1.75, flex: 1, marginBottom: '22px',
                    fontFamily: 'var(--font-sans)', fontWeight: 300,
                    wordWrap: 'break-word', overflowWrap: 'break-word'
                  }}>
                    {post.excerpt}
                  </p>
                  <Link href={`/read_more/${post.id}`} className="blog-inline-link" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    fontSize: '0.72rem', letterSpacing: '2px',
                    textTransform: 'uppercase', fontWeight: 600,
                    color: 'var(--primary-color)', textDecoration: 'none',
                    fontFamily: 'var(--font-sans)',
                    position: 'relative', width: 'fit-content',
                  }}>
                    Read More <span>→</span>
                    <span className="blog-link-underline" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {filteredPosts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(42, 22, 13,0.4)', fontSize: '1rem' }}>
            No articles found in this category.
          </div>
        )}
      </div>

      {/* ── Newsletter CTA ── */}
      <section style={{
        padding: '40px 20px',
        width: '100%', boxSizing: 'border-box',
      }}>
        <div className="blog-themed-wrapper newsletter-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center', margin: '0 auto', maxWidth: '1440px' }}>
          <div>
            <p style={{
              fontSize: '0.72rem', letterSpacing: '4px',
              color: 'var(--primary-color)', textTransform: 'uppercase',
              marginBottom: '14px',
            }}>
              {newsletter.title || 'Stay Inspired'}
            </p>
            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
              fontWeight: 400, color: '#2A160D',
              lineHeight: 1.25, marginBottom: '16px',
            }}>
              {newsletter.subtitle || 'Design Insights, Delivered Monthly'}
            </h2>
            <p style={{
              color: 'rgba(42, 22, 13,0.6)', fontSize: '0.95rem',
              lineHeight: 1.8, fontWeight: 300,
            }}>
              Get the latest trends, material spotlights, and Luxe Verve news straight to your inbox. No spam, ever.
            </p>
          </div>
          <div>
            {subscribed ? (
              <div style={{
                padding: '30px',
                border: '1px solid rgba(110, 68, 42,0.4)',
                borderRadius: '6px',
                textAlign: 'center',
                background: 'rgba(110, 68, 42,0.08)',
              }}>
                <p style={{ fontSize: '1.3rem', marginBottom: '8px' }}>✦</p>
                <p style={{
                  color: '#d4af37', fontSize: '1rem',
                  fontFamily: 'Playfair Display, serif',
                  marginBottom: '6px',
                }}>
                  Thank you for subscribing.
                </p>
                <p style={{ color: 'rgba(245,233,226,0.5)', fontSize: '0.85rem' }}>
                  Expect your first edition soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} noValidate>
                  <div className="newsletter-form-row">
                    <input
                      type="email"
                      value={email}
                      onChange={e => { setEmail(e.target.value); setEmailError(''); }}
                      placeholder={newsletter.placeholder || "Your email address"}
                      style={{
                        flex: 1, padding: '16px 20px',
                        backgroundColor: 'var(--bg-dark-solid)',
                        border: 'none', outline: 'none',
                        color: 'var(--text-main)', fontSize: '0.9rem',
                        fontFamily: 'var(--font-sans)',
                      }}
                    />
                  <button
                    type="submit"
                    style={{
                      padding: '16px 28px',
                      backgroundColor: 'var(--primary-color)',
                      border: 'none', borderRadius: 0,
                      color: '#fff', fontSize: '0.75rem',
                      letterSpacing: '2px', fontWeight: 600,
                      textTransform: 'uppercase',
                      cursor: 'pointer', whiteSpace: 'nowrap',
                      fontFamily: 'var(--font-sans)',
                      transition: 'background 0.3s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#4A2A1B'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--primary-color)'}
                  >
                    {newsletter.buttonText || 'Subscribe'}
                  </button>
                </div>
                {emailError && (
                  <p style={{ color: '#e57373', fontSize: '0.8rem', marginTop: '8px' }}>{emailError}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap');

        /* ── Hero Banner ── */
        .blog-hero-banner {
          height: 85vh;
          min-height: 600px;
        }
        @media (max-width: 768px) {
          .blog-hero-banner {
            height: 60vh;
            min-height: 450px;
          }
        }

        /* ── Featured card image zoom ── */
        .blog-featured-card:hover .blog-featured-img {
          transform: scale(1.05);
        }

        /* ── Featured card: always 50/50 on mobile too ── */
        .blog-featured-card {
          margin-top: 40px;
          margin-bottom: 80px;
          transition: box-shadow 0.5s ease, transform 0.5s ease;
        }
        .blog-featured-card:hover {
          box-shadow: 0 32px 80px rgba(42, 22, 13,0.2);
          transform: translateY(-4px);
        }

        /* ── Read more arrow hover ── */
        .blog-read-more:hover span {
          transform: translateX(5px);
        }

        /* ── Blog Grid ── */
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          margin-top: 50px;
          margin-bottom: 80px;
        }

        /* ── Blog Card ── */
        .blog-card {
          transition: box-shadow 0.45s ease, transform 0.45s ease;
          animation: blogCardIn 0.5s ease both;
        }
        .blog-card:hover {
          box-shadow: 0 20px 50px rgba(42, 22, 13,0.15);
          transform: translateY(-6px);
        }
        .blog-card:hover .blog-card-img {
          transform: scale(1.07);
        }

        @keyframes blogCardIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Inline read more underline ── */
        .blog-link-underline {
          position: absolute;
          bottom: -2px; left: 0;
          height: 1px; width: 0;
          background: var(--primary-color);
          transition: width 0.3s ease;
        }
        .blog-inline-link:hover .blog-link-underline {
          width: 100%;
        }

        /* ── Newsletter form row ── */
        .newsletter-form-row {
          display: flex;
          gap: 0;
          border: 1px solid rgba(42, 22, 13, 0.15);
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(42, 22, 13, 0.03);
          width: 100%;
        }

        /* ── Filter scrollbar hide ── */
        section ::-webkit-scrollbar { display: none; }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .blog-grid { grid-template-columns: repeat(2, 1fr); }
          /* Keep featured as 50/50 on tablet */
          .blog-featured-card { grid-template-columns: 1fr 1fr; }
          .blog-featured-card > div:first-child { min-height: 280px; }
        }

        .blog-themed-wrapper {
          background: var(--bg-sec);
          border-radius: 40px;
          padding: 60px;
          box-shadow: 0 10px 40px rgba(74,42,27,0.05);
          margin-bottom: 60px;
        }

        @media (max-width: 768px) {
          .blog-themed-wrapper {
            padding: 30px 20px !important;
            border-radius: 24px !important;
            margin-bottom: 40px !important;
          }
          .blog-grid { 
            grid-template-columns: 1fr !important; 
            margin-top: 30px !important;
            margin-bottom: 50px !important;
            gap: 48px !important;
          }
          /* Stack featured post card on mobile to prevent squeezing and overflow */
          .blog-featured-card { 
            grid-template-columns: 1fr !important; 
            min-height: auto !important; 
            margin-top: 20px !important;
            margin-bottom: 50px !important;
          }
          .blog-featured-card > div:first-child { min-height: 240px !important; }
          .newsletter-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          
          /* mobile heading sizes and text styling */
          .blog-featured-card h2 {
            font-size: 1.3rem !important;
            margin-bottom: 10px !important;
          }
          .blog-card h2 {
            font-size: 1.1rem !important;
          }
          .blog-inline-link {
            font-size: 0.68rem !important;
          }
          .blog-featured-card p {
            font-size: 0.8rem !important;
            margin-bottom: 16px !important;
          }
        }

        @media (max-width: 540px) {
          /* Stack only on very small phones */
          .blog-featured-card { grid-template-columns: 1fr !important; }
          .blog-featured-card > div:first-child { min-height: 200px !important; }
          .blog-featured-card > div:last-child { padding: 24px 20px !important; }
          
          /* Stack newsletter input and button on small mobile screens */
          .newsletter-form-row {
            flex-direction: column !important;
            border: none !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            gap: 12px !important;
            overflow: visible !important;
          }
          .newsletter-form-row input {
            border: 1px solid rgba(42, 22, 13, 0.15) !important;
            border-radius: 8px !important;
            width: 100% !important;
          }
          .newsletter-form-row button {
            border-radius: 8px !important;
            width: 100% !important;
            padding: 16px !important;
          }
        }
      `}} />
    </div>
  );
}
