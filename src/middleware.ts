import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


const publicRoutes = [
  "/auth/login",
];


export async function middleware(request: NextRequest) {
  // console.log("MIDDLEWARE RUNNING");
//  console.log("COOKIES:", request.cookies.getAll());
  
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    // secureCookie: true,
    // secureCookie: process.env.NEXTAUTH_URL?.startsWith("https") ?? false,
  });
  console.log("TOKEN:", token);
  // console.log("tokentokentokentoken", token)

  const { pathname } = request.nextUrl;
  const userRole = token?.role;

  // 1. login
  if (
    !token &&
    !publicRoutes.some(route =>
      pathname.startsWith(route)
    )
  ) {
    return NextResponse.redirect(
      new URL("/auth/login", request.url)
    );
  }

  // 2. dashboard
if (token && pathname === "/auth/login") {
  return NextResponse.redirect(
    new URL("/dashboard", request.url)
  );
}

  // 3. super_admin
  // if (pathname.startsWith('/companies') && userRole !== 'super_admin') {
  //   console.log("REDIRECTING TO DASHBOARD");
  //   return NextResponse.redirect(new URL('/dashboard', request.url));
  // }

  return NextResponse.next();
}

// middleware
export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - api routes
     * - _next/static
     * - _next/image  
     * - favicon.ico
     * - images, fonts, icons (static files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2)$).*)',
  ],
};