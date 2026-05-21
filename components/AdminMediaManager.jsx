"use client";

import { useEffect, useState } from "react";

/**
 * AdminMediaManager – UI for managing content (images, videos, text).
 */
export default function AdminMediaManager() {
  const [media, setMedia] = useState([]);
  const [file, setFile] = useState(null);
  const [type, setType] = useState("image"); // "image" | "video" | "text"
  const [textContent, setTextContent] = useState("");
  const [title, setTitle] = useState("");

  const fetchMedia = async () => {
    const res = await fetch("/api/content");
    if (res.ok) {
      const data = await res.json();
      setMedia(data);
    } else {
      console.error("Failed to fetch media");
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (type !== "text" && !file) {
      alert("Select a file first");
      return;
    }
    if (type === "text" && !textContent) {
      alert("Enter text content first");
      return;
    }

    const form = new FormData();
    form.append("type", type);
    if (title) form.append("title", title);
    
    if (type === "text") {
      form.append("text", textContent);
    } else {
      form.append("file", file);
    }

    const res = await fetch("/api/content", {
      method: "POST",
      body: form,
    });

    if (res.ok) {
      await fetchMedia();
      setFile(null);
      setTextContent("");
      setTitle("");
    } else {
      const err = await res.json();
      alert(`Upload failed: ${err.error || "unknown"}`);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this content permanently?")) return;
    const res = await fetch(`/api/content/${id}`, { method: "DELETE" });
    if (res.ok) await fetchMedia();
    else alert("Delete failed");
  };

  const handleUpdate = async (item) => {
    if (item.type === "text") {
      const newText = prompt("Enter new text content:", item.text || "");
      if (newText === null) return;
      
      const res = await fetch(`/api/content/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "text", text: newText }),
      });
      if (res.ok) await fetchMedia();
      else alert("Update failed");
    } else {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = item.type === "image" ? "image/*" : "video/*";
      input.onchange = async () => {
        if (!input.files?.[0]) return;
        const form = new FormData();
        form.append("type", item.type);
        form.append("file", input.files[0]);
        const res = await fetch(`/api/content/${item.id}`, {
          method: "PATCH",
          body: form,
        });
        if (res.ok) await fetchMedia();
        else {
          const err = await res.json();
          alert(`Update failed: ${err.error || "unknown"}`);
        }
      };
      input.click();
    }
  };

  return (
    <div className="subsection-card">
      <div className="subsection-header">
        <div className="subsection-title-box">
          <span className="subsection-number">05</span>
          <span className="subsection-title">Content & Media Manager</span>
        </div>
      </div>
      <div className="subsection-body">
        {/* Upload Form */}
        <form className="form-grid" onSubmit={handleUpload}>
          <div className="input-group">
            <label className="input-label">Content Type</label>
            <select
              className="text-input"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="image">Image</option>
              <option value="video">Video</option>
              <option value="text">Text</option>
            </select>
          </div>

          <div className="input-group">
            <label className="input-label">Title (Optional)</label>
            <input
              type="text"
              className="text-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Hero Section Video"
            />
          </div>

          {type === "text" ? (
            <div className="input-group form-full-width">
              <label className="input-label">Text Content</label>
              <textarea
                className="text-input"
                rows="4"
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                placeholder="Enter your dynamic text here..."
              />
            </div>
          ) : (
            <div className="input-group form-full-width">
              <label className="input-label">Select File</label>
              <input
                type="file"
                className="text-input"
                accept={type === "image" ? "image/*" : "video/*"}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
          )}

          <div className="subsection-actions">
            <button type="submit" className="btn-primary">
              Add {type}
            </button>
          </div>
        </form>

        {/* Existing Media List */}
        <div className="list-items-container" style={{ marginTop: "24px" }}>
          {media.map((item) => (
            <div key={item.id} className="nested-item-row">
              <div className="item-info">
                {item.type === "image" && (
                  <img src={item.url} alt="thumb" className="item-thumbnail" />
                )}
                {item.type === "video" && (
                  <video src={item.thumbnailUrl || item.url} className="item-thumbnail" muted />
                )}
                {item.type === "text" && (
                  <div className="item-thumbnail" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#333', color: '#fff', fontSize: '24px' }}>T</div>
                )}
                <div className="item-title-box">
                  <span className="item-title">{item.title || item.type}</span>
                  <span className="item-desc" style={{ wordBreak: "break-all" }}>
                    {item.type === "text" ? item.text?.substring(0, 50) + "..." : item.url}
                  </span>
                </div>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  className="btn-primary"
                  onClick={() => handleUpdate(item)}
                >
                  Update
                </button>
                <button
                  className="edit-item-btn"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
