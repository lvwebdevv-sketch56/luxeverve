"use client";

import React, { useState, useEffect } from "react";

export default function AdminContactMap({ expanded, onToggle }) {
  const [data, setData] = useState({ 
    id: null, 
    heading: "Luxe Verve, New Delhi", 
    subheading: "HQ & STUDIO",
    mapIframe: "https://maps.google.com/maps?q=Luxe%20verve,%20New%20Delhi&t=&z=11&ie=UTF8&iwloc=&output=embed",
    mapLink: "https://maps.app.goo.gl/KmV96fgGTrLg3n3V6?g_st=aw"
  });
  const [isUploading, setIsUploading] = useState(false);

  const fetchData = async () => {
    const res = await fetch("/api/content");
    if (res.ok) {
      const items = await res.json();
      const item = items.find(i => i.title === "contact_map");
      if (item) {
        setData({
          id: item.id,
          heading: item.description || "Luxe Verve, New Delhi",
          subheading: item.text || "HQ & STUDIO",
          mapIframe: item.url || "https://maps.google.com/maps?q=Luxe%20verve,%20New%20Delhi&t=&z=11&ie=UTF8&iwloc=&output=embed",
          mapLink: item.publicId || "https://maps.app.goo.gl/KmV96fgGTrLg3n3V6?g_st=aw", // Using publicId to store an extra string since we don't have enough fields, or we could JSON stringify text. Let's use publicId as a hack or just stringify.
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
    form.append("title", "contact_map");
    form.append("description", data.heading);
    form.append("text", data.subheading);
    form.append("url", data.mapIframe);
    // Note: api/content.js route might not accept publicId from formData directly unless it's an image.
    // Let's store mapLink as a JSON object in text field along with subheading instead to be safe.
    form.append("text", JSON.stringify({ subheading: data.subheading, link: data.mapLink }));

    const method = data.id ? "PATCH" : "POST";
    const url = data.id ? `/api/content/${data.id}` : "/api/content";

    try {
      const res = await fetch(url, { method, body: form });
      if (res.ok) {
        await fetchData();
        alert("Map settings updated successfully!");
      } else {
        alert("Failed to update");
      }
    } catch (e) {}
    setIsUploading(false);
  };

  // Safe parse on load
  useEffect(() => {
    const parseData = async () => {
      const res = await fetch("/api/content");
      if (res.ok) {
        const items = await res.json();
        const item = items.find(i => i.title === "contact_map");
        if (item) {
          let sub = "HQ & STUDIO";
          let link = "https://maps.app.goo.gl/KmV96fgGTrLg3n3V6?g_st=aw";
          try {
            const parsed = JSON.parse(item.text);
            if(parsed.subheading) sub = parsed.subheading;
            if(parsed.link) link = parsed.link;
          } catch(e) {
            // It might just be a string if old data
            if (item.text) sub = item.text;
          }
          
          setData({
            id: item.id,
            heading: item.description || "Luxe Verve, New Delhi",
            subheading: sub,
            mapIframe: item.url || "https://maps.google.com/maps?q=Luxe%20verve,%20New%20Delhi&t=&z=11&ie=UTF8&iwloc=&output=embed",
            mapLink: link
          });
        }
      }
    };
    parseData();
  }, []);

  return (
    <div className={`subsection-card ${expanded ? "open" : ""}`}>
      <div className="subsection-header" onClick={onToggle}>
        <div className="subsection-title-box">
          <span className="subsection-number">03</span>
          <span className="subsection-title">Google Maps Settings</span>
        </div>
        <span className="subsection-arrow">▼</span>
      </div>
      {expanded && (
        <div className="subsection-body">
          <div className="form-grid">
            <div className="input-group">
              <label className="input-label">Map Overlay Heading</label>
              <input type="text" className="text-input" value={data.heading} onChange={e => setData({...data, heading: e.target.value})} />
            </div>
            <div className="input-group">
              <label className="input-label">Map Overlay Subheading</label>
              <input type="text" className="text-input" value={data.subheading} onChange={e => setData({...data, subheading: e.target.value})} />
            </div>
            <div className="input-group form-full-width">
              <label className="input-label">Clickable Map Link (Href)</label>
              <input type="text" className="text-input" value={data.mapLink} onChange={e => setData({...data, mapLink: e.target.value})} />
            </div>
            <div className="input-group form-full-width">
              <label className="input-label">Iframe Embed Src URL</label>
              <input type="text" className="text-input" value={data.mapIframe} onChange={e => setData({...data, mapIframe: e.target.value})} />
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
