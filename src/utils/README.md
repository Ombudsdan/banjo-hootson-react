# utils/

Pure helper functions – deterministic, side‑effect free.

Current areas:

- Date formatting & calculations
- Plushie domain helpers
- Validation helpers

## Import

```ts
import { formatDisplayDate } from "utils";
```

If a util starts needing I/O or global state, migrate it to a service.
