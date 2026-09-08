# 03 — Application / data / infra protocol

Companion docs: [01 Overview](./01-architecture-overview.md) · [02 Features](./02-feature-domain-protocol.md) · [04 UI / layout](./04-ui-shared-layout-protocol.md)

---

## Canonical request flow

```text
URL
 ↓
Next.js App Router (app/)
 ↓
Thin page
 ↓
Feature service
 ↓
Feature api.ts
 ↓
infra publicApi | customerApi
 ↓
infra httpClient (apiRequest)
 ↓
env (NEXT_PUBLIC_API_URL / getApiUrl)
 ↓
Backend / CMS
 ↓
DTO
 ↓
Service (shape view-model)
 ↓
Feature / shared UI
```

This stack is **mandatory**. UI and pages must not call HTTP directly.

---

## Routing vs Page Registry

| Concern | Owner | Answers |
| --- | --- | --- |
| App Router | `app/**/page.tsx` | Which route handles this URL? |
| Page Registry | `infra/config/page-registry.ts` | What application page is this? |

Registry fields: `id`, `path` (pattern), `feature`, `type`.

Register **page kinds** (`designIdeas`, `designIdeaCategory`, `designIdeaDetail`) — not every CMS category slug.

Concrete href builders live in `shared/constants/routes.ts`.

---

## Navigation

`infra/config/navigation.ts` owns hierarchical nav config (separated from rendering).

Mega-menu children (e.g. Design Ideas categories) are **config/data**, not new features. Future: CMS → navigation data → nav components. Do not hardcode entire catalogs inside React trees.

---

## HTTP stack (`infra/api`)

```text
feature/api.ts
  → publicApi.ts | customerApi.ts
  → httpClient.ts
  → Backend
```

| Module | Role |
| --- | --- |
| `httpClient.ts` | Base URL, headers, query, body, parse, `ApiError` / `ApiConfigError` |
| `publicApi.ts` | Anonymous catalog/content (revalidate defaults) |
| `customerApi.ts` | Authenticated customer calls (`credentials: "include"`) |
| `endpoints.ts` | Path helpers |
| `errors.ts` | Typed errors |

`httpClient` must not know `Product`, `DesignIdea`, etc.

No ad-hoc second HTTP client. No Indore CSRF copy.

---

## Environment

| Variable / helper | Role |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | Backend origin |
| `getApiUrl()` | Used inside `httpClient` only |
| Missing URL | `ApiConfigError` → services normalize to unavailable/empty |

---

## Auth

- `infra/auth` — cookie name, protected paths, login redirect
- `src/proxy.ts` — gates `/account/*`

Do not import Indore RBAC/page-permission registries.

---

## Other infra

| Path | Role |
| --- | --- |
| `infra/seo` | Metadata, JSON-LD, canonical |
| `infra/query` | TanStack Query client, keys, provider |
| `infra/analytics` | Provider-agnostic queue |
| `infra/images` | `next/image` helpers |
| `infra/validation` | Zod schemas for forms |
| `infra/config` | env, site, images, page-registry, navigation |

---

## Error / availability boundaries

| Layer | Responsibility |
| --- | --- |
| `httpClient` | Transport errors |
| Feature `services` | Map to UI states (`empty`, `unavailable`, `not_found`) |
| UI | Render those states from props |

---

## Server Components vs Client Components

| Default RSC | Client when |
| --- | --- |
| SEO/category/detail/catalog pages | Filters, forms, cart mutations, browser-only carousels, live refetch |

TanStack Query (`queries.ts`) is for the client path only. Do not force `useQuery` onto static RSC pages.

---

## Config-driven (selective)

> Config determines WHAT appears. Services determine WHERE data comes from. Components determine HOW it looks.

Stable pages stay explicit. Section registry/renderer only when CMS composition is real — not now.

---

## Related

- Folder ownership → [01](./01-architecture-overview.md)
- Feature internals → [02](./02-feature-domain-protocol.md)
- Cards / layout → [04](./04-ui-shared-layout-protocol.md)
