/**
 * Service layer + UI context providers barrel.
 * Import from 'services' instead of individual files to keep imports consistent:
 *   import { HeadingProvider, PageAlertsProvider } from 'services';
 */

export * from './birthday-calendar.service';
export { default as BirthdayCalendarService } from './birthday-calendar.service';

export * from './health.service';
export { default as HealthService } from './health.service';

export * from './http-client.service';
export { default as HttpClientService } from './http-client.service';

export * from './location.service';
export { default as LocationService } from './location.service';

export * from './user.service';
export { default as UserService } from './user.service';

export * from './validation-message.service';
export { default as ValidationMessageService } from './validation-message.service';

export * from './validation-rule.service';
export { default as ValidationRuleService } from './validation-rule.service';
