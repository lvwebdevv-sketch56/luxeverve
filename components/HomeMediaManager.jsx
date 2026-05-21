"use client";

import { useEffect, useState } from "react";

export default function HomeMediaManager() {
  const [media, setMedia] = useState([]);
  const [file, setFile] = useState(null);
  const [type, setType] = useState("image"); // "image" or "video"

  const fetchMedia = async () => {
    const res = await fetch("/api/content");
    if (res.ok) {
      const data = await res.json();
      const filtered = data.filter((item) => item.type === "image" || item.type === "video");
      setMedia(filtered);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file.");
      return;
    }
    const form = new FormData();
    form.append("type", type);
    form.append("file", file);
    const res = await fetch("/api/content", {
      method: "POST",
      body: form,
    });
    if (res.ok) {
      await fetchMedia();
      setFile(null);
    } else {
      const err = await res.json();
      alert("Upload failed: " + (err.error || "unknown"));
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this asset permanently?")) return;
    const res = await fetch(`/api/content/${id}`, { method: "DELETE" });
    if (res.ok) {
      await fetchMedia();
    } else {
      alert("Delete failed");
    }
  };

  return (
    <div className="subsection-card">
      <div className="subsection-header">
        <div className="subsection-title-box">
          <span className="subsection-number">05</span>
          <span className="subsection-title">Home Media Manager</span>
        </div>
      </div>
      <div className="subsection-body">
        <form className="form-grid" onSubmit={handleUpload}>
          <div className="input-group">
            <label className="input-label">Media Type</label>
            <select
              className="text-input"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
          </div>
          <div className="input-group form-full-width">
            <label className="input-label">Select File</label>
            <input
              type="file"
              className="text-input"
              accept={type === "image" ? "image/*" : "video/*"}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div className="subsection-actions">
            <button type="submit" className="btn-primary">
              Add {type}
            </button>
          </div>
        </form>
        <div className="list-items-container" style={{ marginTop: "24px" }}>
          {media.map((item) => (
            <div key={item.id} className="nested-item-row">
              <div className="item-info">
                {item.type === "image" ? (
                  <img
                    src={item.url}
                    alt="thumb"
                    className="item-thumbnail"
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  />
                ) : (
                  <video
                    src={item.thumbnailUrl || item.url}
                    className="item-thumbnail"
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    muted
                  />
                )}
                <div className="item-title-box">
                  <span className="item-title">{item.type}</span>
                  <span className="item-desc" style={{ wordBreak: "break-all" }}>{item.url}</span>
                </div>
              </div>
              <button className="edit-item-btn" onClick={() => handleDelete(item.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
