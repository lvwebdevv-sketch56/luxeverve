"use client";
import { fetchWithCloudinary } from "@/lib/clientFetch";
import React, { useState, useEffect, useRef } from "react";

export default function AdminSection2({ expanded, onToggle }) {
  const [data, setData] = useState({
    title: "Personal Note",
    text: "At Luxe-Verve, we design exclusive luxury architect doors that move beyond conventional or standard door solutions. Each door is conceived with a distinct design philosophy, using carefully selected premium materials that set our work apart from ordinary wooden or mass-produced doors.",
    url: "/images/showcase.jpg",
    thumbnailUrl: "/images/showcase.jpg"
    , altText: ""
  });
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [allMedia, setAllMedia] = useState([]);
  const fileInputRef = useRef(null);

  const fetchSection = async () => {
    const res = await fetchWithCloudinary("/api/content");
    if (res.ok) {
      const items = await res.json();
      const sectionItem = items.find(i => i.title === "home_section2");
      if (sectionItem) {
        setData({
          id: sectionItem.id,
          title: sectionItem.text || data.title,
          text: sectionItem.description || data.text,
          url: sectionItem.url || data.url,
          thumbnailUrl: sectionItem.thumbnailUrl || data.thumbnailUrl
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
    form.append("title", "home_section2");
    form.append("text", data.title);
    form.append("description", data.text);
    form.append("altText", data.altText || "");

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
        alert("Section 2 updated successfully!");
      } else {
        const err = await res.json();
        alert(`Failed to update Section 2: ${err.error}`);
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
          <span className="subsection-number">04</span>
          <span className="subsection-title">Section 2: Image Left, Text Right</span>
        </div>
        <span className="subsection-arrow">▼</span>
      </div>
      {expanded && (
        <div className="subsection-body">
          <div className="form-grid">
            <div className="input-group form-full-width">
              <label className="input-label">Section Heading</label>
              <input type="text" className="text-input" value={data.title} onChange={e => setData({ ...data, title: e.target.value })} />
            </div>
            <div className="input-group form-full-width">
              <label className="input-label">Body Text paragraph</label>
              <textarea className="text-input textarea-input" value={data.text} onChange={e => setData({ ...data, text: e.target.value })} />
            </div>

            <div className="input-group form-full-width">
              <label className="input-label">Upload Showcase Image</label>
              <div className="media-upload-zone" onClick={() => fileInputRef.current?.click()}>
                <span className="upload-icon">🖼️</span>
                <span className="upload-text">
                  {file ? file.name : "Select or drag storefront showcase image"}
                </span>
                <span className="upload-subtext">Recommended: JPG, PNG, WEBP (ratio 16:10 or 4:3)</span>
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
                    setData({ ...data, url: selected.url, thumbnailUrl: selected.url });
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

            <div className="input-group form-full-width">
              <label className="input-label">Image Alt Text (SEO)</label>
              <input 
                type="text" 
                className="text-input" 
                placeholder="e.g. Modern Luxury Wooden Door"
                value={data.altText || ""} 
                onChange={e => setData({...data, altText: e.target.value})} 
              />
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
