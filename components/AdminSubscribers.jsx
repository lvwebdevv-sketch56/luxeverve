"use client";

import React, { useState, useEffect } from "react";

export default function AdminSubscribers({ expanded, onToggle }) {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter");
      if (res.ok) {
        const data = await res.json();
        setSubscribers(data);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (expanded) {
      fetchSubscribers();
    }
  }, [expanded]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this subscriber?")) return;
    try {
      const res = await fetch(`/api/newsletter/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setSubscribers(subscribers.filter(s => s.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={`subsection-card ${expanded ? "open" : ""}`}>
      <div className="subsection-header" onClick={onToggle}>
        <div className="subsection-title-box">
          <span className="subsection-number">02</span>
          <span className="subsection-title">Newsletter Subscribers</span>
        </div>
        <span className="subsection-arrow">▼</span>
      </div>
      {expanded && (
        <div className="subsection-body">
          <p className="upload-subtext" style={{ marginTop: "12px", marginBottom: "20px" }}>
            List of users who have subscribed to the newsletter via the Blog page.
          </p>

          {loading ? (
            <div style={{ padding: "20px", color: "var(--primary-color)" }}>Loading subscribers...</div>
          ) : subscribers.length === 0 ? (
            <div style={{ padding: "20px", color: "rgba(255,255,255,0.5)" }}>No subscribers found.</div>
          ) : (
            <div className="list-items-container">
              {subscribers.map((sub) => (
                <div key={sub.id} className="nested-item-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div className="item-info">
                    <div className="item-thumbnail" style={{ background: "rgba(139, 94, 60, 0.2)", color: "#ebdcb9" }}>
                      ✉️
                    </div>
                    <div className="item-title-box">
                      <span className="item-title" style={{ textTransform: "lowercase", fontSize: "1rem" }}>{sub.email}</span>
                      <span className="item-desc">
                        Subscribed on: {new Date(sub.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDelete(sub.id)}
                    style={{ background: "transparent", border: "1px solid #e57373", color: "#e57373", padding: "6px 14px", borderRadius: "4px", fontSize: "0.8rem", cursor: "pointer" }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
