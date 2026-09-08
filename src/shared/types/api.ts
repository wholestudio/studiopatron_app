export type ApiErrorBody = {
  message?: string;
  code?: string;
  details?: unknown;
};

export type PaginatedResponse<T> = {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
};

export type ListQuery = {
  page?: number;
  pageSize?: number;
  search?: string;
  sort?: string;
};

export type ApiRequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: HeadersInit;
  query?: Record<string, string | number | boolean | undefined>;
  cache?: RequestCache;
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
  auth?: boolean;
  signal?: AbortSignal;
};
