# banjo-hootson-react

React 19 + Webpack 5 + TypeScript app that lives alongside the Angular 20 app for gradual migration.

## Quick start (PowerShell)

```powershell
cd C:\Users\Dangr\Git\banjo-hootson\banjo-hootson-react
npm install
npm run start
```

- Dev server: http://localhost:5173 (configurable via `.env` `PORT`)
- Build:

```powershell
npm run build
```

### Configure dev server port

- Create or edit `.env` and set `PORT` (or `port`):

```env
PORT=5174
```

### Centralized models

- Import all types from the model barrel:

```ts
import { IPlushieBirthday, ApiError, IUserProfile } from "model";
```

- Files:
  - `src/model/api.types.ts`, `date.types.ts`, `location.types.ts`, `plushie-birthday.types.ts`, `user-profile.types.ts`, `user.types.ts`, `model/index.ts`

### Type checking

- Lightweight compatibility test lives at `src/model/type-compat.test.ts` (TS-only, not executed)
- Run project-wide checks:

```powershell
npm run typecheck
```
