# Studio Patron Architecture

Studio Patron is the customer-facing storefront for interior design, services, and commerce. It talks to `spcms_backend`. CMS/admin lives in `spcms_frontend`.

This document describes the **Next.js-native, server-first feature architecture** used in this repo. The discipline is inspired by proven Indore frontend protocols (thin pages, feature ownership, API → services → UI, backend as source of truth). It is **not** an Indore clone: we steal **protocols**, not folders.

**Guiding principle:** Studio Patron should be easy to extend, not impressive to architect — shallow, predictable, server-first, feature-owned, centrally governed, and incrementally extensible.

---

## Technologies

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| UI runtime | React 19 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 4 + design tokens (`src/theme`) |
| Server state (client) | TanStack Query v5 |
| Forms | React Hook Form + Zod |
| HTTP | `httpClient` + `publicApi` / `customerApi` in `src/lib/api` |
| Auth gate | Cookie session + `src/proxy.ts` for `/account/*` |
| SEO | `src/lib/seo` (metadata, JSON-LD, sitemap, robots) |
| Images | `next/image` with configurable remote patterns |
| Page identity | `src/config/page-registry.ts` |
| Unit tests | Vitest |
| E2E | Playwright |
| Lint / format | ESLint (`eslint-config-next`) + Prettier |

**Explicitly not used:** Redux, Bootstrap, Indore-style CSRF clients, `domains/` / `infrastructure/` layers, permission/page RBAC registries, dashboard widget renderers, ESLint architecture-boundary plugins (document first; automate later if needed).

---

## Goals

1. Support 50+ pages with predictable patterns.
2. Keep pages thin and readable.
3. Keep transport, orchestration, and UI in separate places.
4. Prefer Server Components for data loading.
5. Introduce Client Components only when interaction requires them.
6. Stay minimal today, with clear extension points as the product grows.

---

## High-level layout

```text
studiopatron_app/
├── docs/
│   └── architecture.md          ← this file
├── src/
│   ├── app/                     # Routes, layouts, loading/error boundaries
│   ├── features/                # Feature modules (API, services, UI)
│   ├── components/              # Shared chrome + UI primitives
│   ├── lib/                     # Platform: api, auth, query, seo, …
│   ├── config/                  # Env, site, navigation, page-registry
│   ├── constants/               # Route path builders and app constants
│   ├── theme/                   # Design tokens
│   ├── types/                   # Shared DTO / cross-cutting types
│   └── proxy.ts                 # Auth path protection
└── tests/
```

### Route groups (`src/app`)

| Group | Role | Examples |
| --- | --- | --- |
| `(marketing)` | Public brand and content | `/`, about, projects, blog, contact |
| `(commerce)` | Catalog and purchase | products, cart, checkout, orders |
| `(conversion)` | Lead tools | quote, calculator |
| `account/` | Authenticated customer area | profile, addresses, orders |
| `login/` / `register/` | Auth entry | session not fully wired yet |

Layouts own shared chrome (header, footer). Pages own route composition only. Do not recreate Indore-style shell-wrapper trees.

---

## End-to-end data flow

Application routing + page identity:

```text
URL → Next.js App Router → Page Registry → Thin RSC Page
```

**Mandatory API integration stack** (must not be bypassed) — full rules in [api-integration.md](./api-integration.md):

```text
Page / UI          rendering + interaction only; no HTTP
       ↓
hooks / queries    CLIENT PATH ONLY (TanStack Query); calls services only
       ↓
services/          orchestration + DTO → view-model shaping
       ↓
api/               getXxx / createXxx / updateXxx (transport only)
       ↓
DTO / model        request/response contracts
       ↓
httpClient         all HTTP via apiRequest
       ↓
env                getApiUrl / NEXT_PUBLIC_API_URL
       ↓
Backend / CMS
```

**Default (Server Component):** Page → services → api → DTO → httpClient → env → Backend  

**Client exception:** UI → hooks/queries → services → api → … (same stack below)

There is **no separate mapper layer** — shaping stays in services.

---

## Biggest rules

1. **UI never** calls `fetch`, `apiRequest`, `publicApi`, or `customerApi` directly.
2. **`api.ts`** contains transport logic only (paths, verbs, typed responses).
3. **Services** own orchestration and DTO → view-model shaping.
4. **Pages remain thin** — load via services, pass view models into components.
5. **Layouts** own shared chrome.
6. **Backend/CMS** remains the source of truth for business and computed values.
7. **Features** own their implementation under `src/features/<name>/`.
8. **Cross-feature** imports go through public barrels (`index.ts`).
9. **Server Components** are the default data-fetching path.
10. **Client Components** exist because interaction requires them — not because React hooks exist.
11. **All HTTP** goes through `httpClient`; **all API origins** come from `env` (`getApiUrl`).

---

## Page architecture

`app/**/page.tsx` should primarily:

