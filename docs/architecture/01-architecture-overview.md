# 01 — Architecture overview

**Studio Patron Architecture V1**

Companion docs: [02 Feature protocol](./02-feature-domain-protocol.md) · [03 Data / infra](./03-application-data-infra-protocol.md) · [04 UI / layout](./04-ui-shared-layout-protocol.md)

---

## Goals

Studio Patron is a content-heavy, image-heavy, commerce/conversion Next.js storefront (Livspace-scale IA: mega-nav, categories, details, editorial, projects, products).

The architecture is enterprise-grade because **responsibilities and dependencies are clear** — not because there are many microscopic layers.

We optimize for:

- 50+ routes and hundreds/thousands of category/detail content pages
- Predictable ownership (“where does this code go?”)
- Shallow folders
- Server-first Next.js
- Controlled reuse
- No Indore clone / no unnecessary abstraction

---

## Five high-level areas

```text
src/
├── app/        # 1. ROUTING — Where does this URL go?
├── infra/      # 2. INFRASTRUCTURE — What does the app need to operate?
├── features/   # 3. BUSINESS — What capabilities does the business provide?
├── shared/     # 4. REUSABLE — What can everyone reuse?
└── proxy.ts    # Auth path gate (Next.js)
```

Repository root holds project tooling only (`package.json`, `next.config.ts`, `.env*`, etc.).

| Area | Question | Owns |
| --- | --- | --- |
| `app/` | Where? | Routes, layouts, thin pages, metadata |
| `infra/` | What operates the app? | HTTP, auth, config, SEO, query, analytics, validation helpers |
| `features/` | What does the business do? | Design ideas, projects, products, cart, … |
| `shared/` | What is reusable? | UI, cards, layout vocabulary, theme, constants, types, utils |
| Root | What configures the project? | Next/tooling/env |

---

## Canonical diagram

```text
                    URL
                     │
                     ▼
              Next.js app/  (routing)
                     │
                     ▼
               Thin page.tsx
                     │
         ┌───────────┴───────────┐
         ▼                       ▼
   features/*              shared/* UI
   (services → api)        (cards, layout)
         │
         ▼
   infra/api (publicApi | customerApi → httpClient → env)
         │
         ▼
   Backend / CMS
```

---

## Dependency direction

```text
app → features → infra
app → shared
features → shared
features → infra
```

**Forbidden:** `shared → features`, `infra → features`, UI → HTTP, feature A deep-imports feature B internals.

Cross-feature use goes through `@/features/<name>` barrels.

---

## Why shallow

- Navbar leaf ≠ feature (kitchen/wardrobe are **categories** inside `design-ideas`)
- No `domains/`, `infrastructure/`, `presentation/`, DI containers, universal page frameworks
- Create files only when needed
- Steal Indore **protocols** (thin pages, api→services→UI, backend truth), not Indore folders

---

## Scaling 10 → 50 → 500+ pages

| Scale | What grows | What does not |
| --- | --- | --- |
| 10 pages | Thin routes + few features | New top-level areas |
| 50 pages | Page Registry entries + feature modules | One feature per nav item |
| 500+ content URLs | CMS taxonomy + `[category]`/`[slug]` routes | 500 feature folders |

Content volume scales through **routes + CMS data inside features**, not new architectural layers.

---

## Enterprise-grade means

Clear ownership · predictable dependencies · consistent protocols · controlled reuse · shallow structure · easy onboarding · server-first Next.js · no unnecessary abstraction.

---

## Related

- How to build a feature → [02](./02-feature-domain-protocol.md)
- How a request flows → [03](./03-application-data-infra-protocol.md)
- How UI/layout works → [04](./04-ui-shared-layout-protocol.md)
