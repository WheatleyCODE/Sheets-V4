import { screen } from '@testing-library/react';
import LandingPage from './LandingPage';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('LandingPage', () => {
  test('In the document', () => {
    renderComponent(<LandingPage />);

    expect(screen.getByTestId('landingPage')).toBeInTheDocument();
    expect(screen.getByTestId('layout')).toBeInTheDocument();
  });
});
