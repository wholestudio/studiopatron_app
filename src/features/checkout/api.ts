import { customerApi } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import type { CheckoutInput } from "@/lib/validation/checkout";

export function startCheckout(input: CheckoutInput) {
  return customerApi.post(endpoints.customer.checkout, input);
}
