import { screen } from '@testing-library/react';
import { CellRow } from './CellRow';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('CellRow', () => {
  test('In the document', () => {
    renderComponent(<CellRow />);

    expect(screen.getByTestId('cellRow')).toBeInTheDocument();
  });
});
