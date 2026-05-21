"use client";

import React, { useState, useEffect } from "react";

export default function AdminBlogNewsletter({ expanded, onToggle }) {
  const [data, setData] = useState({ id: null, title: "Stay Inspired", subtitle: "Join our private mailing list", placeholder: "Your email address", buttonText: "Subscribe" });
  const [isUploading, setIsUploading] = useState(false);

  const fetchData = async () => {
    const res = await fetch("/api/content");
    if (res.ok) {
      const items = await res.json();
      const item = items.find(i => i.title === "blog_newsletter");
      if (item) {
        let parsed = { title: "Stay Inspired", subtitle: "Join our private mailing list", placeholder: "Your email address", buttonText: "Subscribe" };
        try {
          if (item.text) parsed = JSON.parse(item.text);
        } catch(e) {}
        setData({
          id: item.id,
          ...parsed
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
    form.append("title", "blog_newsletter");
    form.append("text", JSON.stringify({
      title: data.title,
      subtitle: data.subtitle,
      placeholder: data.placeholder,
      buttonText: data.buttonText
    }));

    const method = data.id ? "PATCH" : "POST";
    const url = data.id ? `/api/content/${data.id}` : "/api/content";

    try {
      const res = await fetch(url, { method, body: form });
      if (res.ok) {
        await fetchData();
        alert("Newsletter CTA updated successfully!");
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
          <span className="subsection-number">03</span>
          <span className="subsection-title">Newsletter Call-To-Action</span>
        </div>
        <span className="subsection-arrow">▼</span>
      </div>
      {expanded && (
        <div className="subsection-body">
          <div className="form-grid">
            <div className="input-group">
              <label className="input-label">Small Tagline</label>
              <input type="text" className="text-input" value={data.title} onChange={e => setData({...data, title: e.target.value})} />
            </div>
            <div className="input-group">
              <label className="input-label">Main Heading</label>
              <input type="text" className="text-input" value={data.subtitle} onChange={e => setData({...data, subtitle: e.target.value})} />
            </div>
            <div className="input-group">
              <label className="input-label">Input Placeholder</label>
              <input type="text" className="text-input" value={data.placeholder} onChange={e => setData({...data, placeholder: e.target.value})} />
            </div>
            <div className="input-group">
              <label className="input-label">Button Text</label>
              <input type="text" className="text-input" value={data.buttonText} onChange={e => setData({...data, buttonText: e.target.value})} />
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
