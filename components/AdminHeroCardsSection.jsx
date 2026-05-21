"use client";

import React, { useState, useEffect, useRef } from "react";

export default function AdminHeroCardsSection({ expanded, onToggle }) {
  const [cards, setCards] = useState([]);
  const [editingCard, setEditingCard] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [allMedia, setAllMedia] = useState([]);
  const fileInputRef = useRef(null);

  const fetchCards = async () => {
    const res = await fetch("/api/content");
    if (res.ok) {
      const items = await res.json();
      const heroCards = items.filter(i => i.title && i.title.startsWith("hero_card_")).sort((a,b) => a.order - b.order);
      
      const defaultCards = [
        { title: "hero_card_1", text: "Card 1: Sculpted Wood", description: "Masterpieces in timber.", icon: "🪵", order: 1 },
        { title: "hero_card_2", text: "Card 2: Minimal Metal", description: "Sleek, modern entrances.", icon: "⚙️", order: 2 },
        { title: "hero_card_3", text: "Card 3: Grand Pivot", description: "Architectural statements.", icon: "🚪", order: 3 },
      ];

      const mergedCards = defaultCards.map(defCard => {
        const found = heroCards.find(c => c.title === defCard.title);
        return found || defCard;
      });

      setCards(mergedCards);
      setAllMedia(items.filter(i => i.title !== "hero_banner" && !i.title?.startsWith("hero_card")));
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleEdit = (card) => {
    setEditingCard({ ...card, newFile: null });
  };

  const handleSaveCard = async () => {
    if (!editingCard) return;
    setIsUploading(true);
    
    const form = new FormData();
    form.append("type", "image");
    form.append("title", editingCard.title);
    form.append("text", editingCard.text); // Used for Card Title
    form.append("description", editingCard.description); // Used for Card Desc
    form.append("order", editingCard.order);
    
    if (editingCard.newFile) {
      form.append("file", editingCard.newFile);
    } else if (editingCard.url) {
      // If no new file but we have a url from dropdown
      form.append("url", editingCard.url);
      form.set("type", "text"); // So it updates metadata
    } else if (!editingCard.id) {
      // If creating new but no file, use type='text'
      form.set("type", "text");
    }

    const method = editingCard.id ? "PATCH" : "POST";
    const url = editingCard.id ? `/api/content/${editingCard.id}` : "/api/content";

    try {
      const res = await fetch(url, { method, body: form });
      if (res.ok) {
        await fetchCards();
        setEditingCard(null);
        alert("Card saved successfully!");
      } else {
        const err = await res.json();
        alert(`Failed to save card: ${err.error}`);
      }
    } catch (e) {
      alert("Error saving card");
    }
    setIsUploading(false);
  };

  const handleDeleteCard = async (id) => {
    if (!id) return;
    if (!confirm("Are you sure you want to delete this card?")) return;
    setIsUploading(true);
    const res = await fetch(`/api/content/${id}`, { method: "DELETE" });
    if (res.ok) {
      await fetchCards();
      setEditingCard(null);
    }
    setIsUploading(false);
  };

  return (
    <div className={`subsection-card ${expanded ? "open" : ""}`}>
      <div className="subsection-header" onClick={onToggle}>
        <div className="subsection-title-box">
          <span className="subsection-number">02</span>
          <span className="subsection-title">Hero Cards Slider</span>
        </div>
        <span className="subsection-arrow">▼</span>
      </div>
      {expanded && (
        <div className="subsection-body">
          <p className="upload-subtext" style={{ marginTop: "12px" }}>Edit the cards sliding over the background video.</p>
          
          {editingCard ? (
            <div className="nested-item-row" style={{ display: 'block', padding: '24px' }}>
              <h4 style={{ color: '#ebdcb9', margin: '0 0 16px 0' }}>{editingCard.id ? "Edit Card" : "New Card"}</h4>
              <div className="form-grid">
                <div className="input-group">
                  <label className="input-label">Card Title</label>
                  <input type="text" className="text-input" value={editingCard.text} onChange={e => setEditingCard({...editingCard, text: e.target.value})} />
                </div>
                <div className="input-group">
                  <label className="input-label">Card Description</label>
                  <input type="text" className="text-input" value={editingCard.description} onChange={e => setEditingCard({...editingCard, description: e.target.value})} />
                </div>
                <div className="input-group form-full-width">
                  <label className="input-label">Upload Custom Image (Optional)</label>
                  <div className="media-upload-zone" onClick={() => fileInputRef.current?.click()} style={{ padding: '12px' }}>
                    <span className="upload-icon" style={{ fontSize: '1.2rem' }}>🖼️</span>
                    <span className="upload-text">
                      {editingCard.newFile ? editingCard.newFile.name : (editingCard.url ? "Click to replace image" : "Click to upload image")}
                    </span>
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      style={{ display: 'none' }} 
                      accept="image/*" 
                      onChange={e => setEditingCard({...editingCard, newFile: e.target.files[0]})} 
                    />
                  </div>
                </div>

                <div className="input-group form-full-width">
                  <label className="input-label">Select existing Image from Media Library</label>
                  <select 
                    className="text-input" 
                    value={editingCard.url || ""} 
                    onChange={e => {
                      const selected = allMedia.find(m => m.url === e.target.value);
                      if (selected) {
                        setEditingCard({ ...editingCard, url: selected.url, newFile: null });
                      }
                    }}
                  >
                    <option value="">-- Select from existing image --</option>
                    {allMedia.filter(m => m.type === 'image').map(m => (
                      <option key={m.id} value={m.url}>{m.title || "Unnamed Image"}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="subsection-actions">
                {editingCard.id && (
                  <button className="edit-item-btn" onClick={() => handleDeleteCard(editingCard.id)} disabled={isUploading} style={{ borderColor: '#e57373', color: '#e57373', marginRight: 'auto' }}>
                    Delete
                  </button>
                )}
                <button className="btn-secondary" onClick={() => setEditingCard(null)} disabled={isUploading}>Cancel</button>
                <button className="btn-primary" onClick={handleSaveCard} disabled={isUploading}>
                  {isUploading ? "Saving..." : "Save Card"}
                </button>
              </div>
            </div>
          ) : (
            <div className="list-items-container">
              {cards.map((card, idx) => (
                <div className="nested-item-row" key={card.id || idx}>
                  <div className="item-info">
                    {card.url ? (
                      <img src={card.url} alt="card" className="item-thumbnail" style={{ objectFit: 'cover' }} />
                    ) : (
                      <div className="item-thumbnail">{card.icon || "🖼️"}</div>
                    )}
                    <div className="item-title-box">
                      <span className="item-title">{card.text}</span>
                      <span className="item-desc">{card.description}</span>
                    </div>
                  </div>
                  <button className="edit-item-btn" onClick={() => handleEdit(card)}>Configure Card</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
