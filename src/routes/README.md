# routes/

Router graph and route-level guards/components.

Contents:

- `app.routes.tsx` – lazy route definitions & element composition.
- `RequireAuth` – gate that redirects unauthenticated users to /login (preserving intended destination in `state.from`).

## Import

```ts
import { router, RequireAuth } from "routes";
```

## Guidelines

- Keep route objects declarative.
- Perform data preloading via controllers/services inside page components or future loaders.
