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
  'AdminHeroCardsSection.jsx',
  'AdminBlogPosts.jsx',
  'AdminCollectionSlider.jsx'
];

let issues = [];

files.forEach(f => {
  const path = 'components/' + f;
  let content = fs.readFileSync(path, 'utf8');
  let original = content;

  // Add altText: "" to useState({ ... }) if missing and if it's the main state holding url/title
  // We match const [data, setData] = useState({ ... });
  const regex = /(const \[data, setData\] = useState\(\{)([^}]+)(\}\);)/g;
  content = content.replace(regex, (match, p1, p2, p3) => {
    if (!p2.includes('altText')) {
      return p1 + p2 + ', altText: "" ' + p3;
    }
    return match;
  });

  // AdminHeroCardsSection uses newCard instead of data
  const newCardRegex = /(const \[newCard, setNewCard\] = useState\(\{)([^}]+)(\}\);)/g;
  content = content.replace(newCardRegex, (match, p1, p2, p3) => {
    if (!p2.includes('altText')) {
      return p1 + p2 + ', altText: "" ' + p3;
    }
    return match;
  });

  // AdminHeroCardsSection uses editingCard instead of data
  const editingCardRegex = /(const \[editingCard, setEditingCard\] = useState\()(null)(\);)/g;
  // This is null initially so it's fine.

  if (content !== original) {
    fs.writeFileSync(path, content, 'utf8');
    issues.push(f);
  }
});

console.log('Fixed useState missing altText in:', issues);
