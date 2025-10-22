import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageWidthContainer } from "@/framework/PageWidthContainer";
import { PageHeadingContainer } from "@/framework/PageHeadingContainer";
import { FlexColumnLayout } from "@/framework/FlexColumnLayout";
import { AuthController } from "@/controllers/auth.controller";
import { UserController } from "@/controllers/user.controller";

export default function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validators = {
    email: (): string | null => {
      if (!email) return "Email is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        return "Please enter a valid email address";
      return null;
    },
    password: (): string | null => {
      if (!password) return "Password is required";
      if (password.length < 6) return "Password must be at least 6 characters";
      return null;
    },
    confirmPassword: (): string | null => {
      if (!confirmPassword) return "Please confirm your password";
      if (password !== confirmPassword) return "Passwords do not match";
      return null;
    },
    displayName: (): string | null => {
      if (displayName && displayName.length > 50)
        return "Display name must be 50 characters or less";
      return null;
    },
    agreeToTerms: (): string | null => {
      if (!agreeToTerms) return "You must agree to the terms and conditions";
      return null;
    },
  } as const;

  const getFieldError = (name: keyof typeof validators): string | null =>
    validators[name]();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const errors = [
      validators.email(),
      validators.password(),
      validators.confirmPassword(),
      validators.displayName(),
      validators.agreeToTerms(),
    ].filter(Boolean) as string[];
    if (errors.length) {
      setErrorMessage(errors[0]);
      return;
    }
    setIsLoading(true);
    try {
      await AuthController.signUpWithEmailPassword(
        email,
        password,
        displayName || undefined
      );
      await UserController.init();
      navigate("/dashboard");
    } catch (error: unknown) {
      let message = "An error occurred during signup. Please try again.";
      const code = (error as { code?: string; message?: string } | undefined)
        ?.code;
      if (code) {
        switch (code) {
          case "auth/email-already-in-use":
            message =
              "An account with this email already exists. Please sign in instead.";
            break;
          case "auth/invalid-email":
            message = "Please enter a valid email address.";
            break;
          case "auth/weak-password":
            message =
              "Password is too weak. Please choose a stronger password.";
            break;
          case "auth/network-request-failed":
            message =
              "Network error. Please check your connection and try again.";
            break;
          default: {
            const m = (error as { message?: string } | undefined)?.message;
            message = `Signup failed: ${m || "Unknown error"}`;
          }
        }
      }
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageWidthContainer>
      <PageHeadingContainer heading="Create Account" />
      <FlexColumnLayout spacing="medium">
        <div className="signup-page">
          <div className="signup-page__container">
            <form onSubmit={onSubmit} className="signup-page__form">
              {errorMessage && (
                <div className="signup-page__message signup-page__message--error">
                  {errorMessage}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email" className="signup-page__label">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  className={`signup-page__input ${
                    getFieldError("email") ? "signup-page__input--error" : ""
                  }`}
                  placeholder="Enter your email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {getFieldError("email") && (
                  <div className="signup-page__field-error">
                    {getFieldError("email")}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="displayName" className="signup-page__label">
                  Display Name
                </label>
                <input
                  type="text"
                  id="displayName"
                  className={`signup-page__input ${
                    getFieldError("displayName")
                      ? "signup-page__input--error"
                      : ""
                  }`}
                  placeholder="Enter your display name (optional)"
                  autoComplete="name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
                {getFieldError("displayName") && (
                  <div className="signup-page__field-error">
                    {getFieldError("displayName")}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password" className="signup-page__label">
                  Password *
                </label>
                <input
                  type="password"
                  id="password"
                  className={`signup-page__input ${
                    getFieldError("password") ? "signup-page__input--error" : ""
                  }`}
                  placeholder="Enter your password (min 6 characters)"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {getFieldError("password") && (
                  <div className="signup-page__field-error">
                    {getFieldError("password")}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword" className="signup-page__label">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className={`signup-page__input ${
                    getFieldError("confirmPassword")
                      ? "signup-page__input--error"
                      : ""
                  }`}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {getFieldError("confirmPassword") && (
                  <div className="signup-page__field-error">
                    {getFieldError("confirmPassword")}
                  </div>
                )}
              </div>

              <div className="form-group--checkbox">
                <label className="signup-page__checkbox-label">
                  <input
                    type="checkbox"
                    className="signup-page__checkbox"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                  />
                  <span className="signup-page__checkbox-text">
                    I agree to the
                    <a
                      href="/terms"
                      target="_blank"
                      className="signup-page__link"
                    >
                      Terms and Conditions
                    </a>
                    *
                  </span>
                </label>
                {getFieldError("agreeToTerms") && (
                  <div className="signup-page__field-error">
                    {getFieldError("agreeToTerms")}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="signup-page__submit-button"
                disabled={isLoading}
              >
                {isLoading && (
                  <span className="signup-page__loading-spinner"></span>
                )}
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>

              <div className="signup-page__login-prompt">
                <p>
                  Already have an account?
                  <button
                    type="button"
                    className="signup-page__link-button"
                    onClick={() => navigate("/login")}
                    disabled={isLoading}
                  >
                    Sign In
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
