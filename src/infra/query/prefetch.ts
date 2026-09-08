import { dehydrate, type QueryClient } from "@tanstack/react-query";

export async function prefetchQuery(
  queryClient: QueryClient,
  query: {
    queryKey: readonly unknown[];
    queryFn: () => Promise<unknown>;
  },
) {
  await queryClient.prefetchQuery(query);
  return dehydrate(queryClient);
}
