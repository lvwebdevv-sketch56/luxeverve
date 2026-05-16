import HeroVideoSection from '@/components/HeroVideoSection';
import HomeSections from '@/components/HomeSections';

export const metadata = {
  title: 'Home – Luxe Verve',
  description: 'Luxury Designer Doors crafted as architectural statements.',
};

export default function HomePage() {
  return (
    <>
      <HeroVideoSection />
      <HomeSections />
    </>
  );
}
