import { APP_NAME } from "@/constants/app";
import { getSiteUrl } from "@/config/env";

export const siteConfig = {
  name: APP_NAME,
  shortName: "Patron",
  description:
    "Studio Patron is a customer platform for interior design, interior services, and curated commerce.",
  locale: "en_US",
  language: "en",
  get url() {
    return getSiteUrl();
  },
} as const;
