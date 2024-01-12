import { screen } from '@testing-library/react';
import { PaletteListItem } from './PaletteListItem';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('PaletteListItem', () => {
  test('In the document', () => {
    renderComponent(<PaletteListItem />);

    expect(screen.getByTestId('paletteListItem')).toBeInTheDocument();
  });
});
