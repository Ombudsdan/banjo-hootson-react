# hooks/

Custom React hooks consumed by pages/components. They abstract context access, compose services, and expose declarative APIs.

## Examples

```ts
const { addAlert } = usePageAlerts();
usePageHeading({ heading: "Profile", icon: "user" });
```

## Principles

- Keep side effects explicit (`useEffect` blocks with clear dependency arrays).
- Accept plain objects for configuration; avoid positional params.
- Return stable references where possible (memoization) to prevent unnecessary re-renders.

## When to create a hook

- Repeated context interaction pattern.
- Encapsulate a multi-step UI concern (e.g. registering a heading on mount + cleanup).
