import { screen } from '@testing-library/react';
import { StarRating } from './StarRating';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('StarRating', () => {
  test('In the document', () => {
    renderComponent(<StarRating />);

    expect(screen.getByTestId('starRating')).toBeInTheDocument();
  });
});
