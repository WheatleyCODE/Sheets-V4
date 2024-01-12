import { screen } from '@testing-library/react';
import { CellAll } from './CellAll';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('CellAll', () => {
  test('In the document', () => {
    renderComponent(<CellAll />);

    expect(screen.getByTestId('cellAll')).toBeInTheDocument();
  });
});
