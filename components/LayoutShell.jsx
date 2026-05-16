'use client';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';


const THEME_ROUTES = ['/home1', '/home2', '/home3', '/home4', '/home5', '/home6'];

export default function LayoutShell({ children }) {
  const pathname = usePathname();
  const isThemePage = THEME_ROUTES.includes(pathname);

  if (isThemePage) {
    return <main style={{ minHeight: '100vh' }}>{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
