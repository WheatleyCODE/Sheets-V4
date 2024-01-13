import { screen } from '@testing-library/react';
import { CellBgColor } from './CellBgColor';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('CellBgColor', () => {
  test('In the document', () => {
    renderComponent(<CellBgColor />);

    expect(screen.getByTestId('cellBgColor')).toBeInTheDocument();
  });
});
