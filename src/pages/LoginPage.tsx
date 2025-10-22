import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PageWidthContainer } from "@/framework/PageWidthContainer";
import { PageHeadingContainer } from "@/framework/PageHeadingContainer";
import { FlexColumnLayout } from "@/framework/FlexColumnLayout";
import { AuthController } from "@/controllers/auth.controller";
import { UserController } from "@/controllers/user.controller";
import AlertCard from "@/components/AlertCard";
import {
  Validation,
  runValidators,
  firstErrorMessage,
} from "@/utils/validation";

export default function LoginPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = useMemo(() => new URLSearchParams(search), [search]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState<{ email: boolean; password: boolean }>(
    { email: false, password: false }
  );
  const [submitted, setSubmitted] = useState(false);
  const [showLoggedOutAlert, setShowLoggedOutAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [showExpiredAlert, setShowExpiredAlert] = useState<boolean>(false);
  const [isShowingMessage, setIsShowingMessage] = useState(false);

  useEffect(() => {
    const msg = params.get("message");
    const hasLoggedOut = params.get("loggedOut") === "1";
    const hasExpired = params.get("expired") === "1";
    const next = new URLSearchParams(params);

    setShowLoggedOutAlert(hasLoggedOut);
    setShowExpiredAlert(hasExpired);

    if (msg) {
      setInfoMessage(msg);
    }

    if (hasLoggedOut) {
      setInfoMessage(null);
      next.delete("loggedOut");
    }

    if (hasExpired) {
      next.delete("expired");
    }

    if (hasLoggedOut || hasExpired) {
      const newSearch = next.toString();
      const newUrl = `${window.location.pathname}${
        newSearch ? `?${newSearch}` : ""
      }`;
      window.history.replaceState({}, "", newUrl);
    }
  }, [params]);

  useEffect(() => {
    setIsShowingMessage(
      Boolean(
        errorMessage || infoMessage || showLoggedOutAlert || showExpiredAlert
      )
    );
  }, [infoMessage, errorMessage, showLoggedOutAlert, showExpiredAlert]);

  // Validators mirroring Angular expectations: required + email format; password min length 6
  const emailErrors = runValidators(email, [
    Validation.required,
    Validation.email,
  ]);
  const passwordErrors = runValidators(password, [
    Validation.required,
    Validation.minLength(6),
  ]);

  const showErrors = (field: "email" | "password") =>
    touched[field] || submitted;

  const emailErrorText = showErrors("email")
    ? firstErrorMessage(emailErrors, {
        required: "Email is required",
        email: "Please enter a valid email address",
      })
    : "";

  const passwordErrorText = showErrors("password")
    ? firstErrorMessage(passwordErrors, {
        required: "Password is required",
        minlength: "Password must be at least 6 characters",
      })
    : "";

  const formValid = !emailErrors && !passwordErrors;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSubmitted(true);
    setTouched({ email: true, password: true });
    setErrorMessage(null);
    if (!formValid) return;
    setIsLoading(true);
    try {
      await AuthController.signInWithEmailPassword(email, password);
      await UserController.me();
      navigate("/dashboard");
    } catch (err: unknown) {
      const code = (err as { code?: string; message?: string } | undefined)
        ?.code;
      let message = "An error occurred during login. Please try again.";
      switch (code) {
        case "auth/invalid-credential":
        case "auth/wrong-password":
        case "auth/user-not-found":
          message =
            "Invalid email or password. Please check your credentials and try again.";
          break;
        case "auth/user-disabled":
          message = "This account has been disabled. Please contact support.";
          break;
        case "auth/too-many-requests":
          message = "Too many failed login attempts. Please try again later.";
          break;
        case "auth/network-request-failed":
          message =
            "Network error. Please check your connection and try again.";
          break;
        default: {
          const m = (err as { message?: string } | undefined)?.message;
          if (m) message = `Login failed: ${m}`;
        }
      }
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PageHeadingContainer heading="Sign In" />
      <PageWidthContainer>
        <FlexColumnLayout>
          <div className="login-page">
            <div className="login-page__container">
              <form onSubmit={onSubmit} className="login-page__form">
                <div
                  className={
                    isShowingMessage
                      ? "login-page__message-container"
                      : undefined
                  }
                >
                  {showLoggedOutAlert && (
                    <AlertCard
                      heading="Signed out successfully"
                      variant="success"
                      autoFocus
                    />
                  )}
                  {showExpiredAlert && (
                    <AlertCard
                      heading="Your session expired. Please sign in again."
                      variant="warning"
                      autoFocus
                    />
                  )}
                  {infoMessage && (
                    <div className="login-page__message login-page__message--info">
                      {infoMessage}
                    </div>
                  )}
                  {errorMessage && (
                    <div className="login-page__message login-page__message--error">
                      {errorMessage}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label
                    htmlFor="email"
                    className="form-group__label form-group__label--required"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                    className={emailErrorText ? "error" : undefined}
                    placeholder="Enter your email"
                    autoComplete="email"
                  />
                  {emailErrorText && (
                    <div className="form-group__error-message">
                      {emailErrorText}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label
                    htmlFor="password"
                    className="form-group__label form-group__label--required"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                    className={passwordErrorText ? "error" : undefined}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />
                  {passwordErrorText && (
                    <div className="form-group__error-message">
                      {passwordErrorText}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="form__button form__button--primary"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </button>

                <div className="login-page__signup-prompt">
                  <p>
                    Don't have an account?
                    <button
                      type="button"
                      className="login-page__link-button"
                      onClick={() => navigate("/signup")}
                      disabled={isLoading}
                    >
                      Sign Up
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </FlexColumnLayout>
      </PageWidthContainer>
    </>
  );
}
