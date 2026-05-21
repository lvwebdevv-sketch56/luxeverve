import { db } from '@/lib/firebaseAdmin';
import { adminOnly } from '@/lib/middleware/auth';

async function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      resolve(result);
    });
  });
}

export async function GET(req) {
  try {
    await runMiddleware(req, {}, adminOnly);
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Unauthorized', details: e.message }), { status: 401 });
  }

  try {
    const snapshot = await db.collection('newsletter_subscribers').orderBy('createdAt', 'desc').get();
    const subscribers = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : null
      };
    });
    return new Response(JSON.stringify(subscribers), { status: 200 });
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch subscribers' }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return new Response(JSON.stringify({ error: 'Missing email' }), { status: 400 });
    }

    // Check if email already exists
    const existing = await db.collection('newsletter_subscribers').where('email', '==', email).get();
    if (!existing.empty) {
      return new Response(JSON.stringify({ error: 'Email already subscribed' }), { status: 400 });
    }

    const docRef = await db.collection('newsletter_subscribers').add({
      email,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ success: true, id: docRef.id }), { status: 201 });
  } catch (error) {
    console.error('Error submitting newsletter:', error);
    return new Response(JSON.stringify({ error: 'Failed to subscribe' }), { status: 500 });
  }
}
