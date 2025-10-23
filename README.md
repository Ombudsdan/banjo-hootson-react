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
import { IPlushieBirthday } from 'model/plushie-birthday';
import { IUserProfile } from 'model/user-profile';
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
import { PageContainer } from 'framework';
import { usePageHeading } from 'hooks';

export default function AboutPage() {
  usePageHeading('About Banjo');
  return <PageContainer>...</PageContainer>;
}
```

#### Manually setting a heading with subheading/image

```tsx
import { useEffect } from 'react';
import { useHeading } from 'hooks';

export default function GalleryPage() {
  useHeading({
    heading: 'Photo Gallery',
    subheading: 'Memories & adventures'
  });
  return <>...</>;
}
```

#### Aggregated (delayed) validation alert after submit attempt

```tsx
import { useValidationAlert } from 'hooks';
import { useEffect, useMemo, useState } from 'react';

export function ExampleForm() {
  const { setValidationAlert, clearValidationAlert } = useValidationAlert();
  const [submitted, setSubmitted] = useState(false);
  const errors: string[] = useMemo(() => (submitted ? ['Name is required', 'Date is invalid'] : []), [submitted]);

  useEffect(() => {
    if (errors.length) {
      setValidationAlert({
        heading: 'Please fix the following errors',
        messages: errors,
        variant: 'error',
        focus: true
      });
    } else {
      clearValidationAlert();
    }
  }, [errors, setValidationAlert, clearValidationAlert]);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        setSubmitted(true);
      }}>
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

An ESLint rule (`no-restricted-imports`) prevents importing `@/framework/PageHeading` inside `src/pages/**`. Use `usePageHeading` or `useHeading` instead; the layout renders the outlet centrally.

Note: `AlertCard` can still be imported directly in pages for non-validation messages (info, success, warnings). Only aggregated validation error groups should flow through `useValidationAlert` so they appear in the consistent global position.

### Stacked Page Alerts (Generic Notifications)

Use the page alerts service for transient or persistent success / info / warning / error notifications that should appear in a consistent stack near the top of the page (just below validation alerts, above main content). These are independent from the validation alert system.

Hook (via `usePageAlerts` from `src/hooks/usePageAlerts.ts`):

```ts
const { alerts, addAlert, dismissAlert, dismissAll, replaceAlerts, updateAlert, pauseAlertTimer, resumeAlertTimer } =
  usePageAlerts();
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
  heading: 'Saved',
  id: 'success-alert',
  messages: [],
  timeoutMs: 4000
});
PageAlert.error({ heading: 'Failed', id: 'error-alert', messages: [] });
PageAlert.info({ heading: 'Heads up', id: 'info-alert' });
PageAlert.warning({ heading: 'Be careful', id: 'warning-alert' });
PageAlert.saved('Profile'); // => "Profile saved"
PageAlert.deleted('Photo'); // => "Photo deleted"
PageAlert.buildPageAlert('success', 'My Custom Alert', 'custom-alert')
  .setAutoFocus(false)
  .setContent(<span>Example Content</span>)
  .setTimeoutMs(2000)
  .includeMessage('Message 1')
  .includeMessage('Message 2')
  .create();
```

Example – success notification with auto‑dismiss:

```tsx
import { useEffect } from 'react';
import { usePageAlerts } from 'hooks';
import { PageAlert } from 'builders';

export function ProfileSavedNotice() {
  const { addAlert, updateAlert } = usePageAlerts();
  useEffect(() => {
    const id = addAlert(PageAlertBuilders.saved('Profile'));
    // Extend its lifetime and change heading after 1s
    const t = setTimeout(() => {
      updateAlert(id, { heading: 'Profile saved (synced)', timeoutMs: 6000 });
    }, 1000);
    return () => clearTimeout(t);
  }, [addAlert, updateAlert]);
  return null;
}
```

Rich content (custom action inside the card):

