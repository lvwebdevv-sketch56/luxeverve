import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { adminOnly } from '@/lib/middleware/auth';

async function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      resolve(result);
    });
  });
}

export async function DELETE(req, { params }) {
  try {
    await runMiddleware(req, {}, adminOnly);
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Unauthorized', details: e.message }), { status: 401 });
  }

  try {
    const { id } = params;
    if (!id) return new Response(JSON.stringify({ error: 'Missing ID' }), { status: 400 });

    const client = await clientPromise;
    const db = client.db();
    if (!ObjectId.isValid(id)) return new Response(JSON.stringify({ error: 'Invalid ID' }), { status: 400 });

    await db.collection('inquiries').deleteOne({ _id: new ObjectId(id) });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Error deleting inquiry:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete inquiry' }), { status: 500 });
  }
}
