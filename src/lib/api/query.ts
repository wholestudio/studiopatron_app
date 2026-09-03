import { queryOptions } from "@tanstack/react-query";

import { publicApi } from "@/lib/api/public";
import { queryKeys } from "@/lib/query/keys";
import type { ApiRequestOptions } from "@/types/api";

export function createPublicQueryOptions<T>(
  key: readonly unknown[],
  path: string,
  options?: Omit<ApiRequestOptions, "method" | "body" | "auth">,
) {
  return queryOptions({
    queryKey: key,
    queryFn: () => publicApi.get<T>(path, options),
  });
}

export { queryKeys };
