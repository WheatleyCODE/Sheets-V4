import { screen } from '@testing-library/react';
import { Logo } from './Logo';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('Logo', () => {
  test('In the document', () => {
    renderComponent(<Logo />);

    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByText('SHEETS V4')).toBeInTheDocument();
  });
});
