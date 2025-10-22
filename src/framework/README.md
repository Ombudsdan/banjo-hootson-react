# framework/

Low-level UI primitives and structural building blocks used across pages and higher-level components.

Includes:

- Navigation (`NavMenu`)
- Image loading (`Image` with lazy + fallback logic)
- Layout primitives (`PageSectionContainer`, `FlexColumnLayout`, `PageContainer`)
- Error boundaries & scroll management

These are not business-aware; they focus on rendering, accessibility, and performance.

## Import

```ts
import { Image, NavMenu, PageContainer } from "framework";
```
