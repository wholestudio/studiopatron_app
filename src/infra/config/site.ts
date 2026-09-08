import { APP_NAME } from "@/shared/constants/app";
import { getSiteUrl } from "@/infra/config/env";

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
