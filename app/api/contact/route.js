import { db } from '@/lib/firebaseAdmin';
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
    const snapshot = await db.collection('inquiries').orderBy('createdAt', 'desc').get();
    const inquiries = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : null
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

    const docRef = await db.collection('inquiries').add({
      name,
      email,
      phone: phone || '',
      message,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ success: true, id: docRef.id }), { status: 201 });
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    return new Response(JSON.stringify({ error: 'Failed to submit inquiry' }), { status: 500 });
  }
}
