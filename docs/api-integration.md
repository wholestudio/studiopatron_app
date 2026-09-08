# API integration protocol (mandatory)

**Status:** Canonical, non-negotiable data path for Studio Patron.  
**Architecture V1 companions:** [03 Data / infra](./architecture/03-application-data-infra-protocol.md) · [02 Feature protocol](./architecture/02-feature-domain-protocol.md) · [01 Overview](./architecture/01-architecture-overview.md)

Every production-facing feature that talks to the backend **must** follow this flow. Layers must not be skipped or inverted.

---

## 1. Mandatory stack

```text
Page / UI
  Only rendering and user interaction. No direct backend API calls.
        ↓
hooks / queries   (CLIENT PATH ONLY)
  useQuery / useMutation / queryOptions — loading, error, cache, API state.
  Must call services — never api.ts, publicApi, customerApi, or fetch.
        ↓
services/
  Orchestration, application-level logic, and DTO → view-model shaping.
  Normalize empty / unavailable / not_found for the UI.
        ↓
api/
  Transport only: getXxx, createXxx, updateXxx, deleteXxx.
  Calls infra publicApi / customerApi only.
        ↓
DTO / model
  Request and response shapes exchanged with the backend
  (feature types.ts and/or shared/types/*).
        ↓
httpClient
  All HTTP goes through apiRequest / infra/api/httpClient.
  No ad-hoc fetch outside this client.
        ↓
env
  API origin from environment (getApiUrl / NEXT_PUBLIC_API_URL).
  No hardcoded backend hosts in features.
        ↓
Backend / CMS
```

This architecture is **mandatory** and must not be broken or bypassed.

There is **no separate mapper layer**. DTO → UI shaping lives in **services**.

---

## 2. Next.js: two entry points, one stack

Studio Patron is server-first. Hooks are **not** required on every page. Both paths share the same lower stack.

### Default — Server Component (preferred)

```text
Page (RSC)
  → services/
  → api/
  → DTO / model
  → httpClient
  → env
  → Backend
```

Example: `/products` calls `getProductListPage()` directly. No `useProducts()`.

### Exception — Client interaction

```text
Client UI
  → hooks / queries.ts (TanStack Query)
  → services/
  → api/
  → DTO / model
  → httpClient
  → env
  → Backend
```

Use for live filters, cart, forms, refetch, mutations. Client code still must not call `api.ts` or `httpClient` directly.

---

## 3. Layer rules

| Layer | Responsibility | May use | Must not |
| --- | --- | --- | --- |
| Page / UI | Render props / view-models; capture interaction | Feature components, shared UI, services (RSC only) or hooks (client) | `fetch`, `apiRequest`, `publicApi`, `customerApi`, business math |
| hooks / `queries.ts` | Cache, loading, error, mutations | `services/`, `infra/query` keys | Call `api.ts` or HTTP clients; build URLs |
| `services.ts` | Orchestration; DTO → view-model; normalize empty/unavailable | `api/`, DTO / view-model types | React, JSX, HTTP clients directly |
| `api.ts` | Transport | `publicApi` / `customerApi`, endpoints, DTO types | React, empty-state UI logic, view-models |
| DTO / model | Request/response contracts | `shared/types` or feature `types.ts` | UI components |
| `httpClient` | Shared HTTP | `getApiUrl()`, errors | Feature UI knowledge |
| `env` | `NEXT_PUBLIC_API_URL`, site URL, media host | Zod parsing in `infra/config/env.ts` | — |

---

## 4. Forbidden bypasses

Do **not**:

- Call `fetch` / `apiRequest` / `publicApi` / `customerApi` from pages or components
- Call `api.ts` from hooks or UI (always go through services)
- Put orchestration or empty-state decisions in `api.ts`
- Hardcode API base URLs in feature code
- Invent a second HTTP client for “just this feature”
- Compute backend business rules in the frontend (display + light shaping only)
- Force every RSC page through TanStack Query merely because `queries.ts` exists
- Introduce a separate `mappers.ts` layer (keep shaping in services)
- Create one feature per navbar category leaf (kitchen, wardrobe, …)

---

## 5. Environment

| Variable / helper | Role |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | Backend origin (no trailing slash) |
| `getApiUrl()` | Resolved in `infra/config/env.ts`; used only inside `httpClient` |
| Missing URL | `ApiConfigError` — services normalize to unavailable/empty for UI |

Feature `api.ts` uses path helpers from `infra/api/endpoints.ts`, never absolute backend hosts.

---

## 6. HTTP stack location (Architecture V1)

```text
features/<name>/api.ts
      ↓
infra/api/publicApi.ts  |  infra/api/customerApi.ts
      ↓
infra/api/httpClient.ts  (apiRequest)
      ↓
Backend / CMS
```

| Module | Role |
| --- | --- |
| `infra/api/httpClient.ts` | Base URL, headers, query, body, parse, errors |
| `infra/api/publicApi.ts` | Anonymous catalog/content |
| `infra/api/customerApi.ts` | Authenticated customer calls |
| `infra/api/endpoints.ts` | Path helpers |
| `infra/api/errors.ts` | `ApiError`, `ApiConfigError`, `isApiError` |

`httpClient` must not know business types (`Product`, `DesignIdea`, …).

---

## 7. Error and availability handling

| Concern | Owner |
| --- | --- |
| HTTP status / parse errors | `httpClient` → `ApiError` / `ApiConfigError` |
| Map errors → page states (`empty`, `unavailable`, `not_found`) | **services** |
| Render those states | **UI** (props only) |

UI must not branch on raw status codes or `ApiError` shapes when a view-model can express the state.

---

## 8. Reference: Products

```text
app/(commerce)/products/page.tsx          # thin RSC — no HTTP
        ↓
features/products/services.ts             # getProductListPage (orchestrate + shape)
        ↓
features/products/api.ts                  # getProducts → publicApi
        ↓
shared/types (Product, PaginatedResponse) # DTO / model
        ↓
infra/api/publicApi.ts → httpClient.ts    # apiRequest
        ↓
infra/config/env.ts                       # getApiUrl()
        ↓
spcms_backend
```

Client refetch path (when needed):

```text
queries.ts (productsQueryOptions)
  → getProductListPage (service)
  → same stack below
```

Import stable contracts from `@/features/products` only.

---

## 9. Checklist — wiring a new endpoint

1. Confirm/add DTO types (`shared/types` or feature `types.ts`).
2. Add transport function in `features/<name>/api.ts` via `publicApi` / `customerApi`.
3. Add service function that orchestrates, shapes the view-model, and returns page state.
4. **Server page:** `await` the service in the RSC page.
5. **Client interaction:** add `queryOptions` / hook that calls the **service**, not `api.ts`.
6. Export only stable symbols from `features/<name>/index.ts`.
7. Register the **page kind** in `infra/config/page-registry.ts` if it is a new route pattern (not every CMS category slug).

---

## 10. Related docs

- [architecture/03-application-data-infra-protocol.md](./architecture/03-application-data-infra-protocol.md) — routing, Page Registry, auth, RSC rules
- [architecture/02-feature-domain-protocol.md](./architecture/02-feature-domain-protocol.md) — feature ownership, category ≠ feature
- [architecture/01-architecture-overview.md](./architecture/01-architecture-overview.md) — five areas
- Root [README.md](../README.md) — setup and env vars
