import { FC, useContext } from 'react';
import { AlertCard } from 'components';
import { PageValidationAlertContext } from 'hooks';
import { AlertCardVariant } from 'enums';

const PageValidationAlertOutlet: FC = () => {
  const context = useContext(PageValidationAlertContext);

  if (!context) {
    throw new Error('ValidationAlertOutlet must be used within ValidationAlertProvider');
  }

  if (!context.validationErrors) return null;

  const { validationErrors } = context;

  const validationErrorMap = Object.entries(validationErrors).flatMap(([id, messages]) =>
    messages.map(message => ({ id, message }))
  );

  return (
    <div className="page-validation-alert">
      <AlertCard
        heading="Please fix the errors below and try again."
        id="global-validation-alert"
        variant={AlertCardVariant.ERROR}
      >
        <ul className="page-validation-alert__list">
          {validationErrorMap.map(({ id, message }) => (
            <PageValidationAlertMessage key={message} message={message} inputId={id} />
          ))}
        </ul>
      </AlertCard>
    </div>
  );
};

export default PageValidationAlertOutlet;

const PageValidationAlertMessage: FC<{ message: string; inputId: string }> = ({ message, inputId }) => {
  function handleValidationClick(id: string) {
    const el = document.getElementById(id);

    if (!el) return;

    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.focus();
  }

  return (
    <li key={`page-validation-${inputId}`} className="page-validation-alert__list-item">
      <button className="page-validation-alert__validation-message" onClick={() => handleValidationClick(inputId)}>
        {message}
      </button>
    </li>
  );
};
