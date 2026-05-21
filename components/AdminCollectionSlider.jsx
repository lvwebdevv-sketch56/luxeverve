"use client";

import React, { useState, useEffect, useRef } from "react";

export default function AdminCollectionSlider({ sliderId, sectionTitle, subsectionNumber, expanded, onToggle }) {
  const [data, setData] = useState({ title: "", text: "", images: ["", "", "", "", "", ""] });
  const [files, setFiles] = useState([null, null, null, null, null, null]);
  const [isUploading, setIsUploading] = useState(false);
  const [allMedia, setAllMedia] = useState([]);
  const fileInputRefs = useRef([null, null, null, null, null, null].map(() => React.createRef()));

  const fetchData = async () => {
    const res = await fetch("/api/content");
    if (res.ok) {
      const items = await res.json();
      const sliderItem = items.find(i => i.title === sliderId);
      if (sliderItem) {
        let imgs = ["", "", "", "", "", ""];
        try {
          if (sliderItem.url) imgs = JSON.parse(sliderItem.url);
        } catch(e) {}
        
        setData({
          id: sliderItem.id,
          title: sliderItem.description || "", 
          text: sliderItem.text || "",
          images: imgs,
        });
      }
      setAllMedia(items.filter(i => i.type === 'image'));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleImageChange = (index, value) => {
    const newImages = [...data.images];
    newImages[index] = value;
    setData({ ...data, images: newImages });
  };

  const handleFileChange = (index, file) => {
    const newFiles = [...files];
    newFiles[index] = file;
    setFiles(newFiles);
  };

  const handleSave = async () => {
    setIsUploading(true);
    
    // First, upload any new files to Cloudinary using individual requests
    let finalImages = [...data.images];
    
    for (let i = 0; i < 6; i++) {
      if (files[i]) {
        const fileForm = new FormData();
        fileForm.append("type", "image");
        fileForm.append("title", `${sliderId}_image_${i}`);
        fileForm.append("file", files[i]);
        
        try {
          const res = await fetch("/api/content", { method: "POST", body: fileForm });
          if (res.ok) {
            const result = await res.json();
            finalImages[i] = result.url;
          }
        } catch (e) {
          console.error("Failed to upload image", i);
        }
      }
    }

    const form = new FormData();
    form.append("type", "text"); // Using text type to store JSON array in url field
    form.append("title", sliderId);
    form.append("description", data.title); // Heading
    form.append("text", data.text); // Paragraph
    form.append("url", JSON.stringify(finalImages)); // Store all 6 image URLs as JSON string in url field

    const method = data.id ? "PATCH" : "POST";
    const url = data.id ? `/api/content/${data.id}` : "/api/content";

    try {
      const res = await fetch(url, { method, body: form });
      if (res.ok) {
        await fetchData();
        setFiles([null, null, null, null, null, null]);
        alert(`${sectionTitle} updated successfully!`);
      } else {
        const err = await res.json();
        alert(`Failed to update: ${err.error}`);
      }
    } catch (e) {
      alert("An error occurred");
    }
    setIsUploading(false);
  };

  return (
    <div className={`subsection-card ${expanded ? "open" : ""}`}>
      <div className="subsection-header" onClick={onToggle}>
        <div className="subsection-title-box">
          <span className="subsection-number">{subsectionNumber}</span>
          <span className="subsection-title">{sectionTitle}</span>
        </div>
        <span className="subsection-arrow">▼</span>
      </div>
      {expanded && (
        <div className="subsection-body">
          <div className="form-grid">
            <div className="input-group form-full-width">
              <label className="input-label">Slider Heading</label>
              <input type="text" className="text-input" value={data.title} onChange={e => setData({...data, title: e.target.value})} placeholder="e.g. Thread Line Door" />
            </div>
            <div className="input-group form-full-width">
              <label className="input-label">Slider Text / Description</label>
              <textarea className="text-input textarea-input" value={data.text} onChange={e => setData({...data, text: e.target.value})} />
            </div>
            
            <div className="input-group form-full-width">
              <label className="input-label" style={{ color: "#ebdcb9", borderBottom: "1px solid rgba(216,199,180,0.2)", paddingBottom: "10px", marginBottom: "10px" }}>6 Slider Images</label>
            </div>
            
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="input-group" style={{ background: "rgba(0,0,0,0.2)", padding: "15px", borderRadius: "10px" }}>
                <label className="input-label">Image {i + 1}</label>
                
                <div className="media-upload-zone" style={{ padding: "10px", minHeight: "80px", marginBottom: "10px" }} onClick={() => fileInputRefs.current[i].current?.click()}>
                  <span className="upload-icon" style={{ fontSize: "1.2rem" }}>🖼️</span>
                  <span className="upload-text" style={{ fontSize: "0.8rem" }}>
                    {files[i] ? files[i].name : "Upload new image"}
                  </span>
                  <input 
                    type="file" 
                    ref={fileInputRefs.current[i]}
                    style={{ display: 'none' }} 
                    accept="image/*" 
                    onChange={e => handleFileChange(i, e.target.files[0])} 
                  />
                </div>
                
                <select 
                  className="text-input" 
                  value={data.images[i]} 
                  onChange={e => {
                    handleImageChange(i, e.target.value);
                    handleFileChange(i, null);
                  }}
                  style={{ fontSize: "0.8rem", padding: "8px" }}
                >
                  <option value="">-- Or select existing --</option>
                  {allMedia.map(m => (
                    <option key={m.id} value={m.url}>{m.title || "Unnamed Image"}</option>
                  ))}
                </select>
                
                {data.images[i] && !files[i] && (
                  <div style={{ marginTop: "10px", textAlign: "center" }}>
                    <img src={data.images[i]} alt={`Preview ${i}`} style={{ height: "60px", borderRadius: "4px" }} />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="subsection-actions">
            <button className="btn-secondary" onClick={fetchData} disabled={isUploading}>Discard</button>
            <button className="btn-primary" onClick={handleSave} disabled={isUploading}>
              {isUploading ? "Saving..." : "Save changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
