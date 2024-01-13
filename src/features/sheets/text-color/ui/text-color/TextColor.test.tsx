import { screen } from '@testing-library/react';
import { TextColor } from './TextColor';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('TextColor', () => {
  test('In the document', () => {
    renderComponent(<TextColor />);

    expect(screen.getByTestId('textColor')).toBeInTheDocument();
  });
});
