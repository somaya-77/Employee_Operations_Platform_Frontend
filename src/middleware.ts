import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


const publicRoutes = [
  "/auth/login",
];


export async function middleware(request: NextRequest) {  
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const isExpired = token ? Date.now() / 1000 > (token.exp as number) : true;
  // console.log("TOKEN:", token);
  // console.log("IS EXPIRED:", isExpired);

  const { pathname } = request.nextUrl;
  const userRole = token?.role;
const isValidSession = token && !isExpired;

  // 1. login
  if (!isValidSession && !publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // 2. dashboard
if (isValidSession && pathname === "/auth/login") {
  return NextResponse.redirect(new URL("/dashboard", request.url));
}

  return NextResponse.next();
}

// middleware
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2)$).*)',
  ],
};