import { endpoints } from "@/lib/api/endpoints";
import { publicApi } from "@/lib/api/public";
import type { ListQuery, PaginatedResponse } from "@/types/api";
import type { DesignIdea } from "@/types/content";

export function getDesignIdeas(query?: ListQuery) {
  return publicApi.get<PaginatedResponse<DesignIdea>>(endpoints.public.designIdeas, { query });
}

export function getDesignIdeaBySlug(slug: string) {
  return publicApi.get<DesignIdea>(endpoints.public.designIdea(slug));
}
