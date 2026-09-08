import { NextResponse, type NextRequest } from "next/server";

import { getLoginRedirect, getSessionCookieName, isProtectedPath } from "@/infra/auth";

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (!isProtectedPath(pathname)) {
    return NextResponse.next();
  }

  const session = request.cookies.get(getSessionCookieName())?.value;

  if (!session) {
    const url = request.nextUrl.clone();
    const loginPath = getLoginRedirect(pathname, search);
    const [path, query] = loginPath.split("?");
    url.pathname = path ?? "/login";
    url.search = query ? `?${query}` : "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account", "/account/:path*"],
};
