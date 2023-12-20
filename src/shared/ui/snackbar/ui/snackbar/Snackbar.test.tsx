import { screen } from '@testing-library/react';
import { Snackbar } from './Snackbar';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('Snackbar', () => {
  test('In the document', () => {
    renderComponent(<Snackbar />);

    expect(screen.getByTestId('snackbar')).toBeInTheDocument();
  });
});
