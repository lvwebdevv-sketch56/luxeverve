import HeroVideoSection from '@/components/HeroVideoSection';
import HomeSections from '@/components/HomeSections';
import { db } from '@/lib/firebaseAdmin';

export const metadata = {
  title: 'Home – Luxe Verve',
  description: 'Luxury Designer Doors crafted as architectural statements.',
};

export default async function HomePage() {
  const snapshot = await db.collection('content').get();
  const content = snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title || null,
      url: data.url || null,
      thumbnailUrl: data.thumbnailUrl || null,
      description: data.description || null,
      text: data.text || null,
      order: data.order || 0
    };
  });

  return (
    <>
      <HeroVideoSection content={content} />
      <HomeSections content={content} />
    </>
  );
}
