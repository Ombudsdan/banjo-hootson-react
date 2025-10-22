import { AlertCard } from 'framework';
import { AlertCardVariant } from 'enums';
import { PageContentContainer } from 'framework';
import { usePageHeading } from 'hooks';

export default function UnauthorizedPage() {
  usePageHeading('Access Denied');

  return (
    <PageContentContainer>
      <AlertCard
        id="error-unauthorized"
        heading="You are not authorized to view this page."
        variant={AlertCardVariant.ERROR}
      />
    </PageContentContainer>
  );
}
