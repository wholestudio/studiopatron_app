/**
 * Canonical page identity for Studio Patron.
 * Next.js App Router owns URL → route. This registry owns page identity/metadata.
 * It is not an RBAC catalog, section registry, or router replacement.
 */

export type PageType =
  | "marketing"
  | "catalog"
  | "detail"
  | "commerce"
  | "conversion"
  | "auth"
  | "account";

export type PageDefinition = {
  id: string;
  path: string;
  feature: string;
  type: PageType;
};

export const pages = {
  home: {
    id: "home",
    path: "/",
    feature: "home",
    type: "marketing",
  },
  about: {
    id: "about",
    path: "/about",
    feature: "about",
    type: "marketing",
  },
  services: {
    id: "services",
    path: "/services",
    feature: "services",
    type: "marketing",
  },
  projects: {
    id: "projects",
    path: "/projects",
    feature: "projects",
    type: "catalog",
  },
  projectDetail: {
    id: "project-detail",
    path: "/projects/[slug]",
    feature: "projects",
    type: "detail",
  },
  designIdeas: {
    id: "design-ideas",
    path: "/design-ideas",
    feature: "design-ideas",
    type: "catalog",
  },
  designIdeaCategory: {
    id: "design-idea-category",
    path: "/design-ideas/[category]",
    feature: "design-ideas",
    type: "catalog",
  },
  designIdeaDetail: {
    id: "design-idea-detail",
    path: "/design-ideas/[slug]",
    feature: "design-ideas",
    type: "detail",
  },
  products: {
    id: "products",
    path: "/products",
    feature: "products",
    type: "catalog",
  },
  productDetail: {
    id: "product-detail",
    path: "/products/[slug]",
    feature: "products",
    type: "detail",
  },
  blog: {
    id: "blog",
    path: "/blog",
    feature: "blog",
    type: "catalog",
  },
  articleDetail: {
    id: "article-detail",
    path: "/blog/[slug]",
    feature: "blog",
    type: "detail",
  },
  contact: {
    id: "contact",
    path: "/contact",
    feature: "leads",
    type: "marketing",
  },
  quote: {
    id: "quote",
    path: "/quote",
    feature: "quotes",
    type: "conversion",
  },
  calculator: {
    id: "calculator",
    path: "/calculator",
    feature: "calculator",
    type: "conversion",
  },
  cart: {
    id: "cart",
    path: "/cart",
    feature: "cart",
    type: "commerce",
  },
  checkout: {
    id: "checkout",
    path: "/checkout",
    feature: "checkout",
    type: "commerce",
  },
  orders: {
    id: "orders",
    path: "/orders",
    feature: "orders",
    type: "commerce",
  },
  login: {
    id: "login",
    path: "/login",
    feature: "account",
    type: "auth",
  },
  register: {
    id: "register",
    path: "/register",
    feature: "account",
    type: "auth",
  },
  account: {
    id: "account",
    path: "/account",
    feature: "account",
    type: "account",
  },
  accountProfile: {
    id: "account-profile",
    path: "/account/profile",
    feature: "account",
    type: "account",
  },
  accountAddresses: {
    id: "account-addresses",
    path: "/account/addresses",
    feature: "account",
    type: "account",
  },
  accountOrders: {
    id: "account-orders",
    path: "/account/orders",
    feature: "account",
    type: "account",
  },
} as const satisfies Record<string, PageDefinition>;

export type PageKey = keyof typeof pages;
export type PageId = (typeof pages)[PageKey]["id"];

export function getPage(key: PageKey): (typeof pages)[PageKey] {
  return pages[key];
}

export function getPageById(id: PageId): PageDefinition | undefined {
  return Object.values(pages).find((page) => page.id === id);
}
