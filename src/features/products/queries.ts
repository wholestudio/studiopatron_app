import { queryOptions } from "@tanstack/react-query";

import { getProductBySlug, getProducts } from "@/features/products/api";
import { queryKeys } from "@/lib/query/keys";
import type { ListQuery } from "@/types/api";

export function productsQueryOptions(query?: ListQuery) {
  return queryOptions({
    queryKey: queryKeys.products.list(query),
    queryFn: () => getProducts(query),
  });
}

export function productQueryOptions(slug: string) {
  return queryOptions({
    queryKey: queryKeys.products.detail(slug),
    queryFn: () => getProductBySlug(slug),
  });
}
