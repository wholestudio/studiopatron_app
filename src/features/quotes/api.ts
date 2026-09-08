import { customerApi } from "@/infra/api/customerApi";
import { endpoints } from "@/infra/api/endpoints";
import type { QuoteInput } from "@/infra/validation/quote";

export function submitQuote(input: QuoteInput) {
  return customerApi.post(endpoints.customer.quotes, input);
}
