import { db } from '@/lib/firebaseAdmin';
import BlogContent from '@/components/BlogContent';
import { posts as fallbackPosts } from '@/lib/blogData';

export const metadata = {
  title: 'The Luxe Journal | Luxury Architectural Door Trends & Ideas',
  description: 'Explore the latest trends in luxury home entrances, modern wooden doors, and premium architectural design inspiration at The Luxe Journal by Luxe Verve.',
};

export const revalidate = 0; // Force Next.js to always fetch fresh data from Firestore

export default async function BlogPage() {
  let content = [];
  try {
    const snapshot = await db.collection('content').get();
    content = snapshot.docs.map(doc => {
      const data = doc.data();
      // Next.js Server Components cannot pass Firestore Timestamps to Client Components
      const serializedData = { ...data };
      if (serializedData.createdAt && typeof serializedData.createdAt.toDate === 'function') {
        serializedData.createdAt = serializedData.createdAt.toDate().toISOString();
      }
      if (serializedData.updatedAt && typeof serializedData.updatedAt.toDate === 'function') {
        serializedData.updatedAt = serializedData.updatedAt.toDate().toISOString();
      }
      return { id: doc.id, ...serializedData };
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
