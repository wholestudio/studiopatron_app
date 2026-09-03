import { customerApi } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import type { Address, CustomerProfile } from "@/types/auth";

export function getProfile() {
  return customerApi.get<CustomerProfile>(endpoints.customer.profile);
}

export function getAddresses() {
  return customerApi.get<Address[]>(endpoints.customer.addresses);
}
