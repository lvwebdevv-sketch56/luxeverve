import { uploadToCloudinaryClient } from './clientCloudinary';

export const fetchWithCloudinary = async (url, options) => {
  if (options && options.body instanceof FormData) {
    const file = options.body.get('file');
    if (file && typeof file !== 'string') {
      // Perform client-side upload to Cloudinary to bypass Netlify limits
      let type = options.body.get('type');
      if (!type) {
        if (file.type.startsWith('video')) type = 'video';
        else if (file.type.startsWith('application/pdf')) type = 'pdf';
        else type = 'image';
      }
      
      const result = await uploadToCloudinaryClient(file, type);
      
      // Remove the file so it doesn't get sent to the serverless function
      options.body.delete('file');
      
      // Append the Cloudinary response
      options.body.set('url', result.url);
      if (result.thumbnailUrl) options.body.set('thumbnailUrl', result.thumbnailUrl);
      if (result.publicId) options.body.set('publicId', result.publicId);
    }
  }
  
  return fetch(url, options);
};
