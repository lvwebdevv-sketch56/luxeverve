'use client';
import { useState, useEffect } from 'react';


const NextPageIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(2px 3px 3px rgba(0,0,0,0.3))' }}>
    <circle cx="12" cy="12" r="10" strokeOpacity="0.4" />
    <path d="M10 8l4 4-4 4" />
  </svg>
);

const PrevPageIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(-2px 3px 3px rgba(0,0,0,0.3))' }}>
    <circle cx="12" cy="12" r="10" strokeOpacity="0.4" />
    <path d="M14 8l-4 4 4 4" />
  </svg>
);

const FlipbookSection = ({ title, pagesData = [], pdfUrl, isTransparent = false }) => {
  const [currentLeaf, setCurrentLeaf] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Pad pages for desktop so we have an even number of pages
  const paddedPages = [...pagesData];
  if (paddedPages.length % 2 !== 0) {
    paddedPages.push({ type: 'blank', img: '' });
  }
  // Guarantee a minimum thickness so it always looks like a 3D book
  while (paddedPages.length < 8) {
    paddedPages.push({ type: 'blank', img: '' });
  }
  const totalLeaves = paddedPages.length / 2;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const playPageTurnSound = () => {
    // Use the shared Web Audio API engine (set up by PageTransition) for iOS compatibility
    if (typeof window !== 'undefined' && typeof window.playPageFlipSound === 'function') {
      window.playPageFlipSound();
    }
  };

  const nextLeaf = (e) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    if (currentLeaf < totalLeaves) {
      playPageTurnSound();
      setCurrentLeaf(prev => prev + 1);
    }
  };

  const prevLeaf = (e) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    if (currentLeaf > 0) {
      playPageTurnSound();
      setCurrentLeaf(prev => prev - 1);
    }
  };

  const renderPageContent = (data, pageNum, isMobileMode = false) => {
    const isLeft = pageNum % 2 !== 0;
    const isCover = pageNum === 0 || pageNum === paddedPages.length - 1;

    if (data.type === 'blank') {
      return <div style={{ width: '100%', height: '100%', backgroundColor: '#ffffff' }}></div>;
    }

    const pageStyle = {
      width: '100%', height: '100%', position: 'relative',
      backgroundColor: '#ffffff',
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center',
      overflow: 'hidden'
    };

    // Function to inject Cloudinary optimization flags (WebP/AVIF, quality auto)
    const getOptimizedUrl = (url) => {
      if (typeof url === 'string' && url.includes('res.cloudinary.com') && !url.includes('f_auto')) {
        // Find the /upload/ part and append f_auto,q_auto/ to it
        return url.replace('/upload/', '/upload/f_auto,q_auto/');
      }
      return url;
    };

    return (
      <div style={pageStyle}>
        {data?.img && <img src={getOptimizedUrl(data.img)} alt={`Page ${pageNum + 1}`} style={{ width: '100%', height: '100%', objectFit: 'fill', position: 'absolute', inset: 0, zIndex: 0 }} />}
        
        {/* Dark grey strip effect for realistic book spine (only on inner pages) */}
        {!isMobileMode && !isCover && (
          <div style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: isLeft ? 'auto' : 0,
            right: isLeft ? 0 : 'auto',
            width: '8%', // slightly narrower for a sharper strip effect
            background: isLeft 
              ? 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.02) 60%, rgba(0,0,0,0.1) 95%, rgba(0,0,0,0.2) 100%)' 
              : 'linear-gradient(to left, rgba(0,0,0,0) 0%, rgba(0,0,0,0.02) 60%, rgba(0,0,0,0.1) 95%, rgba(0,0,0,0.2) 100%)',
            borderRight: isLeft ? '1px solid rgba(0,0,0,0.1)' : 'none',
            borderLeft: !isLeft ? '1px solid rgba(0,0,0,0.1)' : 'none',
            zIndex: 1,
            pointerEvents: 'none'
          }}></div>
        )}
        
        {/* Mobile shadow overlay */}
        {isMobileMode && (
          <div style={{
            position: 'absolute',
            inset: 0,
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.3)',
            zIndex: 1,
            pointerEvents: 'none'
          }}></div>
        )}
      </div>
    );
  };

  return (
    <div style={{
      width: isMobile ? '100%' : '90%',
      maxWidth: isMobile ? '100vw' : '1440px',
      margin: '0 auto 100px auto',
      background: isMobile ? 'transparent' : (isTransparent ? 'transparent' : 'var(--bg-sec)'),
      borderRadius: isMobile ? '0' : '40px',
      padding: isMobile ? '10px 0' : '60px 40px',
      boxShadow: isMobile ? 'none' : (isTransparent ? 'none' : '0 10px 40px rgba(74,42,27,0.05)'),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflowX: 'hidden'
    }}>
      <h2 style={{ fontFamily: 'var(--font-knockout)', fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: 600, color: 'var(--primary-color)', marginBottom: '40px', textAlign: 'center', zIndex: 1, padding: '0 20px', wordWrap: 'break-word', maxWidth: '100%' }}>
        {title}
      </h2>

      {isMobile ? (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', maxWidth: '100vw', padding: '0 10px', boxSizing: 'border-box', justifyContent: 'center', zIndex: 1, perspective: '2500px', position: 'relative' }}>

            {/* External Prev Arrow Slider (Mobile) */}
            <button
              onClick={(e) => { e.preventDefault(); setCurrentPage(p => p - 1); playPageTurnSound(); }}
              style={{
                background: 'transparent', border: 'none', color: 'var(--primary-color)', fontSize: '1.2rem',
                cursor: currentPage === 0 ? 'default' : 'pointer',
                opacity: currentPage === 0 ? 0 : 1, transition: 'all 0.4s ease',
                display: 'flex', justifyContent: 'center', alignItems: 'center', pointerEvents: currentPage === 0 ? 'none' : 'auto',
                position: 'relative', zIndex: 100, transform: 'translateZ(50px)', padding: 0
              }}
              className="external-nav-icon prev no-click-sound"
            >
              <div className="icon-circle" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '35px', height: '35px', borderRadius: '50%', border: '2px solid rgba(110, 68, 42,0.4)', transition: 'all 0.3s ease', backgroundColor: 'transparent', backdropFilter: 'blur(5px)' }}>
                <PrevPageIcon />
              </div>
            </button>

            <div style={{ flex: 1, width: '100vw', maxWidth: '100vw', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
              <div style={{
                width: '100%',
                aspectRatio: '1 / 1.414',
                position: 'relative',
                perspective: '3000px',
              }}>
                {pagesData.map((data, index) => {
                  const isFlipped = currentPage > index;
                  const isCurrent = currentPage === index;

                  if (index < currentPage - 1 || index > currentPage + 2) return null;

                  return (
                    <div
                      key={index}
                      style={{
                        position: 'absolute',
                        top: 0, left: 0, width: '100%', height: '100%',
                        transformOrigin: 'left center',
                        transition: isFlipped
                          ? 'transform 1.2s cubic-bezier(0.645, 0.045, 0.355, 1), opacity 0.3s ease 0.9s, z-index 0s 0.6s'
                          : 'transform 1.2s cubic-bezier(0.645, 0.045, 0.355, 1), opacity 0s linear 0s, z-index 0s 0s',
                        transformStyle: 'preserve-3d',
                        zIndex: isFlipped ? index : pagesData.length - index + 50,
                        transform: isFlipped ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                        pointerEvents: isCurrent ? 'auto' : 'none',
                        opacity: isFlipped ? 0 : 1,
                      }}
                    >
                      <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', backgroundColor: 'transparent', borderRadius: '4px', boxShadow: isFlipped ? 'none' : '2px 5px 15px rgba(0,0,0,0.15)', overflow: 'hidden' }}>
                        {renderPageContent(data, index, true)}
                        {/* 3D Notebook binding strip on mobile */}
                        <div style={{
                          position: 'absolute',
                          top: 0, bottom: 0, left: 0, width: '2px',
                          background: '#000000',
                          boxShadow: 'none',
                          borderRight: 'none',
                          zIndex: 10
                        }}></div>
                      </div>
                      <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', backgroundColor: '#f0f0f0', borderRadius: '4px' }}></div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* External Next Arrow Slider (Mobile) */}
            <button
              onClick={(e) => { e.preventDefault(); setCurrentPage(p => p + 1); playPageTurnSound(); }}
              style={{
                background: 'transparent', border: 'none', color: 'var(--primary-color)', fontSize: '1.2rem',
                cursor: currentPage === pagesData.length - 1 ? 'default' : 'pointer',
                opacity: currentPage === pagesData.length - 1 ? 0 : 1, transition: 'all 0.4s ease',
                display: 'flex', justifyContent: 'center', alignItems: 'center', pointerEvents: currentPage === pagesData.length - 1 ? 'none' : 'auto',
                position: 'relative', zIndex: 100, transform: 'translateZ(50px)', padding: 0
              }}
              className="external-nav-icon next no-click-sound"
            >
              <div className="icon-circle" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '35px', height: '35px', borderRadius: '50%', border: '2px solid rgba(110, 68, 42,0.4)', transition: 'all 0.3s ease', backgroundColor: 'transparent', backdropFilter: 'blur(5px)' }}>
                <NextPageIcon />
              </div>
            </button>
          </div>

          <p style={{ marginTop: '15px', color: 'var(--primary-color)', fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Page {currentPage + 1} of {pagesData.length}
          </p>
        </>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', width: '100%', justifyContent: 'center', zIndex: 1, perspective: '2500px', position: 'relative' }}>

          {/* External Prev Arrow Slider */}
          <button
            onClick={prevLeaf}
            style={{
              background: 'transparent', border: 'none', color: 'var(--primary-color)', fontSize: '2rem',
              cursor: currentLeaf === 0 ? 'default' : 'pointer',
              opacity: currentLeaf === 0 ? 0 : 1, transition: 'all 0.4s ease',
              display: 'flex', justifyContent: 'center', alignItems: 'center', pointerEvents: currentLeaf === 0 ? 'none' : 'auto'
            }}
            className="external-nav-icon prev no-click-sound"
          >
            <div className="icon-circle" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px', borderRadius: '50%', border: '2px solid rgba(110, 68, 42,0.4)', transition: 'all 0.3s ease', backgroundColor: 'transparent', backdropFilter: 'blur(5px)' }}>
              <PrevPageIcon />
            </div>
          </button>

          {/* Book Container */}
          <div style={{
            transform: `rotateX(5deg) rotateY(0deg) translateX(${currentLeaf === 0 ? '-25%' : currentLeaf === totalLeaves ? '25%' : '0%'})`,
            transition: 'transform 1.4s cubic-bezier(0.645, 0.045, 0.355, 1)',
            transformStyle: 'preserve-3d',
            width: '70vw',
            maxWidth: '1200px',
            position: 'relative'
          }}>
            <div className="flipbook-container" style={{
              width: '100%',
              aspectRatio: '2 / 1.414',
              position: 'relative',
              perspective: '3000px',
            }}>

              {Array.from({ length: totalLeaves }).map((_, index) => {
                const isFlipped = currentLeaf > index;
                const zIndex = isFlipped ? index : totalLeaves - index;

                return (
                  <div
                    key={index}
                    style={{
                      position: 'absolute',
                      top: 0, right: 0,
                      width: '50%', height: '100%',
                      transformOrigin: 'left center',
                      transition: `transform 1.4s cubic-bezier(0.645, 0.045, 0.355, 1), z-index 0s ${isFlipped ? '0.6s' : '0s'}`,
                      transformStyle: 'preserve-3d',
                      zIndex: isFlipped ? index : totalLeaves - index + 50,
                      transform: isFlipped ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                      boxShadow: isFlipped
                        ? '5px 5px 15px rgba(0,0,0,0.4), 8px 0 20px rgba(0,0,0,0.2) inset'
                        : '-5px 5px 15px rgba(0,0,0,0.4), -8px 0 20px rgba(0,0,0,0.2) inset',
                      borderRadius: isFlipped ? '4px 0 0 4px' : '0 4px 4px 0'
                    }}
                  >
                    <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', backgroundColor: 'transparent', borderRadius: '0 4px 4px 0', overflow: 'hidden' }}>
                      {paddedPages[index * 2] && renderPageContent(paddedPages[index * 2], index * 2)}
                    </div>
                    <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', backgroundColor: 'transparent', transform: 'rotateY(180deg)', borderRadius: '4px 0 0 4px', overflow: 'hidden' }}>
                      {paddedPages[index * 2 + 1] && renderPageContent(paddedPages[index * 2 + 1], index * 2 + 1)}
                    </div>
                  </div>
                );
              })}


            </div>
          </div>

          {/* External Next Arrow Slider */}
          <button
            onClick={nextLeaf}
            style={{
              background: 'transparent', border: 'none', color: 'var(--primary-color)', fontSize: '2rem',
              cursor: currentLeaf === totalLeaves ? 'default' : 'pointer',
              opacity: currentLeaf === totalLeaves ? 0 : 1, transition: 'all 0.4s ease',
              display: 'flex', justifyContent: 'center', alignItems: 'center', pointerEvents: currentLeaf === totalLeaves ? 'none' : 'auto'
            }}
            className="external-nav-icon next no-click-sound"
          >
            <div className="icon-circle" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px', borderRadius: '50%', border: '2px solid rgba(110, 68, 42,0.4)', transition: 'all 0.3s ease', backgroundColor: 'transparent', backdropFilter: 'blur(5px)' }}>
              <NextPageIcon />
            </div>
          </button>
        </div>
      )}

      {!isMobile && (
        <p style={{ marginTop: '30px', color: 'var(--primary-color)', fontSize: '0.9rem', letterSpacing: '3px', zIndex: 1, textTransform: 'uppercase' }}>
          Use the slider arrows to flip pages
        </p>
      )}

      {/* Download Button */}
      <a
        href={pdfUrl ? `/api/download?url=${encodeURIComponent(pdfUrl)}` : "data:application/pdf;base64,JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwogIC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAvTWVkaWFCb3ggWyAwIDAgNDAwIDYwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0KPj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAgL1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSCj4+Cj4+CiAgL0NvbnRlbnRzIDUgMCBSCj4+CmVuZG9iagoKNCAwIG9iago8PAogIC9UeXBlIC9Gb250CiAgL1N1YnR5cGUgL1R5cGUxCiAgL0Jhc2VGb250IC9UaW1lcy1Sb21hbgo+PgplbmRvYmoKCjUgMCBvYmoKPDwgL0xlbmd0aCA4OCA+PgpzdHJlYW0KQlQKMDAlMEE1NTAgVGQKbackslashnL0YxIDI0IFRmCihMeXhlIFZlcnZlIENhdGFsb2d1ZSkgVGoKMCAtNDAgVGQKbackslashnL0YxIDE0IFRmCihUaGlzIGlzIGEgZHVtbXkgUERGIGZpbGUuKSBUagpFVAplbmRzdHJlYW0KZW5kb2JqCgp4cmVmCjAgNgowMDAwMDAwMDAwIDY1MzUzIGYgCjAwMDAwMDAwMTAgMDAwMDAgbiAKMDAwMDAwMDA3OSAwMDAwMCBuIAowMDAwMDAwMTczIDAwMDAwIG4gCjAwMDAwMDAzMDEgMDAwMDAgbiAKMDAwMDAwMDM4MCAwMDAwMCBuIAp0cmFpbGVyCjw8CiAgL1NpemUgNgogIC9Sb290IDEgMCBSCj4+CnN0YXJ0eHJlZgo1MjEKJSVFT0YK"}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          marginTop: '20px',
          fontSize: '1rem',
          fontWeight: 600,
          color: '#2A160D',
          backgroundColor: 'transparent',
          border: '2px solid #2A160D',
          padding: '4.2px 32px',
          borderRadius: '9999px',
          transition: 'all 0.3s ease',
          textDecoration: 'none',
          cursor: 'pointer',
          zIndex: 1
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--primary-color)';
          e.currentTarget.style.color = '#ffffff';
          e.currentTarget.style.borderColor = 'var(--primary-color)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = '#2A160D';
          e.currentTarget.style.borderColor = '#2A160D';
        }}
      >
        Download Full Catalogue
      </a>
    </div>
  );
};

