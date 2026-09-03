import { endpoints } from "@/lib/api/endpoints";
import { publicApi } from "@/lib/api/public";
import type { ListQuery, PaginatedResponse } from "@/types/api";
import type { Service } from "@/types/content";

export function getServices(query?: ListQuery) {
  return publicApi.get<PaginatedResponse<Service>>(endpoints.public.services, { query });
}

export function getServiceBySlug(slug: string) {
  return publicApi.get<Service>(endpoints.public.service(slug));
}
