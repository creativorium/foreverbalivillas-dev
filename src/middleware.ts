import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://maps.googleapis.com https://www.googletagmanager.com https://connect.facebook.net https://snap.licdn.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob: https://maps.gstatic.com https://maps.googleapis.com https://*.googleapis.com https://foreverbalivillas.com https://api.foreverbalivillas.com https://*.mybluehost.me",
  "media-src 'self' https://foreverbalivillas.com https://api.foreverbalivillas.com https://*.mybluehost.me",
  "connect-src 'self' https://maps.googleapis.com https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://www.facebook.com https://foreverbalivillas.com https://api.foreverbalivillas.com https://*.mybluehost.me",
  "frame-src https://www.google.com",
  "frame-ancestors 'none'",
].join('; ');

export function middleware(request: NextRequest) {
  // Redirect legacy /fbv-api/ paths to api subdomain
  if (request.nextUrl.pathname.startsWith('/fbv-api/')) {
    const rest = request.nextUrl.pathname.replace('/fbv-api', '');
    return NextResponse.redirect(
      `https://api.foreverbalivillas.com${rest}${request.nextUrl.search}`,
      { status: 301 }
    );
  }

  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  response.headers.set('Content-Security-Policy', CSP);
  return response;
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
};
