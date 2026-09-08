# 02 — Feature / domain protocol

Companion docs: [01 Overview](./01-architecture-overview.md) · [03 Data / infra](./03-application-data-infra-protocol.md) · [04 UI / layout](./04-ui-shared-layout-protocol.md)

---

## Feature ownership

`src/features/` answers: **What capability does the application provide?**

Organize by **business/content capability**, not by navbar leaf.

Examples:

```text
features/
├── design-ideas/
├── projects/
├── products/          # canonical reference (wired end-to-end)
├── services/
├── cart/
├── checkout/
├── orders/
├── account/
├── quotes/
├── leads/
└── calculator/
```

Journal/blog routes exist under `app/(marketing)/blog`; treat articles as a content capability (page registry `blog` / `articleDetail`) — introduce a dedicated `features/magazine` or `features/blog` only when API/services are real.

---

## Critical rule: nav ≠ feature

```text
NAVBAR SECTION  ≠  FEATURE
CATEGORY        ≠  FEATURE
DETAIL ITEM     ≠  FEATURE
```

### Design Ideas (Livspace-scale)

```text
Design Ideas                    ← nav section
  → features/design-ideas/      ← ONE feature
       → category: kitchen-designs, wardrobe-designs, …
       → detail: [slug]
```

Routes can be:

- `/design-ideas`
- `/design-ideas/[category]`
- `/design-ideas/[slug]` (or `/design-ideas/[category]/[slug]`)

**Do not** create `features/kitchen/`, `features/wardrobe/`, `features/wall-decor/` unless they become independently owned products with separate teams/APIs.

Same pattern: **Projects**, **Products**, **Magazine/Journal**.

---

## Feature shape (create only what you need)

```text
features/<name>/
├── api.ts           # Transport via infra publicApi/customerApi
├── services.ts      # Orchestration + DTO → view-model when needed
├── queries.ts       # Client/refetch only (TanStack Query)
├── types.ts         # View-models / local types
├── components/      # Feature-specific UI
├── utils/           # Feature-only helpers
└── index.ts         # Public barrel
```

Files are **not** mandatory. Grow when the feature has real data/UI.

### Layer rules

| Layer | May | Must not |
| --- | --- | --- |
| `api.ts` | `publicApi` / `customerApi`, DTOs | React, empty-state UI, business math |
| `services.ts` | `api.ts`, types | HTTP clients directly; become a second backend |
| `queries.ts` | **services only** | Call `api.ts`; required on every RSC page |
| `components/` | shared UI + view-models | `fetch` / `apiRequest` / `publicApi` |
| `index.ts` | Stable exports | Export every internal file |

**No automatic mappers.** Shape DTOs in services; add `mappers.ts` only if transformation is large.

---

## Page patterns per feature

| Pattern | Example | Owner |
| --- | --- | --- |
| Hub | `/design-ideas` | Feature service + components |
| Category listing | `/design-ideas/[category]` | Same feature, category param |
| Detail | `/design-ideas/[slug]` | Same feature |
| Product list/detail | `/products`, `/products/[slug]` | `features/products` |
| Editorial | `/blog/[slug]` | Blog/magazine capability |

Do **not** invent a `UniversalPage` abstraction.

---

## Server-first vs client

**Default:** RSC page → `await featureService()` → feature/shared UI  

**Client exception:** filters, carousels needing browser APIs, forms, cart mutations → Client Component + `queries.ts` → **services** (never `api.ts` directly)

---

## Public barrels

```ts
import { getProductListPage, ProductCatalog } from "@/features/products";
```

Prefer barrels over deep imports for cross-boundary use.

---

## Canonical reference: products

```text
features/products/
├── api.ts
├── services.ts
├── queries.ts
├── types.ts
├── components/
└── index.ts
```

Flow: thin `app/(commerce)/products/page.tsx` → `getProductListPage()` → `api.ts` → `publicApi` → `httpClient` → Backend → view-model → `ProductCatalog` / `ProductCard`.

---

## Related

- Overall structure → [01](./01-architecture-overview.md)
- HTTP / Page Registry / env → [03](./03-application-data-infra-protocol.md)
- Cards / layout / shared vs feature UI → [04](./04-ui-shared-layout-protocol.md)
