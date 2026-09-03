import type { Metadata } from "next";

import { CatalogPage } from "@/components/layout/catalog-page";
import { routes } from "@/constants/routes";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  path: routes.contact,
});

export default function ContactPage() {
  return (
    <CatalogPage
      title="Contact"
      description="Contact details and enquiry forms will load from the CMS and lead API."
      breadcrumbs={[
        { name: "Home", path: routes.home },
        { name: "Contact", path: routes.contact },
      ]}
      emptyTitle="Contact"
      emptyDescription="The contact form is prepared and will submit to the lead API when that service is connected."
      showFilters={false}
    />
  );
}
