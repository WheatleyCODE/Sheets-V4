import { screen } from '@testing-library/react';
import { PaletteList } from './PaletteList';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('PaletteList', () => {
  test('In the document', () => {
    renderComponent(<PaletteList />);

    expect(screen.getByTestId('paletteList')).toBeInTheDocument();
  });
});
