import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IBaseInstagramInput, InstagramInputGroup } from 'components';
import { UnitTestUtils } from 'test';
import { BaseValidator } from 'validators';

class NoopValidator extends BaseValidator {
  static validate() {
    return NoopValidator.executeValidation('', {});
  }
}

describe('InstagramInputGroup (re-export)', () => {
  it('renders input with prefix and strips leading @', async () => {
    const props: IBaseInstagramInput = { id: 'ig', initialValue: '', placeholder: 'handle' };
    new UnitTestUtils((<InstagramInputGroup {...props} validator={NoopValidator} />), { withForm: true });

    const input = screen.getByPlaceholderText('handle') as HTMLInputElement;
    await userEvent.type(input, '@@@abc');
    expect(input.value).toBe('abc');
  });
});
