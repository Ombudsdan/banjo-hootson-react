import { screen } from '@testing-library/react';
import { Gallery } from 'components';
import { renderWithProviders } from 'test';

describe('Gallery', () => {
  it('renders a grid of images with correct alt text', () => {
    renderWithProviders(
      <Gallery
        items={[
          { fileName: 'plushie-1', alt: 'Plushie one' },
          { fileName: 'plushie-2', alt: 'Plushie two' }
        ]}
      />
    );

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('alt', 'Plushie one');
    expect(images[1]).toHaveAttribute('alt', 'Plushie two');
  });
});
