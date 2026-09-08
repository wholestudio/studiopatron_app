/**
 * Transport only. DTO: Product / PaginatedResponse from @/shared/types.
 * Call via services — not from UI or hooks.
 */
import { endpoints } from "@/infra/api/endpoints";
import { publicApi } from "@/infra/api/publicApi";
import type { ListQuery, PaginatedResponse } from "@/shared/types/api";
import type { Product } from "@/shared/types/commerce";

export function getProducts(query?: ListQuery) {
  return publicApi.get<PaginatedResponse<Product>>(endpoints.public.products, { query });
}

export function getProductBySlug(slug: string) {
  return publicApi.get<Product>(endpoints.public.product(slug));
}
