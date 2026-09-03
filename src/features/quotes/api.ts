import { customerApi } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import type { QuoteInput } from "@/lib/validation/quote";

export function submitQuote(input: QuoteInput) {
  return customerApi.post(endpoints.customer.quotes, input);
}
