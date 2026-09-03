import { siteConfig } from "@/config/site";
import { toCanonicalUrl } from "@/lib/seo/canonical";
import type { BreadcrumbItem } from "@/types/seo";

type JsonLd = Record<string, unknown>;

export function serializeJsonLd(data: JsonLd | JsonLd[]): string {
  return JSON.stringify(data);
}

export function organizationJsonLd(data: JsonLd = {}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    ...data,
  };
}

export function localBusinessJsonLd(data: JsonLd = {}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: siteConfig.name,
    url: siteConfig.url,
    ...data,
  };
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: toCanonicalUrl(item.path),
    })),
  };
}

export function productJsonLd(data: JsonLd): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    ...data,
  };
}

export function articleJsonLd(data: JsonLd): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    ...data,
  };
}

export function websiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
  };
}
