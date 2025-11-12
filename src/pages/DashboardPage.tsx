import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthController, UserController } from 'controllers';
import { useLoadingScreen, usePageHeading } from 'hooks';
import { PageContentContainer, PageSectionContainer } from 'framework';
import { DashboardCard, UserSubscriptionTierBadge } from 'components';
import { ICONS } from 'icons';
import { IUser } from 'model/user.model';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<IUser | null>(null);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { setLoadingScreen, dismissLoadingScreen } = useLoadingScreen();

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

  useEffect(() => {
    setLoadingScreen({ id: 'dashboard-loading', message: 'Loading your dashboard' });
    UserController.me()
      .then(u => setUserProfile(u))
      .finally(dismissLoadingScreen);
  }, []);

  usePageHeading('My Dashboard');

  return (
    <PageContentContainer spacing="medium">
      {userProfile ? (
        <>
          <PageSectionContainer className="welcome-section">
            <p className="welcome-section__email-address">{userProfile.email}</p>
            <UserSubscriptionTierBadge tier={userProfile.subscriptionTier} />
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
        </>
      ) : (
        <div className="dashboard-page__loading">
          <div className="dashboard-page__loading-spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      )}
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
