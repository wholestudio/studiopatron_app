import { endpoints } from "@/lib/api/endpoints";
import { publicApi } from "@/lib/api/public";
import type { ListQuery, PaginatedResponse } from "@/types/api";
import type { Project } from "@/types/content";

export function getProjects(query?: ListQuery) {
  return publicApi.get<PaginatedResponse<Project>>(endpoints.public.projects, { query });
}

export function getProjectBySlug(slug: string) {
  return publicApi.get<Project>(endpoints.public.project(slug));
}
