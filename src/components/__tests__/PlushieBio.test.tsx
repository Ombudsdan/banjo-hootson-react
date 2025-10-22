import { screen } from '@testing-library/react';
import { PlushieBio } from 'components';
import { renderWithProviders } from 'test';

const plushie = { fileName: 'plushie-1', name: 'Banjo', bio: 'A hoot.', birthday: '1 Jan' } as any;

describe('PlushieBio', () => {
  it('renders plushie details and alternates alignment by position', () => {
    const { rerender } = renderWithProviders(<PlushieBio plushie={plushie} position={0} />);

    const container = screen.getByText('Banjo').closest('.plushie-bio') as HTMLElement;
    expect(container).toHaveClass('plushie-bio--align-right');

    rerender(<PlushieBio plushie={plushie} position={1} />);
    const container2 = screen.getByText('Banjo').closest('.plushie-bio') as HTMLElement;
    expect(container2).toHaveClass('plushie-bio--align-left');

    expect(screen.getByRole('img', { name: 'Banjo' })).toBeInTheDocument();
    expect(screen.getByText('A hoot.')).toBeInTheDocument();
    expect(screen.getByText('1 Jan')).toBeInTheDocument();
  });
});
