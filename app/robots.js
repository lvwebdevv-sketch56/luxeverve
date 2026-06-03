export default function robots() {
  const baseUrl = 'https://luxe-verve.com'; // Domain updated

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/adminpixy/', '/api/', '/7a3b9f/'], // Block search engines from admin panel, APIs, and sign-up
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
