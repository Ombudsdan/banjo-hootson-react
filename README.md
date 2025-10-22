# banjo-hootson-react

React 19 + Webpack 5 + TypeScript app that lives alongside the Angular 20 app for gradual migration.

## Quick start (PowerShell)

```powershell
cd banjo-hootson-react
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

**Do not import from the model barrel.**

Import directly from the relevant submodule:

```ts
import { IPlushieBirthday } from "model/plushie-birthday";
import { IUserProfile } from "model/user-profile";
```

This avoids circular dependencies and is enforced by ESLint. If a barrel index.ts is reintroduced, it must not be used for imports.

Files:

- `src/model/api.ts`, `date.ts`, `location.ts`, `plushie-birthday.ts`, `user-profile.ts`, `user.ts`

### Type checking

- Lightweight compatibility test lives at `src/model/type-compat.test.ts` (TS-only, not executed)
- Run project-wide checks:

```powershell
npm run typecheck
```

### UI Heading & Validation Alert Services

Pages should not render heading or aggregated validation alert markup directly. Instead use the centralized React context services:

#### Simple heading-only page

```tsx
import { PageContainer } from "framework";
import { usePageHeading } from "hooks";

export default function AboutPage() {
  usePageHeading("About Banjo");
  return <PageContainer>...</PageContainer>;
}
```

#### Manually setting a heading with subheading/image

```tsx
import { useEffect } from "react";
import { useHeading } from "hooks";

export default function GalleryPage() {
  const { setHeading, clearHeading } = useHeading();
  useEffect(() => {
    setHeading({
      heading: "Photo Gallery",
      subheading: "Memories & adventures",
    });
    return () => clearHeading();
  }, [setHeading, clearHeading]);
  return <>...</>;
}
```

#### Aggregated (delayed) validation alert after submit attempt

```tsx
import { useValidationAlert } from "hooks";
import { useEffect, useMemo, useState } from "react";

