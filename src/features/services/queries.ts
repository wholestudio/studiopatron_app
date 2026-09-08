import { queryOptions } from "@tanstack/react-query";

import { getServiceBySlug, getServices } from "@/features/services/api";
import { queryKeys } from "@/infra/query/keys";
import type { ListQuery } from "@/shared/types/api";

export function servicesQueryOptions(query?: ListQuery) {
  return queryOptions({
    queryKey: queryKeys.services.list(query),
    queryFn: () => getServices(query),
  });
}

export function serviceQueryOptions(slug: string) {
  return queryOptions({
    queryKey: queryKeys.services.detail(slug),
    queryFn: () => getServiceBySlug(slug),
  });
}
