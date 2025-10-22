# components/

Presentational, reusable UI pieces. They:

- Contain no business or persistence logic.
- Accept props; do not perform data fetching.
- May rely on hooks only for minor UI concerns (NOT for global state mutation).
- Are exported via the `components` alias barrel.

## Import

```ts
import { Gallery, DashboardCard } from 'components';
// UI primitives like AlertCard, Dialog, Heading, SummaryList come from 'framework'
import { AlertCard, Dialog, Heading, SummaryList } from 'framework';
```

## Adding a component

1. Create `MyComponent.tsx`.
2. Export it through `index.ts` (named + optionally default for ergonomics).
3. Keep styling BEM‑aligned in global or a future modular SCSS split.

## When NOT to add here

- If it coordinates multiple contexts or page-level concerns → consider `framework/`.
- If it encapsulates stateful app logic → move logic to a hook/service and keep components dumb.

---

## Reference and examples

Only exported components are covered here with brief summaries and practical examples. See TSDocs on each component for hover details.

## Exports overview

These are the key exports from this folder (see TSDocs on hover for API details):

- ErrorCard — page-level error surface built on AlertCard (from framework)
- ClickableActionPanel, ClickableActionPanelGroup — navigational tiles
- DashboardCard — feature entry tile
- Gallery — image grid
- GoogleCalendarIFrame — temporary calendar embed
- PageNavigation — simple tab control
- PlushieBio — profile-style card for plushies
- UserSubscriptionTierBadge — labeled tier chip

### ErrorCard

Specialised alert for error messages.

```tsx
import { ErrorCard } from 'components';

<ErrorCard id="submit-failed" heading="Submission failed" errorMessages={['Network error', 'Try again later']} />;
```

### ClickableActionPanel and ClickableActionPanelGroup

Small panels that route internally or link externally based on controller options.

```tsx
import { ClickableActionPanel, ClickableActionPanelGroup } from "components";
import { ClickableActionPanelOption, ClickableActionPanelGroupOption } from "controllers";

<ClickableActionPanel option={ClickableActionPanelOption.ManageProfile} />

<ClickableActionPanelGroup group={ClickableActionPanelGroupOption.DashboardMain} />
```

### DashboardCard

Button-styled card with optional icon, description, and locked state.

```tsx
import { DashboardCard } from "components";
import { faUser } from "@fortawesome/free-solid-svg-icons";

// Clickable
<DashboardCard icon={faUser} description="Manage your profile" onClick={() => navigate("/profile")}>
  Profile
</DashboardCard>

// Locked/disabled
<DashboardCard icon={faUser} description="Premium feature" isLocked>
  Premium Analytics
</DashboardCard>
```

### Gallery

Simple grid of images.

```tsx
import { Gallery } from 'components';

<Gallery
  items={[
    { fileName: 'plushie-1.webp', alt: 'Plushie one' },
    { fileName: 'plushie-2.webp', alt: 'Plushie two' }
  ]}
/>;
```

### GoogleCalendarIFrame

Embeds a Google Calendar URL with sensible width/height defaults.

```tsx
import { GoogleCalendarIFrame } from "components";

// Defaults: width="100%", height=600
<GoogleCalendarIFrame title="Plushie Calendar" source={calendarUrl} />

// Custom size
<GoogleCalendarIFrame title="Mini Calendar" source={calendarUrl} width={320} height={300} />
```

### PageNavigation

Tab-like navigation bar.

```tsx
import { PageNavigation } from 'components';

const tabs = [
  { key: 'PROFILE', title: 'Profile' },
  { key: 'ACCOUNT', title: 'Account' },
  { key: 'BILLING', title: 'Billing', isDisabled: true }
];

<PageNavigation tabs={tabs} activeKey={activeTab} onSelect={tab => setActiveTab(tab.key)} />;
```

### PlushieBio

Alternating bio block for plushies; alignment alternates using the `position` index.

```tsx
import { PlushieBio } from 'components';

{
  plushies.map((p, idx) => <PlushieBio key={p.name} plushie={p} position={idx} />);
}
```

### UserSubscriptionTierBadge

Displays a badge for the current subscription tier; text is normalised to lowercase for styling.

```tsx
import { UserSubscriptionTierBadge } from "components";

<UserSubscriptionTierBadge tier="Standard" />
<UserSubscriptionTierBadge tier="Premium" />
```
