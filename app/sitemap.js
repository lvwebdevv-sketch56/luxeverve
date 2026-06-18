import clientPromise from '@/lib/mongodb';
import { posts as fallbackPosts } from '@/lib/blogData';

export default async function sitemap() {
  const baseUrl = 'https://luxe-verve.com'; // Domain updated

  // These are your static core routes
  const staticRoutes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/collection`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];

  let dynamicRoutes = [];
  try {
    const client = await clientPromise;
    const db = client.db();
    const items = await db.collection('content').find({ type: 'blog_post' }).toArray();
    
    const dynamicPosts = items.map(doc => {
      let extra = {};
      try { if (doc.text) extra = JSON.parse(doc.text); } catch (e) {}
      return { id: doc._id.toString(), date: extra.date || new Date() };
    });

    const allPosts = [...dynamicPosts, ...fallbackPosts];

    dynamicRoutes = allPosts.map(post => {
      let lastMod = new Date();
      if (post.date) {
        const d = new Date(post.date);
        if (!isNaN(d)) lastMod = d;
      }
      return {
        url: `${baseUrl}/read_more/${post.id}`,
        lastModified: lastMod,
        changeFrequency: 'monthly',
        priority: 0.7,
      };
    });
  } catch (e) {
    console.error('Error fetching dynamic routes for sitemap:', e);
  }

  return [...staticRoutes, ...dynamicRoutes];
}
