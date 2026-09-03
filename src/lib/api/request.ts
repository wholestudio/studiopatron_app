import { getApiUrl } from "@/config/env";
import { SESSION_COOKIE_NAME } from "@/constants/app";
import { ApiConfigError, ApiError } from "@/lib/api/errors";
import type { ApiErrorBody, ApiRequestOptions } from "@/types/api";

function joinUrl(base: string, path: string): string {
  return `${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

function applyQuery(url: URL, query?: ApiRequestOptions["query"]): void {
  if (!query) {
    return;
  }

  for (const [key, value] of Object.entries(query)) {
    if (value === undefined) {
      continue;
    }

    url.searchParams.set(key, String(value));
  }
}

async function parseBody(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type") ?? "";

  if (response.status === 204) {
    return undefined;
  }

  if (contentType.includes("application/json")) {
    return response.json();
  }

  return response.text();
}

export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const apiUrl = getApiUrl();

  if (!apiUrl) {
    throw new ApiConfigError("NEXT_PUBLIC_API_URL is not configured.");
  }

  const url = new URL(joinUrl(apiUrl, path));
  applyQuery(url, options.query);

  const headers = new Headers(options.headers);
  headers.set("Accept", "application/json");

  if (options.body !== undefined && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const init: RequestInit & { next?: ApiRequestOptions["next"] } = {
    method: options.method ?? "GET",
    headers,
    cache: options.cache,
    signal: options.signal,
    next: options.next,
  };

  if (options.auth) {
    init.credentials = "include";
    headers.set("X-Requested-With", "StudioPatron");
  }

  if (options.body !== undefined) {
    init.body = JSON.stringify(options.body);
  }

  const response = await fetch(url, init);
  const payload = await parseBody(response);

  if (!response.ok) {
    const body = (payload ?? {}) as ApiErrorBody;
    throw new ApiError(body.message ?? response.statusText, response.status, body);
  }

  return payload as T;
}

export function getSessionCookieName(): string {
  return SESSION_COOKIE_NAME;
}
