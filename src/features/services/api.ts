import { endpoints } from "@/infra/api/endpoints";
import { publicApi } from "@/infra/api/publicApi";
import type { ListQuery, PaginatedResponse } from "@/shared/types/api";
import type { Service } from "@/shared/types/content";

export function getServices(query?: ListQuery) {
  return publicApi.get<PaginatedResponse<Service>>(endpoints.public.services, { query });
}

export function getServiceBySlug(slug: string) {
  return publicApi.get<Service>(endpoints.public.service(slug));
}
