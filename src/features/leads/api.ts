import { customerApi } from "@/infra/api/customerApi";
import { endpoints } from "@/infra/api/endpoints";
import type { EnquiryInput } from "@/infra/validation/enquiry";

export function submitLead(input: EnquiryInput) {
  return customerApi.post(endpoints.customer.leads, input);
}
