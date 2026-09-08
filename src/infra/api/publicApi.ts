import { apiRequest } from "@/infra/api/httpClient";
import type { ApiRequestOptions } from "@/shared/types/api";

const publicDefaults: Pick<ApiRequestOptions, "cache" | "next"> = {
  next: { revalidate: 60 },
};

export const publicApi = {
  get<T>(path: string, options?: Omit<ApiRequestOptions, "method" | "body" | "auth">) {
    return apiRequest<T>(path, { ...publicDefaults, ...options, method: "GET" });
  },
  post<T>(path: string, body?: unknown, options?: Omit<ApiRequestOptions, "method" | "auth">) {
    return apiRequest<T>(path, { ...options, method: "POST", body, cache: "no-store" });
  },
};
