import withAuth from "./Middleware/withAuth";
import { NextResponse } from "next/server";

const protectedRoutes = ["/profile", "/setting", "/user", "/admin", "/editor"];

function middleware() {
  return NextResponse.next();
}

export default withAuth(middleware, protectedRoutes);

export const config = {
  matcher: [
    "/profile/:path*",
    "/setting/:path*",
    "/user/:path*",
    "/admin/:path*",
    "/editor/:path*",
  ],
};