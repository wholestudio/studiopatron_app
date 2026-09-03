import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/config/env";
import { routes } from "@/constants/routes";

const staticPaths = [
  routes.home,
  routes.about,
  routes.services,
  routes.projects,
  routes.designIdeas,
  routes.products,
  routes.blog,
  routes.contact,
  routes.quote,
  routes.calculator,
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  return staticPaths.map((path) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
