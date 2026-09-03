import { queryOptions } from "@tanstack/react-query";

import { localCartRepository } from "@/features/cart/repository";
import { queryKeys } from "@/lib/query/keys";

export function cartQueryOptions() {
  return queryOptions({
    queryKey: queryKeys.cart.current,
    queryFn: () => localCartRepository.get(),
  });
}
