# Architecture documentation

Studio Patron Architecture **V1** lives in:

| Doc | Purpose |
| --- | --- |
| [architecture/01-architecture-overview.md](./architecture/01-architecture-overview.md) | Overall structure, five areas, dependencies |
| [architecture/02-feature-domain-protocol.md](./architecture/02-feature-domain-protocol.md) | Features, categories vs features, barrels |
| [architecture/03-application-data-infra-protocol.md](./architecture/03-application-data-infra-protocol.md) | Request flow, HTTP, Page Registry, auth, RSC rules |
| [architecture/04-ui-shared-layout-protocol.md](./architecture/04-ui-shared-layout-protocol.md) | Shared UI, cards, layout vocabulary |
| [api-integration.md](./api-integration.md) | **How-to:** mandatory API stack, layer rules, checklist, products example |

Decisions preserved: thin pages, feature ownership, api→services→UI, backend as source of truth, server-first Next.js, selective TanStack Query, centralized `httpClient`, Page Registry as identity (not router), selective config-driven composition, constrained layout vocabulary, no unnecessary abstraction.
