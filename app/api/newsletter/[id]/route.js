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

export async function DELETE(req, { params }) {
  try {
    await runMiddleware(req, {}, adminOnly);
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Unauthorized', details: e.message }), { status: 401 });
  }

  try {
    const { id } = params;
    if (!id) return new Response(JSON.stringify({ error: 'Missing ID' }), { status: 400 });

    await db.collection('newsletter_subscribers').doc(id).delete();
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Error deleting subscriber:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete subscriber' }), { status: 500 });
  }
}
