import { customerApi } from "@/infra/api/customerApi";
import { endpoints } from "@/infra/api/endpoints";
import type { PaginatedResponse } from "@/shared/types/api";
import type { OrderSummary } from "@/shared/types/commerce";

export function getOrders() {
  return customerApi.get<PaginatedResponse<OrderSummary>>(endpoints.customer.orders);
}

export function getOrderById(id: string) {
  return customerApi.get<OrderSummary>(endpoints.customer.order(id));
}
