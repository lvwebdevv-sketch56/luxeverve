"use client";

import React, { useState, useEffect, useRef } from "react";

export default function AdminContactBanner({ expanded, onToggle }) {
  const [data, setData] = useState({ id: null, title: "", text: "", url: "" });
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [allMedia, setAllMedia] = useState([]);
  const fileInputRef = useRef(null);

  const fetchData = async () => {
    const res = await fetch("/api/content");
    if (res.ok) {
      const items = await res.json();
      const item = items.find(i => i.title === "contact_banner");
      if (item) {
        setData({
          id: item.id,
          title: item.text || "", 
          text: item.description || "",
          url: item.url || "",
        });
      }
      setAllMedia(items.filter(i => i.type === 'image'));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async () => {
    setIsUploading(true);
    const form = new FormData();
    form.append("type", "image");
    form.append("title", "contact_banner");
    form.append("text", data.title);
    form.append("description", data.text);

    if (file) {
      form.append("file", file);
    } else if (data.url && !data.id) {
      form.append("url", data.url);
    } else if (data.id && data.url) {
       form.append("reqUrl", data.url); 
    }

    const method = data.id && (file || data.url) ? "PATCH" : "POST";
    const url = data.id ? `/api/content/${data.id}` : "/api/content";

    try {
      const res = await fetch(url, { method, body: form });
      if (res.ok) {
        await fetchData();
        setFile(null);
        alert("Contact Banner updated successfully!");
      } else {
        alert("Failed to update");
      }
    } catch (e) {}
    setIsUploading(false);
  };

  return (
    <div className={`subsection-card ${expanded ? "open" : ""}`}>
      <div className="subsection-header" onClick={onToggle}>
        <div className="subsection-title-box">
          <span className="subsection-number">01</span>
          <span className="subsection-title">Hero Banner Section</span>
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
              <label className="input-label">Banner Text (Subheading)</label>
              <input type="text" className="text-input" value={data.text} onChange={e => setData({...data, text: e.target.value})} />
            </div>
            
            <div className="input-group form-full-width">
              <label className="input-label">Banner Image (Cloudinary)</label>
              <div className="media-upload-zone" onClick={() => fileInputRef.current?.click()}>
                <span className="upload-icon">🖼️</span>
                <span className="upload-text">{file ? file.name : "Upload new background"}</span>
                <input type="file" ref={fileInputRef} style={{display:'none'}} accept="image/*" onChange={e => setFile(e.target.files[0])} />
              </div>
              <div style={{marginTop: "10px", textAlign: "center"}}>Or select existing media</div>
              <select className="text-input" value={file ? "" : data.url} onChange={e => { setData({...data, url: e.target.value}); setFile(null); }} style={{marginTop: "10px"}}>
                <option value="">-- Select Existing Image --</option>
                {allMedia.map(m => (
                  <option key={m.id} value={m.url}>{m.title || "Unnamed Image"}</option>
                ))}
              </select>
              {data.url && !file && (
                <div style={{marginTop: "10px", textAlign: "center"}}>
                  <img src={data.url} alt="Preview" style={{height: "100px", borderRadius: "8px"}} />
                </div>
              )}
            </div>
          </div>
          <div className="subsection-actions">
            <button className="btn-primary" onClick={handleSave} disabled={isUploading}>{isUploading ? "Saving..." : "Save changes"}</button>
          </div>
        </div>
      )}
    </div>
  );
}
