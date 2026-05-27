"use client";
import { fetchWithCloudinary } from "@/lib/clientFetch";

import React, { useState, useEffect } from "react";

export default function AdminBlogCategories({ expanded, onToggle }) {
  const [data, setData] = useState({ id: null, text: "All, Design Trends, Materials, Craftsmanship, Interiors, Transparency, Industry" });
  const [isUploading, setIsUploading] = useState(false);

  const fetchData = async () => {
    const res = await fetchWithCloudinary("/api/content");
    if (res.ok) {
      const items = await res.json();
      const item = items.find(i => i.title === "blog_categories");
      if (item) {
        setData({
          id: item.id,
          text: item.text || "All, Design Trends, Materials, Craftsmanship, Interiors, Transparency, Industry",
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
    form.append("title", "blog_categories");
    form.append("text", data.text);

    const method = data.id ? "PATCH" : "POST";
    const url = data.id ? `/api/content/${data.id}` : "/api/content";

    try {
      const res = await fetchWithCloudinary(url, { method, body: form });
      if (res.ok) {
        await fetchData();
        alert("Categories updated successfully!");
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
          <span className="subsection-number">02</span>
          <span className="subsection-title">Filter Bar Categories</span>
        </div>
        <span className="subsection-arrow">▼</span>
      </div>
      {expanded && (
        <div className="subsection-body">
          <div className="form-grid">
            <div className="input-group form-full-width">
              <label className="input-label">Active Filter Tags (Comma separated)</label>
              <input 
                type="text" 
                className="text-input" 
                value={data.text} 
                onChange={e => setData({...data, text: e.target.value})} 
                placeholder="e.g. All, Design Trends, Materials"
              />
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
