import { NextResponse } from 'next/server';

export function middleware(request) {
  const session = request.cookies.get('session');

  // If trying to access /ops.admin and no session cookie is present
  if (request.nextUrl.pathname.startsWith('/ops.admin')) {
    if (!session) {
      // Redirect to sign-in page with a specific error message parameter
      return NextResponse.redirect(new URL('/sign-in?error=signin_first', request.url));
    }
  }

  return NextResponse.next();
}

// Ensure the middleware only runs for specific paths
export const config = {
  matcher: ['/ops.admin/:path*'],
};
