import { db } from '@/lib/firebaseAdmin';
import BlogContent from '@/components/BlogContent';
import { posts as fallbackPosts } from '@/lib/blogData';

export const metadata = {
  title: 'The Luxe Journal – Luxe Verve',
  description: 'Explore the world of luxury architectural design, material innovation, and bespoke craftsmanship.',
};

export default async function BlogPage() {
  let content = [];
  try {
    const snapshot = await db.collection('content').get();
    content = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching blog content", error);
  }

  const banner = content.find(i => i.title === 'blog_banner') || {};
  const categoriesItem = content.find(i => i.title === 'blog_categories') || {};
  
  let newsletter = {};
  const newsletterItem = content.find(i => i.title === 'blog_newsletter');
  if (newsletterItem && newsletterItem.text) {
    try {
      newsletter = JSON.parse(newsletterItem.text);
    } catch(e) {}
  }

  // Support for dynamically created posts via Firestore
  let dynamicPosts = content
    .filter(i => i.type === 'blog_post')
    .map(i => {
      let extra = {};
      try {
        if (i.text) extra = JSON.parse(i.text);
      } catch (e) {}
      return {
        id: i.id,
        title: i.description || i.title,
        img: i.url,
        tag: extra.tag || 'Design Trends',
        excerpt: extra.excerpt || '',
        date: extra.date || '',
        readTime: extra.readTime || '',
        author: extra.author || '',
        content: extra.content || [],
      };
    });

  // Sort dynamic posts by date or order if needed, assuming they're in correct order for now.
  const postsData = dynamicPosts.length > 0 ? dynamicPosts : fallbackPosts;

  return (
    <BlogContent 
      postsData={postsData}
      banner={banner}
      categoriesItem={categoriesItem}
      newsletter={newsletter}
    />
  );
}
