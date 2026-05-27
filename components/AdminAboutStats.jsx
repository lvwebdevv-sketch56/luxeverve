"use client";
import { fetchWithCloudinary } from "@/lib/clientFetch";

import React, { useState, useEffect } from "react";

export default function AdminAboutStats({ expanded, onToggle }) {
  const defaultStats = [
    { number: "500+", label: "Projects Delivered" },
    { number: "15+", label: "Years of Expertise" },
    { number: "200+", label: "Bespoke Designs" },
    { number: "98%", label: "Client Satisfaction" },
  ];

  const [data, setData] = useState({ id: null, stats: defaultStats });
  const [isUploading, setIsUploading] = useState(false);

  const fetchData = async () => {
    const res = await fetchWithCloudinary("/api/content");
    if (res.ok) {
      const items = await res.json();
      const item = items.find(i => i.title === "about_stats");
      if (item) {
        let parsedStats = defaultStats;
        try {
          if (item.text) parsedStats = JSON.parse(item.text);
        } catch (e) {}
        setData({
          id: item.id,
          stats: parsedStats,
        });
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (index, field, value) => {
    const newStats = [...data.stats];
    newStats[index][field] = value;
    setData({ ...data, stats: newStats });
  };

  const handleSave = async () => {
    setIsUploading(true);
    const form = new FormData();
    form.append("type", "text");
    form.append("title", "about_stats");
    form.append("text", JSON.stringify(data.stats));

    const method = data.id ? "PATCH" : "POST";
    const url = data.id ? `/api/content/${data.id}` : "/api/content";

    try {
      const res = await fetchWithCloudinary(url, { method, body: form });
      if (res.ok) {
        await fetchData();
        alert("Stats updated successfully!");
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
          <span className="subsection-number">04</span>
          <span className="subsection-title">Stats Section</span>
        </div>
        <span className="subsection-arrow">▼</span>
      </div>
      {expanded && (
        <div className="subsection-body">
          <div className="form-grid">
            {data.stats.map((stat, i) => (
              <React.Fragment key={i}>
                <div className="input-group">
                  <label className="input-label">Stat {i+1}: Number</label>
                  <input type="text" className="text-input" value={stat.number} onChange={e => handleChange(i, 'number', e.target.value)} />
                </div>
                <div className="input-group">
                  <label className="input-label">Stat {i+1}: Label</label>
                  <input type="text" className="text-input" value={stat.label} onChange={e => handleChange(i, 'label', e.target.value)} />
                </div>
              </React.Fragment>
            ))}
          </div>
          <div className="subsection-actions">
            <button className="btn-primary" onClick={handleSave} disabled={isUploading}>{isUploading ? "Saving..." : "Save changes"}</button>
          </div>
        </div>
      )}
    </div>
  );
}
