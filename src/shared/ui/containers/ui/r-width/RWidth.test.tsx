import { screen } from '@testing-library/react';
import { RWidth } from './RWidth';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('RWidth', () => {
  test('In the document', () => {
    renderComponent(<RWidth />);

    expect(screen.getByTestId('rWidth')).toBeInTheDocument();
  });
});
