import './globals.css';
import ScrollReveal from '@/components/ScrollReveal';
import GlobalClickSound from '@/components/GlobalClickSound';
import LayoutShell from '@/components/LayoutShell';

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
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Jost:wght@200;300;400;500;600&family=Montserrat:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Raleway:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&family=Cinzel:wght@400;500;600&family=Bodoni+Moda:ital,wght@0,400;0,700;1,400&family=Tenor+Sans&family=Lato:wght@300;400;700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Nunito+Sans:wght@300;400;600&family=EB+Garamond:ital,wght@0,400;0,600;1,400&family=Josefin+Sans:wght@300;400;600&family=Inter:wght@300;400;500;600&family=Oswald:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <GlobalClickSound />
        <ScrollReveal />
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
