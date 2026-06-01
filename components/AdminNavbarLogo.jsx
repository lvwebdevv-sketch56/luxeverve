"use client";
import { fetchWithCloudinary } from "@/lib/clientFetch";

import React, { useState, useEffect, useRef } from "react";

export default function AdminNavbarLogo({ expanded, onToggle }) {
  const [data, setData] = useState({ id: null, url: "", altText: "" });
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [allMedia, setAllMedia] = useState([]);
  const fileInputRef = useRef(null);

  const fetchData = async () => {
    const res = await fetchWithCloudinary("/api/content");
    if (res.ok) {
      const items = await res.json();
      const item = items.find(i => i.title === "navbar_logo");
      if (item) {
        setData({
          id: item.id,
          url: item.url || "",
          altText: item.altText || "Luxe Verve Logo",
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
    form.append("title", "navbar_logo");
    form.append("altText", data.altText || "Luxe Verve Logo");

    if (file) {
      form.append("file", file);
    } else if (data.url && !data.id) {
      form.append("url", data.url);
    } else if (data.id && data.url) {
       form.append("reqUrl", data.url); 
    }

    const method = data.id ? "PATCH" : "POST";
    const url = data.id ? `/api/content/${data.id}` : "/api/content";

    try {
      const res = await fetchWithCloudinary(url, { method, body: form });
      if (res.ok) {
        await fetchData();
        setFile(null);
        alert(`Navbar Logo updated successfully!`);
      } else {
        alert("Failed to update logo");
      }
    } catch (e) {}
    setIsUploading(false);
  };

  return (
    <div className={`subsection-card ${expanded ? "open" : ""}`}>
      <div className="subsection-header" onClick={onToggle}>
        <div className="subsection-title-box">
          <span className="subsection-number">NL</span>
          <span className="subsection-title">Global Navbar Logo</span>
        </div>
        <span className="subsection-arrow">▼</span>
      </div>
      {expanded && (
        <div className="subsection-body">
          <div className="form-grid">
            
            <div className="input-group form-full-width">
              <div className="input-group" style={{marginBottom: "15px"}}>
                <label className="input-label">Image Alt Text (SEO)</label>
                <input type="text" className="text-input" placeholder="e.g. Luxe Verve Logo" value={data.altText} onChange={e => setData({...data, altText: e.target.value})} />
              </div>
              <label className="input-label">Logo Image</label>
              <div className="media-upload-zone" onClick={() => fileInputRef.current?.click()}>
                <span className="upload-icon">🖼️</span>
                <span className="upload-text">{file ? file.name : "Upload new logo image (transparent PNG)"}</span>
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
                  <img src={data.url} alt="Preview" style={{height: "60px", borderRadius: "8px", background: "#333", padding: "5px"}} />
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
