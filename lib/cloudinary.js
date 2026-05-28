import cloudinaryPkg from 'cloudinary';
const cloudinary = cloudinaryPkg.v2;

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

/**
 * Upload a file to Cloudinary.
 * @param {string} filePath - Absolute path to the temporary file.
 * @param {'image'|'video'} type - Asset type.
 * @returns {Promise<{url:string, publicId:string, thumbnailUrl:string|null}>}
 */
export const uploadAsset = async (filePath, type) => {
  const options = {
    resource_type: (type === 'pdf' || type === 'document') ? 'raw' : (type === 'video' ? 'video' : 'image'),
    folder: `luxeverve/${type}s`,
  };

  if (type === 'video') {
    // Generate a first‑frame thumbnail (eager transformation)
    options.eager = [{
      width: 640,
      height: 360,
      crop: 'thumb',
      format: 'jpg',
      start_offset: '0',
    }];
    options.eager_async = false;
  }

  const result = await cloudinary.uploader.upload(filePath, options);
  return {
    url: result.secure_url,
    publicId: result.public_id,
    thumbnailUrl:
      type === 'video' && result.eager?.[0]?.secure_url
        ? result.eager[0].secure_url
        : null,
  };
};

/**
 * Delete an asset from Cloudinary.
 * @param {string} publicId - The public_id returned on upload.
 * @param {'image'|'video'} type
 */
export const deleteAsset = async (publicId, type) => {
  const resourceType = type === 'pdf' ? 'raw' : type === 'document' ? 'raw' : type;
  return cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
};
