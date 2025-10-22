import { FC, useContext } from "react";
import { AlertCard } from "components";
import { AlertCardVariant } from "model/page-validation-alert";
import { PageValidationAlertContext } from ".";

const PageValidationAlertOutlet: FC = () => {
  const context = useContext(PageValidationAlertContext);
  if (!context) {
    throw new Error(
      "ValidationAlertOutlet must be used within ValidationAlertProvider"
    );
  }

  const { alert } = context;

  if (!alert || !alert.messages?.length) {
    return null;
  }

  const props = {
    cardId: "global-validation-alert",
    variant: AlertCardVariant.ERROR,
    ...alert,
  };

  return (
    <div className="page-validation-alert">
      <AlertCard {...props} />
    </div>
  );
};

export default PageValidationAlertOutlet;
