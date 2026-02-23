import { screen } from '@testing-library/react';
import { ClickableActionPanelGroup } from 'components';
import { ClickableActionPanelContent, ClickableActionPanelLink } from 'src/consts/ClickableActionPanel';
import { UnitTestUtils } from 'test';

describe('ClickableActionPanelGroup', () => {
  it.each(Object.entries(ClickableActionPanelLink))('renders panels for each option provided: %s', (key, value) => {
    new UnitTestUtils(<ClickableActionPanelGroup options={[value]} />);

    const content = ClickableActionPanelContent[value];
    expect(screen.getByText(content.text)).toBeInTheDocument();
  });
});
