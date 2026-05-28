import HeroVideoSection from '@/components/HeroVideoSection';
import HomeSections from '@/components/HomeSections';
import clientPromise from '@/lib/mongodb';

export const metadata = {
  title: 'Luxury Designer Doors in Noida | Premium Wooden Doors',
  description: 'Explore premium luxury wooden doors by Luxe Verve. Customized designer entrance, interior, and CNC doors for villas, apartments, and luxury spaces in Noida & Delhi NCR.',
};

export const revalidate = 0; // Force Next.js to always fetch fresh data from Firestore


export default async function HomePage() {
  let content = [];
  try {
    const client = await clientPromise;
    const db = client.db();
    const items = await db.collection('content').find({}).toArray();
    content = items.map(doc => {
      const data = doc;
      return {
        id: doc._id.toString(),
        title: data.title || null,
        url: data.url || null,
        thumbnailUrl: data.thumbnailUrl || null,
        description: data.description || null,
        text: data.text || null,
        order: data.order || 0
      };
    });
  } catch (error) {
    console.error("Firebase fetch error in HomePage:", error);
  }

  return (
    <>
      <HeroVideoSection content={content} />
      <HomeSections content={content} />
    </>
  );
}
