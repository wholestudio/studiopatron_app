import { queryOptions } from "@tanstack/react-query";

import { getAddresses, getProfile } from "@/features/account/api";
import { queryKeys } from "@/lib/query/keys";

export function profileQueryOptions() {
  return queryOptions({
    queryKey: queryKeys.account.profile,
    queryFn: getProfile,
  });
}

export function addressesQueryOptions() {
  return queryOptions({
    queryKey: queryKeys.account.addresses,
    queryFn: getAddresses,
  });
}
