import type { Metadata } from "next";

import { CatalogPage } from "@/components/layout/catalog-page";
import { routes } from "@/constants/routes";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Cart",
  path: routes.cart,
  robots: { index: false, follow: false },
});

export default function CartPage() {
  return (
    <CatalogPage
      title="Cart"
      description="Cart items will be managed locally first, then persisted through the customer cart API."
      breadcrumbs={[
        { name: "Home", path: routes.home },
        { name: "Cart", path: routes.cart },
      ]}
      emptyTitle="Your cart is empty"
      emptyDescription="Products added to the cart will appear here."
      showFilters={false}
    />
  );
}
