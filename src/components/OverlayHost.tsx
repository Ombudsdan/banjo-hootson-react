import { useEffect, useState } from "react";
import { Dialog } from "components";
import { DialogService, IActiveDialog } from "services";

export default function OverlayHost() {
  const [dialog, setDialog] = useState<IActiveDialog | null>(
    DialogService.getActive()
  );

  useEffect(() => {
    const unsubscribe = DialogService.subscribe(setDialog);
    return () => unsubscribe();
  }, []);

  if (!dialog) return null;

  const onBackdropClick = () => {
    if (dialog.disableBackdropClose) return;
    DialogService.cancel();
  };

  return (
    <div onClick={onBackdropClick}>
      <Dialog
        title={dialog.title}
        message={dialog.message}
        confirmText={dialog.confirmText}
        cancelText={dialog.cancelText}
        confirmType={dialog.confirmType}
        onConfirm={() => DialogService.confirm()}
        onClose={() => DialogService.cancel()}
      />
    </div>
  );
}
