"use client";
import { fetchWithCloudinary } from "@/lib/clientFetch";

import React, { useState, useEffect } from "react";

export default function AdminFooter({ expanded, onToggle }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    brandStatement: "Crafted For Those Who Demand Excellence",
    wordmark: "LUXE VERVE",
    subtitle: "Luxury Architectural Doors · Est. in Excellence",
    contactHeading: "Get In Touch",
    contactPhone: "+91 98714 71161",
    contactEmail: "INFO@LUXE-VERVE.COM",
    contactShowroom: "Block A, 22 Sector-9\nNoida, Uttar Pradesh",
    socialPinterest: "https://pin.it/5esGKiEm3",
    socialFacebook: "https://www.facebook.com/profile.php?id=61586562659611#",
    socialYoutube: "https://g.page/r/CaNjSoPDd436EBM/review",
    socialInstagram: "https://www.instagram.com/luxe_verve?igsh=MW5xZDFka3BjeHpmeg==",
    copyright: "© 2024 Luxe Verve. All Rights Reserved.",
    navLinks: JSON.stringify([
      { label: 'Home', href: '/home' },
      { label: 'Collection', href: '/collection' },
      { label: 'About Us', href: '/about' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Blog', href: '/blog' }
    ], null, 2),
    services: JSON.stringify([
      'Luxury Entrance Doors',
      'Pivot Door Systems',
      'Custom Wood Panels',
      'Commercial Projects',
      'Design Consultation'
    ], null, 2)
  });

  useEffect(() => {
    fetchWithCloudinary('/api/content')
      .then(res => res.json())
      .then(items => {
        const footerDoc = items.find(i => i.title === 'footer_config');
        if (footerDoc && footerDoc.text) {
          try {
            const parsed = JSON.parse(footerDoc.text);
            setData({
              brandStatement: parsed.brandStatement || "Crafted For Those Who Demand Excellence",
              wordmark: parsed.wordmark || "LUXE VERVE",
              subtitle: parsed.subtitle || "Luxury Architectural Doors · Est. in Excellence",
              contactHeading: parsed.contactHeading || "Get In Touch",
              contactPhone: parsed.contactPhone || "+91 98714 71161",
              contactEmail: parsed.contactEmail || "INFO@LUXE-VERVE.COM",
              contactShowroom: parsed.contactShowroom || "Block A, 22 Sector-9\nNoida, Uttar Pradesh",
              socialPinterest: parsed.socialPinterest || "https://pin.it/5esGKiEm3",
              socialFacebook: parsed.socialFacebook || "https://www.facebook.com/profile.php?id=61586562659611#",
              socialYoutube: parsed.socialYoutube || "https://g.page/r/CaNjSoPDd436EBM/review",
              socialInstagram: parsed.socialInstagram || "https://www.instagram.com/luxe_verve?igsh=MW5xZDFka3BjeHpmeg==",
              copyright: parsed.copyright || "© 2024 Luxe Verve. All Rights Reserved.",
              navLinks: typeof parsed.navLinks === 'string' ? parsed.navLinks : JSON.stringify(parsed.navLinks || [], null, 2),
              services: typeof parsed.services === 'string' ? parsed.services : JSON.stringify(parsed.services || [], null, 2)
            });
          } catch(e) { console.error(e); }
        }
      });
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
        payload.services = JSON.parse(data.services);
      } catch(e) {
        alert("Invalid JSON format in Links or Services");
        setLoading(false);
        return;
      }

      await fetchWithCloudinary('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'footer_config',
          text: JSON.stringify(payload)
        })
      });
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
            
            <div className="input-group form-full-width"><label className="input-label" style={{color: '#ebdcb9'}}>Brand Display</label></div>
            <div className="input-group">
              <label className="input-label">Top Statement</label>
              <input type="text" name="brandStatement" value={data.brandStatement} onChange={handleChange} className="text-input" />
            </div>
            <div className="input-group">
              <label className="input-label">Wordmark</label>
              <input type="text" name="wordmark" value={data.wordmark} onChange={handleChange} className="text-input" />
            </div>
            <div className="input-group form-full-width">
              <label className="input-label">Subtitle</label>
              <input type="text" name="subtitle" value={data.subtitle} onChange={handleChange} className="text-input" />
            </div>

            <div className="input-group form-full-width"><label className="input-label" style={{color: '#ebdcb9'}}>Contact Details</label></div>
            <div className="input-group">
              <label className="input-label">Contact Heading</label>
              <input type="text" name="contactHeading" value={data.contactHeading} onChange={handleChange} className="text-input" />
            </div>
            <div className="input-group">
              <label className="input-label">Phone</label>
              <input type="text" name="contactPhone" value={data.contactPhone} onChange={handleChange} className="text-input" />
            </div>
            <div className="input-group">
              <label className="input-label">Email</label>
              <input type="text" name="contactEmail" value={data.contactEmail} onChange={handleChange} className="text-input" />
            </div>
            <div className="input-group">
              <label className="input-label">Showroom Address</label>
              <textarea name="contactShowroom" value={data.contactShowroom} onChange={handleChange} className="text-input" rows="2" />
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

            <div className="input-group form-full-width"><label className="input-label" style={{color: '#ebdcb9'}}>Menu & Services (JSON Format)</label></div>
            <div className="input-group">
              <label className="input-label">Navigation Links (JSON)</label>
              <textarea name="navLinks" value={data.navLinks} onChange={handleChange} className="text-input textarea-input" style={{fontFamily: 'monospace', fontSize: '0.8rem'}} />
            </div>
            <div className="input-group">
              <label className="input-label">Services List (JSON Strings)</label>
              <textarea name="services" value={data.services} onChange={handleChange} className="text-input textarea-input" style={{fontFamily: 'monospace', fontSize: '0.8rem'}} />
            </div>

            <div className="input-group form-full-width"><label className="input-label" style={{color: '#ebdcb9'}}>Footer Bottom</label></div>
            <div className="input-group form-full-width">
              <label className="input-label">Copyright Text</label>
              <input type="text" name="copyright" value={data.copyright} onChange={handleChange} className="text-input" />
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
