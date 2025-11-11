import { FormEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SummaryList, FormSectionHeader, FormValidationErrors } from 'framework';
import { FormSubmitContext, useDialog, useFormDialog, useFormField } from 'hooks';
import { ICONS } from 'icons';
import { IPlushieInstagramAccount } from 'model/user.model';
import { excludeMatchingIndex } from 'utils';
import { DialogConfirm } from 'enums';
import { PlushieInstagramAccountFormInput } from 'components';
import { PlushieInstagramAccountListValidator } from 'validators';

/**
 * Composite control to manage a list of plushie Instagram accounts.
 * Provides add/edit/remove via dialogs and updates the bound array value.
 */
export default function PlushieInstagramAccountsSelector({
  id,
  initialValue,
  isRequired
}: IPlushieInstagramAccountsSelector) {
  const { value, setValue, showErrors, validation } = useFormField({
    id,
    initialValue,
    validator: PlushieInstagramAccountListValidator,
    isRequired
  });
  const { openDialog } = useDialog();
  const { openFormDialog, closeFormDialog } = useFormDialog();

  return (
    <div className="form-field">
      <div id={id}></div>
      <FormSectionHeader title="Plushie Instagram Accounts" isRequired={isRequired}>
        <button className="icon-button" type="button" onClick={() => openAddDialog()}>
          <FontAwesomeIcon icon={ICONS.plus} />
          Add Account
        </button>
      </FormSectionHeader>
      {value.length > 0 && (
        <SummaryList.Container>
          {value.map((acc, i) => (
            <SummaryList.Row key={i}>
              <SummaryList.Key>{acc.username}</SummaryList.Key>
              <SummaryList.Actions>
                <button
                  type="button"
                  className="icon-button"
                  aria-label="Edit account"
                  onClick={() => openEditDialog(i)}>
                  <FontAwesomeIcon icon={ICONS.edit} />
                </button>
                <button
                  type="button"
                  className="icon-button"
                  aria-label="Remove account"
                  onClick={() => openRemoveDialog(i)}>
                  <FontAwesomeIcon icon={ICONS.trash} />
                </button>
              </SummaryList.Actions>
            </SummaryList.Row>
          ))}
        </SummaryList.Container>
      )}
      <FormValidationErrors showErrors={showErrors} validation={validation} />
    </div>
  );

  function openAddDialog() {
    const id = 'plushie-instagram-account-new';
    openFormDialog({
      title: 'Add Plushie Instagram Account',
      onFormDialogConfirm: (_e: FormEvent<HTMLFormElement>, form: FormSubmitContext) => onSubmit(id, form),
      onFormDialogConfirmFailure: () => {},
      children: <PlushieInstagramDialog id={id} initialValue={''} existingAccounts={value} />
    });
  }

  function openEditDialog(accountIndex: number) {
    const id = `plushie-instagram-account-${accountIndex}`;
    openFormDialog({
      title: 'Edit Plushie Instagram Account',
      onFormDialogConfirm: (_e: FormEvent<HTMLFormElement>, form: FormSubmitContext) =>
        onSubmit(id, form, accountIndex),
      onFormDialogConfirmFailure: () => {},
      children: <PlushieInstagramDialog id={id} initialValue={value[accountIndex!].username} existingAccounts={value} />
    });
  }

  function openRemoveDialog(accountIndex: number) {
    openDialog({
      title: 'Remove Plushie Instagram Account',
      message: 'Are you sure you want to remove this plushie Instagram account?',
      confirmType: DialogConfirm.DANGER,
      confirmText: 'Remove',
      cancelText: 'Cancel',
      onDialogConfirm: () => removeAccount(accountIndex)
    });
  }

  function onSubmit(id: string, form: FormSubmitContext, accountIndex?: number) {
    const fields = form.getFormFields();
    setValue([...excludeMatchingIndex(value, accountIndex), { username: fields[id] as string, isPublic: true }]);
    closeFormDialog();
  }

  function removeAccount(accountIndex: number) {
    const accounts = excludeMatchingIndex(value, accountIndex);
    setValue(accounts);
    closeFormDialog();
  }
}

function PlushieInstagramDialog({ id, initialValue = '', existingAccounts }: IPlushieInstagramDialog) {
  // Let the Username input own registration/validation; we just pass id+initialValue.
  // If duplicate checking across accounts is required, we’ll validate at the list level on save.
  return (
    <PlushieInstagramAccountFormInput
      id={id}
      initialValue={initialValue}
      label="Plushie Instagram Account"
      existingAccounts={existingAccounts}
    />
  );
}

/** Props for {@link PlushieInstagramAccountsSelector}. */
interface IPlushieInstagramAccountsSelector {
  id: string;
  initialValue: IPlushieInstagramAccount[];
  isRequired?: boolean;
}

/** Props for {@link PlushieInstagramDialog}. */
interface IPlushieInstagramDialog {
  id: string;
  initialValue?: string;
  existingAccounts: IPlushieInstagramAccount[];
}