- identify the page (via Page Registry + metadata)
- call the appropriate feature service
- pass the resulting model into UI components

Pages must **not** contain raw `fetch` / `apiRequest`, multi-endpoint orchestration, business calculations, or large DTO transformations.

Preferred:

```tsx
const model = await getProductListPage();
return <ProductCatalog model={model} />;
```

---

## Page Registry

**File:** [`src/config/page-registry.ts`](../src/config/page-registry.ts)

Single source of truth for **application-level page identity**:

- `id` — stable page identity
- `path` — path pattern (e.g. `/products/[slug]`)
- `feature` — owning feature module
- `type` — marketing | catalog | detail | commerce | conversion | auth | account

Next.js remains responsible for **URL → route**. The registry does **not** replace App Router.

Use for:

- page identity
- feature ownership
- future analytics / SEO defaults / CMS page keys

Do **not** turn it into:

- RBAC / permission catalog
- section / widget / renderer registry
- business logic container

Concrete href builders stay in [`src/constants/routes.ts`](../src/constants/routes.ts) (e.g. `routes.product(slug)`). Registry holds identity + patterns; routes build real URLs.

Helpers: `getPage(key)`, `getPageById(id)`.

---

## Config-driven architecture (selective)

Config-driven is an Indore protocol we keep **only where composition is genuinely variable**.

### Guiding rule

> **Config determines WHAT appears. Services determine WHERE data comes from. Components determine HOW it looks.**

### Page Registry vs Section Registry

| Concept | Answers | Status |
| --- | --- | --- |
| **Page Registry** | What page is this? | Implemented |
| **Section Registry** | What sections can appear on a composable page? | Documented only — implement when CMS composition is real |

### When to use config-driven composition

Use later for:

- CMS-driven homepage
- Landing / campaign / editorial pages with rearrangeable sections

Do **not** make stable pages config-driven:

```text
/products → product service → ProductCatalog   ✓ explicit
/products → config → registry → renderer       ✗ avoid
```

### Future composable path (not coded yet)

```text
Page (e.g. home)
  → Page Registry (identity)
  → CMS page config (section list + props)
  → Section Registry (sectionId → component)
  → Renderer
  → Section components
  → Feature services (data)
```

When that lands, add a shallow `section-registry.ts` + `renderer.tsx` next to a real CMS consumer — not empty scaffolding beforehand.

---

## Feature ownership

When a feature has real backend/CMS data, evolve toward:

```text
features/<name>/
├── api.ts           # Transport only (→ publicApi/customerApi → httpClient)
├── services.ts      # Orchestration + DTO → view-model
├── queries.ts       # Client hooks entry; calls services only
├── components/      # Feature UI (props / view-models only)
├── types.ts         # View-models (+ local DTOs if not in src/types)
└── index.ts         # Public barrel
```

Do **not** mass-create empty files for stub features. When a feature has live data, grow into this stack and follow [api-integration.md](./api-integration.md).

Prefer shallow files over deep nesting (`application/infrastructure/presentation/...`).

### Layer responsibilities

| Layer | May call | Must not |
| --- | --- | --- |
| `api.ts` | `publicApi` / `customerApi`, DTO types | Map for UI, import React, empty-state decisions |
| `services.ts` | `api.ts`, shared / view-model types | Import from `app/` or other features’ internals; call `httpClient` / `publicApi` directly |
| `queries.ts` / hooks | **services only**, query keys | Call `api.ts` or HTTP clients; be required on every RSC page |
| `components/` | props / view-models | Call `fetch` / `apiRequest` / `publicApi` |
| `app/**/page.tsx` | feature services (server) or interactive client children | Inline multi-endpoint business logic; HTTP |

### Public barrels

```ts
import { getProductListPage, ProductCatalog } from "@/features/products";
```

Export only stable contracts from `index.ts`.

---

## API integration (mandatory)

See **[api-integration.md](./api-integration.md)** for the full protocol, forbidden bypasses, env rules, and wiring checklist.

### API layer

`features/<feature>/api.ts` answers: *How do I call this feature’s backend endpoint?*

It may contain endpoint paths, methods, params, bodies, typed responses, and calls to `publicApi` / `customerApi`.

It must not contain React, UI logic, empty-state decisions, business calculations, or presentation mapping.

Hooks / `queries.ts` must call **services**, never `api.ts` directly.

---

## HTTP stack

```text
feature/api.ts
      ↓
publicApi / customerApi     ← application API contexts
      ↓
httpClient (apiRequest)     ← low-level HTTP primitive
      ↓
env (getApiUrl)
      ↓
Backend / CMS
```

### `httpClient.ts`

**File:** [`src/lib/api/httpClient.ts`](../src/lib/api/httpClient.ts)

Centralizes:

