import { useState } from "react";
import { FlexColumnLayout } from "@/framework/FlexColumnLayout";
import { PageSectionContainer } from "@/framework/PageSectionContainer";
import FormSectionHeader from "@/components/FormSectionHeader";
import FormActionsContainer from "@/components/FormActionsContainer";

export default function PreferencesTabSection() {
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [touched, setTouched] = useState<{ emailNotifications: boolean }>({
    emailNotifications: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const showErrors = (field: keyof typeof touched) =>
    touched[field] || submitted;
  // Placeholder: no complex validation yet, but structure mirrors other forms
  const emailNotificationsErrorText = showErrors("emailNotifications")
    ? ""
    : "";

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTouched({ emailNotifications: true });
    // If future validations added, would block here.
  };

  return (
    <form onSubmit={onSubmit}>
      <FlexColumnLayout spacing="medium">
        {/* Alerts placeholder */}
        {/* <ProfilePageAlert errorMessages={[]} successMessage={null} /> */}

        {/* If no preferences */}
        {/*
        <PageSectionContainer>
          <p>You have no preferences to set.</p>
        </PageSectionContainer>
        */}

        {/* Notification Preferences */}
        <PageSectionContainer>
          <FormSectionHeader title="Notification Preferences" />
          <div className="form-group">
            <label className="form-group__checkbox-label">
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                onBlur={() =>
                  setTouched((t) => ({ ...t, emailNotifications: true }))
                }
              />
              <span>Enable email notifications</span>
            </label>
            {emailNotificationsErrorText && (
              <div className="form-group__error-message">
                {emailNotificationsErrorText}
              </div>
            )}
          </div>
        </PageSectionContainer>

        <FormActionsContainer>
          <button type="submit" className="form__button form__button--primary">
            Save Preferences
          </button>
        </FormActionsContainer>
      </FlexColumnLayout>
    </form>
  );
}
