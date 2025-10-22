# services/

Stateful or side-effecting functionality (API wrappers, context providers). Pages and components should access them via hooks or controllers; avoid importing a service directly inside a presentational component.

Current categories:

- HTTP wrappers (`HttpClientService`)
- Domain fetchers (`BirthdayCalendarService`, `LocationService`, `UserService`)
- UI state providers (heading, page alerts, validation alert, page container) — may later relocate to dedicated `contexts/`.

## Import

```ts
import { BirthdayCalendarService } from "services";
```

## Guidelines

- Keep static methods for simple request patterns.
- Prefer returning `Promise<T>` or Observables? (Currently: Promise-based via fetch wrapper).
- Derive display data in controllers, not here.
- Keep side-effects isolated; no DOM manipulation.
