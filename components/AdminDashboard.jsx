"use client";

import React, { useState } from "react";
import AdminBannerSection from "./AdminBannerSection";
import AdminHeroCardsSection from "./AdminHeroCardsSection";
import AdminSection1 from "./AdminSection1";
import AdminSection3 from "./AdminSection3";
import AdminCollectionBanner from "./AdminCollectionBanner";
import AdminCollectionSec2 from "./AdminCollectionSec2";
import AdminCollectionSlider from "./AdminCollectionSlider";
import AdminCollectionFlipbook from "./AdminCollectionFlipbook";
import AdminAboutBanner from "./AdminAboutBanner";
import AdminAboutMain from "./AdminAboutMain";
import AdminAboutImageText from "./AdminAboutImageText";
import AdminAboutStats from "./AdminAboutStats";
import AdminContactBanner from "./AdminContactBanner";
import AdminContactDetails from "./AdminContactDetails";
import AdminContactMap from "./AdminContactMap";
import AdminBlogBanner from "./AdminBlogBanner";
import AdminBlogCategories from "./AdminBlogCategories";
import AdminBlogNewsletter from "./AdminBlogNewsletter";
import AdminBlogPosts from "./AdminBlogPosts";
import AdminInquiries from "./AdminInquiries";
import AdminSubscribers from "./AdminSubscribers";

