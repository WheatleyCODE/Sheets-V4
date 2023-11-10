import { screen } from '@testing-library/react';
import { Card } from './Card';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('Card', () => {
  test('In the document', () => {
    renderComponent(<Card />);

    expect(screen.getByTestId('card')).toBeInTheDocument();
  });
});
