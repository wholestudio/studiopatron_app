import { queryOptions } from "@tanstack/react-query";

import { publicApi } from "@/infra/api/publicApi";
import { queryKeys } from "@/infra/query/keys";
import type { ApiRequestOptions } from "@/shared/types/api";

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
