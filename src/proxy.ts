import { NextRequest, NextResponse } from 'next/server';

const PROTECTED = ['/account', '/checkout'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED.some((p) => pathname.startsWith(p));

  if (isProtected) {
    // veil-auth-token is set directly by authStore.setTokens (a plain JWT cookie)
    const hasToken = !!request.cookies.get('veil-auth-token')?.value;

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
