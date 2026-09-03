import { queryOptions } from "@tanstack/react-query";

import { getProjectBySlug, getProjects } from "@/features/projects/api";
import { queryKeys } from "@/lib/query/keys";
import type { ListQuery } from "@/types/api";

export function projectsQueryOptions(query?: ListQuery) {
  return queryOptions({
    queryKey: queryKeys.projects.list(query),
    queryFn: () => getProjects(query),
  });
}

export function projectQueryOptions(slug: string) {
  return queryOptions({
    queryKey: queryKeys.projects.detail(slug),
    queryFn: () => getProjectBySlug(slug),
  });
}
