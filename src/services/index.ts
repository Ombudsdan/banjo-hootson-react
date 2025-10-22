/**
 * Service layer + UI context providers barrel.
 * Import from 'services' instead of individual files to keep imports consistent:
 *   import { HeadingProvider, PageAlertsProvider } from 'services';
 */

export { default as BirthdayCalendarService } from "./birthday-calendar.service";
export * from "./birthday-calendar.service";

export { default as DialogService } from "./dialog.service";
export * from "./dialog.service";

export { default as HealthService } from "./health.service";
export * from "./health.service";

export { default as HttpClientService } from "./http-client.service";
export * from "./http-client.service";

export { default as LocationService } from "./location.service";
export * from "./location.service";

export { default as UserService } from "./user.service";
export * from "./user.service";
