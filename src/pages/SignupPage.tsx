import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageWidthContainer } from "@/framework/PageWidthContainer";
import { PageHeadingContainer } from "@/framework/PageHeadingContainer";
import { FlexColumnLayout } from "@/framework/FlexColumnLayout";
import { AuthController } from "@/controllers/auth.controller";
import { UserController } from "@/controllers/user.controller";
import {
  Validation,
  runValidators,
  firstErrorMessage,
} from "@/utils/validation";

export default function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [touched, setTouched] = useState<{
    email: boolean;
    password: boolean;
    confirmPassword: boolean;
    displayName: boolean;
    agreeToTerms: boolean;
  }>({
    email: false,
    password: false,
    confirmPassword: false,
    displayName: false,
    agreeToTerms: false,
  });
  const [submitted, setSubmitted] = useState(false);

  // Validators
  const emailErrors = runValidators(email, [
    Validation.required,
    Validation.email,
  ]);
  const passwordErrors = runValidators(password, [
    Validation.required,
    Validation.minLength(6),
  ]);
  // Display name optional, but length limit 50
  const displayNameErrors = runValidators(displayName, [
    Validation.maxLength(50),
  ]);
  // Confirm password custom logic
  let confirmPasswordErrors: Record<string, boolean> | null = null;
  if (!confirmPassword && (submitted || touched.confirmPassword)) {
    confirmPasswordErrors = { required: true };
  } else if (password && confirmPassword && password !== confirmPassword) {
    confirmPasswordErrors = { mismatch: true };
  }
  const agreeErrors = agreeToTerms
    ? null
    : submitted || touched.agreeToTerms
    ? { required: true }
    : null;

  const showErrors = (field: keyof typeof touched) =>
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
  const confirmPasswordErrorText = showErrors("confirmPassword")
    ? firstErrorMessage(confirmPasswordErrors, {
        required: "Please confirm your password",
        mismatch: "Passwords do not match",
      })
    : "";
  const displayNameErrorText = showErrors("displayName")
    ? firstErrorMessage(displayNameErrors, {
        maxlength: "Display name must be 50 characters or less",
      })
    : "";
  const agreeErrorText = showErrors("agreeToTerms")
    ? firstErrorMessage(agreeErrors, {
        required: "You must agree to the terms and conditions",
      })
    : "";

  const formValid =
    !emailErrors &&
    !passwordErrors &&
    !confirmPasswordErrors &&
    !displayNameErrors &&
    !agreeErrors;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTouched({
      email: true,
      password: true,
      confirmPassword: true,
      displayName: true,
      agreeToTerms: true,
    });
    setErrorMessage(null);
    if (!formValid) return;
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
    <>
      <PageHeadingContainer heading="Create Account" />
      <PageWidthContainer>
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
                      emailErrorText ? "signup-page__input--error" : ""
                    }`}
                    placeholder="Enter your email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                  />
                  {emailErrorText && (
                    <div className="signup-page__field-error">
                      {emailErrorText}
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
                      displayNameErrorText ? "signup-page__input--error" : ""
                    }`}
                    placeholder="Enter your display name (optional)"
                    autoComplete="name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    onBlur={() =>
                      setTouched((t) => ({ ...t, displayName: true }))
                    }
                  />
                  {displayNameErrorText && (
                    <div className="signup-page__field-error">
                      {displayNameErrorText}
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
                      passwordErrorText ? "signup-page__input--error" : ""
                    }`}
                    placeholder="Enter your password (min 6 characters)"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                  />
                  {passwordErrorText && (
                    <div className="signup-page__field-error">
                      {passwordErrorText}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label
                    htmlFor="confirmPassword"
                    className="signup-page__label"
                  >
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className={`signup-page__input ${
                      confirmPasswordErrorText
                        ? "signup-page__input--error"
                        : ""
                    }`}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onBlur={() =>
                      setTouched((t) => ({ ...t, confirmPassword: true }))
                    }
                  />
                  {confirmPasswordErrorText && (
                    <div className="signup-page__field-error">
                      {confirmPasswordErrorText}
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
                      onBlur={() =>
                        setTouched((t) => ({ ...t, agreeToTerms: true }))
                      }
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
                  {agreeErrorText && (
                    <div className="signup-page__field-error">
                      {agreeErrorText}
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
    </>
  );
}
