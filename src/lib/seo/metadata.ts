import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { toCanonicalUrl } from "@/lib/seo/canonical";
import type { SeoInput } from "@/types/seo";

function withSiteName(title?: string): string {
  if (!title || title === siteConfig.name) {
    return siteConfig.name;
  }

  return `${title} · ${siteConfig.name}`;
}

export function createPageMetadata(input: SeoInput): Metadata {
  const canonical = toCanonicalUrl(input.path);
  const title = withSiteName(input.title);
  const description = input.description ?? siteConfig.description;
  const image = input.image;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical,
    },
    robots: {
      index: input.robots?.index ?? true,
      follow: input.robots?.follow ?? true,
    },
    openGraph: {
      type: input.type === "article" ? "article" : "website",
      locale: siteConfig.locale,
      url: canonical,
      siteName: siteConfig.name,
      title,
      description,
      images: image
        ? [
            {
              url: image.url,
              alt: image.alt,
              width: image.width,
              height: image.height,
            },
          ]
        : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images: image ? [image.url] : undefined,
    },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: undefined,
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};
