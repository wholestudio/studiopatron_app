import { endpoints } from "@/infra/api/endpoints";
import { publicApi } from "@/infra/api/publicApi";
import type { ListQuery, PaginatedResponse } from "@/shared/types/api";
import type { Project } from "@/shared/types/content";

export function getProjects(query?: ListQuery) {
  return publicApi.get<PaginatedResponse<Project>>(endpoints.public.projects, { query });
}

export function getProjectBySlug(slug: string) {
  return publicApi.get<Project>(endpoints.public.project(slug));
}
