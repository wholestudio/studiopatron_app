import type { MediaImage } from "@/shared/types/media";
import type { ContentSummary } from "@/shared/types/content";

export type Product = ContentSummary & {
  sku?: string;
  priceAmount?: number;
  currency?: string;
  images?: MediaImage[];
};

export type CartItem = {
  productId: string;
  quantity: number;
  sku?: string;
};

export type CartSnapshot = {
  items: CartItem[];
  updatedAt?: string;
};

export type OrderSummary = {
  id: string;
  status?: string;
  createdAt?: string;
};
