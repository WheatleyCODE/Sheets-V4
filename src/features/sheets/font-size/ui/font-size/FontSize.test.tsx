import { screen } from '@testing-library/react';
import { FontSize } from './FontSize';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('FontSize', () => {
  test('In the document', () => {
    renderComponent(<FontSize />);

    expect(screen.getByTestId('fontSize')).toBeInTheDocument();
  });
});
