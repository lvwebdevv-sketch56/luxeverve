"use client";

import React, { useState, useEffect, useRef } from "react";

export default function AdminBannerSection({ expanded, onToggle }) {
  const [data, setData] = useState({ title: "LUXE VERVE", subtitle: "Beyond the Threshold", url: "/videos/banner.mp4", thumbnailUrl: "/images/banner1img.jpeg" });
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [allMedia, setAllMedia] = useState([]);
  const fileInputRef = useRef(null);

  const fetchBanner = async () => {
    const res = await fetch("/api/content");
    if (res.ok) {
      const items = await res.json();
      const bannerItem = items.find(i => i.title === "hero_banner");
      if (bannerItem) {
        setData({
          id: bannerItem.id,
          title: bannerItem.text || "LUXE VERVE", // Using text for title in this context
          subtitle: bannerItem.description || "Beyond the Threshold",
          url: bannerItem.url || "/videos/banner.mp4",
          thumbnailUrl: bannerItem.thumbnailUrl || "/images/banner1img.jpeg"
        });
      }
      setAllMedia(items.filter(i => i.title !== "hero_banner" && !i.title?.startsWith("hero_card")));
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  const handleSave = async () => {
    setIsUploading(true);
    const form = new FormData();
    form.append("type", "video");
    form.append("title", "hero_banner");
    form.append("description", data.subtitle);
    form.append("text", data.title); // Using 'text' field for the main hero title

    if (file) {
      form.append("file", file);
    }

    const method = data.id && file ? "PATCH" : "POST"; 
    // If no file but updating text, we can use PATCH, but our API PATCH needs file or type="text". 
    // For video type without file, our current API doesn't handle pure metadata updates well. 
    // Actually, our API PATCH handles it if req.file is null, it just updates metadata!
    
    const url = data.id ? `/api/content/${data.id}` : "/api/content";
    
    // For PATCH without file, we need to append type=video so API knows.
    
    try {
      const res = await fetch(url, { method: method, body: form });
      if (res.ok) {
        await fetchBanner();
        setFile(null);
        alert("Banner updated successfully!");
      } else {
        const err = await res.json();
        alert(`Failed to update banner: ${err.error}`);
      }
    } catch (e) {
      alert("An error occurred");
    }
    setIsUploading(false);
  };

  const handleDelete = async () => {
    if (!data.id) return;
    if (!confirm("Are you sure you want to delete the hero banner video?")) return;
    
    setIsUploading(true);
    const res = await fetch(`/api/content/${data.id}`, { method: "DELETE" });
    if (res.ok) {
      setData({ title: "", subtitle: "", url: "", thumbnailUrl: "" });
      alert("Banner deleted");
    }
    setIsUploading(false);
  };

  return (
    <div className={`subsection-card ${expanded ? "open" : ""}`}>
      <div className="subsection-header" onClick={onToggle}>
        <div className="subsection-title-box">
          <span className="subsection-number">01</span>
          <span className="subsection-title">Banner Video / Hero Background</span>
        </div>
        <span className="subsection-arrow">▼</span>
      </div>
      {expanded && (
        <div className="subsection-body">
          <div className="form-grid">
            <div className="input-group">
              <label className="input-label">Hero Title</label>
              <input type="text" className="text-input" value={data.title} onChange={e => setData({...data, title: e.target.value})} />
            </div>
            <div className="input-group">
              <label className="input-label">Hero Subtitle</label>
              <input type="text" className="text-input" value={data.subtitle} onChange={e => setData({...data, subtitle: e.target.value})} />
            </div>
            <div className="input-group form-full-width">
              <label className="input-label">Upload Video to Cloudinary</label>
              <div className="media-upload-zone" onClick={() => fileInputRef.current?.click()}>
                <span className="upload-icon">🎥</span>
                <span className="upload-text">
                  {file ? file.name : "Select or drag & drop high-definition banner video"}
                </span>
                <span className="upload-subtext">Recommended: MP4, WebM (max 50MB, 10-15s loop)</span>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  style={{ display: 'none' }} 
                  accept="video/*" 
                  onChange={e => setFile(e.target.files[0])} 
                />
              </div>
            </div>
            
            <div className="input-group form-full-width">
              <label className="input-label">Select existing Video from Media Library</label>
              <select 
                className="text-input" 
                value={data.url} 
                onChange={e => {
                  const selected = allMedia.find(m => m.url === e.target.value);
                  if (selected) {
                    setData({ ...data, url: selected.url, thumbnailUrl: selected.thumbnailUrl || selected.url });
                    setFile(null); // Clear pending file if they select an existing one
                  }
                }}
              >
                <option value="/videos/banner.mp4">-- Select from existing video --</option>
                {allMedia.filter(m => m.type === 'video').map(m => (
                  <option key={m.id} value={m.url}>{m.title || "Unnamed Video"}</option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <label className="input-label">Or paste Video Direct URL</label>
              <input type="text" className="text-input" value={data.url} onChange={e => setData({...data, url: e.target.value})} />
            </div>
            <div className="input-group">
              <label className="input-label">Poster Image URL (Pre-loader / Mobile Fallback)</label>
              <input type="text" className="text-input" value={data.thumbnailUrl} onChange={e => setData({...data, thumbnailUrl: e.target.value})} />
            </div>
          </div>
          <div className="subsection-actions">
            {data.id && (
              <button className="edit-item-btn" onClick={handleDelete} disabled={isUploading} style={{ borderColor: '#e57373', color: '#e57373' }}>
                Delete Banner
              </button>
            )}
            <button className="btn-secondary" onClick={fetchBanner} disabled={isUploading}>Discard</button>
            <button className="btn-primary" onClick={handleSave} disabled={isUploading}>
              {isUploading ? "Saving..." : (data.id ? "Update changes" : "Save changes")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
