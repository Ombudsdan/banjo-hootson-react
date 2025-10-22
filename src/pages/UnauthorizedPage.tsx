import AlertCard from "@/components/AlertCard";
import { PageWidthContainer } from "@/framework/PageWidthContainer";
import { FlexColumnLayout } from "@/framework/FlexColumnLayout";
import { PageHeadingContainer } from "@/framework/PageHeadingContainer";

export default function UnauthorizedPage() {
  return (
    <PageWidthContainer>
      <PageHeadingContainer heading="Access Denied" />
      <FlexColumnLayout>
        <AlertCard
          heading="You are not authorized to view this page."
          variant="error"
        />
      </FlexColumnLayout>
    </PageWidthContainer>
  );
}
