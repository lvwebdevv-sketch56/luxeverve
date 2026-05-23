import './globals.css';
import ScrollReveal from '@/components/ScrollReveal';
import GlobalClickSound from '@/components/GlobalClickSound';
import LayoutShell from '@/components/LayoutShell';
import { Toaster } from 'sonner';

export const metadata = {
  title: 'Luxe Verve – Luxury Designer Doors',
  description: 'Custom-crafted premium entrance doors with sculpted textures, refined materials, and timeless design for luxury homes.',
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
