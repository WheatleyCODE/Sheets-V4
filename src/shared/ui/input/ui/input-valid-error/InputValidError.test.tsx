import { screen } from '@testing-library/react';
import { InputValidError } from './InputValidError';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';

describe('InputValidError', () => {
  test('In the document', () => {
    renderComponent(<InputValidError validError="Ошибка валидации" />);

    expect(screen.getByTestId('inputValidError')).toBeInTheDocument();
    expect(screen.getByText('Ошибка валидации')).toBeInTheDocument();
  });
});
