# components/

Presentational, reusable UI pieces. They:

- Contain no business or persistence logic.
- Accept props; do not perform data fetching.
- May rely on hooks only for minor UI concerns (NOT for global state mutation).
- Are exported via the `components` alias barrel.

## Import

```ts
import { AlertCard, Dialog, Gallery } from 'components';
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

- AlertCard, ErrorCard — page-level message surfaces (info/error variants)
- Dialog — UI pieces: Dialog.Container, Dialog.Title, Dialog.BodyText, Dialog.ActionButtons
- Form — re-exports common inputs and helpers: - Form.EmailAddress, Form.Username, Form.TownOrCity, Form.Country - Form.PlushieInstagramAccount, Form.PlushieInstagramAccounts - Form.SectionHeader, Form.ActionsContainer, Form.ValidationErrors
- ClickableActionPanel, ClickableActionPanelGroup — navigational tiles
- DashboardCard — feature entry tile
- Gallery — image grid
- GoogleCalendarIFrame — temporary calendar embed
- Heading — semantic heading wrapper
- PageNavigation — simple tab control
- PlushieBio — profile-style card for plushies
- SummaryList — definition-list layout (Container, Row, Key, Value, Actions)
- UserSubscriptionTierBadge — labeled tier chip

### AlertCard

Accessible alert container with optional heading, message list, variant, and arbitrary children.

```tsx
import { AlertCard } from "components";
import { AlertCardVariant } from "enums";

// Basic list of messages
<AlertCard id="profile-alert" heading="Profile Updated" messages={["Changes saved successfully."]} />

// Override variant and pass children
<AlertCard
  id="warn-alert"
  heading="Check details"
  variant={AlertCardVariant.ERROR}
  disableAutoFocus
>
  <p>Please review your inputs below.</p>
</AlertCard>
```

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
import { ActionPanelOption, ActionPanelGroupOption } from "controllers";

<ClickableActionPanel option={ActionPanelOption.ManageProfile} />

<ClickableActionPanelGroup group={ActionPanelGroupOption.DashboardMain} />
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

### Heading

Light wrapper for semantic headings.

```tsx
import { Heading } from 'components';
import { HeadingLevel } from 'enums';

<Heading level={HeadingLevel.H2} text="Section Title" />;
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

### SummaryList

Key-value summary list with optional actions.

```tsx
import { SummaryList } from 'components';

<SummaryList.Container>
  <SummaryList.Row>
    <SummaryList.Key>Username</SummaryList.Key>
    <SummaryList.Value>johnsmith123</SummaryList.Value>
    <SummaryList.Actions>
      <button type="button">Edit</button>
    </SummaryList.Actions>
  </SummaryList.Row>
</SummaryList.Container>;
```

### UserSubscriptionTierBadge

Displays a badge for the current subscription tier; text is normalised to lowercase for styling.

```tsx
import { UserSubscriptionTierBadge } from "components";

<UserSubscriptionTierBadge tier="Standard" />
<UserSubscriptionTierBadge tier="Premium" />
```

### Dialog components

Composable primitives for dialogs. Prefer using the dialog providers/outlets for full behavior; these are the presentational parts:

```tsx
import { Dialog } from 'components';

<Dialog.Container>
  <Dialog.Title>Confirm action</Dialog.Title>
  <Dialog.BodyText>This cannot be undone.</Dialog.BodyText>
  <Dialog.ActionButtons
    confirmType="primary"
    confirmText="Confirm"
    cancelText="Cancel"
    onClose={() => {
      /* close */
    }}
    onConfirm={() => {
      /* confirm */
    }}
  />
  {/* For form dialogs, render ActionButtons with isFormDialog and wrap in a <form> */}
</Dialog.Container>;
```

### Form components (quick tour)

Form inputs are controlled and designed to work with the app form context hook. Examples (simplified):

```tsx
import { Form } from "components";

<Form.EmailAddress id="email" initialValue="" label="Email" placeholder="you@example.com" />
<Form.TownOrCity id="city" initialValue="" label="Town or City" placeholder="e.g. London" />
<Form.Country id="country" initialValue="" label="Country" />

// Plushie accounts
<Form.PlushieInstagramAccounts id="plushie-accounts" initialValue={[]} />

// Actions and validation messages container
<Form.ActionsContainer>
  <button type="submit" className="button button--primary">Save</button>
</Form.ActionsContainer>
```
