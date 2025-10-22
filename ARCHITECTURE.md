# Architecture Overview

This document describes the structure and conventions of the React migration codebase that lives alongside the Angular application.

## Guiding Principles

- **Separation of concerns**: visual components (dumb), controllers (pure derivation / orchestration), services (state + side‑effects), hooks (consumption layer), framework (primitives), layout (page shell), routes (navigation graph), builders (object factories/test/data helpers), utils (pure domain helpers), model (types only).
- **Path aliases + barrels**: All major folders export a curated public surface through an `index.ts` and are imported via an alias (e.g. `import { usePageHeading } from 'hooks'`).
- **Context pattern**: UI stateful concerns (heading, page alerts, validation alert, page container) reside in context providers (currently still under `services` but could migrate to a dedicated `contexts` folder later).
- **Minimal coupling**: Components never reach directly into services; they use hooks (which read contexts) or controllers for derived data.
- **Explicit over implicit**: Avoid magic side effects; hooks call intentful setters, controllers return plain objects.

## Folder Roles

| Folder               | Purpose                                                              | Notes                                                               |
| -------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `assets/`            | Static images & media                                                | Loaded via Webpack asset modules.                                   |
| `builders/`          | Object builders / factories                                          | Useful for test data or repetitive object shapes.                   |
| `components/`        | Reusable presentational UI components                                | No side effects; accept props; exported via barrel.                 |
| `controllers/`       | Pure transformation / derivation logic                               | Wrap static datasets or compose service outputs.                    |
| `env/`               | Environment variable exposure                                        | Typed mapping from build-time injection.                            |
| `framework/`         | Low-level shared UI primitives (layout blocks, Image, ErrorBoundary) | Building blocks for components & layout.                            |
| `hooks/`             | Custom React hooks (context consumption + helpers)                   | Provide strongly typed public API to services/contexts.             |
| `layout/`            | Application page shell & provider composition                        | `DefaultLayout`, `LayoutProviders` (formerly UIProviders).          |
| `layout-components/` | Larger page section building blocks                                  | Distinct from `components/` if they coordinate multiple primitives. |
| `model/`             | Domain types & interfaces only                                       | No runtime logic; consumed across layers.                           |
| `routes/`            | Router configuration & route-guard components                        | Exposes `router` and `RequireAuth`.                                 |
| `services/`          | Stateful logic (context providers, API wrappers)                     | May later split out `contexts/`.                                    |
| `styles/`            | Global SCSS entry + partials                                         | Uses modern Sass module system.                                     |
| `utils/`             | Pure functions (date, plushie calculations, validation)              | Must remain side‑effect free.                                       |

## Path Aliases

All are reflected in `tsconfig.app.json` and `webpack.config.cjs`. Example:

```ts
import { formatDisplayDate } from 'utils';
import { usePageHeading } from 'hooks';
import { BirthdayCalendarController } from 'controllers';
```

See root README for the full alias list.

## Context / Service Pattern

Each UI state area typically contains:

- A context + provider (exported from a service file today)
- An outlet component (rendered in `DefaultLayout`)
- A hook for consumption (e.g. `usePageAlerts`)

Usage keeps pages declarative:

```tsx
usePageHeading({ heading: 'Dashboard', icon: 'house' });
```

## Controllers vs Services

| Aspect       | Controller            | Service                      |
| ------------ | --------------------- | ---------------------------- |
| Side effects | None                  | Allowed (API calls, timers)  |
| State        | None (pure)           | Holds & mutates state        |
| Reusability  | High (pure functions) | Scoped to provider lifecycle |
| Testing      | Straightforward       | Requires context or mock     |

Controllers should remain synchronous/pure; asynchronous logic lives in services/hooks.

## Builders

`builders/` centralizes factory helpers for creating consistent object shapes (useful for tests, seeding UI forms, or building alerts). Keep them deterministic and pure.

## Utilities

Utilities in `utils/` must be side-effect free. If a function needs I/O, move it to a service. Keep naming explicit: `formatX`, `calculateY`, `isValidZ`.

## Layout Composition

`DefaultLayout` wires:

```
<NavMenu />
<ScrollToTop />
<OverlayHost />
<HeadingOutlet />
<ValidationAlertOutlet />
<PageAlertsOutlet />
<PageContainerOutlet />
<main> <Outlet /> </main>
<Footer />
```

Provider composition is handled in `LayoutProviders`.

## Linting Conventions

- Enforcement of alias imports over deep `../../` relative paths (custom `no-restricted-imports` patterns).
- Rule blocking direct `PageHeading` usage in `pages/`.
- Future candidate: disallow service file imports inside components (encourage hook indirection).

## JSDoc Strategy

- Module-level header for each barrel/index.
- Service files: brief description + primary responsibilities.
- Hooks: summarize contract (inputs/side effects/returns).
- Avoid repeating obvious prop names or TypeScript types.

## Adding New Folders

1. Create folder + code.
2. Add `index.ts` barrel (public exports only).
3. Add path alias mapping + Webpack alias.
4. Add README section or per-folder README.
5. (Optional) Add lint rule if specialized constraints apply.

## Future Improvements

- Extract context-based logic from `services/` into `contexts/`.
- Add automated doc coverage check (e.g. custom lint rule listing barrels without header comment).
- Introduce integration tests around layout provider interactions.

---

Concise mental model: **model** (types) + **services** (state/effects) + **controllers** (pure transforms) + **hooks** (bridges) + **framework/components** (UI) + **layout/routes** (composition) + **builders/utils** (support).
