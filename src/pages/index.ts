import { lazy } from 'react';

export * from './AboutPage';
export { default as AboutPage } from './AboutPage';

export * from './AccountPage';
export { default as AccountPage } from './AccountPage';

export * from './CalendarPage';
export { default as CalendarPage } from './CalendarPage';

export * from './ContactPage';
export { default as ContactPage } from './ContactPage';

export * from './DashboardPage';
export { default as DashboardPage } from './DashboardPage';

export * from './ErrorPage';
export { default as ErrorPage } from './ErrorPage';

export * from './HomePage';
export { default as HomePage } from './HomePage';

export * from './LoginPage';
export { default as LoginPage } from './LoginPage';

export * from './ManageProfilePage';
export { default as ManageProfilePage } from './ManageProfilePage';

export * from './SignUpPage';
export { default as SignUpPage } from './SignUpPage';

export * from './SubmitPlushieBirthdayConfirmationPage';
export { default as SubmitPlushieBirthdayConfirmationPage } from './SubmitPlushieBirthdayConfirmationPage';

export * from './SubmitPlushieBirthdayPage';
export { default as SubmitPlushieBirthdayPage } from './SubmitPlushieBirthdayPage';

export * from './UnauthorizedPage';
export { default as UnauthorizedPage } from './UnauthorizedPage';

export * from './ViewPlushieBirthdayPage';
export { default as ViewPlushieBirthdayPage } from './ViewPlushieBirthdayPage';

export * from './ViewPlushieBirthdaysPage';
export { default as ViewPlushieBirthdaysPage } from './ViewPlushieBirthdaysPage';

const Pages = {
  About: lazy(() => import('pages/AboutPage')),
  Account: lazy(() => import('pages/AccountPage')),
  Calendar: lazy(() => import('pages/CalendarPage')),
  Contact: lazy(() => import('pages/ContactPage')),
  Dashboard: lazy(() => import('pages/DashboardPage')),
  Error: lazy(() => import('pages/ErrorPage')),
  Home: lazy(() => import('pages/HomePage')),
  Login: lazy(() => import('pages/LoginPage')),
  ManageProfile: lazy(() => import('pages/ManageProfilePage')),
  SignUp: lazy(() => import('pages/SignUpPage')),
  SubmitPlushieBirthdayConfirmation: lazy(() => import('pages/SubmitPlushieBirthdayConfirmationPage')),
  SubmitPlushieBirthday: lazy(() => import('pages/SubmitPlushieBirthdayPage')),
  Unauthorized: lazy(() => import('pages/UnauthorizedPage')),
  ViewPlushieBirthday: lazy(() => import('pages/ViewPlushieBirthdayPage')),
  ViewPlushieBirthdays: lazy(() => import('pages/ViewPlushieBirthdaysPage'))
};

export default Pages;
