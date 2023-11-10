import { screen } from '@testing-library/react';
import RegisterForm from './RegisterForm';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('RegisterForm', () => {
  test('In the document', () => {
    renderComponent(<RegisterForm />);

    expect(screen.getByTestId('registerForm')).toBeInTheDocument();
    expect(screen.getByText('Почта')).toBeInTheDocument();
    expect(screen.getByText('Пароль')).toBeInTheDocument();
    expect(screen.getByText('Повторите пароль')).toBeInTheDocument();
    expect(screen.getAllByText('Регистрация')).toHaveLength(2);
  });
});
