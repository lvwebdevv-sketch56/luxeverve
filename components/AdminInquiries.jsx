"use client";

import React, { useState, useEffect } from "react";

export default function AdminInquiries({ expanded, onToggle }) {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact");
      if (res.ok) {
        const data = await res.json();
        setInquiries(data);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (expanded) {
      fetchInquiries();
    }
  }, [expanded]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;
    try {
      const res = await fetch(`/api/contact/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setInquiries(inquiries.filter(i => i.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={`subsection-card ${expanded ? "open" : ""}`}>
      <div className="subsection-header" onClick={onToggle}>
        <div className="subsection-title-box">
          <span className="subsection-number">01</span>
          <span className="subsection-title">Customer Inquiries</span>
        </div>
        <span className="subsection-arrow">▼</span>
      </div>
      {expanded && (
        <div className="subsection-body">
          <p className="upload-subtext" style={{ marginTop: "12px", marginBottom: "20px" }}>
            Messages sent from the Contact Us form on the main website.
          </p>

          {loading ? (
            <div style={{ padding: "20px", color: "var(--primary-color)" }}>Loading inquiries...</div>
          ) : inquiries.length === 0 ? (
            <div style={{ padding: "20px", color: "rgba(255,255,255,0.5)" }}>No inquiries found.</div>
          ) : (
            <div className="list-items-container">
              {inquiries.map((inq) => (
                <div key={inq.id} style={{
                  background: "rgba(18, 14, 12, 0.4)",
                  border: "1px solid rgba(216, 199, 180, 0.1)",
                  borderRadius: "10px",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: "1.1rem", color: "#ebdcb9", fontFamily: "var(--font-knockout)" }}>
                        {inq.name}
                      </h4>
                      <p style={{ margin: "4px 0 0", fontSize: "0.85rem", color: "rgba(255,255,255,0.7)" }}>
                        <a href={`mailto:${inq.email}`} style={{ color: "var(--primary-color)", textDecoration: "none" }}>{inq.email}</a> 
                        {inq.phone && <span style={{ marginLeft: "12px" }}>• <a href={`tel:${inq.phone}`} style={{ color: "var(--primary-color)", textDecoration: "none" }}>{inq.phone}</a></span>}
                      </p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
                      <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>
                        {new Date(inq.createdAt).toLocaleString()}
                      </span>
                      <button 
                        onClick={() => handleDelete(inq.id)}
                        style={{ background: "transparent", border: "1px solid #e57373", color: "#e57373", padding: "4px 10px", borderRadius: "4px", fontSize: "0.75rem", cursor: "pointer" }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div style={{ 
                    padding: "16px", 
                    background: "rgba(0,0,0,0.2)", 
                    borderRadius: "6px",
                    color: "rgba(255,255,255,0.85)",
                    fontSize: "0.95rem",
                    lineHeight: 1.6,
                    whiteSpace: "pre-wrap"
                  }}>
                    {inq.message}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
