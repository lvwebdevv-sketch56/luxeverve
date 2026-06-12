export default function robots() {
  const baseUrl = 'https://luxe-verve.com'; // Domain updated

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/adminpixy/', '/api/', '/7a3b9f/', '/sign-in/'], // Block search engines from admin panel, APIs, sign-up, and sign-in
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
