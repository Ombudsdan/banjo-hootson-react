import AlertCard from "@/components/AlertCard";
import { PageWidthContainer } from "@/framework/PageWidthContainer";
import { FlexColumnLayout } from "@/framework/FlexColumnLayout";
import { usePageHeading } from "@/hooks/usePageHeading";

export default function UnauthorizedPage() {
  usePageHeading("Access Denied");

  return (
    <PageWidthContainer>
      <FlexColumnLayout>
        <AlertCard
          heading="You are not authorized to view this page."
          variant="error"
        />
      </FlexColumnLayout>
    </PageWidthContainer>
  );
}
