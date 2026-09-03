import type { MediaImage } from "@/types/media";
import type { ContentSummary } from "@/types/content";

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
