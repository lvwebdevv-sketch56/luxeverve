const fs = require('fs');
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

files.forEach(f => {
  const path = 'components/' + f;
  let content = fs.readFileSync(path, 'utf8');

  // Fix generic url: item.url || "",
  content = content.replace(/url:\s*item\.url\s*\|\|\s*"",\s*\}\);/g, 'url: item.url || "",\n          altText: item.altText || "",\n        });');
  
  // AdminSection1..4
  content = content.replace(/url:\s*sectionItem\.url\s*\|\|\s*data\.url,?\s*\}\);/g, 'url: sectionItem.url || data.url,\n          altText: sectionItem.altText || data.altText || "",\n        });');

  // AdminBannerSection
  content = content.replace(/url:\s*bannerItem\.url\s*\|\|\s*"\/videos\/banner\.mp4",\s*thumbnailUrl:\s*bannerItem\.thumbnailUrl\s*\|\|\s*"\/images\/banner1img\.jpeg",?\s*\}\);/g, 'url: bannerItem.url || "/videos/banner.mp4",\n          thumbnailUrl: bannerItem.thumbnailUrl || "/images/banner1img.jpeg",\n          altText: bannerItem.altText || "",\n        });');

  // AdminCollectionSec2
  content = content.replace(/url:\s*secItem\.url\s*\|\|\s*"\/images\/collection_2\.png"\s*\}\);/g, 'url: secItem.url || "/images/collection_2.png",\n          altText: secItem.altText || "",\n        });');

  // AdminCollectionBanner
  content = content.replace(/url:\s*bannerItem\.url\s*\|\|\s*"\/images\/bgimg1\.webp",?\s*\}\);/g, 'url: bannerItem.url || "/images/bgimg1.webp",\n          altText: bannerItem.altText || "",\n        });');

  fs.writeFileSync(path, content, 'utf8');
});
