import type { Metadata } from "next";

import { CatalogPage } from "@/shared/components/layout/catalog-page";
import { routes } from "@/shared/constants/routes";
import { createPageMetadata } from "@/infra/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Orders",
  path: routes.orders,
  robots: { index: false, follow: false },
});

export default function OrdersLookupPage() {
  return (
    <CatalogPage
      title="Orders"
      description="Guest order lookup and authenticated order history will load from the customer orders API."
      breadcrumbs={[
        { name: "Home", path: routes.home },
        { name: "Orders", path: routes.orders },
      ]}
      emptyTitle="Orders"
      emptyDescription="No order records are loaded yet."
      showFilters={false}
    />
  );
}
