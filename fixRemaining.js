const fs = require('fs');

// AdminCollectionSlider
let content = fs.readFileSync('components/AdminCollectionSlider.jsx', 'utf-8');
content = content.replace(/setData\(\{\s*id:\s*sliderItem\.id,\s*title:\s*sliderItem\.description\s*\|\|\s*"",\s*text:\s*sliderItem\.text\s*\|\|\s*"",\s*images:\s*imgs,\s*\}\);/, `
        let altTxts = ["", "", "", "", "", ""];
        try {
          if (sliderItem.altText) altTxts = JSON.parse(sliderItem.altText);
        } catch(e) {}
        
        setData({
          id: sliderItem.id,
          title: sliderItem.description || "", 
          text: sliderItem.text || "",
          images: imgs,
          altTexts: altTxts,
        });
`);
content = content.replace(/const handleImageChange = \(index, value\) => \{[\s\S]*?setData\(\{ \.\.\.data, images: newImages \}\);\s*\};/, `const handleImageChange = (index, value) => {
    const newImages = [...data.images];
    newImages[index] = value;
    setData({ ...data, images: newImages });
  };

  const handleAltTextChange = (index, value) => {
    const newAltTexts = [...data.altTexts];
    newAltTexts[index] = value;
    setData({ ...data, altTexts: newAltTexts });
  };`);
content = content.replace(/form\.append\("url", JSON\.stringify\(finalImages\)\);/, 'form.append("url", JSON.stringify(finalImages));\n    form.append("altText", JSON.stringify(data.altTexts));');
content = content.replace(/<input\s*type="file"\s*ref=\{fileInputRefs\.current\[i\]\}[\s\S]*?\/>\s*<\/div>/, `<input 
                    type="file" 
                    ref={fileInputRefs.current[i]}
                    style={{ display: 'none' }} 
                    accept="image/*" 
                    onChange={e => handleFileChange(i, e.target.files[0])} 
                  />
                </div>
                <input 
                  type="text" 
                  className="text-input" 
                  placeholder="Alt Text for SEO" 
                  value={data.altTexts[i] || ""} 
                  onChange={e => handleAltTextChange(i, e.target.value)} 
                  style={{ fontSize: "0.8rem", padding: "8px", marginBottom: "8px" }}
                />`);
fs.writeFileSync('components/AdminCollectionSlider.jsx', content);

// AdminBlogPosts
let blog = fs.readFileSync('components/AdminBlogPosts.jsx', 'utf-8');
blog = blog.replace(/title:\s*post\.description\s*\|\|\s*post\.title\s*\|\|\s*"",\s*url:\s*post\.url\s*\|\|\s*"",/, 'title: post.description || post.title || "",\n      url: post.url || "",\n      altText: post.altText || "",');
blog = blog.replace(/title:\s*"",\s*url:\s*"",\s*tag:\s*"Design Trends",/, 'title: "",\n      url: "",\n      altText: "",\n      tag: "Design Trends",');
blog = blog.replace(/form\.append\("title", editingPost\.title\);/, 'form.append("title", editingPost.title);\n    form.append("altText", editingPost.altText || "");');
blog = blog.replace(/<div className="input-group form-full-width">\s*<label className="input-label">Cover Image \(Cloudinary\)<\/label>/, `<div className="input-group">
                <label className="input-label">Image Alt Text (SEO)</label>
                <input type="text" className="text-input" value={editingPost.altText || ""} onChange={e => setEditingPost({...editingPost, altText: e.target.value})} placeholder="e.g. Modern Wooden Door" />
              </div>
              <div className="input-group form-full-width">
                <label className="input-label">Cover Image (Cloudinary)</label>`);
fs.writeFileSync('components/AdminBlogPosts.jsx', blog);
