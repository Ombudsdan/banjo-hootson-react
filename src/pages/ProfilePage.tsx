import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { PageWidthContainer } from "@/framework/PageWidthContainer";
import { PageHeadingContainer } from "@/framework/PageHeadingContainer";
import { FlexColumnLayout } from "@/framework/FlexColumnLayout";
import PageNavigation, { INavigationTab } from "@/components/PageNavigation";
import ProfileTabSection from "./profile/ProfileTabSection";
import AccountTabSection from "./profile/AccountTabSection";
import PreferencesTabSection from "./profile/PreferencesTabSection";

export default function ProfilePage() {
  const { search } = useLocation();
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const activeTab = params.get("tab") || "PROFILE";

  const tabs: INavigationTab[] = [
    { key: "PROFILE", title: "Profile" },
    { key: "ACCOUNT", title: "Account" },
    { key: "PREFERENCES", title: "Preferences" },
  ];

  return (
    <PageWidthContainer>
      <PageHeadingContainer heading="Account Settings" />
      <FlexColumnLayout spacing="small">
        <PageNavigation tabs={tabs} activeKey={activeTab} onSelect={() => {}} />
        {activeTab === "PROFILE" && <ProfileTabSection />}
        {activeTab === "ACCOUNT" && <AccountTabSection />}
        {activeTab === "PREFERENCES" && <PreferencesTabSection />}
      </FlexColumnLayout>
    </PageWidthContainer>
  );
}
