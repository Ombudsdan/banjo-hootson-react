import { useContext } from 'react';
import { FormDialogContext } from 'hooks';

export default function useFormDialog() {
  const context = useContext(FormDialogContext);
  if (!context) {
    throw new Error('useFormDialog must be used within FormDialogProvider');
  }
  return context;
}
