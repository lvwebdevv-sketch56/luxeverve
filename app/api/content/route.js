import { adminOnly } from '@/lib/middleware/auth';
import { uploadAsset } from '@/lib/cloudinary';
import { db } from '@/lib/firebaseAdmin';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import os from 'os';

// Helper to run middleware in App Router (for auth)
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
    const snapshot = await db.collection('content').orderBy('order', 'asc').get();
    const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return new Response(JSON.stringify(items), { status: 200 });
  } catch (error) {
    console.error('Error fetching content:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch content' }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    await runMiddleware(req, {}, adminOnly);
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Unauthorized', details: e.message }), { status: 401 });
  }
  
  let formData;
  try {
    formData = await req.formData();
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Failed to parse form data' }), { status: 400 });
  }

  const type = formData.get('type');
  const title = formData.get('title');
  const description = formData.get('description');
  const text = formData.get('text');
  const order = formData.get('order');
  const reqUrl = formData.get('url');
  const file = formData.get('file');

  if (!type) return new Response(JSON.stringify({ error: 'Missing type' }), { status: 400 });

  let url = reqUrl || null,
    thumbnailUrl = formData.get('thumbnailUrl') || null,
    publicId = formData.get('publicId') || null;

  if (type === 'image' || type === 'video' || type === 'pdf') {
    if (!file && !reqUrl) return new Response(JSON.stringify({ error: 'File or URL required for media' }), { status: 400 });
    
    if (file && typeof file !== 'string') {
      try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const tempPath = join(os.tmpdir(), `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`);
        await writeFile(tempPath, buffer);
        
        const result = await uploadAsset(tempPath, type);
        url = result.url;
        thumbnailUrl = result.thumbnailUrl;
        publicId = result.publicId;
      } catch (e) {
        console.error('Cloudinary upload error', e);
        return new Response(JSON.stringify({ error: 'Failed to upload media' }), { status: 500 });
      }
    }
  } else {
    // If type is text, url can still be populated from reqUrl (when selecting existing media)
  }

  try {
    const docRef = await db.collection('content').add({
      type,
      title: title || null,
      description: description || null,
      url,
      thumbnailUrl,
      publicId,
      text: text || null,
      order: Number(order) || 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const newDoc = await docRef.get();
    return new Response(JSON.stringify({ id: docRef.id, ...newDoc.data() }), { status: 201 });
  } catch (e) {
    console.error('Firestore add error', e);
    return new Response(JSON.stringify({ error: 'Failed to store content' }), { status: 500 });
  }
}

