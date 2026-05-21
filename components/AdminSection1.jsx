"use client";

import React, { useState, useEffect, useRef } from "react";

export default function AdminSection1({ expanded, onToggle }) {
  const [data, setData] = useState({ 
    title: "The Art of Luxury Entrance Doors", 
    text: "Discover doors conceived for those who value distinction...", 
    url: "/videos/demo.mp4", 
    thumbnailUrl: "/images/door_grand_pivot_1776844794720.png" 
  });
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [allMedia, setAllMedia] = useState([]);
  const fileInputRef = useRef(null);

  const fetchSection = async () => {
    const res = await fetch("/api/content");
    if (res.ok) {
      const items = await res.json();
      const sectionItem = items.find(i => i.title === "home_section1");
      if (sectionItem) {
        setData({
          id: sectionItem.id,
          title: sectionItem.text || data.title, // using text for headline
          text: sectionItem.description || data.text, // using description for body
          url: sectionItem.url || data.url,
          thumbnailUrl: sectionItem.thumbnailUrl || data.thumbnailUrl
        });
      }
      setAllMedia(items.filter(i => i.title !== "home_section1"));
    }
  };

  useEffect(() => {
    fetchSection();
  }, []);

  const handleSave = async () => {
    setIsUploading(true);
    const form = new FormData();
    form.append("title", "home_section1");
    form.append("text", data.title); 
    form.append("description", data.text); 
    
    if (file) {
      form.append("type", "video");
      form.append("file", file);
    } else {
      form.append("type", "text");
      if (data.url) form.append("url", data.url);
    }

    const method = data.id ? "PATCH" : "POST"; 
    const url = data.id ? `/api/content/${data.id}` : "/api/content";
    
    try {
      const res = await fetch(url, { method: method, body: form });
      if (res.ok) {
        await fetchSection();
        setFile(null);
        alert("Section 1 updated successfully!");
      } else {
        const err = await res.json();
        alert(`Failed to update Section 1: ${err.error}`);
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
          <span className="subsection-number">03</span>
          <span className="subsection-title">Section 1: Text Left, Video Right</span>
        </div>
        <span className="subsection-arrow">▼</span>
      </div>
      {expanded && (
        <div className="subsection-body">
          <div className="form-grid">
            <div className="input-group form-full-width">
              <label className="input-label">Section Heading</label>
              <input type="text" className="text-input" value={data.title} onChange={e => setData({...data, title: e.target.value})} />
            </div>
            <div className="input-group form-full-width">
              <label className="input-label">Body Text paragraph</label>
              <textarea className="text-input textarea-input" value={data.text} onChange={e => setData({...data, text: e.target.value})} />
            </div>
            
            <div className="input-group form-full-width">
              <label className="input-label">Upload New Video</label>
              <div className="media-upload-zone" onClick={() => fileInputRef.current?.click()}>
                <span className="upload-icon">🎥</span>
                <span className="upload-text">
                  {file ? file.name : "Select or drag & drop video"}
                </span>
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
                    setFile(null);
                  }
                }}
              >
                <option value="">-- Select from existing video --</option>
                {allMedia.filter(m => m.type === 'video').map(m => (
                  <option key={m.id} value={m.url}>{m.title || "Unnamed Video"}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="subsection-actions">
            <button className="btn-secondary" onClick={fetchSection} disabled={isUploading}>Discard</button>
            <button className="btn-primary" onClick={handleSave} disabled={isUploading}>
              {isUploading ? "Saving..." : "Save changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
