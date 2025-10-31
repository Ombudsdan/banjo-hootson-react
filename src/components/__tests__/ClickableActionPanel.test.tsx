import { UnitTestUtils } from 'test';
import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import { ClickableActionPanel } from 'components';
import { ClickableActionPanelOption, ClickableActionPanelOptionType, ClickableActionPanelTheme } from 'enums';
import { IClickableActionPanelConfig } from 'controllers';

const DEFAULT_INTERNAL_PANEL: IClickableActionPanelConfig = {
  icon: undefined,
  text: 'Internal',
  link: '/profile',
  isExternal: false,
  theme: ClickableActionPanelTheme.DEFAULT
};

const DEFAULT_EXTERNAL_PANEL: IClickableActionPanelConfig = {
  icon: undefined,
  text: 'External',
  link: 'https://example.com',
  isExternal: true,
  theme: ClickableActionPanelTheme.DEFAULT
};

const DEFAULT_PANEL_OPTION = ClickableActionPanelOption.CALENDAR;

vi.mock('controllers', () => ({
  ClickableActionPanelController: {
    getPanelContent: (opt: ClickableActionPanelOptionType) => {
      if (opt === ClickableActionPanelOption.CALENDAR)
        return { ...DEFAULT_INTERNAL_PANEL, theme: ClickableActionPanelTheme.DEFAULT };
      if (opt === ClickableActionPanelOption.SUBMIT_BIRTHDAY)
        return { ...DEFAULT_INTERNAL_PANEL, theme: ClickableActionPanelTheme.DEFAULT };
      if (opt === ClickableActionPanelOption.BEER)
        return { ...DEFAULT_EXTERNAL_PANEL, theme: ClickableActionPanelTheme.DEFAULT };
      if (opt === ClickableActionPanelOption.INSTAGRAM)
        return { ...DEFAULT_EXTERNAL_PANEL, theme: ClickableActionPanelTheme.INSTAGRAM };
      if (opt === ClickableActionPanelOption.FACEBOOK)
        return { ...DEFAULT_EXTERNAL_PANEL, theme: ClickableActionPanelTheme.FACEBOOK };
      if (opt === ClickableActionPanelOption.THREADS)
        return { ...DEFAULT_EXTERNAL_PANEL, theme: ClickableActionPanelTheme.THREADS };
      return DEFAULT_EXTERNAL_PANEL;
    }
  }
}));

describe('ClickableActionPanel', () => {
  it('renders internal link as a router Link with theme class', () => {
    new UnitTestUtils((<ClickableActionPanel option={ClickableActionPanelOption.CALENDAR} />));
    const link = screen.getByRole('link', { name: DEFAULT_INTERNAL_PANEL.text });

    expect(link).toHaveAttribute('href', DEFAULT_INTERNAL_PANEL.link);
    expect(link).toHaveClass('clickable-action-panel');
    expect(link).toHaveClass('clickable-action-panel--default');
  });

  it('renders external link with target and rel attributes', () => {
    new UnitTestUtils((<ClickableActionPanel option={ClickableActionPanelOption.INSTAGRAM} />));
    const link = screen.getByRole('link', { name: DEFAULT_EXTERNAL_PANEL.text });

    expect(link).toHaveAttribute('href', DEFAULT_EXTERNAL_PANEL.link);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });

  it('should return theme class ClickableActionPanelTheme.DEFAULT if option is CALENDAR', () => {
    new UnitTestUtils((<ClickableActionPanel option={ClickableActionPanelOption.CALENDAR} />));
    const link = screen.getByRole('link', { name: DEFAULT_INTERNAL_PANEL.text });

    expect(link).toHaveClass('clickable-action-panel');
    expect(link).toHaveClass('clickable-action-panel--default');
  });

  it('should return theme class ClickableActionPanelTheme.DEFAULT if option is SUBMIT_BIRTHDAY', () => {
    new UnitTestUtils((<ClickableActionPanel option={ClickableActionPanelOption.SUBMIT_BIRTHDAY} />));
    const link = screen.getByRole('link', { name: DEFAULT_INTERNAL_PANEL.text });

    expect(link).toHaveClass('clickable-action-panel');
    expect(link).toHaveClass('clickable-action-panel--default');
  });

  it('should return theme class ClickableActionPanelTheme.DEFAULT if option is BEER', () => {
    new UnitTestUtils((<ClickableActionPanel option={ClickableActionPanelOption.BEER} />));
    const link = screen.getByRole('link', { name: DEFAULT_EXTERNAL_PANEL.text });

    expect(link).toHaveClass('clickable-action-panel');
    expect(link).toHaveClass('clickable-action-panel--default');
  });

  it('should return theme class ClickableActionPanelTheme.FACEBOOK if option is FACEBOOK', () => {
    new UnitTestUtils((<ClickableActionPanel option={ClickableActionPanelOption.FACEBOOK} />));
    const link = screen.getByRole('link', { name: DEFAULT_EXTERNAL_PANEL.text });

    expect(link).toHaveClass('clickable-action-panel');
    expect(link).toHaveClass('clickable-action-panel--facebook');
  });

  it('should return theme class ClickableActionPanelTheme.INSTAGRAM if option is INSTAGRAM', () => {
    new UnitTestUtils((<ClickableActionPanel option={ClickableActionPanelOption.INSTAGRAM} />));
    const link = screen.getByRole('link', { name: DEFAULT_EXTERNAL_PANEL.text });

    expect(link).toHaveClass('clickable-action-panel');
    expect(link).toHaveClass('clickable-action-panel--instagram');
  });

  it('should return theme class ClickableActionPanelTheme.THREADS if option is THREADS', () => {
    new UnitTestUtils((<ClickableActionPanel option={ClickableActionPanelOption.THREADS} />));
    const link = screen.getByRole('link', { name: DEFAULT_EXTERNAL_PANEL.text });

    expect(link).toHaveClass('clickable-action-panel');
    expect(link).toHaveClass('clickable-action-panel--threads');
  });
});
