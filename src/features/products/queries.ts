import { queryOptions } from "@tanstack/react-query";

import { getProductDetailPage, getProductListPage } from "@/features/products/services";
import { queryKeys } from "@/infra/query/keys";
import type { ListQuery } from "@/shared/types/api";

/**
 * Client/refetch entry (TanStack Query). Must call services — never api.ts.
 * Prefer Server Components + services for static catalog pages.
 */
export function productsQueryOptions(query?: ListQuery) {
  return queryOptions({
    queryKey: queryKeys.products.list(query),
    queryFn: () => getProductListPage(query),
  });
}

/** Client/refetch entry — queryFn must call services, not api.ts. */
export function productQueryOptions(slug: string) {
  return queryOptions({
    queryKey: queryKeys.products.detail(slug),
    queryFn: () => getProductDetailPage(slug),
  });
}
