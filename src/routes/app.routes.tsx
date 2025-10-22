import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { DefaultLayout } from "layout";
import { RequireAuth } from "routes";

const HomePage = lazy(() => import("../pages/HomePage"));
const CalendarPage = lazy(() => import("../pages/CalendarPage"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));
const AboutPage = lazy(() => import("../pages/AboutPage"));
const ContactPage = lazy(() => import("../pages/ContactPage"));
const DashboardPage = lazy(() => import("../pages/DashboardPage"));
const ManageProfilePage = lazy(() => import("../pages/ManageProfile"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const SignupPage = lazy(() => import("../pages/SignupPage"));
const UnauthorizedPage = lazy(() => import("../pages/UnauthorizedPage"));
const SubmitPlushieBirthdayPage = lazy(
  () => import("../pages/SubmitPlushieBirthdayPage")
);
const SubmitPlushieBirthdayConfirmationPage = lazy(
  () => import("../pages/SubmitPlushieBirthdayConfirmationPage")
);
const ViewPlushieBirthdaysPage = lazy(
  () => import("../pages/ViewPlushieBirthdaysPage")
);
const ViewPlushieBirthdayPage = lazy(
  () => import("../pages/ViewPlushieBirthdayPage")
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "calendar", element: <CalendarPage /> },
      {
        path: "calendar/submit",
        element: <SubmitPlushieBirthdayPage />,
      },
      {
        path: "calendar/submit/confirmation/:id",
        element: <SubmitPlushieBirthdayConfirmationPage />,
      },
      { path: "calendar/view", element: <ViewPlushieBirthdaysPage /> },
      { path: "calendar/view/:id", element: <ViewPlushieBirthdayPage /> },
      {
        path: "profile",
        element: (
          <RequireAuth>
            <ProfilePage />
          </RequireAuth>
        ),
      },
      {
        path: "manage-profile",
        element: (
          <RequireAuth>
            <ManageProfilePage />
          </RequireAuth>
        ),
      },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
      {
        path: "dashboard",
        element: (
          <RequireAuth>
            <DashboardPage />
          </RequireAuth>
        ),
      },
      { path: "unauthorized", element: <UnauthorizedPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
