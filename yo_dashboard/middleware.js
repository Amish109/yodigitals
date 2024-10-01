import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get('token');
  const url = request.nextUrl.clone();

  const adminDashboardPath = "/admin/dashboard";
  const loginPath = "/admin";

  if (!token) {
    const protectedPaths = [adminDashboardPath, "/admin/:path*"];

    if (protectedPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
      return NextResponse.redirect(new URL(loginPath, request.url));
    }
  } else {
    if (request.nextUrl.pathname === loginPath) {
      return NextResponse.redirect(new URL(adminDashboardPath, request.url));
    }
  }
  return NextResponse.next();
}
