'use client';
import { useState, useEffect } from 'react';

const SpiralBinding = ({ isMobile, isClosedBack = false }) => {
  const ringCount = isMobile ? 12 : 16;
  const spineWidth = isMobile ? '12px' : '20px';
  const ringWidth = isMobile ? '30px' : '44px';
  const ringHeight = isMobile ? '6px' : '8px';

  let leftPos = '50%';
  let transformStr = 'translateX(-50%) translateZ(5px)';

  if (isMobile) {
    if (isClosedBack) {
      leftPos = '100%';
      transformStr = 'translateX(-70%) translateZ(5px)';
    } else {
      leftPos = '0';
      transformStr = 'translateX(-30%) translateZ(5px)';
    }
  }

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: leftPos,
      transform: transformStr,
      width: spineWidth,
      height: '100%',
      zIndex: 200,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      pointerEvents: 'none',
      padding: '2% 0',
      transition: 'all 0.6s ease'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to right, #050505 0%, #1a1a1a 30%, #0a0a0a 50%, #1a1a1a 70%, #050505 100%)',
        boxShadow: 'inset 0 0 8px rgba(0,0,0,1), 0 0 15px rgba(0,0,0,0.6)',
        borderRadius: '2px'
      }}></div>
      
      {Array.from({ length: ringCount }).map((_, i) => (
        <div key={i} style={{
          width: ringWidth,
          height: ringHeight,
          background: 'linear-gradient(to bottom, #f5f7fa 0%, #9ca3af 25%, #4b5563 50%, #9ca3af 75%, #f5f7fa 100%)',
          borderRadius: '4px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.8), inset 0 1px 2px rgba(255,255,255,0.9), inset 0 -1px 2px rgba(0,0,0,0.5)',
          position: 'relative',
          zIndex: 2,
          transform: 'rotate(-3deg)'
        }}>
          <div style={{
            position: 'absolute', top: 0, right: '3px', bottom: 0, width: '4px',
            background: 'linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.6))', borderRadius: '0 2px 2px 0'
          }}></div>
          <div style={{
            position: 'absolute', top: 0, left: '3px', bottom: 0, width: '4px',
            background: 'linear-gradient(to left, rgba(0,0,0,0), rgba(0,0,0,0.6))', borderRadius: '2px 0 0 2px'
          }}></div>
        </div>
      ))}
    </div>
  );
};

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

const pagesData = Array.from({ length: 20 }, (_, i) => {
  if (i === 0 || i === 19) {
    return { type: 'cover', title: 'LUXE VERVE', subtitle: 'Premium Crafted Doors', img: '/images/catalogue_bg.jpg' };
  } else if (i === 1) {
    return { type: 'intro', title: 'LUXE VERVE', text: 'At Luxe Verve, we understand that every space has a story—and every story deserves a door that feels personal.\n\nWe collaborate closely with architects and interior designers, turning their concepts into bespoke door solutions crafted with precision and purpose.\n\nFor us, a door is never just a product. It is the first impression, the warmth of a home, and a connection that lasts.' };
  } else {
    // Pages 2 to 19 (index 2 to 18)
    const doorImages = [
      'https://images.unsplash.com/photo-1541888049187-217822d64a06?q=80&w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800',
      'https://images.unsplash.com/photo-1506434304575-ccc45564ab1a?q=80&w=800',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800'
    ];
    const img = doorImages[i % doorImages.length];
    
    return { 
      type: 'door_display', 
      title: `DOOR MODEL 0${i}`, 
      text: 'Inspired by the idea of continuous transition. Soft sculpted lines introduce rhythm and depth.\n\nMaterials: High-performance architectural core.\nCrafted with precision.', 
      img: img 
    };
  }
});

