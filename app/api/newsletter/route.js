import clientPromise from '@/lib/mongodb';
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
    const client = await clientPromise;
    const db = client.db();
    const snapshot = await db.collection('newsletter_subscribers').find({}).sort({ createdAt: -1 }).toArray();
    const subscribers = snapshot.map(doc => {
      return {
        ...doc,
        id: doc._id.toString(),
        _id: undefined,
        createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : null
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

    const client = await clientPromise;
    const db = client.db();

    // Check if email already exists
    const existing = await db.collection('newsletter_subscribers').findOne({ email });
    if (existing) {
      return new Response(JSON.stringify({ error: 'Email already subscribed' }), { status: 400 });
    }

    const docRef = await db.collection('newsletter_subscribers').insertOne({
      email,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ success: true, id: docRef.insertedId.toString() }), { status: 201 });
  } catch (error) {
    console.error('Error submitting newsletter:', error);
    return new Response(JSON.stringify({ error: 'Failed to subscribe' }), { status: 500 });
  }
}
