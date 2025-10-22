import { screen } from '@testing-library/react';
import { GoogleCalendarIFrame } from 'components';
import { renderWithProviders } from 'test';

describe('GoogleCalendarIFrame', () => {
  it('renders iframe with title and source', () => {
    renderWithProviders(<GoogleCalendarIFrame title="My Cal" source="https://example.com/cal" />);
    const iframe = screen.getByTitle('My Cal') as HTMLIFrameElement;
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', 'https://example.com/cal');
  });

  it('coerces width/height defaults and numeric values to strings', () => {
    renderWithProviders(<GoogleCalendarIFrame title="Size" source="/" width={320} height={480} />);
    const iframe = screen.getByTitle('Size');
    expect(iframe).toHaveAttribute('width', '320');
    expect(iframe).toHaveAttribute('height', '480');

    renderWithProviders(<GoogleCalendarIFrame title="Defaults" source="/" />);
    const def = screen.getByTitle('Defaults');
    expect(def).toHaveAttribute('width', '100%');
    expect(def).toHaveAttribute('height', '600');
  });
});
