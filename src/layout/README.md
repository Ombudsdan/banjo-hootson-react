# layout/

Application shell composition and provider wiring.

Key elements:

- `DefaultLayout` – Renders nav, global outlets (heading, validation alert, page alerts, container), footer, and routed content.
- `LayoutProviders` – Composes context providers (heading, validation alert, page alerts, page container).

## Import

```ts
import { DefaultLayout } from 'layout';
```

## Responsibilities

- Maintain consistent ordering of global UI surfaces.
- Avoid business logic; delegate to services/controllers.
