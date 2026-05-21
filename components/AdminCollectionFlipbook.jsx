"use client";

import React, { useState, useEffect, useRef } from "react";

export default function AdminCollectionFlipbook({ flipbookId, sectionTitle, subsectionNumber, expanded, onToggle }) {
  const [coverPage, setCoverPage] = useState(null);
  const [backPage, setBackPage] = useState(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [pages, setPages] = useState([]);
  const [title, setTitle] = useState("Catalogue Title");
  const [isUploading, setIsUploading] = useState(false);
  const [allMedia, setAllMedia] = useState([]);
  
  const coverInputRef = useRef(null);
  const backInputRef = useRef(null);
  const pdfInputRef = useRef(null);
  const newPageInputRef = useRef(null);
  
  const [coverFile, setCoverFile] = useState(null);
  const [backFile, setBackFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [newPageFile, setNewPageFile] = useState(null);

  const fetchData = async () => {
    const res = await fetch("/api/content");
    if (res.ok) {
      const items = await res.json();
      
      const cover = items.find(i => i.title === `${flipbookId}_cover`);
      const back = items.find(i => i.title === `${flipbookId}_back`);
      const pdf = items.find(i => i.title === `${flipbookId}_pdf`);
      
      // Get all inside pages
      const insidePages = items
        .filter(i => i.title && i.title.startsWith(`${flipbookId}_page_`))
        .sort((a, b) => a.order - b.order); // Sort by order
        
      setCoverPage(cover || null);
      setBackPage(back || null);
      setPdfDoc(pdf || null);
      setPages(insidePages);
      
      if (cover) setTitle(cover.description || "Catalogue Title");
      
      setAllMedia(items.filter(i => i.type === 'image' || i.type === 'pdf'));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUploadSingle = async (type, file) => {
    if (!file) return;
    setIsUploading(true);
    
    // Check if it exists, to PATCH or POST
    const existing = type === "cover" ? coverPage : type === "back" ? backPage : pdfDoc;
    
    const form = new FormData();
    form.append("type", type === "pdf" ? "pdf" : "image");
    form.append("title", `${flipbookId}_${type}`);
    if (type === "cover") form.append("description", title);
    form.append("file", file);

    const method = existing ? "PATCH" : "POST";
    const url = existing ? `/api/content/${existing.id}` : "/api/content";

    try {
      await fetch(url, { method, body: form });
      if (type === "cover") setCoverFile(null);
      if (type === "back") setBackFile(null);
      if (type === "pdf") setPdfFile(null);
      await fetchData();
    } catch (e) {
      console.error(e);
      alert(`Failed to upload ${type}`);
    }
    setIsUploading(false);
  };

  const handleSelectExistingSingle = async (type, existingUrl) => {
    if (!existingUrl) return;
    setIsUploading(true);
    const existing = type === "cover" ? coverPage : backPage;
    
    const form = new FormData();
    form.append("type", "image");
    form.append("title", `${flipbookId}_${type}`);
    if (type === "cover") form.append("description", title);
    form.append("url", existingUrl);

    const method = existing ? "PATCH" : "POST";
    const url = existing ? `/api/content/${existing.id}` : "/api/content";

    try {
      await fetch(url, { method, body: form });
      await fetchData();
    } catch (e) {
      alert(`Failed to set ${type}`);
    }
    setIsUploading(false);
  };

  const handleAddNewPage = async () => {
    if (!newPageFile) return;
    setIsUploading(true);
    
    const orderIndex = pages.length; // Next order index
    
    const form = new FormData();
    form.append("type", "image");
    form.append("title", `${flipbookId}_page_${Date.now()}`);
    form.append("order", orderIndex);
    form.append("file", newPageFile);

    try {
      await fetch("/api/content", { method: "POST", body: form });
      setNewPageFile(null);
      await fetchData();
    } catch (e) {
      alert("Failed to add new page");
    }
    setIsUploading(false);
  };

  const handleDeletePage = async (id) => {
    if (!confirm("Delete this page?")) return;
    setIsUploading(true);
    try {
      await fetch(`/api/content/${id}`, { method: "DELETE" });
      await fetchData();
    } catch (e) {
      alert("Failed to delete page");
    }
    setIsUploading(false);
  };

  // Title change (save to cover)
  const saveTitle = async () => {
    if (!coverPage) return alert("Upload a cover page first to save title!");
    setIsUploading(true);
    const form = new FormData();
    form.append("type", "image"); // Keep original type
    form.append("title", `${flipbookId}_cover`);
    form.append("description", title); // Update title
    
    try {
      await fetch(`/api/content/${coverPage.id}`, { method: "PATCH", body: form });
      alert("Title saved!");
      await fetchData();
    } catch (e) {
      alert("Failed to save title");
    }
    setIsUploading(false);
  };

  return (
    <div className={`subsection-card ${expanded ? "open" : ""}`}>
      <div className="subsection-header" onClick={onToggle}>
        <div className="subsection-title-box">
          <span className="subsection-number">{subsectionNumber}</span>
          <span className="subsection-title">{sectionTitle} (Dynamic Pages)</span>
        </div>
        <span className="subsection-arrow">▼</span>
      </div>
      {expanded && (
        <div className="subsection-body">
          <div className="form-grid">
            <div className="input-group form-full-width">
              <label className="input-label">Catalogue Title</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input type="text" className="text-input" value={title} onChange={e => setTitle(e.target.value)} />
                <button className="btn-secondary" onClick={saveTitle} disabled={isUploading}>Save Title</button>
              </div>
            </div>
            
            {/* Cover & Back Pages */}
            <div className="input-group">
              <label className="input-label">Front Cover Page</label>
              <div className="media-upload-zone" onClick={() => coverInputRef.current?.click()} style={{ padding: "10px", minHeight: "80px" }}>
                <span className="upload-icon" style={{ fontSize: "1.2rem" }}>📖</span>
                <span className="upload-text" style={{ fontSize: "0.8rem" }}>
                  {coverFile ? coverFile.name : (coverPage ? "Update Cover" : "Upload Cover Image")}
                </span>
                <input type="file" ref={coverInputRef} style={{ display: 'none' }} accept="image/*" onChange={e => { setCoverFile(e.target.files[0]); handleUploadSingle("cover", e.target.files[0]); }} />
              </div>
              <select className="text-input" value={coverPage?.url || ""} onChange={e => handleSelectExistingSingle("cover", e.target.value)} style={{ fontSize: "0.8rem", padding: "8px" }}>
                <option value="">-- Or select existing --</option>
                {allMedia.filter(m => m.type === 'image').map(m => <option key={m.id} value={m.url}>{m.title || "Image"}</option>)}
              </select>
              {coverPage && <img src={coverPage.url} alt="Cover" style={{ height: "100px", marginTop: "10px", borderRadius: "4px" }} />}
            </div>

            <div className="input-group">
              <label className="input-label">Downloadable PDF</label>
              <div className="media-upload-zone" onClick={() => pdfInputRef.current?.click()} style={{ padding: "10px", minHeight: "80px" }}>
                <span className="upload-icon" style={{ fontSize: "1.2rem" }}>📄</span>
                <span className="upload-text" style={{ fontSize: "0.8rem" }}>
                  {pdfFile ? pdfFile.name : (pdfDoc ? "Update PDF File" : "Upload PDF Document")}
                </span>
                <input type="file" ref={pdfInputRef} style={{ display: 'none' }} accept="application/pdf" onChange={e => { setPdfFile(e.target.files[0]); handleUploadSingle("pdf", e.target.files[0]); }} />
              </div>
              {pdfDoc && (
                <div style={{ marginTop: "10px", padding: "10px", background: "rgba(255,255,255,0.05)", borderRadius: "4px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <a href={pdfDoc.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary-color)", fontSize: "0.85rem" }}>View Current PDF</a>
                  <button onClick={() => handleDeletePage(pdfDoc.id)} style={{ background: "transparent", color: "#e57373", border: "1px solid #e57373", borderRadius: "4px", padding: "2px 8px", fontSize: "0.75rem" }}>Remove</button>
                </div>
              )}
            </div>

            <div className="input-group">
              <label className="input-label">Back Cover Page</label>
              <div className="media-upload-zone" onClick={() => backInputRef.current?.click()} style={{ padding: "10px", minHeight: "80px" }}>
                <span className="upload-icon" style={{ fontSize: "1.2rem" }}>📖</span>
                <span className="upload-text" style={{ fontSize: "0.8rem" }}>
                  {backFile ? backFile.name : (backPage ? "Update Back Cover" : "Upload Back Cover")}
                </span>
                <input type="file" ref={backInputRef} style={{ display: 'none' }} accept="image/*" onChange={e => { setBackFile(e.target.files[0]); handleUploadSingle("back", e.target.files[0]); }} />
              </div>
              <select className="text-input" value={backPage?.url || ""} onChange={e => handleSelectExistingSingle("back", e.target.value)} style={{ fontSize: "0.8rem", padding: "8px" }}>
                <option value="">-- Or select existing --</option>
                {allMedia.map(m => <option key={m.id} value={m.url}>{m.title || "Image"}</option>)}
              </select>
              {backPage && <img src={backPage.url} alt="Back" style={{ height: "100px", marginTop: "10px", borderRadius: "4px" }} />}
            </div>

            {/* Dynamic Pages inside */}
            <div className="input-group form-full-width" style={{ borderTop: "1px solid rgba(216,199,180,0.2)", paddingTop: "20px", marginTop: "10px" }}>
              <label className="input-label" style={{ color: "#ebdcb9", fontSize: "1rem" }}>Inside Pages ({pages.length})</label>
            </div>

            <div className="input-group form-full-width">
              <div className="list-items-container" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '15px', marginTop: 0 }}>
                {pages.map((p, index) => (
                  <div key={p.id} style={{ position: 'relative', width: '120px' }}>
                    <div style={{ position: 'absolute', top: '-8px', left: '-8px', background: '#8b5e3c', color: 'white', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', zIndex: 2 }}>
                      {index + 1}
                    </div>
                    <img src={p.url} alt={`Page ${index+1}`} style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '6px', border: '1px solid rgba(216, 199, 180, 0.2)' }} />
                    <button onClick={() => handleDeletePage(p.id)} style={{ width: '100%', marginTop: '5px', background: 'rgba(229, 115, 115, 0.1)', color: '#e57373', border: '1px solid #e57373', borderRadius: '4px', padding: '4px' }}>
                      Delete
                    </button>
                  </div>
                ))}

                {/* Add new page */}
                <div style={{ width: '120px', display: 'flex', flexDirection: 'column' }}>
                  <div className="media-upload-zone" onClick={() => newPageInputRef.current?.click()} style={{ height: '160px', padding: '10px', display: 'flex', justifyContent: 'center' }}>
                    <span className="upload-icon">➕</span>
                    <span className="upload-text" style={{ fontSize: '0.75rem', marginTop: '10px' }}>Add Page</span>
                    <input type="file" ref={newPageInputRef} style={{ display: 'none' }} accept="image/*" onChange={e => { setNewPageFile(e.target.files[0]); }} />
                  </div>
                  {newPageFile && (
                    <button onClick={handleAddNewPage} style={{ width: '100%', marginTop: '5px', background: '#ebdcb9', color: '#120e0c', border: 'none', borderRadius: '4px', padding: '4px', fontWeight: 'bold' }}>
                      Upload
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
