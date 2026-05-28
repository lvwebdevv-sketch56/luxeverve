import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "default_super_secret_key_change_me");

export async function adminOnly(req, res, next) {
  try {
    let token = null;

    // Try to get session cookie first
    try {
      const cookieStore = await cookies();
      const sessionCookie = cookieStore.get('session');
      if (sessionCookie && sessionCookie.value) {
        token = sessionCookie.value;
      }
    } catch (err) {
      // Ignore cookies error (might not be available in some contexts)
    }

    if (!token) {
      // Fallback to Authorization header
      const authHeader = typeof req.headers.get === 'function' 
        ? req.headers.get('authorization') 
        : req.headers.authorization;
      
      token = authHeader ? authHeader.split('Bearer ')[1] : null;
    }

    if (!token) throw new Error('No token provided');

    // Verify JWT
    const { payload } = await jwtVerify(token, JWT_SECRET);

    req.user = payload;
    next();
  } catch (e) {
    if (res && typeof res.status === 'function') {
      res.status(e.message === 'Forbidden' ? 403 : 401).json({ error: 'Unauthorized', details: e.message });
    } else {
      next(e);
    }
  }
}
