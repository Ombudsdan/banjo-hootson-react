# components/

Presentational, reusable UI pieces. They:

- Contain no business or persistence logic.
- Accept props; do not perform data fetching.
- May rely on hooks only for minor UI concerns (NOT for global state mutation).
- Exported via the `components` alias barrel.

## Import

```ts
import { AlertCard, Dialog, Gallery } from "components";
```

## Adding a component

1. Create `MyComponent.tsx`.
2. Export it through `index.ts` (named + optionally default for ergonomics).
3. Keep styling BEM‑aligned in global or a future modular SCSS split.

## When NOT to add here

- If it coordinates multiple contexts or page-level concerns → consider `framework/` or `layout-components/`.
- If it encapsulates stateful app logic → move logic to a hook/service and keep component dumb.
