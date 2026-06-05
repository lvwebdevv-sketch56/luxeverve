import clientPromise from '@/lib/mongodb';
import BlogContent from '@/components/BlogContent';
import { posts as fallbackPosts } from '@/lib/blogData';

export const metadata = {
  title: 'The Luxe Journal | Luxury Architectural Door Trends & Ideas',
  description: 'Explore the latest trends in luxury home entrances, modern wooden doors, and premium architectural design inspiration at The Luxe Journal by Luxe Verve.',
};

export const revalidate = 3600; // Cache for 1 hour, revalidated on demand

export default async function BlogPage() {
  let content = [];
  try {
    const client = await clientPromise;
    const db = client.db();
    const items = await db.collection('content').find({}).toArray();
    content = items.map(doc => {
      const data = doc;
      const serializedData = { ...data };
      if (serializedData.createdAt) {
        serializedData.createdAt = new Date(serializedData.createdAt).toISOString();
      }
      if (serializedData.updatedAt) {
        serializedData.updatedAt = new Date(serializedData.updatedAt).toISOString();
      }
      return { ...serializedData, id: doc._id.toString(), _id: undefined };
    });
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
        altText: i.altText || '',
      };
    });

  // Sort dynamic posts by date or order if needed, assuming they're in correct order for now.
  const postsData = [...dynamicPosts];

  return (
    <BlogContent 
      postsData={postsData}
      banner={banner}
      categoriesItem={categoriesItem}
      newsletter={newsletter}
    />
  );
}
