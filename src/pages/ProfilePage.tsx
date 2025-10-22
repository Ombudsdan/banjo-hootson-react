import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { PageContentContainer } from 'framework';
import { PageNavigation, IPageNavigationTab } from 'components';
import { usePageHeading } from 'hooks';

import ProfileTabSection from './profile/ProfileTabSection';
import AccountTabSection from './profile/AccountTabSection';
import PreferencesTabSection from './profile/PreferencesTabSection';

export default function ProfilePage() {
  const { search } = useLocation();
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const activeTab = params.get('tab') || 'PROFILE';

  const tabs: IPageNavigationTab[] = [
    { key: 'PROFILE', title: 'Profile' },
    { key: 'ACCOUNT', title: 'Account' },
    { key: 'PREFERENCES', title: 'Preferences' }
  ];

  usePageHeading('Account Settings');

  return (
    <PageContentContainer spacing="small">
      <PageNavigation tabs={tabs} activeKey={activeTab} onSelect={() => {}} />
      {activeTab === 'PROFILE' && <ProfileTabSection />}
      {activeTab === 'ACCOUNT' && <AccountTabSection />}
      {activeTab === 'PREFERENCES' && <PreferencesTabSection />}
    </PageContentContainer>
  );
}
