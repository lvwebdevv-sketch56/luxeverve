import { auth } from '@/lib/firebaseAdmin';
import { cookies } from 'next/headers';

export async function adminOnly(req, res, next) {
  try {
    let token = null;
    let isSessionCookie = false;

    // Try to get session cookie first
    try {
      const cookieStore = await cookies();
      const sessionCookie = cookieStore.get('session');
      if (sessionCookie && sessionCookie.value) {
        token = sessionCookie.value;
        isSessionCookie = true;
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

    let decoded;
    if (isSessionCookie) {
      decoded = await auth.verifySessionCookie(token, true);
    } else {
      decoded = await auth.verifyIdToken(token);
    }

    // You can optionally add admin role check here if needed
    // const adminUids = (process.env.ADMIN_UIDS || '').split(',').map(v => v.trim());
    // if (adminUids.length > 0 && !adminUids.includes(decoded.uid)) {
    //   throw new Error('Forbidden');
    // }

    req.user = decoded;
    next();
  } catch (e) {
    if (res && typeof res.status === 'function') {
      res.status(e.message === 'Forbidden' ? 403 : 401).json({ error: 'Unauthorized', details: e.message });
    } else {
      next(e);
    }
  }
}
