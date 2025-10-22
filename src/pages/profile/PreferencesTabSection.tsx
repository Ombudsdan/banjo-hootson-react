import { FlexColumnLayout } from "@/framework/FlexColumnLayout";
import { PageSectionContainer } from "@/framework/PageSectionContainer";
import FormSectionHeader from "@/components/FormSectionHeader";
import FormActionsContainer from "@/components/FormActionsContainer";

export default function PreferencesTabSection() {
  return (
    <form>
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
              <input type="checkbox" />
              <span>Enable email notifications</span>
            </label>
          </div>
        </PageSectionContainer>

        <FormActionsContainer>
          <button type="submit" className="form__button form__button--primary">
            Save Profile
          </button>
        </FormActionsContainer>
      </FlexColumnLayout>
    </form>
  );
}
