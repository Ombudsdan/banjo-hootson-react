import { PageSectionContainer, PageContentContainer, FormSectionHeader } from 'framework';
import { UserSubscriptionTierBadge } from 'components';
import { useDialog, useHeading, usePageAlerts } from 'hooks';
import { DialogConfirm } from 'enums';
import { UserController } from 'controllers';
import { useNavigate } from 'react-router-dom';
import PageAlert from 'builders/page-alert.builder';

export default function AccountPage() {
  useHeading({ heading: 'Account' });
  const navigate = useNavigate();
  const { openDialog, closeDialog } = useDialog();
  const { addAlert } = usePageAlerts();

  return (
    <PageContentContainer spacing="medium">
      <PageSectionContainer>
        <FormSectionHeader title="My Subscription" />
        <div className="subscription-section">
          <div className="subscription-section__row">
            <label className="subscription-section__label">Current Subscription</label>
            <UserSubscriptionTierBadge />
          </div>
        </div>
      </PageSectionContainer>

      <PageSectionContainer>
        <FormSectionHeader title="Delete Account" />
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
                onDialogConfirm
              });
            }}>
            Delete Account
          </button>
        </div>
      </PageSectionContainer>
    </PageContentContainer>
  );

  function onDialogConfirm() {
    UserController.delete()
      .catch(() => {
        closeDialog();
        addAlert(PageAlert.info('Failed to delete account. Please try again.', 'delete-account-failed'));
      })
      .then(() => navigate('/login?deleted=1'));
  }
}
