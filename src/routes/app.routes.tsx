import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "@/layout/DefaultLayout";

const HomePage = lazy(() => import("../pages/HomePage"));
const CalendarPage = lazy(() => import("../pages/CalendarPage"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));
const AboutPage = lazy(() => import("../pages/AboutPage"));
const ContactPage = lazy(() => import("../pages/ContactPage"));
const DashboardPage = lazy(() => import("../pages/DashboardPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const SignupPage = lazy(() => import("../pages/SignupPage"));
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
      { path: "calendar/submit", element: <SubmitPlushieBirthdayPage /> },
      {
        path: "calendar/submit/confirmation/:id",
        element: <SubmitPlushieBirthdayConfirmationPage />,
      },
      { path: "calendar/view", element: <ViewPlushieBirthdaysPage /> },
      { path: "calendar/view/:id", element: <ViewPlushieBirthdayPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
