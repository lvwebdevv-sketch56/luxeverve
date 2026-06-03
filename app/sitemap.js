export default function sitemap() {
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

  /* 
   * NOTE ON DYNAMIC ROUTES (e.g. read_more/[id]):
   * To add your individual blog posts or products to this sitemap, 
   * you would fetch them from your database here and return them.
   * 
   * Example:
   * const posts = await fetch('your-db-url').then(res => res.json());
   * const dynamicRoutes = posts.map(post => ({
   *   url: `${baseUrl}/read_more/${post.id}`,
   *   lastModified: post.updatedAt,
   *   priority: 0.7,
   * }));
   * 
   * return [...staticRoutes, ...dynamicRoutes];
   */

  return staticRoutes;
}