- base URL (`NEXT_PUBLIC_API_URL`) and `ApiConfigError` when missing
- URL construction and query parameters
- headers and JSON body handling
- response parsing
- consistent `ApiError` handling
- Next.js `cache` / `revalidate` passthrough
- cookie credentials when `auth: true`

Does **not** own application routing. Next.js App Router owns `/products`; `httpClient` owns `GET /api/v1/public/products`.

`publicApi` — anonymous catalog/content (default revalidate).  
`customerApi` — authenticated customer operations (`credentials: "include"`).

Do not collapse these three layers into one file. Do not add CSRF, retries, or telemetry until there is a concrete need.

`request.ts` re-exports `apiRequest` for compatibility.

---

## Service layer

Services are **orchestrators + adapters**:

- combine API calls when needed
- shape DTOs into page/view models
- normalize availability (`ready` / `empty` / `unavailable` / `not_found`)

They must not invent business calculations that belong in the backend/CMS.
They must not call `httpClient` / `publicApi` directly — only `api.ts`.

---

## DTO / model + view models

| Artifact | Role |
| --- | --- |
| DTO / model | Backend request/response shapes (`src/types/*` and/or feature types) |
| View-model types | What UI receives (`ProductListPageModel`, etc.) — produced by **services** |

UI receives stable models — not transport errors or raw HTTP details. No separate `mappers.ts` layer.

---

## Server-first vs TanStack Query

**Default:** RSC page → service → API.

**Exception:** Client Components + `queries.ts` for live filters, cart, interactive forms, refetch, mutations.

Do not add `useProducts()` merely because `queries.ts` exists.

---

## Shared components vs feature UI

| Location | Owns |
| --- | --- |
| `src/components/` | Shared primitives, chrome, reusable layout |
| `features/<name>/components/` | Feature-specific presentation |

Do not dump feature business UI into a giant generic components tree.

---

## Authentication

Keep `lib/auth` + `proxy.ts`. Do not import Indore’s full RBAC / page-permission architecture. Auth can grow later without forcing every page through a permission registry.

---

## Dependency rules

```text
app → features → lib / config / constants / types / components(shared)
```

- Feature internals must not import from `app/`.
- Features must not reach into another feature’s private files; use `@/features/<name>`.
- Shared components must not depend on feature implementation.
- API must not depend on React.
- Services must not depend on UI components.
- Components must not perform HTTP.

Enforcement today is by convention + docs. ESLint boundary plugins are deferred until pain justifies them.

---

## Reference implementation: Products

Canonical **explicit** page flow (not config-driven):

```text
app/(commerce)/products/page.tsx     # UI — no HTTP
        ↓
Page Registry (pages.products)
        ↓
getProductListPage()                 # services.ts (orchestrate + shape)
        ↓
getProducts()                        # api.ts
        ↓
Product / PaginatedResponse          # DTO
        ↓
publicApi → httpClient → env
        ↓
spcms_backend
        ↓
ProductCatalog                       # UI (view-model props)
```

Detail: `getProductDetailPage(slug)` → same stack → `ProductDetailView`.  
Dynamic hrefs use `routes.product(slug)`. Pages do not use client hooks. Client refetch uses `queries.ts` → **service** (not `api.ts`).

Other features keep `api` + `queries` stubs until CMS/customer APIs connect, then grow into the same shape.

---

## Developer checklist (new page / feature)

| Question | Answer |
| --- | --- |
| Where is the route? | `app/` |
| Where is page identity? | `config/page-registry.ts` |
| Where is the feature? | `features/<name>/` |
| Where is HTTP? | `feature/api.ts` → `lib/api` |
| Where is orchestration? | `services.ts` |
| Where are client queries? | `queries.ts` |
| Where is feature UI? | `features/<name>/components/` |
| Shared chrome? | Next.js layouts + `components/` |

---

## Explicit non-goals

Do **not** introduce merely because Indore has them:

- `domains/` rename
- `infrastructure/` top-level layer
- CSRF machinery
- Dual HTTP systems
- Large shell-wrapper hierarchy
- Permission / page RBAC registry
- Dashboard widget renderer for the whole site
- Bootstrap / Indore chart stack
- Mandatory client hooks on every page
- Implemented section registry before CMS composition exists
- ESLint boundary plugin in this foundation phase
- Mass-creating empty `services.ts` across stub features

---

## Extension points (later)

- CMS content across marketing/catalog shells
- Customer auth against `/api/v1/customer/auth/*`
- Cart persistence and checkout
- Client-side catalog filters via `queries.ts`
- Section registry + renderer for CMS homepage/landings
- Optional import-boundary lint if deep cross-feature imports become a problem

---

## Related docs

- [api-integration.md](./api-integration.md) — **mandatory** API stack, bypasses, checklist
- Root [README.md](../README.md) — setup, commands, environment, phase TODO
- [AGENTS.md](../AGENTS.md) / [CLAUDE.md](../CLAUDE.md) — Next.js agent guidance for this repo
