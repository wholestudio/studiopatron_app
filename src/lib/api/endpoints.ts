import { API_VERSION } from "@/constants/app";

const publicBase = `/api/${API_VERSION}/public`;
const customerBase = `/api/${API_VERSION}/customer`;

export const endpoints = {
  public: {
    products: `${publicBase}/products`,
    product: (slug: string) => `${publicBase}/products/${slug}`,
    projects: `${publicBase}/projects`,
    project: (slug: string) => `${publicBase}/projects/${slug}`,
    designIdeas: `${publicBase}/design-ideas`,
    designIdea: (slug: string) => `${publicBase}/design-ideas/${slug}`,
    services: `${publicBase}/services`,
    service: (slug: string) => `${publicBase}/services/${slug}`,
    articles: `${publicBase}/articles`,
    article: (slug: string) => `${publicBase}/articles/${slug}`,
    pages: `${publicBase}/pages`,
    page: (slug: string) => `${publicBase}/pages/${slug}`,
  },
  customer: {
    session: `${customerBase}/session`,
    login: `${customerBase}/auth/login`,
    register: `${customerBase}/auth/register`,
    logout: `${customerBase}/auth/logout`,
    profile: `${customerBase}/profile`,
    addresses: `${customerBase}/addresses`,
    cart: `${customerBase}/cart`,
    checkout: `${customerBase}/checkout`,
    orders: `${customerBase}/orders`,
    order: (id: string) => `${customerBase}/orders/${id}`,
    quotes: `${customerBase}/quotes`,
    leads: `${customerBase}/leads`,
  },
} as const;
