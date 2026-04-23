import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

const routeRoles: Record<string, string[]> = {
  "/admin": ["admin"],
  "/editor": ["admin", "editor"],
};

function isPathMatch(pathname: string, routePrefix: string) {
  return pathname === routePrefix || pathname.startsWith(`${routePrefix}/`);
}

export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[] = []
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;

    const isProtectedRoute = requireAuth.some((route) =>
      isPathMatch(pathname, route),
    );

    if (isProtectedRoute) {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });

      if (!token) {
        const url = new URL("/auth/login", req.url);
        url.searchParams.set("callbackUrl", encodeURI(req.url));
        return NextResponse.redirect(url);
      }

      const matchedRule = Object.entries(routeRoles).find(([routePrefix]) =>
        isPathMatch(pathname, routePrefix),
      );

      if (matchedRule) {
        const [, allowedRoles] = matchedRule;
        if (!allowedRoles.includes((token as any).role)) {
          return NextResponse.redirect(new URL("/", req.url));
        }
      }
    }

    return middleware(req, next);
  };
}