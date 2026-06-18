export default function robots() {
  const baseUrl = 'https://luxe-verve.com'; // Domain updated

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/ops.admin/', '/api/', '/ops.admincreate/', '/sign-in/'], // Block search engines from admin panel, APIs, sign-up, and sign-in
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
