import { useMemo } from 'react';
import { BaseValidator, IValidation } from 'validators';

/**
 * Generic field validation hook for any value, validator, and error message resolver.
 */
export default function useInputValidation(
  value: any,
  validator: typeof BaseValidator,
  args?: Record<string, any>
): IValidation {
  const isRequired = !!(args && (args as any).required);
  const isEmpty = useMemo(() => {
    if (value === '' || value === null || value === undefined) return true;
    if (Array.isArray(value)) return value.length === 0;
    return false;
  }, [value]);

  const errors = useMemo<IValidation['errors']>(() => {
    if (!isRequired && isEmpty) return null;
    return validator.validate(value, args);
  }, [value, args, validator, isEmpty, isRequired]);

  const errorMessages = useMemo<IValidation['errorMessages']>(() => {
    if (!isRequired && isEmpty) return [];
    return validator.getErrorMessages(errors);
  }, [errors, validator, isEmpty, isRequired]);

  return { errors, errorMessages };
}
