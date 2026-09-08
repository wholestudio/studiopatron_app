import type { Metadata } from "next";

import { CatalogPage } from "@/shared/components/layout/catalog-page";
import { routes } from "@/shared/constants/routes";
import { createPageMetadata } from "@/infra/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Design ideas",
  path: routes.designIdeas,
});

export default function DesignIdeasPage() {
  return (
    <CatalogPage
      title="Design ideas"
      description="Published design ideas will appear here from the CMS."
      breadcrumbs={[
        { name: "Home", path: routes.home },
        { name: "Design ideas", path: routes.designIdeas },
      ]}
      emptyTitle="Design ideas"
      emptyDescription="No design ideas have been published yet."
    />
  );
}
