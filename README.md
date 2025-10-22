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

### UI Heading & Validation Alert Services

Pages should not render heading or aggregated validation alert markup directly. Instead use the centralized React context services:

#### Simple heading-only page

```tsx
import { PageWidthContainer } from "@/framework/PageWidthContainer";
import { usePageHeading } from "@/hooks/usePageHeading";

export default function AboutPage() {
  usePageHeading("About Banjo");
  return <PageWidthContainer>...</PageWidthContainer>;
}
```

#### Manually setting a heading with subheading/image

```tsx
import { useEffect } from "react";
import { useHeading } from "@/hooks/useHeading";

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
import { useValidationAlert } from "@/hooks/useValidationAlert";
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
PageAlertBuilders.success({ heading: "Saved", messages: [], timeoutMs: 4000 });
PageAlertBuilders.error({ heading: "Failed", messages: [] });
PageAlertBuilders.info({ heading: "Heads up" });
PageAlertBuilders.warning({ heading: "Be careful" });
PageAlertBuilders.saved("Profile"); // => "Profile saved"
PageAlertBuilders.deleted("Photo"); // => "Photo deleted"
```

Example – success notification with auto‑dismiss:

```tsx
import { useEffect } from "react";
import { usePageAlerts } from "@/hooks/usePageAlerts";
import { PageAlertBuilders } from "@/services/page-alerts.service";

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
