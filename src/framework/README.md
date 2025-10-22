# framework/

Low-level UI primitives and structural building blocks used across pages and higher-level components.

Includes:

- Navigation (`NavMenu`)
- Image loading (`Image` with lazy + fallback logic)
- Layout primitives (`PageSectionContainer`, `FlexColumnLayout`, `PageContainer`)
- Error boundaries & scroll management
- UI primitives (`AlertCard`, `Heading`, `SummaryList`)
- Dialog primitives (`Dialog.Container`, `Dialog.Title`, `Dialog.BodyText`, `Dialog.ActionButtons`)
- Form helpers (`FormActionsContainer`, `FormSectionHeader`, `FormValidationErrors`)

These are not business-aware; they focus on rendering, accessibility, and performance.

## Import

```ts
import { Image, NavMenu, PageContainer, AlertCard, Dialog } from 'framework';
```

## Exports overview

These are the key exports from this folder (see TSDocs on hover for API details):

- AlertCard
- Heading
- SummaryList
- Dialog components
- Error Boundary
- Footer
- Form — common inputs: Form.EmailAddress, Form.Username, Form.TownOrCity, Form.Country, Form.PlushieInstagramAccount, Form.PlushieInstagramAccounts

### AlertCard

Accessible alert container with optional heading, message list, variant, and arbitrary children.

```tsx
import { AlertCard } from "framework";
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

### Heading

Light wrapper for semantic headings.

```tsx
import { Heading } from 'framework';
import { HeadingLevel } from 'enums';

<Heading level={HeadingLevel.H2} text="Section Title" />;
```

### SummaryList

Key-value summary list with optional actions.

```tsx
import { SummaryList } from 'framework';

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

### Dialog components

Composable primitives for dialogs. Prefer using the dialog providers/outlets for full behavior; these are the presentational parts:

```tsx
import { Dialog } from 'framework';

<DialogContainer>
  <DialogTitle>Confirm action</DialogTitle>
  <DialogBodyText>This cannot be undone.</DialogBodyText>
  <DialogActionButtons
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
</DialogContainer>;
```

### Form components

Form inputs are controlled and designed to work with the app form context hook. Examples (simplified):

```tsx
import { Form } from "components";
import { FormActionsContainer, FormSectionHeader, FormValidationErrors } from 'framework';

<EmailAddressFormInput id="email" initialValue="" label="Email" placeholder="you@example.com" />
<TownOrCityInput id="city" initialValue="" label="Town or City" placeholder="e.g. London" />
<CountryFormInput id="country" initialValue="" label="Country" />

// Plushie accounts
<PlushieInstagramAccountsSelector id="plushie-accounts" initialValue={[]} />

// Actions and validation messages container
<FormActionsContainer>
  <button type="submit" className="button button--primary">Save</button>
</FormActionsContainer>
```
