"use client";
import { useEffect, useState } from 'react';

// MediaGrid – displays a grid of image/video assets fetched from Firestore.
// It is used on the public Home page; admin controls are provided by AdminMediaManager elsewhere.

export default function MediaGrid() {
  const [media, setMedia] = useState([]);

  // Fetch all content items and filter for images and videos.
  const fetchMedia = async () => {
    try {
      const res = await fetch('/api/content');
      if (!res.ok) throw new Error('Failed to fetch media');
      const data = await res.json();
      // Keep only image and video types and exclude structural images.
      const structuralPrefixes = ['coll_', 'home_', 'hero_'];
      const filtered = data.filter((item) => {
        if (item.type !== 'image' && item.type !== 'video') return false;
        if (item.title && structuralPrefixes.some(prefix => item.title.startsWith(prefix))) {
          return false;
        }
        return true;
      });
      setMedia(filtered);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  if (!media.length) {
    return <p className="media-grid-empty">No media assets available.</p>;
  }

  return (
    <div className="media-grid">
      {media.map((item) => (
        <div key={item.id} className="media-grid-item">
          {item.type === 'image' ? (
            <img src={item.url} alt={item.title || 'image'} className="media-grid-image" />
          ) : (
            <video
              src={item.thumbnailUrl || item.url}
              className="media-grid-video"
              muted
              loop
              playsInline
            />
          )}
          {/* Optional caption */}
          {item.title && <p className="media-grid-caption">{item.title}</p>}
        </div>
      ))}
    </div>
  );
}
