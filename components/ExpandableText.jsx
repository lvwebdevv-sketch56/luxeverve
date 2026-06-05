"use client";

import React, { useState, useEffect } from 'react';
import './ExpandableText.css';

export default function ExpandableText({ paragraphs, textStyle, className = "" }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!paragraphs || paragraphs.length <= 1) {
    return (
      <div className={`expandable-text-container ${className}`}>
        {paragraphs && paragraphs.map((para, i) => (
          <p key={i} style={textStyle}>{para}</p>
        ))}
      </div>
    );
  }

  // On desktop, we just show all.
  // On mobile, if not expanded, show only first paragraph.
  return (
    <div className={`expandable-text-container ${className}`}>
      <div className={`expandable-text-content ${isExpanded ? 'expanded' : ''}`}>
        {paragraphs.map((para, i) => (
          <p 
            key={i} 
            style={textStyle} 
            className="expandable-paragraph"
          >
            {para}
          </p>
        ))}
      </div>
      {isMobile && (
        <button 
          className="expandable-view-more-btn" 
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'VIEW LESS ↑' : 'VIEW MORE ↓'}
        </button>
      )}
    </div>
  );
}