```tsx
addAlert({
  heading: 'New version available',
  variant: 'info',
  content: <button onClick={reload}>Reload Now</button>,
  timeoutMs: 0 // 0 or undefined means it persists until manually dismissed
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
const id = addAlert({ heading: 'Uploading...', variant: 'info', timeoutMs: 0 });
// after work
updateAlert(id, {
  heading: 'Upload complete',
  variant: 'success',
  timeoutMs: 4000
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
import { onAuthTokenChange, initFirebase } from 'auth';

// Layout Components (Page Heading, Page Alerts, etc.)
import { HeadingProvider, PageAlertsProvider } from 'layout-components';

// Hooks (custom React hooks barrel)
import { usePageHeading, usePageAlerts } from 'hooks';

// UI primitives / layout
import { PageContainer, OverlayHost } from 'framework';

// Layout root (aggregated providers, etc.)
import { DefaultLayout } from 'layout';

// Shared components
import { AlertCard, DashboardCard } from 'components';

// Controllers (non-visual logic facades)
import { BirthdayCalendarController } from 'controllers';

// Route objects / helpers (router export)
import { router } from 'routes';

// Utilities & pure helpers
import { formatDisplayDate, sortPlushies } from 'utils';

// Domain models / types
import { IPlushieBirthday, IUserProfile } from 'model';
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

  ## Docker + Nginx (local and prod)

  This app ships with a simple, production‑ready container that serves the built SPA using Nginx.

  - Two Nginx configs are used:
    - `nginx.main.conf` → copied to `/etc/nginx/nginx.conf` (process‑wide settings). It sets:
      - a writable PID path (`/tmp/nginx.pid`) so we can run as a non‑root user
      - logging location
      - the `http {}` block and `include /etc/nginx/conf.d/*.conf`
    - `default.conf.template` → copied to `/etc/nginx/templates/default.conf.template` and rendered at container start to `/etc/nginx/conf.d/default.conf`. It configures:
      - `listen ${PORT}` (dynamic; defaults to 8080 via `ENV PORT=8080` in the Dockerfile; platforms like Vercel override `PORT` at runtime)
      - document root `/usr/share/nginx/html`
      - SPA fallback: `try_files $uri /index.html`

  Why non‑root? Many scanners flag containers that run as root. We use the built‑in `nginx` user, set a writable PID file, and chown log/runtime dirs so Nginx can start without elevated privileges.

  Dev vs Prod images (local)

  ```powershell
  # Dev image (uses .env.development and rewrites API_URL to host.docker.internal for local API)
  npm run docker:build:dev
  npm run docker:start:dev
  npm run docker:stop:dev

  # Prod image (uses .env.production as-is)
  npm run docker:build
  npm run docker:start
  npm run docker:stop
  ```

  Cloud hosting:

  - This image is production‑capable as‑is for static hosting. Common platforms (Cloud Run, ECS/Fargate, ACI, AKS, etc.) can run it directly.
  - TLS is typically terminated by the platform’s load balancer; if you need Nginx to terminate TLS, add an `ssl` server in `conf.d` and mount certs.
  - Health checks: you can add a `HEALTHCHECK` to the Dockerfile or configure platform checks hitting `/`.
  - Cache/security headers: for extra hardening/optimization, add headers in `default.conf` (e.g., `Cache-Control`, `X-Frame-Options`, `Content-Security-Policy`).
  - Scaling: this is a stateless container; run multiple replicas behind a load balancer.

  Note on file names: `default.conf.template` is the source template; the running container renders it to `conf.d/default.conf` on startup. `nginx.main.conf` is the main Nginx config.

  Dynamic port (\$PORT) support:

  - Dockerfile sets `ENV PORT=8080` as a sane local default. The official Nginx entrypoint renders `/etc/nginx/templates/default.conf.template` with `${PORT}` at startup.
  - On platforms that inject `PORT` (Vercel, Cloud Run, Railway, etc.), that runtime value overrides the default automatically—no custom shell scripts required.
  - `EXPOSE 8080` in the Dockerfile is informational metadata only; it doesn’t need to be dynamic and has no effect on platforms that inject `PORT`.

  Local API from inside Docker (dev):

  - Ensure your API CORS allows `http://localhost:8080` when testing via the container.

  ### Environment variables (simple: .env files at build time)

  This app uses a straightforward, build‑time approach:

  - Webpack loads both `.env` and `.env.<NODE_ENV>` (e.g., `.env.production`).
  - The values are injected at build time via `DefinePlugin` and bundled into the JS.
  - No runtime `/env.js`, no entrypoint scripts, no Nginx custom routes.

  Local development

  - Put your dev values in `.env` or `.env.development`.
  - `npm run start` uses `NODE_ENV=development` by default, so both files are read with `.env.development` overriding `.env`.

  Production build

  - Put public, client‑side config (e.g., Firebase web config, API base URL) in `.env.production`.
  - `npm run build` uses `NODE_ENV=production`, so `.env.production` overrides `.env`.

  Docker / CI / Cloud platforms

  - When building the Docker image (multi‑stage), the build step runs `npm run build` inside the repo, so `.env.production` in the repo is picked up automatically.
  - If you don’t want these values committed to the repo, set environment variables in the build environment (CI job, or the platform’s build settings) so the `npm run build` step sees them. No runtime injection is used.
  - Many scanners warn on passing secrets via Docker `ARG/ENV`. The values used here (Firebase web config, API URL) are public client config, not secrets. If your scanner still flags them, add an allow‑list or set them via the CI environment instead of Docker build arguments.
  - Platforms that inject a `PORT` env var are supported out‑of‑the‑box via the Nginx template.

  Security note about client config

  - The Firebase “client config” (apiKey, authDomain, projectId, appId, messagingSenderId) is intentionally public; it must be shipped to browsers. Protect data with Firebase Security Rules and server‑side checks.

  Vercel (Docker) quick guidance

  - Vercel’s Docker build does not automatically pass Project Environment Variables into `docker build`. The simplest path is to commit `.env.production` (for public client config only) so the build can succeed. Alternatively, configure your CI to build the image and push it to a registry, then deploy the built image to Vercel.

## Git aliases

To use Git aliases, you must first ensure that the git is configured to include `.gitconfig`. To do so, simply run:

**Linux/macOS**

```bash
git config --local include.path "$(pwd)/.gitconfig"
```

**Windows Powershell**

```powershell
git config --local include.path "${PWD}/.gitconfig"
```

### `resetdevelop`

**Command**: `git resetdevelop`

Running `resetdevelop` will:

- Checkout your local `develop` branch
- Fetch the latest changes from `origin`
- Hard reset your local `develop` to match the rebased `develop` on GitHub

**Equivalent to running**:

```bash
git checkout develop
git fetch origin
git reset --hard origin/develop
```

**Note**: This will overwrite any uncommitted changes in develop. Use git stash first if needed.

**Why this alias exists**: The `rebase-develop-against-main.yml` GitHub Action automatically rebases develop on top of main after each pull request merge. This alias ensures your local branch stays in sync with the canonical history.
