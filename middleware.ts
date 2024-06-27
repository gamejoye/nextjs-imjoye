import type { NextRequest } from 'next/server'

export function middleware(
  request: NextRequest,
) {
  const cookies = request.cookies;
  const tokenCookie = cookies.get('authenticatedToken');

  if (tokenCookie && request.nextUrl.pathname.startsWith('/auth')) {
    return Response.redirect(new URL('/', request.url));
  }

  if (!tokenCookie && !request.nextUrl.pathname.startsWith('/auth')) {
    return Response.redirect(new URL('/auth/login', request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}