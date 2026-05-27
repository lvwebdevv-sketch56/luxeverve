"use client";
import { fetchWithCloudinary } from "@/lib/clientFetch";

import React, { useState, useEffect, useRef } from "react";

export default function AdminCollectionBanner({ expanded, onToggle }) {
  const [data, setData] = useState({ title: "Luxury Collections", subtitle: "Architectural Statements of Distinction", text: "", url: "/images/bgimg1.webp" });
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [allMedia, setAllMedia] = useState([]);
  const fileInputRef = useRef(null);

  const fetchBanner = async () => {
    const res = await fetchWithCloudinary("/api/content");
    if (res.ok) {
      const items = await res.json();
      const bannerItem = items.find(i => i.title === "coll_banner");
      if (bannerItem) {
        setData({
          id: bannerItem.id,
          title: bannerItem.description || "Luxury Collections", // Map appropriately
          subtitle: bannerItem.text || "Architectural Statements of Distinction",
          url: bannerItem.url || "/images/bgimg1.webp",
        });
      }
      setAllMedia(items.filter(i => i.type === 'image'));
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  const handleSave = async () => {
    setIsUploading(true);
    const form = new FormData();
    form.append("type", "image");
    form.append("title", "coll_banner");
    form.append("description", data.title); // We save Heading in description
    form.append("text", data.subtitle); // We save Subheading in text

    if (file) {
      form.append("file", file);
    } else if (data.url) {
      form.append("url", data.url);
    }

    const method = data.id && file ? "PATCH" : "POST";
    const url = data.id ? `/api/content/${data.id}` : "/api/content";

    try {
      const res = await fetchWithCloudinary(url, { method, body: form });
      if (res.ok) {
        await fetchBanner();
        setFile(null);
        alert("Collection Banner updated successfully!");
      } else {
        const err = await res.json();
        alert(`Failed to update banner: ${err.error}`);
      }
    } catch (e) {
      alert("An error occurred");
    }
    setIsUploading(false);
  };

  return (
    <div className={`subsection-card ${expanded ? "open" : ""}`}>
      <div className="subsection-header" onClick={onToggle}>
        <div className="subsection-title-box">
          <span className="subsection-number">01</span>
          <span className="subsection-title">First Section: Main Collections Banner</span>
        </div>
        <span className="subsection-arrow">▼</span>
      </div>
      {expanded && (
        <div className="subsection-body">
          <div className="form-grid">
            <div className="input-group">
              <label className="input-label">Banner Heading</label>
              <input type="text" className="text-input" value={data.title} onChange={e => setData({...data, title: e.target.value})} />
            </div>
            <div className="input-group">
              <label className="input-label">Banner Subheading/Paragraph</label>
              <input type="text" className="text-input" value={data.subtitle} onChange={e => setData({...data, subtitle: e.target.value})} />
            </div>
            <div className="input-group form-full-width">
              <label className="input-label">Upload Banner Image to Cloudinary</label>
              <div className="media-upload-zone" onClick={() => fileInputRef.current?.click()}>
                <span className="upload-icon">🖼️</span>
                <span className="upload-text">
                  {file ? file.name : "Upload new high-definition banner background"}
                </span>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  style={{ display: 'none' }} 
                  accept="image/*" 
                  onChange={e => setFile(e.target.files[0])} 
                />
              </div>
            </div>
            
            <div className="input-group form-full-width">
              <label className="input-label">Select existing Image from Media Library</label>
              <select 
                className="text-input" 
                value={data.url} 
                onChange={e => {
                  setData({ ...data, url: e.target.value });
                  setFile(null);
                }}
              >
                <option value="/images/bgimg1.webp">-- Select existing image --</option>
                {allMedia.map(m => (
                  <option key={m.id} value={m.url}>{m.title || "Unnamed Image"}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="subsection-actions">
            <button className="btn-secondary" onClick={fetchBanner} disabled={isUploading}>Discard</button>
            <button className="btn-primary" onClick={handleSave} disabled={isUploading}>
              {isUploading ? "Saving..." : "Save changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
