import { screen } from '@testing-library/react';
import { CellBorder } from './CellBorder';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('CellBorder', () => {
  test('In the document', () => {
    renderComponent(<CellBorder />);

    expect(screen.getByTestId('cellBorder')).toBeInTheDocument();
  });
});
