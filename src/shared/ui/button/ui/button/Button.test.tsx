import { render, screen } from '@testing-library/react';
import { Button } from './Button';
import { ButtonStyles } from './interface';

describe('Button', () => {
  test('1 Props', () => {
    render(<Button text="Кнопка" />);
    expect(screen.getByText('Кнопка')).toBeInTheDocument();
  });

  test('2 Props', () => {
    render(<Button buttonStyle={ButtonStyles.CLEAR} text="Кнопка" />);
    expect(screen.getByText('Кнопка')).toHaveClass('clear');
  });
});
