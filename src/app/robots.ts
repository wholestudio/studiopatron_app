import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/infra/config/env";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/account", "/checkout", "/cart", "/login", "/register", "/orders"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
