import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PageWidthContainer } from "@/framework/PageWidthContainer";
import { PageHeadingContainer } from "@/framework/PageHeadingContainer";
import { FlexColumnLayout } from "@/framework/FlexColumnLayout";
import { AuthController } from "@/controllers/auth.controller";
import { UserController } from "@/controllers/user.controller";
import AlertCard from "@/components/AlertCard";

export default function LoginPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = useMemo(() => new URLSearchParams(search), [search]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [expired, setExpired] = useState<boolean>(false);

  useEffect(() => {
    const msg = params.get("message");
    if (msg) setInfoMessage(msg);
    const loggedOut = params.get("loggedOut");
    const expiredParam = params.get("expired");
    if (loggedOut === "1") {
      setInfoMessage(null);
    }
    setExpired(expiredParam === "1");
    // remove ephemeral params from URL
    const next = new URLSearchParams(params);
    if (loggedOut === "1") next.delete("loggedOut");
    if (expiredParam === "1") next.delete("expired");
    if (loggedOut === "1" || expiredParam === "1") {
      const newSearch = next.toString();
      const newUrl = `${window.location.pathname}${
        newSearch ? `?${newSearch}` : ""
      }`;
      window.history.replaceState({}, "", newUrl);
    }
  }, [params]);

  const getFieldError = (name: string): string | null => {
    if (name === "email") {
      if (!email) return "Email is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        return "Please enter a valid email address";
    }
    if (name === "password") {
      if (!password) return "Password is required";
      if (password.length < 6) return "Password must be at least 6 characters";
    }
    return null;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const emailErr = getFieldError("email");
    const passErr = getFieldError("password");
    if (emailErr || passErr) {
      setErrorMessage(emailErr || passErr);
      return;
    }
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
    <PageWidthContainer>
      <PageHeadingContainer heading="Sign In" />
      <FlexColumnLayout>
        <div className="login-page">
          <div className="login-page__container">
            <form onSubmit={onSubmit} className="login-page__form">
              {params.get("loggedOut") === "1" && (
                <AlertCard
                  heading="Signed out successfully"
                  variant="success"
                  autoFocus
                />
              )}
              {expired && (
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
                  className={getFieldError("email") ? "error" : undefined}
                  placeholder="Enter your email"
                  autoComplete="email"
                />
                {getFieldError("email") && (
                  <div className="form-group__error-message">
                    {getFieldError("email")}
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
                  className={getFieldError("password") ? "error" : undefined}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                {getFieldError("password") && (
                  <div className="form-group__error-message">
                    {getFieldError("password")}
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
  );
}
