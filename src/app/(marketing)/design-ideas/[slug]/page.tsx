import type { Metadata } from "next";

import { DetailPageShell } from "@/components/layout/detail-page-shell";
import { routes } from "@/constants/routes";
import { createPageMetadata } from "@/lib/seo";

type DesignIdeaDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: DesignIdeaDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  return createPageMetadata({
    title: "Design idea",
    path: routes.designIdea(slug),
  });
}

export default async function DesignIdeaDetailPage({ params }: DesignIdeaDetailPageProps) {
  const { slug } = await params;

  return (
    <DetailPageShell
      title="Design idea"
      description="Design idea details and galleries will load from the CMS for this record."
      breadcrumbs={[
        { name: "Home", path: routes.home },
        { name: "Design ideas", path: routes.designIdeas },
        { name: "Design idea", path: routes.designIdea(slug) },
      ]}
      emptyTitle="Design idea unavailable"
      emptyDescription="This page is prepared for CMS data. No design idea record is loaded yet."
    />
  );
}
