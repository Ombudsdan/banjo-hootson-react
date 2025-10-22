import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserController } from "@/controllers/user.controller";
import { AuthController } from "@/controllers/auth.controller";
import type { IUserProfile } from "model/user-profile.types";
import { PageWidthContainer } from "@/framework/PageWidthContainer";
import { PageHeadingContainer } from "@/framework/PageHeadingContainer";
import { PageSectionContainer } from "@/framework/PageSectionContainer";
import { FlexColumnLayout } from "@/framework/FlexColumnLayout";
import DashboardCard from "@/components/DashboardCard";
import UserSubscriptionTierBadge from "@/components/UserSubscriptionTierBadge";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<IUserProfile | null>(null);
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    UserController.me().then((u) => setUserProfile(u));
  }, []);

  const onSignOut = async () => {
    if (isSigningOut) return;
    setIsSigningOut(true);
    try {
      await AuthController.signOut();
      navigate("/login?loggedOut=1");
    } catch {
      navigate("/");
    } finally {
      setIsSigningOut(false);
    }
  };

  const availableCards = [
    {
      key: "BIRTHDAY_CALENDAR",
      title: "Birthday Calendar",
      description: "View and manage plushie birthdays",
      action: () => navigate("/calendar"),
    },
    {
      key: "PROFILE_SETTINGS",
      title: "My Profile",
      description: "Manage your profile settings",
      action: () => navigate({ pathname: "/profile", search: "?tab=PROFILE" }),
    },
    {
      key: "ACCOUNT_SETTINGS",
      title: "Account Settings",
      description: "Manage your account preferences",
      action: () => navigate({ pathname: "/profile", search: "?tab=ACCOUNT" }),
    },
    {
      key: "PREFERENCES",
      title: "Preferences",
      description: "Manage your user preferences",
      action: () =>
        navigate({ pathname: "/profile", search: "?tab=PREFERENCES" }),
    },
  ];

  return (
    <>
      <PageHeadingContainer heading="My Account" />
      <PageWidthContainer>
        <FlexColumnLayout spacing="medium">
          {userProfile ? (
            <>
              <PageSectionContainer className="welcome-section">
                <p className="welcome-section__email-address">
                  {userProfile.email}
                </p>
                <UserSubscriptionTierBadge
                  tier={userProfile.subscriptionTier}
                />
              </PageSectionContainer>

              <PageSectionContainer heading="Available Features">
                <div className="dashboard-page__features">
                  {availableCards.map((c) => (
                    <DashboardCard
                      key={c.key}
                      description={c.description}
                      onClick={c.action}
                    >
                      <h3>{c.title}</h3>
                    </DashboardCard>
                  ))}
                </div>
              </PageSectionContainer>

              <PageSectionContainer>
                <div className="dashboard-page__actions">
                  <button
                    className="dashboard-page__sign-out-button"
                    disabled={isSigningOut}
                    onClick={onSignOut}
                  >
                    {isSigningOut && (
                      <span className="dashboard-page__loading-spinner" />
                    )}
                    {isSigningOut ? "Signing Out..." : "Sign Out"}
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
        </FlexColumnLayout>
      </PageWidthContainer>
    </>
  );
}
