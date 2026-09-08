import { SESSION_COOKIE_NAME } from "@/shared/constants/app";
import type { CustomerSession } from "@/shared/types/auth";

export function getSessionCookieName(): string {
  return SESSION_COOKIE_NAME;
}

export function isSessionExpired(session: CustomerSession, now = Date.now()): boolean {
  if (!session.expiresAt) {
    return false;
  }

  return Date.parse(session.expiresAt) <= now;
}
