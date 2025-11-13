import { UnitTestUtils } from 'test';
import { screen } from '@testing-library/react';
import { ClickableActionPanel } from 'components';
import { ClickableActionPanelOption, ClickableActionPanelTheme } from 'enums';

describe('ClickableActionPanel', () => {
  it('renders internal link as a router Link with theme class', () => {
    new UnitTestUtils(<ClickableActionPanel option={ClickableActionPanelOption.CALENDAR} />);
    const link = screen.getByRole('link', { name: 'Birthday Calendar' });

    expect(link).toHaveAttribute('href', '/calendar');
    expect(link).toHaveClass('clickable-action-panel');
    expect(link).toHaveClass(`clickable-action-panel--${ClickableActionPanelTheme.DEFAULT}`);
  });

  it('renders external link with target and rel attributes', () => {
    new UnitTestUtils(<ClickableActionPanel option={ClickableActionPanelOption.INSTAGRAM} />);
    const link = screen.getByRole('link', { name: 'Instagram' });

    expect(link).toHaveAttribute('href', 'https://instagram.com/banjohootson');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });

  it('should return theme class ClickableActionPanelTheme.DEFAULT if option is CALENDAR', () => {
    new UnitTestUtils(<ClickableActionPanel option={ClickableActionPanelOption.CALENDAR} />);
    const link = screen.getByRole('link', { name: 'Birthday Calendar' });

    expect(link).toHaveClass('clickable-action-panel');
    expect(link).toHaveClass(`clickable-action-panel--${ClickableActionPanelTheme.DEFAULT}`);
  });

  it('should return theme class ClickableActionPanelTheme.DEFAULT if option is SUBMIT_BIRTHDAY', () => {
    new UnitTestUtils(<ClickableActionPanel option={ClickableActionPanelOption.SUBMIT_BIRTHDAY} />);
    const link = screen.getByRole('link', { name: 'Submit Birthday' });

    expect(link).toHaveClass('clickable-action-panel');
    expect(link).toHaveClass(`clickable-action-panel--${ClickableActionPanelTheme.DEFAULT}`);
  });

  it('should return theme class ClickableActionPanelTheme.DEFAULT if option is BEER', () => {
    new UnitTestUtils(<ClickableActionPanel option={ClickableActionPanelOption.BEER} />);
    const link = screen.getByRole('link', { name: 'Buy Me A Beer?' });

    expect(link).toHaveClass('clickable-action-panel');
    expect(link).toHaveClass(`clickable-action-panel--${ClickableActionPanelTheme.DEFAULT}`);
  });

  it('should return theme class ClickableActionPanelTheme.FACEBOOK if option is FACEBOOK', () => {
    new UnitTestUtils(<ClickableActionPanel option={ClickableActionPanelOption.FACEBOOK} />);
    const link = screen.getByRole('link', { name: 'Facebook' });

    expect(link).toHaveClass('clickable-action-panel');
    expect(link).toHaveClass(`clickable-action-panel--${ClickableActionPanelTheme.FACEBOOK}`);
  });

  it('should return theme class ClickableActionPanelTheme.INSTAGRAM if option is INSTAGRAM', () => {
    new UnitTestUtils(<ClickableActionPanel option={ClickableActionPanelOption.INSTAGRAM} />);
    const link = screen.getByRole('link', { name: 'Instagram' });

    expect(link).toHaveClass('clickable-action-panel');
    expect(link).toHaveClass(`clickable-action-panel--${ClickableActionPanelTheme.INSTAGRAM}`);
  });

  it('should return theme class ClickableActionPanelTheme.THREADS if option is THREADS', () => {
    new UnitTestUtils(<ClickableActionPanel option={ClickableActionPanelOption.THREADS} />);
    const link = screen.getByRole('link', { name: 'Threads' });

    expect(link).toHaveClass('clickable-action-panel');
    expect(link).toHaveClass(`clickable-action-panel--${ClickableActionPanelTheme.THREADS}`);
  });
});
