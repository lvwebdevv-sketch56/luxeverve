import './globals.css';
import ScrollReveal from '@/components/ScrollReveal';
import GlobalClickSound from '@/components/GlobalClickSound';
import LayoutShell from '@/components/LayoutShell';
import { Toaster } from 'sonner';

export const metadata = {
  title: {
    template: '%s | Luxe Verve',
    default: 'Luxury Designer Doors in Noida | Premium Wooden Doors | Luxe Verve',
  },
  description: 'Explore premium luxury wooden doors by Luxe Verve. Customized designer entrance, interior, CNC, and exterior doors for villas, apartments, offices, and luxury spaces in Noida & Delhi NCR.',
  keywords: ['luxury doors Noida', 'premium wooden doors', 'designer CNC doors', 'custom entrance doors', 'modern luxury wooden doors', 'pivot doors India', 'Luxe Verve'],
  openGraph: {
    title: 'Luxe Verve | Premium Designer Doors',
    description: 'Transform your space with ultra-luxury entrance and interior doors.',
    url: 'https://luxeverve.com', // To be updated later
    siteName: 'Luxe Verve',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  }
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Luxe Verve',
  url: 'https://luxeverve.com',
  logo: 'https://luxeverve.com/logo.png', // Update when domain is live
  description: 'Premium manufacturer of luxury designer wooden and CNC doors in Noida, Delhi NCR.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '2nd Floor A-22, Sector 9',
    addressLocality: 'Noida',
    addressRegion: 'Uttar Pradesh',
    postalCode: '201301',
    addressCountry: 'IN'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-9871471161',
    contactType: 'Sales Inquiry'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=Jost:wght@200;300;400;500;600&family=Montserrat:wght@400;500;600;700&family=Playfair+Display:wght@400;600;700&family=Cinzel:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=Anton&family=DM+Sans:wght@300;400;500&family=DM+Serif+Display&family=Oswald:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        <GlobalClickSound />
        <ScrollReveal />
        <Toaster richColors position="top-right" />
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
