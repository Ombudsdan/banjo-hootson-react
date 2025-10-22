import { PageSectionContainer, PageContentContainer } from 'framework';
import { Form, UserSubscriptionTierBadge } from 'components';
import { useDialog } from 'hooks';
import { DialogConfirm } from 'enums';

export default function AccountTabSection() {
  const { openDialog } = useDialog();
  return (
    <div className="page-narrow">
      <PageContentContainer spacing="medium">
        <PageSectionContainer>
          <Form.SectionHeader title="My Subscription" />
          <div className="subscription-section">
            <div className="subscription-section__row">
              <label className="subscription-section__label">Current Subscription</label>
              <UserSubscriptionTierBadge />
            </div>
          </div>
        </PageSectionContainer>

        <PageSectionContainer>
          <Form.SectionHeader title="Delete Account" />
          <div className="delete-section">
            <p className="delete-section__text">Permanently delete your account and all associated data.</p>
            <button
              type="button"
              className="button button--secondary--outline delete-section__button"
              onClick={() => {
                openDialog({
                  title: 'Delete Account',
                  message: 'Are you sure you want to permanently delete your account and all associated data?',
                  confirmType: DialogConfirm.DANGER,
                  confirmText: 'Delete',
                  cancelText: 'Cancel',
                  onDialogConfirm: () => {
                    // Integrate delete call when backend action is available
                  }
                });
              }}
            >
              Delete Account
            </button>
          </div>
        </PageSectionContainer>
      </PageContentContainer>
    </div>
  );
}
