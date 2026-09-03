import type { Metadata } from "next";

import { CatalogPage } from "@/components/layout/catalog-page";
import { routes } from "@/constants/routes";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Products",
  path: routes.products,
});

export default function ProductsPage() {
  return (
    <CatalogPage
      title="Products"
      description="Catalog products will appear here from the public products API."
      breadcrumbs={[
        { name: "Home", path: routes.home },
        { name: "Products", path: routes.products },
      ]}
      emptyTitle="Products"
      emptyDescription="No products have been published yet."
    />
  );
}
