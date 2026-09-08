import { endpoints } from "@/infra/api/endpoints";
import { publicApi } from "@/infra/api/publicApi";
import type { ListQuery, PaginatedResponse } from "@/shared/types/api";
import type { DesignIdea } from "@/shared/types/content";

export function getDesignIdeas(query?: ListQuery) {
  return publicApi.get<PaginatedResponse<DesignIdea>>(endpoints.public.designIdeas, { query });
}

export function getDesignIdeaBySlug(slug: string) {
  return publicApi.get<DesignIdea>(endpoints.public.designIdea(slug));
}
