import { adminOnly } from '@/lib/middleware/auth';
import { uploadAsset, deleteAsset } from '@/lib/cloudinary';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import os from 'os';

// Helper to run middleware in App Router
async function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      resolve(result);
    });
  });
}

// PATCH: update existing content (text or media)
export async function PATCH(req, { params }) {
  const { id } = await params;
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

  const title = formData.get('title');
  const description = formData.get('description');
  const text = formData.get('text');
  const order = formData.get('order');
  const type = formData.get('type');
  const reqUrl = formData.get('url');
  const reqThumbnailUrl = formData.get('thumbnailUrl');
  const reqPublicId = formData.get('publicId');
  const file = formData.get('file');

  const client = await clientPromise;
  const db = client.db();
  
  if (!ObjectId.isValid(id)) return new Response(JSON.stringify({ error: 'Invalid ID' }), { status: 400 });
  const existing = await db.collection('content').findOne({ _id: new ObjectId(id) });
  if (!existing) return new Response(JSON.stringify({ error: 'Content not found' }), { status: 404 });

  const updates = {
    title: title ?? existing.title,
    description: description ?? existing.description,
    text: text ?? existing.text,
    order: order !== null && order !== undefined ? Number(order) : existing.order,
    url: reqUrl ?? existing.url,
    updatedAt: new Date(),
  };

  if (reqThumbnailUrl) updates.thumbnailUrl = reqThumbnailUrl;
  if (reqPublicId) updates.publicId = reqPublicId;

  // If a new file is uploaded through the backend (fallback)
  if (file && typeof file !== 'string') {
    // Delete old asset if it exists
    if (existing.publicId) {
      try {
        await deleteAsset(existing.publicId, existing.type);
      } catch (e) {
        console.error('Failed to delete old asset', e);
      }
    }
    try {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const tempPath = join(os.tmpdir(), `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`);
      await writeFile(tempPath, buffer);

      const result = await uploadAsset(tempPath, existing.type);
      updates.url = result.url;
      updates.thumbnailUrl = result.thumbnailUrl;
      updates.publicId = result.publicId;
    } catch (e) {
      console.error('Cloudinary upload error', e);
      return new Response(JSON.stringify({ error: 'Failed to upload new media' }), { status: 500 });
    }
  } else if (type === 'text') {
    // For pure text updates
    updates.url = null;
    updates.thumbnailUrl = null;
    updates.publicId = null;
  }

  try {
    await db.collection('content').updateOne({ _id: new ObjectId(id) }, { $set: updates });
    const updatedSnap = await db.collection('content').findOne({ _id: new ObjectId(id) });
    return new Response(JSON.stringify({ ...updatedSnap, id, _id: undefined }), { status: 200 });
  } catch (e) {
    console.error('Firestore update error', e);
    return new Response(JSON.stringify({ error: 'Failed to update content' }), { status: 500 });
  }
}

// DELETE: remove content and its Cloudinary asset
export async function DELETE(req, { params }) {
  const { id } = await params;
  
  try {
    await runMiddleware(req, {}, adminOnly);
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Unauthorized', details: e.message }), { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db();

  if (!ObjectId.isValid(id)) return new Response(JSON.stringify({ error: 'Invalid ID' }), { status: 400 });
  const data = await db.collection('content').findOne({ _id: new ObjectId(id) });
  if (!data) return new Response(JSON.stringify({ error: 'Content not found' }), { status: 404 });
  if (data.publicId) {
    try {
      await deleteAsset(data.publicId, data.type);
    } catch (e) {
      console.error('Failed to delete Cloudinary asset', e);
    }
  }
  
  await db.collection('content').deleteOne({ _id: new ObjectId(id) });
  return new Response(null, { status: 204 });
}

