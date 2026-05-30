"use client";
import { fetchWithCloudinary } from "@/lib/clientFetch";
import React, { useState, useEffect, useRef } from "react";

export default function AdminSection4({ expanded, onToggle }) {
  const [data, setData] = useState({ 
    title: "home_section4",
    url: "/images/logo.png" 
  , altText: "" });
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [allMedia, setAllMedia] = useState([]);
  const fileInputRef = useRef(null);

  const fetchSection = async () => {
    const res = await fetchWithCloudinary("/api/content");
    if (res.ok) {
      const items = await res.json();
      const sectionItem = items.find(i => i.title === "home_section4");
      if (sectionItem) {
        setData({
          id: sectionItem.id,
          title: sectionItem.title,
          url: sectionItem.url || data.url,
          altText: sectionItem.altText || data.altText || "",
        });
      }
      setAllMedia(items.filter(i => i.type === 'image'));
    }
  };

  useEffect(() => {
    fetchSection();
  }, []);

  const handleSave = async () => {
    setIsUploading(true);
    const form = new FormData();
    form.append("title", "home_section4");
    
    if (file) {
      form.append("type", "image");
      form.append("file", file);
    } else {
      form.append("type", "image");
      if (data.url) form.append("url", data.url);
    }

    const method = data.id ? "PATCH" : "POST"; 
    const url = data.id ? `/api/content/${data.id}` : "/api/content";
    
    try {
      const res = await fetchWithCloudinary(url, { method: method, body: form });
      if (res.ok) {
        await fetchSection();
        setFile(null);
        alert("Section 4 updated successfully!");
      } else {
        const err = await res.json();
        alert(`Failed to update Section 4: ${err.error}`);
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
          <span className="subsection-number">06</span>
          <span className="subsection-title">Section 4: Luxe Details Logo and Header</span>
        </div>
        <span className="subsection-arrow">▼</span>
      </div>
      {expanded && (
        <div className="subsection-body">
          <div className="form-grid">
            <div className="input-group form-full-width">
              <label className="input-label">Brand Logo Image URL (Asset)</label>
              <input type="text" className="text-input" value={data.url} onChange={e => setData({...data, url: e.target.value})} />
            </div>
            <div className="input-group form-full-width">
              <div className="input-group" style={{marginBottom: "15px"}}>
              <label className="input-label">Image Alt Text (SEO)</label>
              <input type="text" className="text-input" placeholder="e.g. Modern Luxury Wooden Door" value={data.altText} onChange={e => setData({...data, altText: e.target.value})} />
            </div>
            <label className="input-label">Upload New Logo to Cloudinary</label>
              <div className="media-upload-zone" onClick={() => fileInputRef.current?.click()}>
                <span className="upload-icon">💠</span>
                <span className="upload-text">
                  {file ? file.name : "Upload new PNG / SVG logo"}
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
                value={file ? "" : data.url} 
                onChange={e => {
                  const selected = allMedia.find(m => m.url === e.target.value);
                  if (selected) {
                    setData({ ...data, url: selected.url });
                    setFile(null);
                  }
                }}
              >
                <option value="">-- Select from existing image --</option>
                {allMedia.map(m => (
                  <option key={m.id} value={m.url}>{m.title || "Unnamed Image"}</option>
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
