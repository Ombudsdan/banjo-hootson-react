import { useContext } from 'react';
import { FormContext } from 'hooks';

export default function useForm() {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error('useForm must be used inside a FormProvider');
  return ctx;
}
