import { screen } from '@testing-library/react';
import { ClickableActionPanelGroup } from 'components';
import { ClickableActionPanelGroupOption } from 'enums';
import { UnitTestUtils } from 'test';

vi.mock('controllers', () => ({
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
    new UnitTestUtils(<ClickableActionPanelGroup group={ClickableActionPanelGroupOption.SOCIAL_LINKS} />);
    expect(screen.getAllByRole('link')).toHaveLength(3);
  });
});
