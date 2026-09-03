import { queryOptions } from "@tanstack/react-query";

import { getDesignIdeaBySlug, getDesignIdeas } from "@/features/design-ideas/api";
import { queryKeys } from "@/lib/query/keys";
import type { ListQuery } from "@/types/api";

export function designIdeasQueryOptions(query?: ListQuery) {
  return queryOptions({
    queryKey: queryKeys.designIdeas.list(query),
    queryFn: () => getDesignIdeas(query),
  });
}

export function designIdeaQueryOptions(slug: string) {
  return queryOptions({
    queryKey: queryKeys.designIdeas.detail(slug),
    queryFn: () => getDesignIdeaBySlug(slug),
  });
}
