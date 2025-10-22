import { renderWithProviders } from 'test';
import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import { ClickableActionPanel } from 'components';

vi.mock('controllers', () => ({
  ClickableActionPanelController: {
    getPanelContent: (opt: string) =>
      opt === 'EXTERNAL'
        ? { icon: undefined, text: 'External', link: 'https://example.com', isExternal: true, theme: 'primary' }
        : { icon: undefined, text: 'Internal', link: '/profile', isExternal: false, theme: 'secondary' }
  }
}));

describe('ClickableActionPanel', () => {
  it('renders internal link as a router Link with theme class', () => {
    renderWithProviders(<ClickableActionPanel option={'INTERNAL' as any} />);
    const link = screen.getByRole('link', { name: 'Internal' }) as HTMLAnchorElement;
    expect(link).toHaveAttribute('href', '/profile');
    expect(link).toHaveClass('clickable-action-panel');
    expect(link).toHaveClass('clickable-action-panel--secondary');
  });

  it('renders external link with target and rel attributes', () => {
    renderWithProviders(<ClickableActionPanel option={'EXTERNAL' as any} />);
    const link = screen.getByRole('link', { name: 'External' });
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });
});
