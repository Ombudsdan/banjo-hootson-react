# auth/

Firebase authentication bootstrap & helpers.

Contents:

- `firebase.ts` – initialization + token listeners.
- `index.ts` – barrel re-export.

## Import

```ts
import { initFirebase, onAuthTokenChange } from "auth";
```

Guidelines:

- Keep auth-specific logic here (token retrieval, listeners).
- UI gating logic belongs in `routes/RequireAuth` or dedicated hooks.
