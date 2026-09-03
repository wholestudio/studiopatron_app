export const queryKeys = {
  products: {
    all: ["products"] as const,
    list: (filters?: Record<string, unknown>) => ["products", "list", filters] as const,
    detail: (slug: string) => ["products", "detail", slug] as const,
  },
  projects: {
    all: ["projects"] as const,
    list: (filters?: Record<string, unknown>) => ["projects", "list", filters] as const,
    detail: (slug: string) => ["projects", "detail", slug] as const,
  },
  designIdeas: {
    all: ["design-ideas"] as const,
    list: (filters?: Record<string, unknown>) => ["design-ideas", "list", filters] as const,
    detail: (slug: string) => ["design-ideas", "detail", slug] as const,
  },
  services: {
    all: ["services"] as const,
    list: (filters?: Record<string, unknown>) => ["services", "list", filters] as const,
    detail: (slug: string) => ["services", "detail", slug] as const,
  },
  articles: {
    all: ["articles"] as const,
    list: (filters?: Record<string, unknown>) => ["articles", "list", filters] as const,
    detail: (slug: string) => ["articles", "detail", slug] as const,
  },
  cart: {
    current: ["cart"] as const,
  },
  account: {
    profile: ["account", "profile"] as const,
    addresses: ["account", "addresses"] as const,
    orders: ["account", "orders"] as const,
  },
} as const;