const FlipbookSection = ({ title }) => {
  const [currentLeaf, setCurrentLeaf] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const totalLeaves = 10;

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

    let content;
    let pageStyle;

    if (data.type === 'cover') {
      pageStyle = { 
        width: '100%', height: '100%', position: 'relative', 
        backgroundColor: '#161616', color: '#d4af37', 
        display: 'flex', flexDirection: 'column', 
        justifyContent: 'center', alignItems: 'center', 
        boxShadow: 'inset 0 0 50px rgba(0,0,0,0.9)',
        overflow: 'hidden'
      };

      let coverPadding = '40px';
      if (isMobileMode) {
         if (pageNum === pagesData.length - 1) {
            coverPadding = '10% 15% 10% 10%'; // spiral on right
         } else {
            coverPadding = '10% 10% 10% 15%'; // spiral on left
         }
      } else {
         if (pageNum === 0) {
            coverPadding = '10% 10% 10% 15%'; // right page, spiral on left
         } else {
            coverPadding = '10% 15% 10% 10%'; // left page, spiral on right
         }
      }

      content = (
        <div style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: coverPadding }}>
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <img src={data.img} alt="Cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <div style={{ 
            position: 'relative', zIndex: 1, textAlign: 'center', 
            padding: isMobileMode ? '30px 15px' : '60px 40px', 
            width: isMobileMode ? '90%' : '80%',
          }}>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: isMobileMode ? '8vw' : '4vw', letterSpacing: '8px', margin: 0, textShadow: '2px 2px 12px rgba(0,0,0,0.9), 0 0 30px rgba(0,0,0,0.6)', color: '#ffffff' }}>{data.title}</h1>
            <p style={{ fontSize: isMobileMode ? '3vw' : '1.2vw', letterSpacing: '5px', textTransform: 'uppercase', margin: '15px 0 0 0', textShadow: '1px 1px 8px rgba(0,0,0,0.9)', color: '#eaeaea' }}>{data.subtitle}</p>
          </div>
        </div>
      );
    } else {
      pageStyle = {
        width: '100%', height: '100%', backgroundColor: '#fdfbf7', color: '#222', position: 'relative',
        backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")',
        boxShadow: isMobileMode ? 'inset 0 0 20px rgba(0,0,0,0.05)' : (isLeft ? 'inset -20px 0 30px -15px rgba(0,0,0,0.15)' : 'inset 20px 0 30px -15px rgba(0,0,0,0.15)'),
        display: 'flex', flexDirection: 'column'
      };

      if (data.type === 'intro') {
        content = (
          <div style={{ padding: isMobileMode ? '5% 5% 5% 12%' : (isLeft ? '12% 15% 12% 6%' : '12% 6% 12% 15%'), display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', flex: 1 }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: isMobileMode ? '4vw' : '2.5vw', color: 'var(--primary-color)', marginBottom: '15px' }}>{data.title}</h3>
            <hr style={{ border: 'none', borderBottom: '1px solid var(--primary-color)', marginBottom: '25px', width: '100%' }} />
            <div style={{ fontSize: isMobileMode ? '2vw' : '1vw', lineHeight: 2.2, color: '#444', whiteSpace: 'pre-wrap', fontFamily: 'var(--font-sans)', textAlign: 'justify' }}>{data.text}</div>
          </div>
        );
      } else if (data.type === 'door_display') {
        content = (
          <div style={{ width: '100%', height: '100%', padding: isMobileMode ? '5% 5% 5% 10%' : (isLeft ? '8% 12% 8% 4%' : '8% 4% 8% 12%'), display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1, gap: isMobileMode ? '10px' : '0' }}>
            <div style={{ width: '40%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img src={data.img} style={{ width: '100%', height: '100%', objectFit: 'cover', border: '1px solid #e0e0e0', boxShadow: '0 8px 20px rgba(0,0,0,0.08)' }} alt={data.title} />
            </div>
            <div style={{ width: '55%', height: '100%', textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: isMobileMode ? '4.5vw' : '1.8vw', marginBottom: '10px', color: 'var(--primary-color)', lineHeight: 1.2 }}>{data.title}</h3>
              <p style={{ fontSize: isMobileMode ? '2.2vw' : '0.9vw', lineHeight: isMobileMode ? 1.5 : 1.8, color: '#555', whiteSpace: 'pre-wrap', fontFamily: 'var(--font-sans)', textAlign: 'justify' }}>{data.text}</p>
            </div>
          </div>
        );
      }
    }

    return (
      <div style={pageStyle}>
        {content}
        {data.type !== 'cover' && (
          <div style={{ 
            position: 'absolute', 
            bottom: isMobileMode ? '10px' : '25px', 
            left: isMobileMode ? '0' : (isLeft ? '40px' : 'auto'), 
            right: isMobileMode ? '0' : (isLeft ? 'auto' : '40px'), 
            color: '#999', 
            fontSize: isMobileMode ? '0.7rem' : '0.9rem', 
            fontFamily: 'var(--font-serif)', 
            fontStyle: 'italic', 
            textAlign: 'center', 
            width: isMobileMode ? '100%' : 'auto' 
          }}>{pageNum}</div>
        )}
      </div>
    );
  };

  return (
    <div style={{ 
      width: '90%', 
      maxWidth: '1440px', 
      margin: '0 auto 100px auto', 
      background: 'var(--bg-sec)',
      borderRadius: '40px',
      padding: '60px 40px',
      boxShadow: '0 10px 40px rgba(74,42,27,0.05)',
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      overflowX: 'hidden' 
    }}>
      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: 600, color: 'var(--primary-color)', marginBottom: '40px', textAlign: 'center', zIndex: 1, padding: '0 20px', wordWrap: 'break-word', maxWidth: '100%' }}>
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

            <div style={{ flex: 1, maxWidth: '400px', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
              <div style={{ 
                width: '100%', 
                aspectRatio: '1 / 1.2', 
                position: 'relative', 
                perspective: '3000px',
              }}>
                <SpiralBinding isMobile={true} isClosedBack={currentPage === pagesData.length - 1} />
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
                          ? 'transform 1.2s cubic-bezier(0.645, 0.045, 0.355, 1), opacity 0.3s ease 0.9s' 
                          : 'transform 1.2s cubic-bezier(0.645, 0.045, 0.355, 1), opacity 0s linear 0s',
                        transformStyle: 'preserve-3d',
                        zIndex: pagesData.length - index,
                        transform: isFlipped ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                        pointerEvents: isCurrent ? 'auto' : 'none',
                        opacity: isFlipped ? 0 : 1,
                      }}
                    >
                      <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', backgroundColor: '#fdfbf7', borderRadius: '4px', boxShadow: isFlipped ? 'none' : '2px 5px 15px rgba(0,0,0,0.15)', overflow: 'hidden' }}>
                        {renderPageContent(data, index, true)}
                      </div>
                      <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', backgroundColor: 'transparent', borderRadius: '4px' }}></div>
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
              aspectRatio: '2 / 1.3', 
              position: 'relative', 
              perspective: '3000px',
            }}>
              <SpiralBinding isMobile={false} />

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
                      transition: 'transform 1.4s cubic-bezier(0.645, 0.045, 0.355, 1)',
                      transformStyle: 'preserve-3d',
                      zIndex: zIndex,
                      transform: isFlipped ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                      boxShadow: isFlipped 
                        ? '5px 5px 15px rgba(0,0,0,0.4), 8px 0 20px rgba(0,0,0,0.2) inset' 
                        : '-5px 5px 15px rgba(0,0,0,0.4), -8px 0 20px rgba(0,0,0,0.2) inset',
                      borderRadius: isFlipped ? '4px 0 0 4px' : '0 4px 4px 0'
                    }}
                  >
                    <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', backgroundColor: '#fdfbf7', borderLeft: '1px solid rgba(0,0,0,0.1)', borderRadius: '0 4px 4px 0', overflow: 'hidden' }}>
                      {renderPageContent(pagesData[index * 2], index * 2)}
                    </div>
                    <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', backgroundColor: '#fdfbf7', transform: 'rotateY(180deg)', borderRight: '1px solid rgba(0,0,0,0.1)', borderRadius: '4px 0 0 4px', overflow: 'hidden' }}>
                      {renderPageContent(pagesData[index * 2 + 1], index * 2 + 1)}
                    </div>
                  </div>
                );
              })}

              {currentLeaf > 0 && currentLeaf < totalLeaves && (
                <div style={{ 
                  position: 'absolute', 
                  top: 0, left: 'calc(50% - 15px)', 
                  width: '30px', height: '100%', 
                  background: 'linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(255,255,255,0.05) 15%, rgba(0,0,0,0.2) 50%, rgba(255,255,255,0.05) 85%, rgba(0,0,0,0.5) 100%)', 
                  zIndex: 100, 
                  pointerEvents: 'none',
                  opacity: (currentLeaf === 0 || currentLeaf === totalLeaves) ? 0 : 1,
                  transition: 'opacity 0.5s ease'
                }}></div>
              )}
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
        href="data:application/pdf;base64,JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwogIC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAvTWVkaWFCb3ggWyAwIDAgNDAwIDYwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0KPj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAgL1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSCj4+Cj4+CiAgL0NvbnRlbnRzIDUgMCBSCj4+CmVuZG9iagoKNCAwIG9iago8PAogIC9UeXBlIC9Gb250CiAgL1N1YnR5cGUgL1R5cGUxCiAgL0Jhc2VGb250IC9UaW1lcy1Sb21hbgo+PgplbmRvYmoKCjUgMCBvYmoKPDwgL0xlbmd0aCA4OCA+PgpzdHJlYW0KQlQKMDAlMEE1NTAgVGQKbackslashnL0YxIDI0IFRmCihMeXhlIFZlcnZlIENhdGFsb2d1ZSkgVGoKMCAtNDAgVGQKbackslashnL0YxIDE0IFRmCihUaGlzIGlzIGEgZHVtbXkgUERGIGZpbGUuKSBUagpFVAplbmRzdHJlYW0KZW5kb2JqCgp4cmVmCjAgNgowMDAwMDAwMDAwIDY1MzUzIGYgCjAwMDAwMDAwMTAgMDAwMDAgbiAKMDAwMDAwMDA3OSAwMDAwMCBuIAowMDAwMDAwMTczIDAwMDAwIG4gCjAwMDAwMDAzMDEgMDAwMDAgbiAKMDAwMDAwMDM4MCAwMDAwMCBuIAp0cmFpbGVyCjw8CiAgL1NpemUgNgogIC9Sb290IDEgMCBSCj4+CnN0YXJ0eHJlZgo1MjEKJSVFT0YK"
        download="Luxe_Verve_Catalogue.pdf"
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

export default function CataloguePage() {
  return (
    <div style={{ 
      paddingTop: '60px',
      paddingBottom: '60px', 
      minHeight: '100vh', 
      backgroundColor: 'var(--bg-dark-solid)', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* 3D Modern Background Elements */}
      <div style={{ position: 'absolute', top: '10%', left: '5%', width: '40%', height: '50%', background: 'radial-gradient(circle, rgba(110, 68, 42,0.1) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none' }}></div>
      <div style={{ position: 'absolute', bottom: '5%', right: '5%', width: '50%', height: '60%', background: 'radial-gradient(circle, rgba(110, 68, 42,0.05) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none' }}></div>

      {/* Audio is handled globally by the Web Audio API engine in PageTransition.jsx */}

      <FlipbookSection title="Interior Door Catalogue" />
      <FlipbookSection title="Exterior Door Catalogue" />

      <style dangerouslySetInnerHTML={{
        __html: `
        .flipbook-container {
          height: 90vh;
        }
        @media (max-width: 1024px) {
          .flipbook-container {
            height: 70vh;
          }
        }
        @media (max-width: 768px) {
          .flipbook-container {
            height: 55vh;
          }
        }
        
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
