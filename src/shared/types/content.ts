import type { MediaImage } from "@/shared/types/media";

export type ContentStatus = "draft" | "published";

export type ContentSummary = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  image?: MediaImage;
};

export type Project = ContentSummary & {
  location?: string;
  completedAt?: string;
};

export type DesignIdea = ContentSummary & {
  category?: string;
};

export type Service = ContentSummary & {
  duration?: string;
};

export type Article = ContentSummary & {
  publishedAt?: string;
  author?: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  attribution?: string;
};
