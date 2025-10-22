# Scroll Preservation (preserveScroll)

The `ScrollToTop` component automatically scrolls the window to the top on every route (pathname) change **unless**:

1. The target URL contains a hash fragment (e.g. `/page#section`) – native anchor scrolling is allowed.
2. The navigation call includes a location state flag: `{ preserveScroll: true }`.

## When To Use

Use `preserveScroll` when navigating between routes that conceptually represent _progressive detail_ or _inline expansion_ of the same scrolling context. Examples:

- Opening a modal route layer over a list (detail view routed separately but should not jump the user to top).
- Wizard-style flows where step transitions change the URL but should keep the user's current vertical context.
- Client-side pagination that swaps content while the scroller position should remain anchored.

Avoid it for primary page-to-page navigation — users expect a fresh top-of-page context there.

## How To Trigger It

### 1. Via `useNavigate`

```tsx
import { useNavigate } from "react-router-dom";

function Example() {
  const navigate = useNavigate();

  const openDetails = (id: string) => {
    navigate(`/plushies/${id}`, { state: { preserveScroll: true } });
  };

  return <button onClick={() => openDetails("banjo")}>Open details</button>;
}
```

### 2. Via `<Link>` component

```tsx
import { Link } from "react-router-dom";

<Link to="/plushies/banjo" state={{ preserveScroll: true }}>
  Banjo Details
</Link>;
```

### 3. Programmatic Replace (e.g. updating filters)

```tsx
navigate(`/gallery?colour=orange`, {
  replace: true,
  state: { preserveScroll: true },
});
```

## What Happens Internally

`ScrollToTop` checks:

```ts
if (hash || state?.preserveScroll) return; // skip resetting
```

If `preserveScroll` is set, the dual RAF resets are skipped, so the current scroll position stays exactly where it is.

## Testing It Quickly

1. Navigate to a long scrolling page.
2. Scroll halfway down.
3. Trigger a navigation using one of the examples above with `preserveScroll: true`.
4. Confirm the URL/path changes but the scroll position remains.
5. Navigate somewhere else _without_ the flag — scroll should jump to top.

## Common Pitfalls

- Forgetting that a plain string in `navigate('/path')` cannot carry state — must use the options object form for preservation.
- Using `preserveScroll` for major context switches (hurts orientation).
- Expecting hash + preserveScroll both: hash wins; preserve flag redundant there.

## Minimal Reference Snippet

```ts
navigate("/some/route", { state: { preserveScroll: true } });
```

That’s all you need.
