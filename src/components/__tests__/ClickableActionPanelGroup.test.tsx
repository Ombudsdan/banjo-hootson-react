import { screen } from '@testing-library/react';
import { ClickableActionPanelGroup } from 'components';
import { renderWithProviders } from 'test';

vi.mock('controllers', () => ({
  ClickableActionPanelGroupController: {
    getGroup: () => ['ONE', 'TWO']
  },
  ClickableActionPanelController: {
    getPanelContent: (opt: string) => ({
      icon: undefined,
      text: opt,
      link: `/${opt.toLowerCase()}`,
      isExternal: false,
      theme: 'primary'
    })
  }
}));

describe('ClickableActionPanelGroup', () => {
  it('renders panels for each option in the group', () => {
    renderWithProviders(<ClickableActionPanelGroup group={'ANY' as any} />);
    expect(screen.getAllByRole('link')).toHaveLength(2);
    expect(screen.getByRole('link', { name: 'ONE' })).toHaveAttribute('href', '/one');
    expect(screen.getByRole('link', { name: 'TWO' })).toHaveAttribute('href', '/two');
  });
});
