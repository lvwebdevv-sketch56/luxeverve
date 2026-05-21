"use client";

import React, { useState, useEffect } from "react";

export default function AdminContactDetails({ expanded, onToggle }) {
  const defaultDetails = [
    { icon: '📞', label: 'Phone', value: '+91 98714 71161' },
    { icon: '✉️', label: 'Email', value: 'INFO@LUXE-VERVE.COM' },
    { icon: '📍', label: 'Showroom', value: 'New Delhi, India' },
    { icon: '🕐', label: 'Hours', value: 'Mon–Sat: 10am – 7pm' },
  ];

  const [data, setData] = useState({ 
    id: null, 
    title: "Get In Touch", 
    whatsapp: "https://wa.me/919871471161",
    details: defaultDetails
  });
  const [isUploading, setIsUploading] = useState(false);

  const fetchData = async () => {
    const res = await fetch("/api/content");
    if (res.ok) {
      const items = await res.json();
      const item = items.find(i => i.title === "contact_details");
      if (item) {
        let parsedDetails = defaultDetails;
        try {
          if (item.text) parsedDetails = JSON.parse(item.text);
        } catch (e) {}
        setData({
          id: item.id,
          title: item.description || "Get In Touch",
          whatsapp: item.url || "https://wa.me/919871471161",
          details: parsedDetails,
        });
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (index, field, value) => {
    const newDetails = [...data.details];
    newDetails[index][field] = value;
    setData({ ...data, details: newDetails });
  };

  const handleSave = async () => {
    setIsUploading(true);
    const form = new FormData();
    form.append("type", "text");
    form.append("title", "contact_details");
    form.append("description", data.title);
    form.append("url", data.whatsapp);
    form.append("text", JSON.stringify(data.details));

    const method = data.id ? "PATCH" : "POST";
    const url = data.id ? `/api/content/${data.id}` : "/api/content";

    try {
      const res = await fetch(url, { method, body: form });
      if (res.ok) {
        await fetchData();
        alert("Contact Details updated successfully!");
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
          <span className="subsection-title">Contact Card Details</span>
        </div>
        <span className="subsection-arrow">▼</span>
      </div>
      {expanded && (
        <div className="subsection-body">
          <div className="form-grid">
            <div className="input-group form-full-width">
              <label className="input-label">Section Heading</label>
              <input type="text" className="text-input" value={data.title} onChange={e => setData({...data, title: e.target.value})} />
            </div>
            
            {data.details.map((detail, i) => (
              <React.Fragment key={i}>
                <div className="input-group">
                  <label className="input-label">Item {i+1} Icon (Emoji)</label>
                  <input type="text" className="text-input" value={detail.icon} onChange={e => handleChange(i, 'icon', e.target.value)} />
                </div>
                <div className="input-group">
                  <label className="input-label">Item {i+1} Label (e.g. Phone)</label>
                  <input type="text" className="text-input" value={detail.label} onChange={e => handleChange(i, 'label', e.target.value)} />
                </div>
                <div className="input-group form-full-width">
                  <label className="input-label">Item {i+1} Value</label>
                  <input type="text" className="text-input" value={detail.value} onChange={e => handleChange(i, 'value', e.target.value)} />
                </div>
              </React.Fragment>
            ))}
            
            <div className="input-group form-full-width">
              <label className="input-label">WhatsApp Contact Link</label>
              <input type="text" className="text-input" value={data.whatsapp} onChange={e => setData({...data, whatsapp: e.target.value})} />
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
