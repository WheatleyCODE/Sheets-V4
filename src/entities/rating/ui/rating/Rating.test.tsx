import { screen } from '@testing-library/react';
import { Rating } from './Rating';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('Rating', () => {
  test('In the document', () => {
    renderComponent(<Rating />);

    expect(screen.getByTestId('rating')).toBeInTheDocument();
  });
});
