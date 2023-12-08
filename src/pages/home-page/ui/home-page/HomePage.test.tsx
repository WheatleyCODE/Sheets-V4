import { screen } from '@testing-library/react';
import HomePage from './HomePage';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('HomePage', () => {
  test('In the document', () => {
    renderComponent(<HomePage />);

    expect(screen.getByTestId('homePage')).toBeInTheDocument();
  });
});
