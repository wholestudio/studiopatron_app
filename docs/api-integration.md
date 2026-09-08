# API integration protocol (mandatory)

**Status:** Canonical, non-negotiable data path for Studio Patron.  
**Companion:** [architecture.md](./architecture.md)

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
  Calls publicApi / customerApi only.
        ↓
DTO / model
  Request and response shapes exchanged with the backend
  (feature types.ts and/or src/types/*).
        ↓
httpClient
  All HTTP goes through apiRequest / httpClient.
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
| hooks / `queries.ts` | Cache, loading, error, mutations | `services/`, `lib/query` keys | Call `api.ts` or HTTP clients; build URLs |
| `services.ts` | Orchestration; DTO → view-model; normalize empty/unavailable | `api/`, DTO / view-model types | React, JSX, HTTP clients directly |
| `api.ts` | Transport | `publicApi` / `customerApi`, endpoints, DTO types | React, empty-state UI logic, view-models |
| DTO / model | Request/response contracts | Shared `src/types` or feature `types.ts` | UI components |
| `httpClient` | Shared HTTP | `getApiUrl()`, errors | Feature UI knowledge |
| `env` | `NEXT_PUBLIC_API_URL`, site URL, media host | Zod parsing in `config/env.ts` | — |

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

---

## 5. Environment

| Variable / helper | Role |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | Backend origin (no trailing slash) |
| `getApiUrl()` | Resolved in `config/env.ts`; used only inside `httpClient` |
| Missing URL | `ApiConfigError` — services normalize to unavailable/empty for UI |

Feature `api.ts` uses path helpers from `lib/api/endpoints.ts`, never absolute backend hosts.

---

## 6. Error and availability handling

| Concern | Owner |
| --- | --- |
| HTTP status / parse errors | `httpClient` → `ApiError` / `ApiConfigError` |
| Map errors → page states (`empty`, `unavailable`, `not_found`) | **services** |
| Render those states | **UI** (props only) |

UI must not branch on raw status codes or `ApiError` shapes when a view-model can express the state.

---

## 7. Reference: Products

```text
app/(commerce)/products/page.tsx          # thin RSC — no HTTP
        ↓
features/products/services.ts             # getProductListPage (orchestrate + shape)
        ↓
features/products/api.ts                  # getProducts → publicApi
        ↓
types (Product, PaginatedResponse)        # DTO / model
        ↓
lib/api/public.ts → httpClient.ts         # apiRequest
        ↓
config/env.ts                             # getApiUrl()
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

## 8. Checklist — wiring a new endpoint

1. Confirm/add DTO types (`src/types` or feature `types.ts`).
2. Add transport function in `features/<name>/api.ts` via `publicApi` / `customerApi`.
3. Add service function that orchestrates, shapes the view-model, and returns page state.
4. **Server page:** `await` the service in the RSC page.
5. **Client interaction:** add `queryOptions` / hook that calls the **service**, not `api.ts`.
6. Export only stable symbols from `features/<name>/index.ts`.
7. Register the page in `config/page-registry.ts` if it is a new route.

---

## 9. Related docs

- [architecture.md](./architecture.md) — overall system, page registry, config-driven rules
- Root [README.md](../README.md) — setup and env vars
