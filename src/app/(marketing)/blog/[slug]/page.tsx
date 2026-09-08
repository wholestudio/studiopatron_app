import type { Metadata } from "next";

import { DetailPageShell } from "@/shared/components/layout/detail-page-shell";
import { routes } from "@/shared/constants/routes";
import { articleJsonLd, createPageMetadata } from "@/infra/seo";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;

  return createPageMetadata({
    title: "Article",
    path: routes.article(slug),
    type: "article",
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  return (
    <DetailPageShell
      title="Article"
      description="Article body, media, and related entries will load from the CMS for this record."
      breadcrumbs={[
        { name: "Home", path: routes.home },
        { name: "Journal", path: routes.blog },
        { name: "Article", path: routes.article(slug) },
      ]}
      emptyTitle="Article unavailable"
      emptyDescription="This page is prepared for CMS data. No article record is loaded yet."
      jsonLd={articleJsonLd({ headline: "Article" })}
    />
  );
}
