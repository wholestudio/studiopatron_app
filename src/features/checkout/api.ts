import { customerApi } from "@/infra/api/customerApi";
import { endpoints } from "@/infra/api/endpoints";
import type { CheckoutInput } from "@/infra/validation/checkout";

export function startCheckout(input: CheckoutInput) {
  return customerApi.post(endpoints.customer.checkout, input);
}
