import type { Metadata } from "next";

import { CatalogPage } from "@/components/layout/catalog-page";
import { routes } from "@/constants/routes";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Checkout",
  path: routes.checkout,
  robots: { index: false, follow: false },
});

export default function CheckoutPage() {
  return (
    <CatalogPage
      title="Checkout"
      description="Checkout will collect customer details with React Hook Form and Zod, then call the customer checkout API."
      breadcrumbs={[
        { name: "Home", path: routes.home },
        { name: "Checkout", path: routes.checkout },
      ]}
      emptyTitle="Checkout"
      emptyDescription="Checkout is prepared and waiting for cart and payment services."
      showFilters={false}
    />
  );
}
