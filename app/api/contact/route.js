import clientPromise from '@/lib/mongodb';
import { adminOnly } from '@/lib/middleware/auth';

// Helper to run middleware in App Router (for auth)
async function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      resolve(result);
    });
  });
}

// GET route to fetch all inquiries (Admin Only)
export async function GET(req) {
  try {
    await runMiddleware(req, {}, adminOnly);
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Unauthorized', details: e.message }), { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const snapshot = await db.collection('inquiries').find({}).sort({ createdAt: -1 }).toArray();
    const inquiries = snapshot.map(doc => {
      return {
        ...doc,
        id: doc._id.toString(),
        _id: undefined,
        createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : null
      };
    });
    return new Response(JSON.stringify(inquiries), { status: 200 });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch inquiries' }), { status: 500 });
  }
}

// POST route to submit a new inquiry (Public)
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    const docRef = await db.collection('inquiries').insertOne({
      name,
      email,
      phone: phone || '',
      message,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ success: true, id: docRef.insertedId.toString() }), { status: 201 });
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    return new Response(JSON.stringify({ error: 'Failed to submit inquiry' }), { status: 500 });
  }
}
