import { ApiConfigError, isApiError } from "@/infra/api/errors";
import type { ListQuery } from "@/shared/types/api";

import { getProductBySlug, getProducts } from "./api";
import type { ProductDetailPageModel, ProductListPageModel } from "./types";

export async function getProductListPage(query?: ListQuery): Promise<ProductListPageModel> {
  try {
    const data = await getProducts(query);
    const products = data.items ?? [];

    return {
      products,
      isEmpty: products.length === 0,
      unavailable: false,
    };
  } catch (error) {
    if (error instanceof ApiConfigError || isApiError(error)) {
      return {
        products: [],
        isEmpty: true,
        unavailable: true,
      };
    }

    throw error;
  }
}

export async function getProductDetailPage(slug: string): Promise<ProductDetailPageModel> {
  try {
    const product = await getProductBySlug(slug);

    return {
      status: "ok",
      product,
    };
  } catch (error) {
    if (error instanceof ApiConfigError) {
      return { status: "unavailable", product: null };
    }

    if (isApiError(error) && error.status === 404) {
      return { status: "not_found", product: null };
    }

    if (isApiError(error)) {
      return { status: "unavailable", product: null };
    }

    throw error;
  }
}
