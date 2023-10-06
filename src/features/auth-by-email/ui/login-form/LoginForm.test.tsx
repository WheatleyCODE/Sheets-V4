import { screen } from '@testing-library/react';
import LoginForm from './LoginForm';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';

describe('LoginForm', () => {
  test('In the document', () => {
    renderComponent(<LoginForm onLoginSuccess={() => {}} />);

    expect(screen.getByTestId('loginForm')).toBeInTheDocument();
    expect(screen.getByText('Почта')).toBeInTheDocument();
    expect(screen.getByText('Пароль')).toBeInTheDocument();
    expect(screen.getByText('Войти')).toBeInTheDocument();
  });
});
