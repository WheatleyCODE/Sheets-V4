import { screen } from '@testing-library/react';
import { TextHorAlign } from './TextHorAlign';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('TextHorAlign', () => {
  test('In the document', () => {
    renderComponent(<TextHorAlign />);

    expect(screen.getByTestId('textHorAlign')).toBeInTheDocument();
  });
});