export function ExampleForm() {
  const { setValidationAlert, clearValidationAlert } = useValidationAlert();
  const [submitted, setSubmitted] = useState(false);
  const errors: string[] = useMemo(
    () => (submitted ? ["Name is required", "Date is invalid"] : []),
    [submitted]
  );

  useEffect(() => {
    if (errors.length) {
      setValidationAlert({
        heading: "Please fix the following errors",
        messages: errors,
        variant: "error",
        focus: true,
      });
    } else {
      clearValidationAlert();
    }
  }, [errors, setValidationAlert, clearValidationAlert]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      ...
    </form>
  );
}
```

The layout (`DefaultLayout`) renders providers and outlets in this order:

```
NavMenu -> ScrollToTop -> OverlayHost -> HeadingOutlet -> ValidationAlertOutlet -> main content
```

Ensure new routed pages use one of the heading mechanisms above to remain consistent.

#### Lint rule

An ESLint rule (`no-restricted-imports`) prevents importing `@/framework/PageHeadingContainer` inside `src/pages/**`. Use `usePageHeading` or `useHeading` instead; the layout renders the outlet centrally.

Note: `AlertCard` can still be imported directly in pages for non-validation messages (info, success, warnings). Only aggregated validation error groups should flow through `useValidationAlert` so they appear in the consistent global position.

### Stacked Page Alerts (Generic Notifications)

Use the page alerts service for transient or persistent success / info / warning / error notifications that should appear in a consistent stack near the top of the page (just below validation alerts, above main content). These are independent from the validation alert system.

Hook (via `usePageAlerts` from `src/hooks/usePageAlerts.ts`):

```ts
const {
  alerts,
  addAlert,
  dismissAlert,
  dismissAll,
  replaceAlerts,
  updateAlert,
  pauseAlertTimer,
  resumeAlertTimer,
} = usePageAlerts();
```

Core methods:

- `addAlert({ heading, messages?, variant?, autoFocus?, content?, timeoutMs? })` → returns generated id.
- `dismissAlert(id)` → animate + remove a single alert.
- `dismissAll()` → dismiss everything (used sparingly; per-alert UX preferred).
- `replaceAlerts(list)` → fade out existing then inject new list.
- `updateAlert(id, patch)` → shallow merge properties (e.g. change variant, extend timeout, append messages).
- `pauseAlertTimer(id)` / `resumeAlertTimer(id)` → exposed if manual control needed (normally handled automatically on hover).

Auto‑dismiss & hover pause:

- Provide `timeoutMs` to auto-dismiss after that duration.
- Hovering an alert pauses its timer; moving the mouse away resumes with the remaining time.

Animation lifecycle:

- Enter & exit are animated (250ms). Dismiss calls trigger exit animation before removal.
- Replacing alerts waits for prior exits before inserting new ones to avoid layout jump.

Builder helpers (`PageAlertBuilders`):

```ts
PageAlert.success({
  heading: "Saved",
  id: "success-alert",
  messages: [],
  timeoutMs: 4000,
});
PageAlert.error({ heading: "Failed", id: "error-alert", messages: [] });
PageAlert.info({ heading: "Heads up", id: "info-alert" });
PageAlert.warning({ heading: "Be careful", id: "warning-alert" });
PageAlert.saved("Profile"); // => "Profile saved"
PageAlert.deleted("Photo"); // => "Photo deleted"
PageAlert.buildPageAlert("success", "My Custom Alert", "custom-alert")
  .setAutoFocus(false)
  .setContent(<span>Example Content</span>)
  .setTimeoutMs(2000)
  .includeMessage("Message 1")
  .includeMessage("Message 2")
  .create();
```

Example – success notification with auto‑dismiss:

```tsx
import { useEffect } from "react";
import { usePageAlerts } from "hooks";
import { PageAlert } from "builders";

export function ProfileSavedNotice() {
  const { addAlert, updateAlert } = usePageAlerts();
  useEffect(() => {
    const id = addAlert(PageAlertBuilders.saved("Profile"));
    // Extend its lifetime and change heading after 1s
    const t = setTimeout(() => {
      updateAlert(id, { heading: "Profile saved (synced)", timeoutMs: 6000 });
    }, 1000);
    return () => clearTimeout(t);
  }, [addAlert, updateAlert]);
  return null;
}
```

Rich content (custom action inside the card):

```tsx
addAlert({
  heading: "New version available",
  variant: "info",
  content: <button onClick={reload}>Reload Now</button>,
  timeoutMs: 0, // 0 or undefined means it persists until manually dismissed
});
```

Manual pause/resume (rarely needed – hover already works):

```ts
pauseAlertTimer(id);
// ... later
resumeAlertTimer(id);
```

Update in place (e.g. progressive status):

```ts
const id = addAlert({ heading: "Uploading...", variant: "info", timeoutMs: 0 });
// after work
updateAlert(id, {
  heading: "Upload complete",
  variant: "success",
  timeoutMs: 4000,
});
```

Clear all:

```ts
dismissAll();
```

Guidance:

- Prefer concise headings; use `messages` for bullet-style details.
- Avoid flooding: batch related info in one alert using `messages`.
- Use `timeoutMs` for ephemeral success/info; omit for warnings/errors requiring user attention.
- For form-wide validation issues, always use the validation alert service instead.

Inline/local alerts Still use `AlertCard` directly when global stacking is unnecessary.

### Path Aliases & Barrel Imports

All major source folders now expose a barrel `index.ts` and are mapped via TypeScript + Webpack path aliases. Prefer these concise imports over deep relative paths:

Available aliases (tsconfig `paths` + webpack `resolve.alias`):

```
auth        -> src/auth
components  -> src/components
controllers -> src/controllers
env         -> src/env
framework   -> src/framework
hooks       -> src/hooks
icons       -> src/icons.ts
layout      -> src/layout
model       -> src/model
routes      -> src/routes
services    -> src/services
utils       -> src/utils
```

Examples:

```ts
// Auth helpers (Firebase auth wrapper)
import { onAuthTokenChange, initFirebase } from "auth";

// Layout Components (Page Heading, Page Alerts, etc.)
import { HeadingProvider, PageAlertsProvider } from "layout-components";

// Hooks (custom React hooks barrel)
import { usePageHeading, usePageAlerts } from "hooks";

// UI primitives / layout
import { PageContainer, OverlayHost } from "framework";

// Layout root (aggregated providers, etc.)
import { DefaultLayout } from "layout";

// Shared components
import { AlertCard, DashboardCard } from "components";

// Controllers (non-visual logic facades)
import { BirthdayCalendarController } from "controllers";

// Route objects / helpers (router export)
import { router } from "routes";

// Utilities & pure helpers
import { formatDisplayDate, sortPlushies } from "utils";

// Domain models / types
import { IPlushieBirthday, IUserProfile } from "model";
```

Guidelines:

- Do not import individual `*.service.ts` files directly; use the `services` barrel unless you have a tree‑shaking need (rare – all services are small).
- Keep page-level code free of deep `../../..` import chains; if you find one, convert it to an alias.
- Adding a new top-level folder? Add a barrel `index.ts`, then extend both `tsconfig.app.json` `paths` and `webpack.config.cjs` `resolve.alias` to keep parity (keep ordering alpha for readability).
- Prefer importing from the barrel root (e.g. `import { AlertCard } from 'components'`) rather than deep internal files (`components/AlertCard`) unless you have a measurable tree‑shaking need.
- Avoid `../../` traversals into an aliased folder — switch to the alias form instead.
- If an item shouldn't be part of the public surface (e.g. an internal helper), do not re-export it from the barrel; keep the export surface intentional.

Linting: ESLint rules enforce that you do not deep-import from `src/*` into an aliased folder (e.g. `import { AlertCard } from '../../components/AlertCard'`). Use the alias instead. Exceptions: relative imports within the same folder are still allowed.

Migration status: All service and hook imports have been updated to use the new `services` barrel; additional component/controller imports may be modernized incrementally.

### Further Reading

- [ARCHITECTURE.md](./ARCHITECTURE.md)
- Folder guides:
  - [auth](./src/auth/README.md)
  - [builders](./src/builders/README.md)
  - [components](./src/components/README.md)
  - [controllers](./src/controllers/README.md)
  - [framework](./src/framework/README.md)
  - [hooks](./src/hooks/README.md)
  - [layout](./src/layout/README.md)
  - [layout-components](./src/layout-components/README.md)
  - [model](./src/model/README.md)
  - [routes](./src/routes/README.md)
  - [services](./src/services/README.md)
  - [utils](./src/utils/README.md)
