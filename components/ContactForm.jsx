"use client";

import React, { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus({ type: "success", message: "Your message has been sent successfully. We will get back to you soon." });
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        const errorData = await res.json();
        setStatus({ type: "error", message: errorData.error || "Failed to send message. Please try again." });
      }
    } catch (error) {
      setStatus({ type: "error", message: "An unexpected error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="contact-name" style={{ display: 'block', fontSize: '0.8rem', letterSpacing: '1px', color: 'var(--primary-color)', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 'bold' }}>Full Name</label>
        <input 
          id="contact-name" 
          type="text" 
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          style={{ width: '100%', background: 'transparent', border: '1px solid var(--primary-color)', borderRadius: '4px', padding: '14px 18px', color: 'var(--text-main)', fontSize: '1rem', fontFamily: 'var(--font-sans)', outline: 'none' }} 
        />
      </div>
      <div>
        <label htmlFor="contact-email" style={{ display: 'block', fontSize: '0.8rem', letterSpacing: '1px', color: 'var(--primary-color)', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 'bold' }}>Email Address</label>
        <input 
          id="contact-email" 
          type="email" 
          placeholder="your@email.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          style={{ width: '100%', background: 'transparent', border: '1px solid var(--primary-color)', borderRadius: '4px', padding: '14px 18px', color: 'var(--text-main)', fontSize: '1rem', fontFamily: 'var(--font-sans)', outline: 'none' }} 
        />
      </div>
      <div>
        <label htmlFor="contact-phone" style={{ display: 'block', fontSize: '0.8rem', letterSpacing: '1px', color: 'var(--primary-color)', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 'bold' }}>Phone Number</label>
        <input 
          id="contact-phone" 
          type="tel" 
          placeholder="+91 00000 00000"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
          style={{ width: '100%', background: 'transparent', border: '1px solid var(--primary-color)', borderRadius: '4px', padding: '14px 18px', color: 'var(--text-main)', fontSize: '1rem', fontFamily: 'var(--font-sans)', outline: 'none' }} 
        />
      </div>
      <div>
        <label htmlFor="contact-message" style={{ display: 'block', fontSize: '0.8rem', letterSpacing: '1px', color: 'var(--primary-color)', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 'bold' }}>Message</label>
        <textarea 
          id="contact-message" 
          rows={5} 
          placeholder="Describe your dream door..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
          style={{ width: '100%', background: 'transparent', border: '1px solid var(--primary-color)', borderRadius: '4px', padding: '14px 18px', color: 'var(--text-main)', fontSize: '1rem', fontFamily: 'var(--font-sans)', outline: 'none', resize: 'vertical' }} 
        />
      </div>
      {status.message && (
        <div style={{ color: status.type === 'success' ? '#4caf50' : '#e57373', fontSize: '0.9rem', marginBottom: '10px' }}>
          {status.message}
        </div>
      )}
      <button type="submit" disabled={isSubmitting} style={{ alignSelf: 'flex-start', opacity: isSubmitting ? 0.7 : 1 }}>
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
