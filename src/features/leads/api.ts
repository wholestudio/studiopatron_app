import { customerApi } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import type { EnquiryInput } from "@/lib/validation/enquiry";

export function submitLead(input: EnquiryInput) {
  return customerApi.post(endpoints.customer.leads, input);
}
