/**
 * Transport only. DTO: Product / PaginatedResponse from @/types.
 * Call via services — not from UI or hooks.
 */
import { endpoints } from "@/lib/api/endpoints";
import { publicApi } from "@/lib/api/public";
import type { ListQuery, PaginatedResponse } from "@/types/api";
import type { Product } from "@/types/commerce";

export function getProducts(query?: ListQuery) {
  return publicApi.get<PaginatedResponse<Product>>(endpoints.public.products, { query });
}

export function getProductBySlug(slug: string) {
  return publicApi.get<Product>(endpoints.public.product(slug));
}
