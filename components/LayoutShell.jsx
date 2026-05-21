'use client';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import PageTransition from '@/components/PageTransition';

const THEME_ROUTES = ['/home4'];

export default function LayoutShell({ children }) {
  const pathname = usePathname();
  const isThemePage = THEME_ROUTES.includes(pathname);

  if (isThemePage) {
    return (
      <>
        <main style={{ minHeight: '100vh' }}>{children}</main>
        <WhatsAppButton />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <PageTransition>
        <main>{children}</main>
        <Footer />
      </PageTransition>
      <WhatsAppButton />
    </>
  );
}
