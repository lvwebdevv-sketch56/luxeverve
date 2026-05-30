import clientPromise from '@/lib/mongodb';
import { posts as fallbackPosts } from '@/lib/blogData';
import Link from 'next/link';

export const revalidate = 0; // Force Next.js to always fetch fresh data from Firestore

export async function generateMetadata({ params }) {
  const { id } = await params;
  let dynamicPosts = [];
  try {
    const client = await clientPromise;
    const db = client.db();
    const items = await db.collection('content').find({ type: 'blog_post' }).toArray();
    dynamicPosts = items.map(doc => {
      const data = doc;
      let extra = {};
      try { if (data.text) extra = JSON.parse(data.text); } catch (e) {}
      return { id: doc._id.toString(), title: data.description || data.title, img: data.url, excerpt: extra.excerpt || '', altText: data.altText || '' };
    });
  } catch(e) {}
  
  const allPosts = [...dynamicPosts, ...fallbackPosts];
  const post = allPosts.find(p => p.id === id || String(p.id) === id);
  
  if (!post) return { title: 'Article Not Found | Luxe Verve' };
  
  return {
    title: `${post.title} | Luxe Verve`,
    description: post.excerpt || `Read about ${post.title} at The Luxe Journal by Luxe Verve. Premium insights into luxury doors and architectural design.`,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.img],
      type: 'article',
    }
  };
}

