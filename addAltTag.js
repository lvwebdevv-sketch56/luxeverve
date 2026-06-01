const fs = require('fs');
const path = require('path');

const dir = 'components';
const files = [
  'AdminAboutBanner.jsx',
  'AdminAboutImageText.jsx',
  'AdminBannerSection.jsx',
  'AdminBlogBanner.jsx',
  'AdminCollectionBanner.jsx',
  'AdminCollectionSec2.jsx',
  'AdminContactBanner.jsx',
  'AdminSection1.jsx',
  'AdminSection2.jsx',
  'AdminSection3.jsx',
  'AdminSection4.jsx',
  'AdminHeroCardsSection.jsx'
];

files.forEach(file => {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf-8');
  if (content.includes('altText')) return;

  // 1. Add altText to initial state
  content = content.replace(/url:\s*""\s*\}/g, 'url: "", altText: "" }');
  content = content.replace(/url:\s*item\.url\s*\|\|\s*""\s*\}/g, 'url: item.url || "", altText: item.altText || "" }');
  
  // 2. Add form.append for altText
  content = content.replace(/(form\.append\("description",[^;]+;)/, '$1\n    form.append("altText", data.altText || "");');

  // 3. Add UI input (just before the file upload or at the end of text inputs)
  // For most components we look for form-full-width
  const inputGroupRegex = /(<div className="input-group">[\s\S]*?<\/div>\s*)(<div className="input-group form-full-width">)/;
  if (content.match(inputGroupRegex)) {
    const altInput = `<div className="input-group">
              <label className="input-label">Image Alt Text (SEO)</label>
              <input type="text" className="text-input" placeholder="e.g. Modern Luxury Wooden Door" value={data.altText} onChange={e => setData({...data, altText: e.target.value})} />
            </div>\n            `;
    content = content.replace(inputGroupRegex, `$1${altInput}$2`);
  } else {
    // try just injecting before <div className="media-upload-zone" if form-full-width not there
    const inputGroupRegex2 = /(<label className="input-label">[^<]*Cloudinary[^<]*<\/label>)/;
    if (content.match(inputGroupRegex2)) {
      const altInput = `<div className="input-group" style={{marginBottom: "15px"}}>
              <label className="input-label">Image Alt Text (SEO)</label>
              <input type="text" className="text-input" placeholder="e.g. Modern Luxury Wooden Door" value={data.altText} onChange={e => setData({...data, altText: e.target.value})} />
            </div>\n            `;
      content = content.replace(inputGroupRegex2, `${altInput}$1`);
    }
  }

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Updated ${file}`);
});
