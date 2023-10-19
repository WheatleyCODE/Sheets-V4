import { screen } from '@testing-library/react';
import { Width } from './Width';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';

describe('Width', () => {
  test('In the document', () => {
    renderComponent(<Width />);

    expect(screen.getByTestId('width')).toBeInTheDocument();
  });
});
