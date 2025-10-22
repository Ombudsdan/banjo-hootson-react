import { FlexColumnLayout } from "@/framework/FlexColumnLayout";
import { PageSectionContainer } from "@/framework/PageSectionContainer";
import UserSubscriptionTierBadge from "@/components/UserSubscriptionTierBadge";
import FormSectionHeader from "@/components/FormSectionHeader";
import { DialogService } from "@/services/dialog.service";

export default function AccountTabSection() {
  return (
    <div className="page-narrow">
      <FlexColumnLayout spacing="medium">
        {/* Alerts placeholder */}
        {/* <ProfilePageAlert errorMessages={[]} successMessage={null} /> */}

        <PageSectionContainer>
          <FormSectionHeader title="My Subscription" />
          <div className="subscription-section">
            <div className="subscription-section__row">
              <label className="subscription-section__label">
                Current Subscription
              </label>
              <UserSubscriptionTierBadge />
            </div>
          </div>
        </PageSectionContainer>

        <PageSectionContainer>
          <FormSectionHeader title="Delete Account" />
          <div className="delete-section">
            <p className="delete-section__text">
              Permanently delete your account and all associated data.
            </p>
            <button
              type="button"
              className="button button--secondary--outline delete-section__button"
              onClick={async () => {
                const confirmed = await DialogService.open({
                  title: "Delete Account",
                  message:
                    "Are you sure you want to permanently delete your account and all associated data?",
                  confirmType: "danger",
                  confirmText: "Delete",
                  cancelText: "Cancel",
                });
                if (confirmed) {
                  // Integrate delete call when backend action is available
                }
              }}
            >
              Delete Account
            </button>
          </div>
        </PageSectionContainer>
      </FlexColumnLayout>
    </div>
  );
}
