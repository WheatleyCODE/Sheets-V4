import { screen } from '@testing-library/react';
import { Palette } from './Palette';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('Palette', () => {
  test('In the document', () => {
    renderComponent(<Palette />);

    expect(screen.getByTestId('palette')).toBeInTheDocument();
  });
});
