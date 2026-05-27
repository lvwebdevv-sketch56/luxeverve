"use client";
import { fetchWithCloudinary } from "@/lib/clientFetch";

import React, { useState, useEffect, useRef } from "react";

export default function AdminBlogPosts({ expanded, onToggle }) {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const fetchPosts = async () => {
    const res = await fetchWithCloudinary("/api/content");
    if (res.ok) {
      const items = await res.json();
      const blogPosts = items.filter(i => i.type === "blog_post");
      setPosts(blogPosts);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleEdit = (post) => {
    let parsed = {};
    try { if(post.text) parsed = JSON.parse(post.text); } catch(e) {}
    setEditingPost({
      id: post.id,
      title: post.description || post.title || "",
      url: post.url || "",
      tag: parsed.tag || "",
      excerpt: parsed.excerpt || "",
      date: parsed.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readTime: parsed.readTime || "5 min read",
      author: parsed.author || "Luxe Editorial",
      authorRole: parsed.authorRole || "Design Team",
      contentRaw: parsed.content ? parsed.content.map(c => c.text).join('\n\n') : "",
      file: null
    });
  };

  const handleNew = () => {
    setEditingPost({
      id: null,
      title: "",
      url: "",
      tag: "Design Trends",
      excerpt: "",
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readTime: "5 min read",
      author: "Luxe Editorial",
      authorRole: "Design Team",
      contentRaw: "",
      file: null
    });
  };

  const handleCancel = () => {
    setEditingPost(null);
  };

  const handleDelete = async (id) => {
    if(!confirm("Are you sure you want to delete this article?")) return;
    try {
      const res = await fetchWithCloudinary(`/api/content/${id}`, { method: 'DELETE' });
      if(res.ok) await fetchPosts();
    } catch(e){}
  };

  const handleSave = async () => {
    setIsUploading(true);
    const form = new FormData();
    form.append("type", "blog_post");
    form.append("title", editingPost.title); // We'll store title in description too for safety, but title is fine
    form.append("description", editingPost.title);
    
    // Parse contentRaw into blocks
    const paragraphs = editingPost.contentRaw.split('\n\n').filter(p => p.trim());
    const contentBlocks = paragraphs.map((p, i) => {
      if (i === 0) return { type: 'lead', text: p };
      if (p.length < 50 && !p.includes('.')) return { type: 'heading', text: p };
      return { type: 'paragraph', text: p };
    });

    const extra = {
      tag: editingPost.tag,
      excerpt: editingPost.excerpt,
      date: editingPost.date,
      readTime: editingPost.readTime,
      author: editingPost.author,
      authorRole: editingPost.authorRole,
      content: contentBlocks
    };
    form.append("text", JSON.stringify(extra));

    if (editingPost.file) {
      form.append("file", editingPost.file);
    } else if (editingPost.url) {
      form.append("url", editingPost.url);
      if(editingPost.id) form.append("reqUrl", editingPost.url);
    }

    const method = editingPost.id ? "PATCH" : "POST";
    const url = editingPost.id ? `/api/content/${editingPost.id}` : "/api/content";

    try {
      const res = await fetchWithCloudinary(url, { method, body: form });
      if (res.ok) {
        await fetchPosts();
        setEditingPost(null);
        alert("Article saved successfully!");
      } else {
        alert("Failed to save article");
      }
    } catch (e) {}
    setIsUploading(false);
  };

  return (
    <div className={`subsection-card ${expanded ? "open" : ""}`}>
      <div className="subsection-header" onClick={onToggle}>
        <div className="subsection-title-box">
          <span className="subsection-number">04</span>
          <span className="subsection-title">Blog Grid Articles</span>
        </div>
        <span className="subsection-arrow">▼</span>
      </div>
      {expanded && (
        <div className="subsection-body">
          {!editingPost ? (
            <>
              <p className="upload-subtext" style={{ marginTop: "12px" }}>Select and update specific blog articles dynamically listed on the main site.</p>
              <div className="list-items-container">
                {posts.map(p => (
                  <div key={p.id} className="nested-item-row">
                    <div className="item-info">
                      <div className="item-thumbnail">
                        {p.url ? <img src={p.url} style={{width:'100%', height:'100%', objectFit:'cover', borderRadius:'4px'}} /> : '✍️'}
                      </div>
                      <div className="item-title-box">
                        <span className="item-title">{p.description || p.title || "Untitled"}</span>
                        <span className="item-desc" style={{fontSize: '0.75rem', opacity: 0.8}}>ID: {p.id}</span>
                      </div>
                    </div>
                    <div style={{display:'flex', gap:'8px'}}>
                      <button className="edit-item-btn" onClick={() => handleEdit(p)}>Edit</button>
                      <button className="edit-item-btn" onClick={() => handleDelete(p.id)} style={{color:'#e57373'}}>Del</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="subsection-actions">
                <button className="btn-primary" onClick={handleNew}>Add New Article</button>
              </div>
            </>
          ) : (
            <div className="form-grid">
              <div className="input-group">
                <label className="input-label">Article Title</label>
                <input type="text" className="text-input" value={editingPost.title} onChange={e => setEditingPost({...editingPost, title: e.target.value})} />
              </div>
              <div className="input-group">
                <label className="input-label">Category / Tag</label>
                <input type="text" className="text-input" value={editingPost.tag} onChange={e => setEditingPost({...editingPost, tag: e.target.value})} />
              </div>
              <div className="input-group form-full-width">
                <label className="input-label">Cover Image (Cloudinary)</label>
                <div className="media-upload-zone" onClick={() => fileInputRef.current?.click()}>
                  <span className="upload-icon">🖼️</span>
                  <span className="upload-text">{editingPost.file ? editingPost.file.name : editingPost.url ? "Click to change image" : "Upload image"}</span>
                  <input type="file" ref={fileInputRef} style={{display:'none'}} accept="image/*" onChange={e => setEditingPost({...editingPost, file: e.target.files[0]})} />
                </div>
                {editingPost.url && !editingPost.file && (
                  <div style={{marginTop: "10px", textAlign: "center"}}>
                    <img src={editingPost.url} alt="Preview" style={{height: "100px", borderRadius: "8px"}} />
                  </div>
                )}
              </div>
              <div className="input-group form-full-width">
                <label className="input-label">Brief Excerpt</label>
                <textarea className="text-input textarea-input" value={editingPost.excerpt} onChange={e => setEditingPost({...editingPost, excerpt: e.target.value})} />
              </div>
              <div className="input-group">
                <label className="input-label">Author Name</label>
                <input type="text" className="text-input" value={editingPost.author} onChange={e => setEditingPost({...editingPost, author: e.target.value})} />
              </div>
              <div className="input-group">
                <label className="input-label">Author Role</label>
                <input type="text" className="text-input" value={editingPost.authorRole} onChange={e => setEditingPost({...editingPost, authorRole: e.target.value})} />
              </div>
              <div className="input-group">
                <label className="input-label">Publish Date</label>
                <input type="text" className="text-input" value={editingPost.date} onChange={e => setEditingPost({...editingPost, date: e.target.value})} />
              </div>
              <div className="input-group">
                <label className="input-label">Read Time</label>
                <input type="text" className="text-input" value={editingPost.readTime} onChange={e => setEditingPost({...editingPost, readTime: e.target.value})} />
              </div>
              <div className="input-group form-full-width">
                <label className="input-label">Article Content (Separate paragraphs with double enter)</label>
                <textarea className="text-input textarea-input" style={{height: '200px'}} value={editingPost.contentRaw} onChange={e => setEditingPost({...editingPost, contentRaw: e.target.value})} placeholder="First paragraph becomes the Lead (Italic). Short single lines become Headings." />
              </div>
              
              <div className="subsection-actions form-full-width" style={{display:'flex', gap:'12px'}}>
                <button className="btn-primary" onClick={handleSave} disabled={isUploading}>{isUploading ? "Saving..." : "Save Article"}</button>
                <button className="edit-item-btn" onClick={handleCancel} disabled={isUploading} style={{background: 'transparent'}}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
