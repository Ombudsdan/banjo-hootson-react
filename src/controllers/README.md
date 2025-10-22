# controllers/

Pure, synchronous derivation layer. Controllers:

- Accept raw inputs (models, primitive params) and return derived view models / structured data.
- Contain **no side effects** (no fetch, no DOM, no timers).
- Are easily unit testable.

## Import

```ts
import { BirthdayCalendarController } from "controllers";
```

## When to use

- Transform service data into UI-friendly shapes.
- Aggregate or filter lists.
- Provide default objects / mapping logic.

If you need async or stateful behavior, move that logic to a service/hook.
