import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { DefaultLayout } from 'layout';
import { RequireAuth } from 'routes';

const HomePage = lazy(() => import('../pages/HomePage'));
const CalendarPage = lazy(() => import('../pages/CalendarPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));
const AboutPage = lazy(() => import('../pages/AboutPage'));
const ContactPage = lazy(() => import('../pages/ContactPage'));
const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const ManageProfilePage = lazy(() => import('../pages/ManageProfile'));
const AccountPage = lazy(() => import('../pages/AccountPage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const SignUpPage = lazy(() => import('../pages/SignUpPage'));
const UnauthorizedPage = lazy(() => import('../pages/UnauthorizedPage'));
const ErrorPage = lazy(() => import('../pages/ErrorPage'));
const SubmitPlushieBirthdayPage = lazy(() => import('../pages/SubmitPlushieBirthdayPage'));
const SubmitPlushieBirthdayConfirmationPage = lazy(() => import('../pages/SubmitPlushieBirthdayConfirmationPage'));
const ViewPlushieBirthdaysPage = lazy(() => import('../pages/ViewPlushieBirthdaysPage'));
const ViewPlushieBirthdayPage = lazy(() => import('../pages/ViewPlushieBirthdayPage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'calendar', element: <CalendarPage /> },
      {
        path: 'calendar/submit',
        element: <SubmitPlushieBirthdayPage />
      },
      {
        path: 'calendar/submit/confirmation/:id',
        element: <SubmitPlushieBirthdayConfirmationPage />
      },
      { path: 'calendar/view', element: <ViewPlushieBirthdaysPage /> },
      { path: 'calendar/view/:id', element: <ViewPlushieBirthdayPage /> },
      {
        path: 'profile',
        element: (
          <RequireAuth>
            <ManageProfilePage />
          </RequireAuth>
        )
      },
      {
        path: 'account',
        element: (
          <RequireAuth>
            <AccountPage />
          </RequireAuth>
        )
      },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
      {
        path: 'dashboard',
        element: (
          <RequireAuth>
            <DashboardPage />
          </RequireAuth>
        )
      },
      { path: 'unauthorized', element: <UnauthorizedPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignUpPage /> },
      { path: '*', element: <NotFoundPage /> }
    ]
  }
]);
