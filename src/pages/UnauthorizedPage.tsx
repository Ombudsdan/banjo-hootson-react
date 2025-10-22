import { AlertCard } from "components";
import { PageContentContainer } from "framework";
import { usePageHeading } from "hooks";
import { AlertCardVariant } from "model/page-validation-alert";

export default function UnauthorizedPage() {
  usePageHeading("Access Denied");

  return (
    <PageContentContainer>
      <AlertCard
        heading="You are not authorized to view this page."
        variant={AlertCardVariant.ERROR}
      />
    </PageContentContainer>
  );
}
