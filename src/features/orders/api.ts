import { customerApi } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import type { PaginatedResponse } from "@/types/api";
import type { OrderSummary } from "@/types/commerce";

export function getOrders() {
  return customerApi.get<PaginatedResponse<OrderSummary>>(endpoints.customer.orders);
}

export function getOrderById(id: string) {
  return customerApi.get<OrderSummary>(endpoints.customer.order(id));
}
