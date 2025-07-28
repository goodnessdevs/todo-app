// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip middleware for public routes
  const isPublicRoute = ["/", "/login", "/signup"].includes(pathname);
  if (isPublicRoute) return NextResponse.next();

  const token = req.cookies.get("token")?.value;

  // Redirect to login if token is missing
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If token exists, allow access
  return NextResponse.next();
}

export const config = {
  matcher: ["/create", "/tasks/:path*"],
};