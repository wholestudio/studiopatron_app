# Studio Patron

Customer-facing web application for Studio Patron — interior design, interior services, and commerce.

This repository is the public storefront. It talks to the backend API in `spcms_backend`. The CMS/admin lives in `spcms_frontend`.

## Technologies

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- TanStack Query
- React Hook Form
- Zod
- ESLint
- Prettier
- Playwright
- Vitest

## Architecture

**Studio Patron Architecture V1** — handbook:

| Doc | Purpose |
| --- | --- |
| [docs/architecture/01-architecture-overview.md](docs/architecture/01-architecture-overview.md) | Five areas: `app` / `infra` / `features` / `shared` / root |
| [docs/architecture/02-feature-domain-protocol.md](docs/architecture/02-feature-domain-protocol.md) | Feature ownership; category ≠ feature |
| [docs/architecture/03-application-data-infra-protocol.md](docs/architecture/03-application-data-infra-protocol.md) | Request flow, HTTP, Page Registry, RSC rules |
| [docs/architecture/04-ui-shared-layout-protocol.md](docs/architecture/04-ui-shared-layout-protocol.md) | Shared UI, cards, layout vocabulary |

Index: [docs/architecture.md](docs/architecture.md)

```text
src/app        → routing
src/infra      → HTTP, auth, config, seo, query, analytics
src/features   → business capabilities
src/shared     → reusable UI, theme, types, constants
```

Mandatory data path: `Page/UI → (queries if client) → services → api → DTO → httpClient → env → Backend`.

- **Server Components by default**; Client Components only for real interaction.
- **Page Registry** (`infra/config/page-registry.ts`) = page identity; Next.js = URL routing.
- **Features** own api/services/queries/components; nav leaves (kitchen, wardrobe) are categories inside a feature.
- **HTTP:** `feature/api` → `infra/api/publicApi|customerApi` → `httpClient`.
- **Products** is the wired reference feature.
- **Auth** via `infra/auth` + `src/proxy.ts` for `/account/*`.

**Do not add** Indore SPA clones: `domains/`, CSRF machinery, shell-wrapper trees, permission registries, dashboard renderers, premature section registries, Bootstrap, or one feature per navbar item.

Product catalog routes live in `(commerce)/products` (not also in `(marketing)`).

## Local development

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |
| `npm run typecheck` | TypeScript (`tsc --noEmit`) |
| `npm test` | Vitest unit tests |
| `npm run test:e2e` | Playwright end-to-end tests |

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | Backend API origin, no trailing slash |
| `NEXT_PUBLIC_SITE_URL` | Canonical site origin used for SEO |
| `NEXT_PUBLIC_MEDIA_HOST` | Optional CMS/media hostname for `next/image` |
| `NEXT_PUBLIC_APP_ENV` | `development`, `preview`, or `production` |

## Testing

Unit tests cover environment parsing, API errors, SEO helpers, query keys, validation, and route guards.

Playwright smoke-tests public routes, navigation landmarks, and the unauthenticated `/account` redirect. The config uses the locally installed Chrome browser.

## Next development phase

1. Connect `NEXT_PUBLIC_API_URL` to `spcms_backend`.
2. Fetch published CMS content into marketing and catalog shells (same service pattern as products).
3. Implement customer auth against `/api/v1/customer/auth/*`.
4. Wire quote, calculator, contact, and lead forms to the API.
5. Persist cart and complete checkout.
6. Connect CMS media to `next/image` via `NEXT_PUBLIC_MEDIA_HOST`.
7. Register an analytics provider.

## TODO

- [ ] Load CMS page, project, design idea, product, service, and article data
- [ ] Implement customer login, registration, logout, and session cookies
- [ ] Submit contact, quote, calculator, and enquiry forms
- [ ] Render galleries from CMS media
- [ ] Add search and catalog filters
- [ ] Persist cart and checkout
- [ ] Expand sitemap with published slugs
- [ ] Connect analytics and media hosts
