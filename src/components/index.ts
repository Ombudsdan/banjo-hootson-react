import DialogActionButtons from './Dialog/DialogActionButtons';
import DialogBodyText from './Dialog/DialogBodyText';
import DialogContainer from './Dialog/DialogContainer';
import DialogTitle from './Dialog/DialogTitle';
import {
  CountryFormInput,
  EmailAddressFormInput,
  FormActionsContainer,
  FormSectionHeader,
  FormValidationErrors,
  PlushieInstagramAccountFormInput,
  PlushieInstagramAccountsSelector,
  TownOrCityInput,
  UsernameFormInput
} from './Form';

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

export const Dialog = {
  ActionButtons: DialogActionButtons,
  BodyText: DialogBodyText,
  Container: DialogContainer,
  Title: DialogTitle
};
export * from './Dialog/DialogActionButtons';
export * from './Dialog/DialogBodyText';
export * from './Dialog/DialogContainer';
export * from './Dialog/DialogTitle';

export * from './ErrorCard';
export { default as ErrorCard } from './ErrorCard';

export const Form = {
  ActionsContainer: FormActionsContainer,
  Country: CountryFormInput,
  EmailAddress: EmailAddressFormInput,
  PlushieInstagramAccount: PlushieInstagramAccountFormInput,
  PlushieInstagramAccounts: PlushieInstagramAccountsSelector,
  SectionHeader: FormSectionHeader,
  TownOrCity: TownOrCityInput,
  Username: UsernameFormInput,
  ValidationErrors: FormValidationErrors
};
export * from './Form/FormActionsContainer';
export * from './Form/CountryFormInput';
export * from './Form/EmailAddressFormInput';
export * from './Form/PlushieInstagramAccountFormInput';
export * from './Form/PlushieInstagramAccountsSelector';
export * from './Form/FormSectionHeader';
export * from './Form/TownOrCityInput';
export * from './Form/UsernameFormInput';
export * from './Form/FormValidationErrors';

export * from './Gallery';
export { default as Gallery } from './Gallery';

export * from './GoogleCalendarIFrame';
export { default as GoogleCalendarIFrame } from './GoogleCalendarIFrame';

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
