import { screen } from '@testing-library/react';
import { PaletteListItem } from './PaletteListItem';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('PaletteListItem', () => {
  test('In the document', () => {
    renderComponent(<PaletteListItem color="red" title="Red" />);

    expect(screen.getByTestId('paletteListItem')).toBeInTheDocument();
  });
});
