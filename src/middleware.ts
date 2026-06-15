import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  console.log("MIDDLEWARE RUNNING");
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });
  console.log("tokentokentokentoken", token)

  const { pathname } = request.nextUrl;
  const userRole = token?.role;

  // 1. login
  if (!token && pathname !== '/auth/login') {
     console.log("REDIRECTING TO LOGIN");
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // 2. dashboard
  if (token && pathname === '/auth/login') {
    console.log("REDIRECTING TO DASHBOARD");
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 3. super_admin
  if (pathname.startsWith('/companies') && userRole !== 'super_admin') {
    console.log("REDIRECTING TO DASHBOARD");
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// middleware
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};