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
  
  const res = await fetch(url, options);
  const originalJson = res.json.bind(res);
  res.json = async () => {
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch (e) {
      console.error("fetchWithCloudinary JSON parse error for URL:", url);
      console.error("Response text snippet:", text.slice(0, 100));
      return { error: "Invalid JSON response", raw: text.slice(0, 100) };
    }
  };
  return res;
};
