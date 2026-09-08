import type { Metadata } from "next";

import { CatalogPage } from "@/shared/components/layout/catalog-page";
import { routes } from "@/shared/constants/routes";
import { createPageMetadata } from "@/infra/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Projects",
  path: routes.projects,
});

export default function ProjectsPage() {
  return (
    <CatalogPage
      title="Projects"
      description="Published interior projects will appear here from the CMS."
      breadcrumbs={[
        { name: "Home", path: routes.home },
        { name: "Projects", path: routes.projects },
      ]}
      emptyTitle="Projects"
      emptyDescription="No projects have been published yet."
    />
  );
}
