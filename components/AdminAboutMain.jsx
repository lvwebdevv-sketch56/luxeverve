"use client";
import { fetchWithCloudinary } from "@/lib/clientFetch";

import React, { useState, useEffect } from "react";

export default function AdminAboutMain({ expanded, onToggle }) {
  const [data, setData] = useState({ id: null, title: "", text1: "", text2: "" });
  const [isUploading, setIsUploading] = useState(false);

  const fetchData = async () => {
    const res = await fetchWithCloudinary("/api/content");
    if (res.ok) {
      const items = await res.json();
      const item = items.find(i => i.title === "about_main");
      if (item) {
        let texts = ["", ""];
        try {
          if (item.text) texts = JSON.parse(item.text);
        } catch(e) {
          texts = [item.text, ""];
        }
        setData({
          id: item.id,
          title: item.description || "", 
          text1: texts[0] || "",
          text2: texts[1] || "",
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
    form.append("title", "about_main");
    form.append("description", data.title);
    form.append("text", JSON.stringify([data.text1, data.text2]));

    const method = data.id ? "PATCH" : "POST";
    const url = data.id ? `/api/content/${data.id}` : "/api/content";

    try {
      const res = await fetchWithCloudinary(url, { method, body: form });
      if (res.ok) {
        await fetchData();
        alert("Main Section updated successfully!");
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
          <span className="subsection-title">Main Container (Philosophy)</span>
        </div>
        <span className="subsection-arrow">▼</span>
      </div>
      {expanded && (
        <div className="subsection-body">
          <div className="form-grid">
            <div className="input-group form-full-width">
              <label className="input-label">Heading</label>
              <input type="text" className="text-input" value={data.title} onChange={e => setData({...data, title: e.target.value})} />
            </div>
            <div className="input-group form-full-width">
              <label className="input-label">Paragraph 1</label>
              <textarea className="text-input textarea-input" value={data.text1} onChange={e => setData({...data, text1: e.target.value})} />
            </div>
            <div className="input-group form-full-width">
              <label className="input-label">Paragraph 2</label>
              <textarea className="text-input textarea-input" value={data.text2} onChange={e => setData({...data, text2: e.target.value})} />
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
