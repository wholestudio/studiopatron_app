import { apiRequest } from "@/infra/api/httpClient";
import type { ApiRequestOptions } from "@/shared/types/api";

const customerDefaults: Pick<ApiRequestOptions, "auth" | "cache"> = {
  auth: true,
  cache: "no-store",
};

export const customerApi = {
  get<T>(path: string, options?: Omit<ApiRequestOptions, "method" | "body">) {
    return apiRequest<T>(path, { ...customerDefaults, ...options, method: "GET" });
  },
  post<T>(path: string, body?: unknown, options?: Omit<ApiRequestOptions, "method">) {
    return apiRequest<T>(path, { ...customerDefaults, ...options, method: "POST", body });
  },
  put<T>(path: string, body?: unknown, options?: Omit<ApiRequestOptions, "method">) {
    return apiRequest<T>(path, { ...customerDefaults, ...options, method: "PUT", body });
  },
  patch<T>(path: string, body?: unknown, options?: Omit<ApiRequestOptions, "method">) {
    return apiRequest<T>(path, { ...customerDefaults, ...options, method: "PATCH", body });
  },
  delete<T>(path: string, options?: Omit<ApiRequestOptions, "method" | "body">) {
    return apiRequest<T>(path, { ...customerDefaults, ...options, method: "DELETE" });
  },
};
