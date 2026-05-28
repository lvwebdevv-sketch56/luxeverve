export const uploadToCloudinaryClient = async (file, type) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = 'luxe_verve_unsigned'; // The unsigned preset name provided by the user

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  // Resource type depends on what we upload, usually 'auto' is safest for Cloudinary unsigned uploads.
  // But if it's pdf/document, it needs to be 'raw' or 'auto'.
  
  const resourceType = (type === 'pdf' || type === 'document') ? 'raw' : (type === 'video' ? 'video' : 'image');

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error?.message || 'Failed to upload to Cloudinary');
  }

  const data = await response.json();
  
  // Return the same format as our server-side uploadAsset
  return {
    url: data.secure_url,
    publicId: data.public_id,
    // If it's a video, generate a thumbnail URL (Cloudinary auto-generates jpg for videos if requested, or we can just append .jpg to the url)
    thumbnailUrl: type === 'video' ? data.secure_url.replace(/\.[^/.]+$/, ".jpg") : null,
  };
};
