import { screen } from '@testing-library/react';
import { Functions } from './Functions';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('Functions', () => {
  test('In the document', () => {
    renderComponent(<Functions />);

    expect(screen.getByTestId('functions')).toBeInTheDocument();
  });
});
