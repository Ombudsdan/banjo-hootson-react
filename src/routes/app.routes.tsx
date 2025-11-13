import {
  createBrowserRouter,
  createRoutesFromElements,
  LoaderFunction,
  LoaderFunctionArgs,
  Route,
  useLoaderData,
  redirect
} from 'react-router-dom';
import { DefaultLayout } from 'layout';
import Pages, { accountLoader, dashboardLoader, manageProfileLoader, viewPlushieBirthdayLoader } from 'pages';
import { AuthController } from 'controllers';
import { LoadingScreen } from 'components';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<DefaultLayout />}
      errorElement={<Pages.Error />}
      hydrateFallbackElement={<LoadingScreen isOpen={true} />}>
      <Route index element={<Pages.Home />} />
      <Route path="calendar" element={<Pages.Calendar />} />
      <Route path="calendar/submit" element={<Pages.SubmitPlushieBirthday />} />
      <Route path="calendar/submit/confirmation/:id" element={<Pages.SubmitPlushieBirthdayConfirmation />} />
      <Route path="calendar/view" element={<Pages.ViewPlushieBirthdays />} />
      <Route path="calendar/view/:id" loader={viewPlushieBirthdayLoader} element={<Pages.ViewPlushieBirthday />} />
      <Route path="profile" loader={authLoader(manageProfileLoader)} element={<Pages.ManageProfile />} />
      <Route path="account" loader={authLoader(accountLoader)} element={<Pages.Account />} />
      <Route path="about" element={<Pages.About />} />
      <Route path="contact" element={<Pages.Contact />} />
      <Route path="dashboard" loader={authLoader(dashboardLoader)} element={<Pages.Dashboard />} />
      <Route path="unauthorized" element={<Pages.Unauthorized />} />
      <Route path="login" element={<Pages.Login />} />
      <Route path="signup" element={<Pages.SignUp />} />
      <Route path="*" element={<Pages.Error title="404" message="Page Not Found" />} />
    </Route>
  )
);

/**
 * Wraps a given loader function with authentication enforcement.
 *
 * Runs `ensureAuth` before executing the provided loader, ensuring that
 * authentication is initialized and a valid token exists before proceeding.
 * This helper prevents repetitive auth logic in multiple loaders.
 *
 * @param inner - An optional loader function to execute after authentication is verified.
 * @returns A new loader function that performs authentication checks before invoking the original loader.
 */
function authLoader(inner?: LoaderFunction): LoaderFunction {
  return async (args: LoaderFunctionArgs) => {
    await checkAuth(args);
    return inner ? await inner(args) : null;
  };
}

/**
 * Ensures that authentication is initialized and a valid token is present.
 *
 * This minimal loader should be used to guard routes that require authentication.
 * If no valid authentication token is found, the user is redirected to the login page
 * with an `expired=1` query parameter.
 *
 * @param _args - The loader function arguments provided by React Router.
 * @returns `null` if authentication succeeds.
 * @throws Redirects to `/login?expired=1` if the user is unauthenticated.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function checkAuth(_args: LoaderFunctionArgs) {
  await AuthController.init();
  const token = AuthController.currentToken;
  if (!token) throw redirect('/login?expired=1');
  return null;
}

/**
 * A typed wrapper around React Router's `useLoaderData` hook.
 *
 * Infers the return type of a loader function so you can use loader data
 * with proper TypeScript types without manual casting.
 *
 * @typeParam T - The type of the loader function.
 * @param _loader - The loader function used purely for type inference.
 * @returns The loader's returned data, typed according to the loader's return type.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useLoaderDataFor<T extends (...args: unknown[]) => unknown>(_loader: T) {
  return useLoaderData() as Awaited<ReturnType<T>>;
}
