export type SeoInput = {
  title?: string;
  description?: string;
  path: string;
  image?: {
    url: string;
    alt?: string;
    width?: number;
    height?: number;
  };
  robots?: {
    index?: boolean;
    follow?: boolean;
  };
  type?: "website" | "article" | "product";
};

export type BreadcrumbItem = {
  name: string;
  path: string;
};
