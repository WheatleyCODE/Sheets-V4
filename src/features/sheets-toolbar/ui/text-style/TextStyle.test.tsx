import { screen } from '@testing-library/react';
import { TextStyle } from './TextStyle';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('TextStyle', () => {
  test('In the document', () => {
    renderComponent(<TextStyle />);

    expect(screen.getByTestId('textStyle')).toBeInTheDocument();
  });
});
