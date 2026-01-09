import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "./lib/supabase/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /v2/app routes (dashboard and all app pages)
  if (pathname.startsWith("/v2/app") || pathname.startsWith("/v2/dashboard") ||
      pathname.startsWith("/v2/resume") || pathname.startsWith("/v2/application-kit") ||
      pathname.startsWith("/v2/linkedin-booster") || pathname.startsWith("/v2/move-guide")) {

    try {
      const supabase = createServerClient();
      const { data: { session }, error } = await supabase.auth.getSession();

      if (!session || error) {
        // Not authenticated, redirect to login
        const loginUrl = new URL("/v2/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
      }
    } catch (error) {
      // If there's an error checking auth, redirect to login
      const loginUrl = new URL("/v2/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)"
  ]
};
