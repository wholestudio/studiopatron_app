import type { Product } from "@/types/commerce";

export type ProductListPageModel = {
  products: Product[];
  isEmpty: boolean;
  unavailable: boolean;
};

export type ProductDetailStatus = "ok" | "not_found" | "unavailable";

export type ProductDetailPageModel = {
  status: ProductDetailStatus;
  product: Product | null;
};
