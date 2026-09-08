import { customerApi } from "@/infra/api/customerApi";
import { endpoints } from "@/infra/api/endpoints";
import type { Address, CustomerProfile } from "@/shared/types/auth";

export function getProfile() {
  return customerApi.get<CustomerProfile>(endpoints.customer.profile);
}

export function getAddresses() {
  return customerApi.get<Address[]>(endpoints.customer.addresses);
}
