import { routes } from "@/shared/constants/routes";

export const protectedPathPrefixes = ["/account"] as const;

export function isProtectedPath(pathname: string): boolean {
  return protectedPathPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function getLoginRedirect(pathname: string, search = ""): string {
  const next = `${pathname}${search}`;
  const params = new URLSearchParams({ next });
  return `${routes.login}?${params.toString()}`;
}
