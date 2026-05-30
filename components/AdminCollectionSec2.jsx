"use client";
import { fetchWithCloudinary } from "@/lib/clientFetch";

import React, { useState, useEffect } from "react";

export default function AdminCollectionSec2({ expanded, onToggle }) {
  const [data, setData] = useState({ title: "Our Philosophy of Bespoke Entrance Architecture", text: "..." , altText: "" });
  const [isUploading, setIsUploading] = useState(false);

  const fetchData = async () => {
    const res = await fetchWithCloudinary("/api/content");
    if (res.ok) {
      const items = await res.json();
      const secItem = items.find(i => i.title === "coll_sec2");
      if (secItem) {
        setData({
          id: secItem.id,
          title: secItem.description || data.title, 
          text: secItem.text || data.text,
        });
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async () => {
    setIsUploading(true);
    const form = new FormData();
    form.append("type", "text");
    form.append("title", "coll_sec2");
    form.append("description", data.title);
    form.append("text", data.text);
    
    const method = data.id ? "PATCH" : "POST";
    const url = data.id ? `/api/content/${data.id}` : "/api/content";

    try {
      const res = await fetchWithCloudinary(url, { method, body: form });
      if (res.ok) {
        await fetchData();
        alert("Section 2 updated successfully!");
      } else {
        const err = await res.json();
        alert(`Failed to update: ${err.error}`);
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
          <span className="subsection-number">02</span>
          <span className="subsection-title">Second Section: Introduction & Philosophy</span>
        </div>
        <span className="subsection-arrow">▼</span>
      </div>
      {expanded && (
        <div className="subsection-body">
          <div className="form-grid">
            <div className="input-group form-full-width">
              <label className="input-label">Intro Heading</label>
              <input type="text" className="text-input" value={data.title} onChange={e => setData({...data, title: e.target.value})} />
            </div>
            <div className="input-group form-full-width">
              <label className="input-label">Intro Description Paragraph</label>
              <textarea className="text-input textarea-input" value={data.text} onChange={e => setData({...data, text: e.target.value})} />
            </div>
          </div>
          <div className="subsection-actions">
            <button className="btn-secondary" onClick={fetchData} disabled={isUploading}>Discard</button>
            <button className="btn-primary" onClick={handleSave} disabled={isUploading}>
              {isUploading ? "Saving..." : "Save changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
