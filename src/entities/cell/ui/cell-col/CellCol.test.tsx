import { screen } from '@testing-library/react';
import { CellCol } from './CellCol';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('CellCol', () => {
  test('In the document', () => {
    renderComponent(<CellCol id={10} value="A" width={100} />);

    expect(screen.getByTestId('cellCol')).toBeInTheDocument();
  });
});
