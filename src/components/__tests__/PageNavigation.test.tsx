import { screen } from '@testing-library/react';
import { IPageNavigationTab, PageNavigation } from 'components';
import { renderWithProviders } from 'test';

const tabs: IPageNavigationTab[] = [
  { key: 'PROFILE', title: 'Profile' },
  { key: 'ACCOUNT', title: 'Account' },
  { key: 'BILLING', title: 'Billing', isDisabled: true }
];

describe('PageNavigation', () => {
  it('highlights active tab and disables disabled tabs', () => {
    renderWithProviders(<PageNavigation tabs={tabs} activeKey="ACCOUNT" />);

    const profileBtn = screen.getByRole('button', { name: 'Profile' });
    const accountBtn = screen.getByRole('button', { name: 'Account' });
    const billingBtn = screen.getByRole('button', { name: 'Billing' });

    expect(accountBtn).toHaveAttribute('aria-current', 'page');
    expect(billingBtn).toBeDisabled();
    expect(profileBtn).not.toBeDisabled();
  });

  it('invokes onSelect with clicked tab', () => {
    const onSelect = vi.fn();
    renderWithProviders(<PageNavigation tabs={tabs} onSelect={onSelect} />);

    screen.getByRole('button', { name: 'Account' }).click();

    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ key: 'ACCOUNT', title: 'Account' }));
  });
});