export default function CatalogueFlipbooks({ content = [] }) {
  const processFlipbook = (id) => {
    const cover = content.find(i => i.title === `${id}_cover`);
    const back = content.find(i => i.title === `${id}_back`);
    const pdf = content.find(i => i.title === `${id}_pdf`);
    const pages = content.filter(i => i.title && i.title.startsWith(`${id}_page_`)).sort((a,b) => a.order - b.order);
    
    let allPages = [];
    if (cover) allPages.push({ type: 'full_image', img: cover.url });
    pages.forEach(p => allPages.push({ type: 'full_image', img: p.url }));
    if (back) allPages.push({ type: 'full_image', img: back.url });

    if (allPages.length === 0) {
      allPages = [
        { type: 'full_image', img: '/images/door_grand_pivot_1776844794720.png' },
        { type: 'full_image', img: '/images/door_sculpted_wood_1776844667211.png' },
        { type: 'full_image', img: '/images/door_minimal_metal_1776844703459.png' },
        { type: 'full_image', img: '/images/door_classic_glass_1776844734600.png' },
        { type: 'full_image', img: '/images/door_grand_pivot_1776844794720.png' },
        { type: 'full_image', img: '/images/door_sculpted_wood_1776844667211.png' },
        { type: 'full_image', img: '/images/door_minimal_metal_1776844703459.png' },
        { type: 'full_image', img: '/images/door_classic_glass_1776844734600.png' },
      ];
    }
    
    return {
      title: cover?.description || (id === 'coll_flip1' ? "Interior Door Catalogue" : "Exterior Door Catalogue"),
      pagesData: allPages,
      pdfUrl: pdf?.url || null
    };
  };

  const flip1 = processFlipbook('coll_flip1');
  const flip2 = processFlipbook('coll_flip2');

  return (
    <div style={{
      paddingTop: '60px',
      paddingBottom: '60px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      width: '100%'
    }}>

      {/* Audio is handled globally by the Web Audio API engine in PageTransition.jsx */}

      <FlipbookSection title={flip1.title} pagesData={flip1.pagesData} pdfUrl={flip1.pdfUrl} />
      <FlipbookSection title={flip2.title} pagesData={flip2.pagesData} pdfUrl={flip2.pdfUrl} />

      <style dangerouslySetInnerHTML={{
        __html: `
        /* External Navigation Icon Hover Effects */
        .external-nav-icon:hover .icon-circle {
          background-color: rgba(110, 68, 42,0.1) !important;
          border-color: var(--primary-color) !important;
          box-shadow: 0 0 20px rgba(110, 68, 42,0.2);
        }
        .external-nav-icon.prev:hover {
          transform: translateX(-5px);
        }
        .external-nav-icon.next:hover {
          transform: translateX(5px);
        }
      `}} />

    </div>
  );
}
