import {
  CountryFormInput,
  EmailAddressFormInput,
  PlushieInstagramAccountFormInput,
  PlushieInstagramAccountsSelector,
  TownOrCityInput,
  UsernameFormInput
} from './FormInputs';

/**
 * Barrel for UI components. Import via the path alias:
 *   import { AlertCard, Dialog } from 'components';
 * Avoid deep imports (e.g. 'components/AlertCard') unless measuring a bundle benefit.
 */
export * from './AlertCard';
export { default as AlertCard } from './AlertCard';

export * from './ClickableActionPanel';
export { default as ClickableActionPanel } from './ClickableActionPanel';

export * from './ClickableActionPanelGroup';
export { default as ClickableActionPanelGroup } from './ClickableActionPanelGroup';

export * from './DashboardCard';
export { default as DashboardCard } from './DashboardCard';

export * from './DialogActionButtons';
export { default as DialogActionButtons } from './DialogActionButtons';

export * from './DialogBodyText';
export { default as DialogBodyText } from './DialogBodyText';

export * from './DialogContainer';
export { default as DialogContainer } from './DialogContainer';

export * from './DialogTitle';
export { default as DialogTitle } from './DialogTitle';

export * from './ErrorCard';
export { default as ErrorCard } from './ErrorCard';

export * from './Form';
export { default as Form } from './Form';

export * from './FormActionsContainer';
export { default as FormActionsContainer } from './FormActionsContainer';

export const FormInput = {
  Country: CountryFormInput,
  EmailAddress: EmailAddressFormInput,
  PlushieInstagramAccount: PlushieInstagramAccountFormInput,
  PlushieInstagramAccounts: PlushieInstagramAccountsSelector,
  TownOrCity: TownOrCityInput,
  Username: UsernameFormInput
};

export * from './FormSectionHeader';
export { default as FormSectionHeader } from './FormSectionHeader';

export * from './FormValidationErrors';
export { default as FormValidationErrors } from './FormValidationErrors';

export * from './Gallery';
export { default as Gallery } from './Gallery';

export * from './GoogleCalendar';
export { default as GoogleCalendar } from './GoogleCalendar';

export * from './Heading';
export { default as Heading } from './Heading';

export * from './PageNavigation';
export { default as PageNavigation } from './PageNavigation';

export * from './PlushieBio';
export { default as PlushieBio } from './PlushieBio';

export * from './SummaryList';
export { default as SummaryList } from './SummaryList';

export * from './UserSubscriptionTierBadge';
export { default as UserSubscriptionTierBadge } from './UserSubscriptionTierBadge';
