import { screen } from '@testing-library/react';
import { Cell } from './Cell';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('Cell', () => {
  test('In the document', () => {
    renderComponent(<Cell />);

    expect(screen.getByTestId('cell')).toBeInTheDocument();
  });
});
