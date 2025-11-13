import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthController, UserController } from 'controllers';
import { usePageHeading } from 'hooks';
import { PageContentContainer, PageSectionContainer } from 'framework';
import { DashboardCard, UserSubscriptionTierBadge } from 'components';
import { ICONS } from 'icons';
import { useLoaderDataFor } from 'routes';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useLoaderDataFor(dashboardLoader);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const availableCards = [
    {
      key: 'PROFILE_SETTINGS',
      title: 'My Profile',
      description: 'Manage your profile settings',
      action: () => navigate({ pathname: '/profile' }),
      icon: ICONS.user
    },
    {
      key: 'ACCOUNT_SETTINGS',
      title: 'Account Settings',
      description: 'Manage your account preferences',
      action: () => navigate({ pathname: '/account' }),
      icon: ICONS.userGear
    }
  ];

  usePageHeading('My Dashboard');

  return (
    <PageContentContainer spacing="medium">
      <PageSectionContainer className="welcome-section">
        <p className="welcome-section__email-address">{user.email}</p>
        <UserSubscriptionTierBadge tier={user.subscriptionTier} />
      </PageSectionContainer>

      <PageSectionContainer heading="Available Features">
        <div className="dashboard-page__features">
          {availableCards.map(c => (
            <DashboardCard key={c.key} description={c.description} onClick={c.action} icon={c.icon}>
              <h3>{c.title}</h3>
            </DashboardCard>
          ))}
        </div>
      </PageSectionContainer>

      <PageSectionContainer>
        <div className="dashboard-page__actions">
          <button className="dashboard-page__sign-out-button" disabled={isSigningOut} onClick={onSignOut}>
            {isSigningOut && <span className="dashboard-page__loading-spinner" />}
            {isSigningOut ? 'Signing Out...' : 'Sign Out'}
          </button>
        </div>
      </PageSectionContainer>
    </PageContentContainer>
  );

  async function onSignOut() {
    if (isSigningOut) return;
    setIsSigningOut(true);
    try {
      await AuthController.signOut();
      navigate('/login?loggedOut=1');
    } catch {
      navigate('/');
    } finally {
      setIsSigningOut(false);
    }
  }
}

export async function dashboardLoader() {
  return await UserController.getCurrentUserProfile().then(user => ({ user }));
}
