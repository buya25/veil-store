import { NextRequest, NextResponse } from 'next/server';

const PROTECTED = ['/account', '/checkout'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED.some((p) => pathname.startsWith(p));

  if (isProtected) {
    const authCookie = request.cookies.get('veil-auth')?.value;
    let hasToken = false;

    if (authCookie) {
      try {
        const parsed = JSON.parse(authCookie);
        hasToken = !!parsed?.state?.accessToken;
      } catch {
        hasToken = false;
      }
    }

    if (!hasToken) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/account/:path*', '/checkout'],
};
