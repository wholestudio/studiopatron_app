# 04 — UI / shared / layout protocol

Companion docs: [01 Overview](./01-architecture-overview.md) · [02 Features](./02-feature-domain-protocol.md) · [03 Data / infra](./03-application-data-infra-protocol.md)

---

## Principles

1. **Shared means genuinely reusable, not unknown ownership.**  
   Test: would two or more unrelated features reasonably use this? → `shared`. Else keep in the feature.

2. **Layout controls spatial composition; features control meaning/content; services control data.**

3. Cards and chrome **never** call HTTP.

---

## Shared structure

```text
shared/
├── components/
│   ├── ui/              # Button, Input, Card primitive, Container, …
│   ├── cards/           # DesignIdeaCard, ProjectCard, ProductCard, ServiceCard
│   ├── gallery/
│   ├── forms/
│   ├── layout/          # Catalog shells, Grid, LayoutSection, pageLayouts
│   ├── header/ footer/ hero/ navigation/ sections/ providers/
│   └── …
├── theme/               # tokens.css, tailwind bridge, TS tokens
├── constants/           # routes, app constants
├── types/               # cross-cutting DTOs / SEO / API envelopes
├── utils/               # cn, …
└── hooks/               # generic UI hooks (disclosure, media query)
```

`shared` **must not** import from `features`.

---

## Cards protocol

```text
Page → Service → Model → Card(model)
```

| Card | Location |
| --- | --- |
| `DesignIdeaCard`, `ProjectCard`, `ProductCard`, `ServiceCard` | `shared/components/cards/` |
| Category header / trending rail | `features/<domain>/components/` |

Cards may use `shared/components/ui/Card`. Domain meaning stays in the named card.

**Forbidden:** Card → `httpClient` / `publicApi` / `fetch`.

---

## Feature vs shared UI

| Example | Location |
| --- | --- |
| `ProductCatalog`, `ProductDetailView` | `features/products/components/` |
| `DesignIdeaCategoryHeader` | `features/design-ideas/components/` |
| `Button`, `EmptyState`, `Container` | `shared/components/ui/` |
| Site header/footer | `shared/components/header|footer/` |

---

## Layout vocabulary

Constrained primitives in `shared/components/layout/`:

| Primitive | Role |
| --- | --- |
| `Container` | Max-width page gutter (re-exports UI container) |
| `LayoutSection` | Vertical rhythm wrapper |
| `Grid` / `GridItem` | Responsive column grids |
| `pageLayouts` / `layoutColumns` | Named vocabulary: full, split, three-column, gallery, editorial, … |
| `CatalogPage`, `DetailPageShell`, `PageHeader` | Existing storefront shells |

**Not** an Indore Bootstrap `PageRow`/`PageCol` port. Spatial only — no permissions, no API, no feature decisions.

Titled marketing blocks may still use `shared/components/sections/Section` (title + description + children).

---

## Visual system

- Theme tokens: `shared/theme/tokens.css` + `tokens.ts`
- App entry styles: `app/globals.css` imports shared theme
- Tailwind utility classes with brand tokens (`paper`, `ink`, `bronze`)

Preserve the existing design system; do not introduce Bootstrap or Indore chart stacks.

---

## Composition example

```text
/design-ideas/kitchen-designs
  app thin page
    → getDesignIdeaCategoryPage("kitchen-designs")
    → DesignIdeaCategoryHeader (feature)
    → DesignIdeaCategoryNav (feature)
    → Grid + DesignIdeaCard[] (shared layout + shared card)
```

---

## Related

- Architecture areas → [01](./01-architecture-overview.md)
- Feature components & categories → [02](./02-feature-domain-protocol.md)
- Data loading path → [03](./03-application-data-infra-protocol.md)
