import { screen } from '@testing-library/react';
import { TextVerAlign } from './TextVerAlign';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('TextVerAlign', () => {
  test('In the document', () => {
    renderComponent(<TextVerAlign />);

    expect(screen.getByTestId('textVerAlign')).toBeInTheDocument();
  });
});
