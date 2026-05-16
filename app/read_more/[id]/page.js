'use client';
import { useParams, useRouter } from 'next/navigation';
import { posts } from '@/lib/blogData';
import Link from 'next/link';

export default function ReadMorePage() {
  const params = useParams();
  const router = useRouter();
  const id = parseInt(params.id, 10);
  const post = posts.find(p => p.id === id);
  const otherPosts = posts.filter(p => p.id !== id).slice(0, 3);

  if (!post) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', backgroundColor: 'var(--bg-dark-solid)',
        paddingTop: '80px', flexDirection: 'column', gap: '20px',
      }}>
        <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: '#773344' }}>
          Article not found.
        </p>
        <Link href="/blog" style={{
          fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase',
          color: '#773344', textDecoration: 'none', fontWeight: 600,
        }}>
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-dark-solid)', paddingTop: '72px' }}>

      {/* ── Hero Banner ── */}
      <div style={{
        position: 'relative', height: '65vh', minHeight: '380px',
        overflow: 'hidden',
      }}>
        <img
          src={post.img}
          alt={post.title}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.45)',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(245,233,226,0.7) 100%)',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          maxWidth: '860px', margin: '0 auto', padding: '0 24px 50px',
        }}>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '18px' }}>
            <span style={{
              fontSize: '0.65rem', letterSpacing: '2.5px',
              color: '#fff', backgroundColor: '#773344',
              padding: '5px 14px', borderRadius: '2px',
              textTransform: 'uppercase', fontWeight: 600,
            }}>
              {post.tag}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.75)' }}>
              {post.date} · {post.readTime}
            </span>
          </div>
          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(1.8rem, 5vw, 3.2rem)',
            fontWeight: 400, color: '#ffffff',
            lineHeight: 1.2, letterSpacing: '0.5px',
            textShadow: '0 2px 20px rgba(0,0,0,0.4)',
          }}>
            {post.title}
          </h1>
        </div>
      </div>

      {/* ── Article Body ── */}
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '60px 24px 80px' }}>

        {/* Back link */}
        <Link href="/blog" style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          fontSize: '0.72rem', letterSpacing: '2px', textTransform: 'uppercase',
          color: '#773344', textDecoration: 'none', fontWeight: 600,
          marginBottom: '48px', fontFamily: 'var(--font-sans)',
        }}>
          ← All Articles
        </Link>

        {/* Author row */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '16px',
          marginBottom: '48px', paddingBottom: '32px',
          borderBottom: '1px solid rgba(11,0,20,0.1)',
        }}>
          <div style={{
            width: '46px', height: '46px', borderRadius: '50%',
            backgroundColor: '#773344', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <span style={{ color: '#fff', fontWeight: 700, fontSize: '1rem' }}>
              {post.author.charAt(0)}
            </span>
          </div>
          <div>
            <p style={{
              fontSize: '0.9rem', fontWeight: 600,
              color: '#0B0014', marginBottom: '2px',
            }}>
              {post.author}
            </p>
            <p style={{ fontSize: '0.78rem', color: 'rgba(11,0,20,0.5)' }}>
              {post.authorRole}
            </p>
          </div>
        </div>

        {/* Content blocks */}
        <article>
          {post.content.map((block, i) => {
            if (block.type === 'lead') return (
              <p key={i} style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
                lineHeight: 1.8, color: '#0B0014',
                marginBottom: '36px', fontStyle: 'italic',
                borderLeft: '3px solid #773344', paddingLeft: '20px',
              }}>
                {block.text}
              </p>
            );
            if (block.type === 'heading') return (
              <h2 key={i} style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(1.25rem, 3vw, 1.7rem)',
                fontWeight: 400, color: '#773344',
                marginTop: '48px', marginBottom: '18px', lineHeight: 1.3,
              }}>
                {block.text}
              </h2>
            );
            if (block.type === 'paragraph') return (
              <p key={i} style={{
                fontSize: 'clamp(0.9rem, 2vw, 1.02rem)',
                lineHeight: 1.95, color: 'rgba(11,0,20,0.75)',
                marginBottom: '22px',
                fontFamily: 'var(--font-sans)', fontWeight: 300,
              }}>
                {block.text}
              </p>
            );
            if (block.type === 'quote') return (
              <blockquote key={i} style={{
                margin: '40px 0',
                padding: '28px 32px',
                backgroundColor: '#fff',
                borderLeft: '4px solid #773344',
                borderRadius: '0 6px 6px 0',
                boxShadow: '0 4px 20px rgba(11,0,20,0.06)',
              }}>
                <p style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 'clamp(1rem, 2.2vw, 1.2rem)',
                  fontStyle: 'italic', lineHeight: 1.7,
                  color: '#0B0014', marginBottom: '14px',
                }}>
                  "{block.text}"
                </p>
                <p style={{
                  fontSize: '0.78rem', letterSpacing: '1.5px',
                  textTransform: 'uppercase', color: '#773344',
                  fontWeight: 600,
                }}>
                  — {block.author}
                </p>
              </blockquote>
            );
            return null;
          })}
        </article>

        {/* Share strip */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginTop: '64px', paddingTop: '32px',
          borderTop: '1px solid rgba(11,0,20,0.1)',
          flexWrap: 'wrap', gap: '16px',
        }}>
          <div>
            <span style={{
              display: 'inline-block',
              fontSize: '0.65rem', letterSpacing: '2.5px',
              color: '#fff', backgroundColor: '#773344',
              padding: '5px 14px', borderRadius: '2px',
              textTransform: 'uppercase', fontWeight: 600,
            }}>
              {post.tag}
            </span>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'rgba(11,0,20,0.4)' }}>
            {post.date} · {post.readTime}
          </p>
        </div>
      </div>

      {/* ── Related Articles ── */}
      {otherPosts.length > 0 && (
        <section style={{
          backgroundColor: 'rgba(189,180,180,0.35)',
          padding: '70px 24px',
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <p style={{
              fontSize: '0.72rem', letterSpacing: '4px',
              color: '#773344', textTransform: 'uppercase',
              marginBottom: '10px', fontWeight: 600,
            }}>
              Continue Reading
            </p>
            <h3 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 400, color: '#0B0014',
              marginBottom: '40px',
            }}>
              More Articles
            </h3>
            <div className="related-grid">
              {otherPosts.map(related => (
                <Link key={related.id} href={`/read_more/${related.id}`} style={{ textDecoration: 'none' }}>
                  <article className="related-card">
                    <div style={{ height: '200px', overflow: 'hidden' }}>
                      <img
                        src={related.img}
                        alt={related.title}
                        className="related-img"
                        style={{
                          width: '100%', height: '100%',
                          objectFit: 'cover', display: 'block',
                          transition: 'transform 0.6s ease',
                        }}
                      />
                    </div>
                    <div style={{ padding: '24px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span style={{
                          fontSize: '0.62rem', letterSpacing: '2px',
                          color: '#773344', textTransform: 'uppercase', fontWeight: 600,
                        }}>
                          {related.tag}
                        </span>
                        <span style={{ fontSize: '0.7rem', color: 'rgba(11,0,20,0.4)' }}>
                          {related.readTime}
                        </span>
                      </div>
                      <h4 style={{
                        fontFamily: 'Playfair Display, serif',
                        fontSize: '1.05rem', fontWeight: 400,
                        color: '#0B0014', lineHeight: 1.4,
                        marginBottom: '10px',
                      }}>
                        {related.title}
                      </h4>
                      <p style={{
                        fontSize: '0.82rem', color: 'rgba(11,0,20,0.55)',
                        lineHeight: 1.7, display: '-webkit-box',
                        WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}>
                        {related.excerpt}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap');

        .related-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }
        .related-card {
          background: #fff;
          border-radius: 6px;
          overflow: hidden;
          box-shadow: 0 6px 24px rgba(11,0,20,0.07);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .related-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 40px rgba(11,0,20,0.13);
        }
        .related-card:hover .related-img {
          transform: scale(1.06);
        }

        @media (max-width: 900px) {
          .related-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 580px) {
          .related-grid { grid-template-columns: 1fr; }
        }
      `}} />
    </div>
  );
}
