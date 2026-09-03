# Studio Patron

Customer-facing web application for Studio Patron — interior design, interior services, and commerce.

This repository is the public storefront. It talks to the backend API in `spcms_backend`. The CMS/admin lives in `spcms_frontend`.

This phase establishes routing, design system, SEO, API, auth, analytics, and form architecture. It does **not** implement business features or ship catalog content.

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

- **App Router + Server Components by default.** Client Components are used only for navigation, forms, providers, and other interaction.
- **Feature-oriented modules** under `src/features/*` own API functions and query options. UI does not call `fetch` directly.
- **Central API client** in `src/lib/api` targets `/api/v1/public/*` and `/api/v1/customer/*`. Pages do not call the API yet.
- **TanStack Query** is the server-state layer. Local React state is used for UI. Cart persistence is behind a repository interface so it can move to the customer API later. Redux is not used.
- **SEO** is wired through `src/lib/seo`: metadata helpers, canonical URLs, Open Graph, Twitter cards, JSON-LD, `sitemap.ts`, and `robots.ts`.
- **Images** use `next/image` with configurable remote patterns. Business media is not stored in this repo.
- **Auth** `src/proxy.ts` protects `/account/*`. The backend session flow is not connected yet.
- **Analytics** is a provider-agnostic queue in `src/lib/analytics`. No vendor is connected.
- **Theme tokens** live in `src/theme`. Edit `tokens.css` to restyle the app (`bg-paper`, `text-ink`, `bg-bronze`). Use `src/theme/tokens.ts` in TypeScript (OG images, inline styles).

Product catalog routes live in `(commerce)/products` (not also in `(marketing)`). Next.js route groups share a URL space, so the same path cannot be registered twice.

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
2. Fetch published CMS content into marketing and catalog shells.
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