export default async function ReadMorePage({ params }) {
  const { id } = await params;

  let dynamicPosts = [];
  try {
    const client = await clientPromise;
    const db = client.db();
    const items = await db.collection('content').find({ type: 'blog_post' }).toArray();
    dynamicPosts = items.map(doc => {
      let extra = {};
      const data = doc;
      try {
        if (data.text) extra = JSON.parse(data.text);
      } catch (e) {}
      return {
        id: doc._id.toString(),
        title: data.description || data.title,
        img: data.url,
        tag: extra.tag || 'Design Trends',
        excerpt: extra.excerpt || '',
        date: extra.date || '',
        readTime: extra.readTime || '',
        author: extra.author || '',
        authorRole: extra.authorRole || '',
        content: extra.content || [],
        altText: data.altText || '',
      };
    });
  } catch(e) {}

  const allPosts = [...dynamicPosts, ...fallbackPosts];
  const post = allPosts.find(p => p.id === id || String(p.id) === id);
  const otherPosts = allPosts.filter(p => p.id !== id && String(p.id) !== id).slice(0, 3);

  if (!post) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', backgroundColor: 'var(--bg-dark-solid)',
        paddingTop: '80px', flexDirection: 'column', gap: '20px',
      }}>
        <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: 'var(--primary-color)' }}>
          Article not found.
        </p>
        <Link href="/blog" style={{
          fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase',
          color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 600,
        }}>
          ← Back to Blog
        </Link>
      </div>
    );
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    image: [post.img],
    datePublished: post.date || new Date().toISOString(),
    author: [{
      '@type': 'Person',
      name: post.author || 'Luxe Verve',
      jobTitle: post.authorRole || ''
    }]
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-dark-solid)', paddingTop: '0' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {/* ── Hero Banner ── */}
      <div style={{
        position: 'relative', height: '65vh', minHeight: '380px',
        overflow: 'hidden',
      }}>
        <img
          src={post.img}
          alt={post.altText || post.title}
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
              color: '#fff', backgroundColor: 'var(--primary-color)',
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
      <div className="read-themed-wrapper article-body-container">

        {/* Back link */}
        <Link href="/blog" style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          fontSize: '0.72rem', letterSpacing: '2px', textTransform: 'uppercase',
          color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 600,
          marginBottom: '48px', fontFamily: 'var(--font-sans)',
        }}>
          ← All Articles
        </Link>

        {/* Author row */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '16px',
          marginBottom: '48px', paddingBottom: '32px',
          borderBottom: '1px solid rgba(42, 22, 13,0.1)',
        }}>
          <div style={{
            width: '46px', height: '46px', borderRadius: '50%',
            backgroundColor: 'var(--primary-color)', display: 'flex',
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
              color: '#2A160D', marginBottom: '2px',
            }}>
              {post.author}
            </p>
            <p style={{ fontSize: '0.78rem', color: 'rgba(42, 22, 13,0.5)' }}>
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
                lineHeight: 1.8, color: '#2A160D',
                marginBottom: '36px', fontStyle: 'italic',
                borderLeft: '3px solid var(--primary-color)', paddingLeft: '20px',
              }}>
                {block.text}
              </p>
            );
            if (block.type === 'heading') return (
              <h2 key={i} style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(1.25rem, 3vw, 1.7rem)',
                fontWeight: 400, color: 'var(--primary-color)',
                marginTop: '48px', marginBottom: '18px', lineHeight: 1.3,
              }}>
                {block.text}
              </h2>
            );
            if (block.type === 'paragraph') return (
              <p key={i} style={{
                fontSize: 'clamp(0.9rem, 2vw, 1.02rem)',
                lineHeight: 1.95, color: 'var(--text-muted)',
                marginBottom: '22px',
                fontFamily: 'var(--font-sans)', fontWeight: 300,
                textAlign: 'justify'
              }}>
                {block.text}
              </p>
            );
            if (block.type === 'quote') return (
              <blockquote key={i} style={{
                margin: '40px 0',
                padding: '28px 32px',
                backgroundColor: 'var(--bg-dark-solid)',
                borderLeft: '4px solid var(--primary-color)',
                borderRadius: '0 12px 12px 0',
                boxShadow: '0 10px 30px rgba(42, 22, 13, 0.08)',
              }}>
                <p style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 'clamp(1rem, 2.2vw, 1.2rem)',
                  fontStyle: 'italic', lineHeight: 1.7,
                  color: '#2A160D', marginBottom: '14px',
                }}>
                  "{block.text}"
                </p>
                <p style={{
                  fontSize: '0.78rem', letterSpacing: '1.5px',
                  textTransform: 'uppercase', color: 'var(--primary-color)',
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
          borderTop: '1px solid rgba(42, 22, 13,0.1)',
          flexWrap: 'wrap', gap: '16px',
        }}>
          <div>
            <span style={{
              display: 'inline-block',
              fontSize: '0.65rem', letterSpacing: '2.5px',
              color: '#fff', backgroundColor: 'var(--primary-color)',
              padding: '5px 14px', borderRadius: '2px',
              textTransform: 'uppercase', fontWeight: 600,
            }}>
              {post.tag}
            </span>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'rgba(42, 22, 13,0.4)' }}>
            {post.date} · {post.readTime}
          </p>
        </div>
      </div>

      {/* ── Related Articles ── */}
      {otherPosts.length > 0 && (
        <section style={{
          padding: '40px 20px',
        }}>
          <div className="read-themed-wrapper related-articles-container" style={{ maxWidth: '1440px' }}>
            <p style={{
              fontSize: '0.72rem', letterSpacing: '4px',
              color: 'var(--primary-color)', textTransform: 'uppercase',
              marginBottom: '10px', fontWeight: 600,
            }}>
              Continue Reading
            </p>
            <h3 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 400, color: '#2A160D',
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
                        alt={related.altText || related.title}
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
                          color: 'var(--primary-color)', textTransform: 'uppercase', fontWeight: 600,
                        }}>
                          {related.tag}
                        </span>
                        <span style={{ fontSize: '0.7rem', color: 'rgba(42, 22, 13,0.4)' }}>
                          {related.readTime}
                        </span>
                      </div>
                      <h4 style={{
                        fontFamily: 'Playfair Display, serif',
                        fontSize: '1.05rem', fontWeight: 400,
                        color: '#2A160D', lineHeight: 1.4,
                        marginBottom: '10px',
                      }}>
                        {related.title}
                      </h4>
                      <p style={{
                        fontSize: '0.82rem', color: 'rgba(42, 22, 13,0.55)',
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

        .read-themed-wrapper {
          background: var(--bg-sec);
          border-radius: 40px;
          padding: 60px;
          box-shadow: 0 10px 40px rgba(74,42,27,0.05);
          margin: 40px auto 80px;
        }
        .article-body-container {
          max-width: 1000px;
          padding: 60px 40px;
        }

        .related-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }
        .related-card {
          background: var(--bg-dark-solid);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(42, 22, 13, 0.08);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .related-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 40px rgba(42, 22, 13, 0.15);
        }
        .related-card:hover .related-img {
          transform: scale(1.06);
        }

        @media (max-width: 900px) {
          .related-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 768px) {
          .read-themed-wrapper {
            padding: 30px 20px !important;
            border-radius: 24px !important;
            margin: 20px auto 40px !important;
          }
          .related-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          /* mobile heading sizes and text styling */
          .read-themed-wrapper h2 {
            font-size: 1.4rem !important;
            margin-top: 24px !important;
            margin-bottom: 12px !important;
          }
          .read-themed-wrapper blockquote {
            padding: 16px 20px !important;
            margin: 20px 0 !important;
          }
          .read-themed-wrapper blockquote p {
            font-size: 1rem !important;
          }
        }
        @media (max-width: 580px) {
          .related-grid { grid-template-columns: 1fr; }
        }
      `}} />
    </div>
  );
}
