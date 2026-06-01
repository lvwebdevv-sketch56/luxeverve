"use client";
import { fetchWithCloudinary } from "@/lib/clientFetch";
import React, { useState, useEffect } from "react";

export default function AdminFooter({ expanded, onToggle }) {
  const [loading, setLoading] = useState(false);
  const [docId, setDocId] = useState(null);
  const [data, setData] = useState({
    logoText: "Luxe Verve.",
    brandDescription: "We design exclusive luxury architect doors that move beyond conventional solutions — every piece is a bespoke architectural statement.",
    
    socialInstagram: "https://www.instagram.com/luxe_verve?igsh=MW5xZDFka3BjeHpmeg==",
    socialPinterest: "https://pin.it/5esGKiEm3",
    socialFacebook: "https://www.facebook.com/profile.php?id=61586562659611#",
    socialYoutube: "https://g.page/r/CaNjSoPDd436EBM/review",
    
    navHeading: "Explore",
    navLinks: JSON.stringify([
      { label: 'Home', href: '/home' },
      { label: 'Collection', href: '/collection' },
      { label: 'About Us', href: '/about' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Blog', href: '/blog' }
    ], null, 2),
    
    contactHeading: "Get In Touch",
    showroomLabel: "Showroom",
    contactShowroom: "Block A, 22 Sector-9\nNoida, Uttar Pradesh",
    phoneLabel: "Phone",
    contactPhone: "+91 98714 71161",
    emailLabel: "Email",
    contactEmail: "info@luxe-verve.com",
    hoursLabel: "Hours",
    contactHours: "Mon–Sat: 10am – 7pm",
    
    copyright: "© 2024 Luxe Verve. All rights reserved.",
    badge1: "Premium Quality",
    badge2: "Custom Crafted",
    badge3: "Architectural Excellence",
    bottomRightText: "Crafted with precision & elegance."
  });

  useEffect(() => {
    fetchWithCloudinary('/api/content')
      .then(async res => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        const text = await res.text();
        try {
          return JSON.parse(text);
        } catch (e) {
          throw new Error("Invalid JSON returned: " + text.slice(0, 50));
        }
      })
      .then(items => {
        const footerDoc = items.find(i => i.title === 'footer_config');
        if (footerDoc) {
          setDocId(footerDoc.id);
          if (footerDoc.text) {
            try {
              const parsed = JSON.parse(footerDoc.text);
            setData(prev => ({
              ...prev,
              ...parsed,
              navLinks: typeof parsed.navLinks === 'string' ? parsed.navLinks : JSON.stringify(parsed.navLinks || prev.navLinks, null, 2)
            }));
            } catch(e) { console.error(e); }
          }
        }
      })
      .catch(e => console.warn("Could not load admin footer data:", e.message));
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const payload = { ...data };
      try {
        payload.navLinks = JSON.parse(data.navLinks);
      } catch(e) {
        alert("Invalid JSON format in Links");
        setLoading(false);
        return;
      }

      const form = new FormData();
      form.append("type", "text");
      form.append("title", "footer_config");
      form.append("text", JSON.stringify(payload));

      const method = docId ? "PATCH" : "POST";
      const url = docId ? `/api/content/${docId}` : "/api/content";

      const res = await fetchWithCloudinary(url, {
        method: method,
        body: form
      });
      
      if (!res.ok) throw new Error("Failed to save");

      alert('Footer settings saved!');
    } catch(e) {
      alert('Error saving');
    }
    setLoading(false);
  };

  return (
    <div className={`subsection-card ${expanded ? "open" : ""}`}>
      <div className="subsection-header" onClick={onToggle}>
        <div className="subsection-title-box">
          <span className="subsection-number">FT</span>
          <span className="subsection-title">Global Footer Settings</span>
        </div>
        <span className="subsection-arrow">▼</span>
      </div>
      {expanded && (
        <div className="subsection-body">
          <div className="form-grid">
            
            <div className="input-group form-full-width"><label className="input-label" style={{color: '#ebdcb9'}}>Brand Section (Column 1)</label></div>
            <div className="input-group">
              <label className="input-label">Logo Text</label>
              <input type="text" name="logoText" value={data.logoText} onChange={handleChange} className="text-input" />
            </div>
            <div className="input-group form-full-width">
              <label className="input-label">Brand Description</label>
              <textarea name="brandDescription" value={data.brandDescription} onChange={handleChange} className="text-input" rows="2" />
            </div>

            <div className="input-group form-full-width"><label className="input-label" style={{color: '#ebdcb9'}}>Social Links</label></div>
            <div className="input-group">
              <label className="input-label">Instagram Link</label>
              <input type="text" name="socialInstagram" value={data.socialInstagram} onChange={handleChange} className="text-input" />
            </div>
            <div className="input-group">
              <label className="input-label">Pinterest Link</label>
              <input type="text" name="socialPinterest" value={data.socialPinterest} onChange={handleChange} className="text-input" />
            </div>
            <div className="input-group">
              <label className="input-label">Facebook Link</label>
              <input type="text" name="socialFacebook" value={data.socialFacebook} onChange={handleChange} className="text-input" />
            </div>
            <div className="input-group">
              <label className="input-label">YouTube / Reviews Link</label>
              <input type="text" name="socialYoutube" value={data.socialYoutube} onChange={handleChange} className="text-input" />
            </div>

            <div className="input-group form-full-width"><label className="input-label" style={{color: '#ebdcb9'}}>Navigation (Column 2)</label></div>
            <div className="input-group">
              <label className="input-label">Navigation Heading</label>
              <input type="text" name="navHeading" value={data.navHeading} onChange={handleChange} className="text-input" />
            </div>
            <div className="input-group">
              <label className="input-label">Navigation Links (JSON)</label>
              <textarea name="navLinks" value={data.navLinks} onChange={handleChange} className="text-input textarea-input" style={{fontFamily: 'monospace', fontSize: '0.8rem'}} />
            </div>

            <div className="input-group form-full-width"><label className="input-label" style={{color: '#ebdcb9'}}>Contact Section (Column 4)</label></div>
            <div className="input-group form-full-width">
              <label className="input-label">Contact Heading</label>
              <input type="text" name="contactHeading" value={data.contactHeading} onChange={handleChange} className="text-input" />
            </div>
            
            <div className="input-group">
              <label className="input-label">Showroom Label</label>
              <input type="text" name="showroomLabel" value={data.showroomLabel} onChange={handleChange} className="text-input" />
            </div>
            <div className="input-group">
              <label className="input-label">Showroom Address</label>
              <textarea name="contactShowroom" value={data.contactShowroom} onChange={handleChange} className="text-input" rows="2" />
            </div>

            <div className="input-group">
              <label className="input-label">Phone Label</label>
              <input type="text" name="phoneLabel" value={data.phoneLabel} onChange={handleChange} className="text-input" />
            </div>
            <div className="input-group">
              <label className="input-label">Phone Number</label>
              <input type="text" name="contactPhone" value={data.contactPhone} onChange={handleChange} className="text-input" />
            </div>

            <div className="input-group">
              <label className="input-label">Email Label</label>
              <input type="text" name="emailLabel" value={data.emailLabel} onChange={handleChange} className="text-input" />
            </div>
            <div className="input-group">
              <label className="input-label">Email Address</label>
              <input type="text" name="contactEmail" value={data.contactEmail} onChange={handleChange} className="text-input" />
            </div>

            <div className="input-group">
              <label className="input-label">Hours Label</label>
              <input type="text" name="hoursLabel" value={data.hoursLabel} onChange={handleChange} className="text-input" />
            </div>
            <div className="input-group">
              <label className="input-label">Hours Text</label>
              <input type="text" name="contactHours" value={data.contactHours} onChange={handleChange} className="text-input" />
            </div>

            <div className="input-group form-full-width"><label className="input-label" style={{color: '#ebdcb9'}}>Footer Bottom</label></div>
            <div className="input-group">
              <label className="input-label">Copyright Text</label>
              <input type="text" name="copyright" value={data.copyright} onChange={handleChange} className="text-input" />
            </div>
            <div className="input-group">
              <label className="input-label">Bottom Right Text</label>
              <input type="text" name="bottomRightText" value={data.bottomRightText} onChange={handleChange} className="text-input" />
            </div>
            <div className="input-group">
              <label className="input-label">Badge 1</label>
              <input type="text" name="badge1" value={data.badge1} onChange={handleChange} className="text-input" />
            </div>
            <div className="input-group">
              <label className="input-label">Badge 2</label>
              <input type="text" name="badge2" value={data.badge2} onChange={handleChange} className="text-input" />
            </div>
            <div className="input-group">
              <label className="input-label">Badge 3</label>
              <input type="text" name="badge3" value={data.badge3} onChange={handleChange} className="text-input" />
            </div>

          </div>
          <div className="subsection-actions">
            <button className="btn-primary" onClick={handleSave} disabled={loading}>
              {loading ? "Saving..." : "Save changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
