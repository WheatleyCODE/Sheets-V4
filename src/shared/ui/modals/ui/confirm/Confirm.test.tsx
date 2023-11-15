import { screen } from '@testing-library/react';
import { Confirm } from './Confirm';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('Confirm', () => {
  test('In the document', () => {
    renderComponent(<Confirm />);

    expect(screen.getByTestId('confirm')).toBeInTheDocument();
  });
});