export default function AdminDashboard({ user, handleSignOutAction }) {
  const [activeTab, setActiveTab] = useState("home");
  const [expandedSubsections, setExpandedSubsections] = useState({
    // Home subsections
    "home_banner": true,
    "home_cards": false,
    "home_section1": false,
    "home_section2": false,
    "home_section3": false,
    "home_section4": false,
    "home_section5": false,
    // Collection subsections
    "coll_banner": true,
    "coll_sec2": false,
    "coll_slider1": false,
    "coll_slider2": false,
    "coll_slider3": false,
    "coll_flip1": false,
    "coll_flip2": false,
    // About subsections
    "about_hero": true,
    "about_main": false,
    "about_sec2": false,
    "about_sec3": false,
    "about_stats": false,
    // Blog subsections
    "blog_hero": true,
    "blog_filter": false,
    "blog_featured": false,
    "blog_grid": false,
    "blog_newsletter": false,
    // Read More subsections
    "rm_hero": true,
    "rm_author": false,
    "rm_blocks": false,
    "rm_share": false,
    // Contact subsections
    "contact_hero": true,
    "contact_details": false,
    "contact_map": false,
    // Users subsections
    "user_inquiries": true,
    "user_subscribers": false,
  });

  const toggleSubsection = (id) => {
    setExpandedSubsections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const tabs = [
    { id: "home", label: "Home Page", icon: "💎" },
    { id: "collection", label: "Collections", icon: "🚪" },
    { id: "about", label: "About Us", icon: "🏛️" },
    { id: "blog", label: "Blog Editorial", icon: "✍️" },
    { id: "contact", label: "Contact Info", icon: "✉️" },
    { id: "users", label: "User Inquiries", icon: "👥" },
  ];

  return (
    <div className="dashboard-wrapper">
      {/* CSS Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500;600&display=swap');

        .dashboard-wrapper {
          min-height: 100vh;
          display: flex;
          background-color: #120e0c; /* Ultra dark luxury background */
          color: #f3ece4;
          font-family: 'Inter', sans-serif;
          overflow: hidden;
        }

        /* Sidebar Styling */
        .sidebar {
          width: 320px;
          background: rgba(26, 21, 18, 0.95);
          border-right: 1px solid rgba(216, 199, 180, 0.15);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 40px 24px;
          box-shadow: 10px 0 30px rgba(0, 0, 0, 0.5);
          z-index: 10;
          flex-shrink: 0;
        }

        .sidebar-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .sidebar-logo {
          font-family: 'Cinzel', serif;
          font-size: 1.8rem;
          letter-spacing: 0.25em;
          color: #ebdcb9; /* Luxury warm gold */
          text-transform: uppercase;
          display: block;
          margin-bottom: 6px;
          text-shadow: 0 2px 10px rgba(235, 220, 185, 0.15);
        }

        .sidebar-tagline {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          color: #bfa68a;
          font-size: 0.9rem;
          letter-spacing: 0.05em;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: auto;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 20px;
          background: transparent;
          border: 1px solid transparent;
          border-radius: 12px;
          color: #ebdcb9;
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          font-weight: 500;
          text-align: left;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
          letter-spacing: 0.05em;
          box-shadow: none;
        }

        .nav-item:hover {
          background: rgba(139, 94, 60, 0.08);
          border-color: rgba(216, 199, 180, 0.25);
          transform: translateX(5px);
          color: #ffffff;
        }

        .nav-item.active {
          background: linear-gradient(135deg, rgba(110, 68, 42, 0.8), rgba(139, 94, 60, 0.6));
          border-color: #bfa68a;
          color: #ffffff;
          box-shadow: 0 10px 20px rgba(110, 68, 42, 0.2);
        }

        .nav-icon {
          font-size: 1.2rem;
        }

        .sidebar-footer {
          border-top: 1px solid rgba(216, 199, 180, 0.1);
          padding-top: 24px;
          margin-top: 30px;
        }

        .admin-profile {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 20px;
        }

        .admin-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #8b5e3c;
          border: 2px solid #ebdcb9;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: #ffffff;
          font-size: 1.1rem;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        }

        .admin-info {
          display: flex;
          flex-direction: column;
        }

        .admin-name {
          font-size: 0.95rem;
          font-weight: 600;
          color: #ebdcb9;
        }

        .admin-role {
          font-size: 0.75rem;
          color: #bfa68a;
          letter-spacing: 0.05em;
        }

        .signout-button {
          width: 100%;
          padding: 12px 20px;
          border: 1px solid rgba(216, 199, 180, 0.25);
          background: transparent;
          color: #ebdcb9;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition: all 0.3s ease;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
        }

        .signout-button:hover {
          background: rgba(229, 115, 115, 0.1);
          border-color: #e57373;
          color: #e57373;
        }

        /* Content Area Styling */
        .main-content {
          flex-grow: 1;
          padding: 50px 60px;
          overflow-y: auto;
          height: 100vh;
          background: radial-gradient(circle at top right, rgba(139, 94, 60, 0.05), transparent 60%);
        }

        .content-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          border-bottom: 1px solid rgba(216, 199, 180, 0.1);
          padding-bottom: 24px;
          margin-bottom: 40px;
        }

        .header-title-box h2 {
          font-family: 'Cinzel', serif;
          font-size: 2.2rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          color: #ffffff;
          margin: 0;
          text-transform: uppercase;
        }

        .header-title-box p {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          color: #bfa68a;
          margin: 6px 0 0 0;
          font-size: 1.1rem;
        }

        .publish-btn {
          background: #8b5e3c;
          border: 1px solid #ebdcb9;
          color: #ffffff;
          border-radius: 8px;
          padding: 12px 28px;
          font-size: 0.9rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(139, 94, 60, 0.3);
        }

        .publish-btn:hover {
          background: #ebdcb9;
          color: #120e0c;
          border-color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(235, 220, 185, 0.4);
        }

        /* Subsection Accordions */
        .subsection-card {
          background: rgba(26, 21, 18, 0.5);
          border: 1px solid rgba(216, 199, 180, 0.1);
          border-radius: 16px;
          margin-bottom: 24px;
          overflow: hidden;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .subsection-card:hover {
          border-color: rgba(216, 199, 180, 0.25);
          background: rgba(26, 21, 18, 0.7);
        }

        .subsection-header {
          padding: 24px 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          user-select: none;
        }

        .subsection-title-box {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .subsection-number {
          font-family: 'Cinzel', serif;
          color: #8b5e3c;
          font-size: 1rem;
          font-weight: bold;
          background: rgba(139, 94, 60, 0.1);
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(139, 94, 60, 0.2);
        }

        .subsection-title {
          font-family: 'Cinzel', serif;
          font-size: 1.15rem;
          font-weight: 500;
          color: #ebdcb9;
          letter-spacing: 0.05em;
        }

        .subsection-arrow {
          font-size: 0.9rem;
          color: #bfa68a;
          transition: transform 0.3s ease;
        }

        .subsection-card.open .subsection-arrow {
          transform: rotate(180deg);
        }

        .subsection-body {
          padding: 0 30px 30px 30px;
          border-top: 1px solid rgba(216, 199, 180, 0.08);
          animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Form elements inside accordion */
        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          margin-top: 24px;
        }

        .form-full-width {
          grid-column: span 2;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .input-label {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #bfa68a;
          font-weight: 600;
        }

        .text-input {
          width: 100%;
          padding: 14px 18px;
          background: rgba(18, 14, 12, 0.8);
          border: 1px solid rgba(216, 199, 180, 0.2);
          border-radius: 8px;
          color: #ffffff;
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          outline: none;
          transition: all 0.3s ease;
        }

        .text-input:focus {
          border-color: #8b5e3c;
          background: #120e0c;
          box-shadow: 0 0 0 3px rgba(139, 94, 60, 0.2);
        }

        .textarea-input {
          min-height: 120px;
          resize: vertical;
        }

        /* Luxury Media Upload Zones */
        .media-upload-zone {
          border: 1px dashed rgba(216, 199, 180, 0.3);
          background: rgba(18, 14, 12, 0.5);
          border-radius: 12px;
          padding: 24px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .media-upload-zone:hover {
          border-color: #ebdcb9;
          background: rgba(139, 94, 60, 0.05);
        }

        .upload-icon {
          font-size: 2rem;
          color: #8b5e3c;
        }

        .upload-text {
          font-size: 0.9rem;
          color: #ebdcb9;
          font-weight: 500;
        }

        .upload-subtext {
          font-size: 0.75rem;
          color: #bfa68a;
        }

        /* List Cards inside Home Cards and Blog Grid */
        .list-items-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 20px;
        }

        .nested-item-row {
          background: rgba(18, 14, 12, 0.4);
          border: 1px solid rgba(216, 199, 180, 0.1);
          border-radius: 10px;
          padding: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: all 0.3s ease;
        }

        .nested-item-row:hover {
          border-color: rgba(139, 94, 60, 0.3);
          background: rgba(18, 14, 12, 0.6);
        }

        .item-info {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .item-thumbnail {
          width: 50px;
          height: 50px;
          border-radius: 6px;
          background: #251e1a;
          border: 1px solid rgba(216, 199, 180, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }

        .item-title-box {
          display: flex;
          flex-direction: column;
        }

        .item-title {
          font-size: 0.95rem;
          font-weight: 600;
          color: #ebdcb9;
        }

        .item-desc {
          font-size: 0.8rem;
          color: #bfa68a;
        }

        .edit-item-btn {
          background: transparent;
          border: 1px solid rgba(216, 199, 180, 0.3);
          padding: 6px 14px;
          font-size: 0.8rem;
          font-weight: 500;
          color: #ebdcb9;
          border-radius: 6px;
          transition: all 0.3s ease;
        }

        .edit-item-btn:hover {
          background: rgba(139, 94, 60, 0.1);
          border-color: #ebdcb9;
          color: #ffffff;
        }

        /* Action Buttons Row */
        .subsection-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 24px;
          border-top: 1px solid rgba(216, 199, 180, 0.08);
          padding-top: 20px;
        }

        .btn-secondary {
          border: 1px solid rgba(216, 199, 180, 0.25);
          color: #ebdcb9;
          background: transparent;
          font-size: 0.85rem;
          padding: 8px 18px;
          border-radius: 6px;
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #ffffff;
          border-color: rgba(216, 199, 180, 0.5);
        }

        .btn-primary {
          background: #8b5e3c;
          border: 1px solid #ebdcb9;
          color: #ffffff;
          font-size: 0.85rem;
          padding: 8px 20px;
          border-radius: 6px;
          box-shadow: 0 4px 10px rgba(139, 94, 60, 0.25);
        }

        .btn-primary:hover {
          background: #ebdcb9;
          color: #120e0c;
          transform: translateY(-1px);
        }

        /* Scrollbar custom styling */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #120e0c;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(139, 94, 60, 0.3);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 94, 60, 0.5);
        }

        @media (max-width: 992px) {
          .dashboard-wrapper {
            flex-direction: column;
          }
          .sidebar {
            width: 100%;
            height: auto;
            border-right: none;
            border-bottom: 1px solid rgba(216, 199, 180, 0.15);
            padding: 30px 20px;
          }
          .main-content {
            padding: 30px 20px;
            height: auto;
          }
          .form-grid {
            grid-template-columns: 1fr;
          }
          .form-full-width {
            grid-column: span 1;
          }
        }
      ` }} />

      {/* Left Sidebar Panel */}
      <aside className="sidebar">
        <div>
          <div className="sidebar-header">
            <span className="sidebar-logo">Luxe Verve</span>
            <span className="sidebar-tagline">Console Administrateur</span>
          </div>

          <nav className="sidebar-nav">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`nav-item ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="nav-icon">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="sidebar-footer">
          <div className="admin-profile">
            <div className="admin-avatar">
              {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
            </div>
            <div className="admin-info">
              <span className="admin-name">{user?.name || "Administrator"}</span>
              <span className="admin-role">System Manager</span>
            </div>
          </div>

          <form action={handleSignOutAction}>
            <button type="submit" className="signout-button">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "4px" }}>
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Right Content Panel */}
      <main className="main-content">
        <div className="content-header">
          <div className="header-title-box">
            <h2>{tabs.find(t => t.id === activeTab)?.label} Settings</h2>
            <p>Customize and manage the elements of the {activeTab} layout.</p>
          </div>
          <button className="publish-btn" onClick={() => alert("Changes published successfully & regenerated website via ISR!")}>
            Publish Live
          </button>
        </div>

        {/* Tab 1: Home Page Subsections */}
        {activeTab === "home" && (
          <div className="subsections-list">
            
            {/* 1.1 Banner Video */}
            <AdminBannerSection 
              expanded={expandedSubsections.home_banner} 
              onToggle={() => toggleSubsection("home_banner")} 
            />

            {/* 1.2 Hero Cards */}
            <AdminHeroCardsSection 
              expanded={expandedSubsections.home_cards} 
              onToggle={() => toggleSubsection("home_cards")} 
            />

            {/* 1.3 Section 1 */}
            <AdminSection1 
              expanded={expandedSubsections.home_section1} 
              onToggle={() => toggleSubsection("home_section1")} 
            />

            {/* 1.4 Section 2 */}
            <div className={`subsection-card ${expandedSubsections.home_section2 ? "open" : ""}`}>
              <div className="subsection-header" onClick={() => toggleSubsection("home_section2")}>
                <div className="subsection-title-box">
                  <span className="subsection-number">04</span>
                  <span className="subsection-title">Section 2: Image Left, Text Right</span>
                </div>
                <span className="subsection-arrow">▼</span>
              </div>
              {expandedSubsections.home_section2 && (
                <div className="subsection-body">
                  <div className="form-grid">
                    <div className="input-group form-full-width">
                      <label className="input-label">Section Heading</label>
                      <input type="text" className="text-input" defaultValue="Personal Note" />
                    </div>
                    <div className="input-group form-full-width">
                      <label className="input-label">Body Text paragraph</label>
                      <textarea className="text-input textarea-input" defaultValue="At Luxe-Verve, we design exclusive luxury architect doors that move beyond conventional or standard door solutions. Each door is conceived with a distinct design philosophy, using carefully selected premium materials that set our work apart from ordinary wooden or mass-produced doors." />
                    </div>
                    <div className="input-group form-full-width">
                      <label className="input-label">Upload Showcase Image</label>
                      <div className="media-upload-zone">
                        <span className="upload-icon">🖼️</span>
                        <span className="upload-text">Select or drag storefront showcase image</span>
                        <span className="upload-subtext">Recommended: JPG, PNG, WEBP (ratio 16:10 or 4:3)</span>
                      </div>
                    </div>
                  </div>
                  <div className="subsection-actions">
                    <button className="btn-primary">Save changes</button>
                  </div>
                </div>
              )}
            </div>

            {/* 1.5 Section 3 */}
            <AdminSection3 
              expanded={expandedSubsections.home_section3} 
              onToggle={() => toggleSubsection("home_section3")} 
            />

            {/* 1.6 Section 4 */}
            <div className={`subsection-card ${expandedSubsections.home_section4 ? "open" : ""}`}>
              <div className="subsection-header" onClick={() => toggleSubsection("home_section4")}>
                <div className="subsection-title-box">
                  <span className="subsection-number">06</span>
                  <span className="subsection-title">Section 4: Luxe Details Logo and Header</span>
                </div>
                <span className="subsection-arrow">▼</span>
              </div>
              {expandedSubsections.home_section4 && (
                <div className="subsection-body">
                  <div className="form-grid">
                    <div className="input-group form-full-width">
                      <label className="input-label">Brand Logo Image (Asset)</label>
                      <input type="text" className="text-input" defaultValue="/images/logo.png" />
                    </div>
                    <div className="input-group form-full-width">
                      <label className="input-label">Upload New Logo to Cloudinary</label>
                      <div className="media-upload-zone">
                        <span className="upload-icon">💠</span>
                        <span className="upload-text">Upload new PNG / SVG logo</span>
                      </div>
                    </div>
                  </div>
                  <div className="subsection-actions">
                    <button className="btn-primary">Save changes</button>
                  </div>
                </div>
              )}
            </div>

            {/* 1.7 Section 5 */}
            <div className={`subsection-card ${expandedSubsections.home_section5 ? "open" : ""}`}>
              <div className="subsection-header" onClick={() => toggleSubsection("home_section5")}>
                <div className="subsection-title-box">
                  <span className="subsection-number">07</span>
                  <span className="subsection-title">Section 5: Luxe Details Grid</span>
                </div>
                <span className="subsection-arrow">▼</span>
              </div>
              {expandedSubsections.home_section5 && (
                <div className="subsection-body">
                  <div className="form-grid">
                    <div className="input-group form-full-width">
                      <label className="input-label" style={{ color: "#ebdcb9", fontSize: "0.9rem" }}>Column 1: Contact Information Box</label>
                    </div>
                    <div className="input-group">
                      <label className="input-label">Contact Heading</label>
                      <input type="text" className="text-input" defaultValue="Begin Your Luxe-Verve Luxury Door Experience" />
                    </div>
                    <div className="input-group">
                      <label className="input-label">Physical Address</label>
                      <input type="text" className="text-input" defaultValue="Block A, 22 Sector-9 Noida, Uttar Pradesh." />
                    </div>
                    <div className="input-group">
                      <label className="input-label">Contact Phone</label>
                      <input type="text" className="text-input" defaultValue="+91-98714 71161" />
                    </div>
                    <div className="input-group">
                      <label className="input-label">Contact Email</label>
                      <input type="text" className="text-input" defaultValue="info@luxe-verve.com" />
                    </div>

                    <div className="input-group form-full-width" style={{ borderTop: "1px solid rgba(216,199,180,0.1)", paddingTop: "20px" }}>
                      <label className="input-label" style={{ color: "#ebdcb9", fontSize: "0.9rem" }}>Column 2: Legacy Statement</label>
                    </div>
                    <div className="input-group">
                      <label className="input-label">Legacy Heading</label>
                      <input type="text" className="text-input" defaultValue="A Legacy of Luxury Door Craftsmanship" />
                    </div>
                    <div className="input-group">
                      <label className="input-label">Legacy Statement Text</label>
                      <textarea className="text-input textarea-input" defaultValue="Backed by years of industry expertise, Luxe-Verve blends advanced engineering with timeless design principles." />
                    </div>

                    <div className="input-group form-full-width" style={{ borderTop: "1px solid rgba(216,199,180,0.1)", paddingTop: "20px" }}>
                      <label className="input-label" style={{ color: "#ebdcb9", fontSize: "0.9rem" }}>Column 3: Architectural Intelligence</label>
                    </div>
                    <div className="input-group">
                      <label className="input-label">Intelligence Heading</label>
                      <input type="text" className="text-input" defaultValue="Architectural Intelligence in Luxury Door Design" />
                    </div>
                    <div className="input-group">
                      <label className="input-label">Intelligence Statement Text</label>
                      <textarea className="text-input textarea-input" defaultValue="Our expertise is shaped by continuous innovation, refined processes, and a deep understanding of architectural design." />
                    </div>
                  </div>
                  <div className="subsection-actions">
                    <button className="btn-primary">Save changes</button>
                  </div>
                </div>
              )}
            </div>

          </div>
        )}

        {/* Tab 2: Collection Subsections */}
        {activeTab === "collection" && (
          <div className="subsections-list">
            
            <AdminCollectionBanner
              expanded={expandedSubsections.coll_banner}
              onToggle={() => toggleSubsection("coll_banner")}
            />

            <AdminCollectionSec2
              expanded={expandedSubsections.coll_sec2}
              onToggle={() => toggleSubsection("coll_sec2")}
            />

            <AdminCollectionSlider
              sliderId="coll_slider1"
              sectionTitle="Slider 1 (e.g. Thread Line Door)"
              subsectionNumber="03"
              expanded={expandedSubsections.coll_slider1}
              onToggle={() => toggleSubsection("coll_slider1")}
            />
            
            <AdminCollectionSlider
              sliderId="coll_slider2"
              sectionTitle="Slider 2 (e.g. MORPHIC DOOR)"
              subsectionNumber="04"
              expanded={expandedSubsections.coll_slider2}
              onToggle={() => toggleSubsection("coll_slider2")}
            />
            
            <AdminCollectionSlider
              sliderId="coll_slider3"
              sectionTitle="Slider 3 (e.g. CUBIX DOOR)"
              subsectionNumber="05"
              expanded={expandedSubsections.coll_slider3}
              onToggle={() => toggleSubsection("coll_slider3")}
            />

            <AdminCollectionFlipbook
              flipbookId="coll_flip1"
              sectionTitle="First Flipbook"
              subsectionNumber="06"
              expanded={expandedSubsections.coll_flip1}
              onToggle={() => toggleSubsection("coll_flip1")}
            />

            <AdminCollectionFlipbook
              flipbookId="coll_flip2"
              sectionTitle="Second Flipbook"
              subsectionNumber="07"
              expanded={expandedSubsections.coll_flip2}
              onToggle={() => toggleSubsection("coll_flip2")}
            />

          </div>
        )}

        {/* Tab 3: About Us Subsections */}
        {activeTab === "about" && (
          <div className="subsections-list">
            
            <AdminAboutBanner
              expanded={expandedSubsections.about_hero}
              onToggle={() => toggleSubsection("about_hero")}
            />

            <AdminAboutMain
              expanded={expandedSubsections.about_main}
              onToggle={() => toggleSubsection("about_main")}
            />

            <AdminAboutImageText
              sectionId="about_sec2"
              title="Section 2: Image & Text"
              subsectionNumber="03"
              expanded={expandedSubsections.about_sec2}
              onToggle={() => toggleSubsection("about_sec2")}
            />

            <AdminAboutImageText
              sectionId="about_sec3"
              title="Section 3: Image & Text"
              subsectionNumber="04"
              expanded={expandedSubsections.about_sec3}
              onToggle={() => toggleSubsection("about_sec3")}
            />

            <AdminAboutStats
              expanded={expandedSubsections.about_stats}
              onToggle={() => toggleSubsection("about_stats")}
            />

          </div>
        )}

        {/* Tab 4: Blog Editorial Subsections */}
        {activeTab === "blog" && (
          <div className="subsections-list">
            
            <AdminBlogBanner
              expanded={expandedSubsections.blog_hero}
              onToggle={() => toggleSubsection("blog_hero")}
            />

            <AdminBlogCategories
              expanded={expandedSubsections.blog_filter}
              onToggle={() => toggleSubsection("blog_filter")}
            />

            <AdminBlogPosts
              expanded={expandedSubsections.blog_grid}
              onToggle={() => toggleSubsection("blog_grid")}
            />

            <AdminBlogNewsletter
              expanded={expandedSubsections.blog_newsletter}
              onToggle={() => toggleSubsection("blog_newsletter")}
            />

          </div>
        )}

        {/* Tab 5: Contact Subsections */}
        {activeTab === "contact" && (
          <div className="subsections-list">
            
            <AdminContactBanner
              expanded={expandedSubsections.contact_hero}
              onToggle={() => toggleSubsection("contact_hero")}
            />

            <AdminContactDetails
              expanded={expandedSubsections.contact_details}
              onToggle={() => toggleSubsection("contact_details")}
            />

            <AdminContactMap
              expanded={expandedSubsections.contact_map}
              onToggle={() => toggleSubsection("contact_map")}
            />

          </div>
        )}

        {/* Tab 6: User Inquiries */}
        {activeTab === "users" && (
          <div className="subsections-list">
            
            <AdminInquiries
              expanded={expandedSubsections.user_inquiries}
              onToggle={() => toggleSubsection("user_inquiries")}
            />

            <AdminSubscribers
              expanded={expandedSubsections.user_subscribers}
              onToggle={() => toggleSubsection("user_subscribers")}
            />

          </div>
        )}

      </main>
    </div>
  );
}

