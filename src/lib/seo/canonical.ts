import { getSiteUrl } from "@/config/env";

export function toCanonicalUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalized === "/" ? "/" : normalized.replace(/\/$/, "")}`;
}
