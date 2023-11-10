import { fireEvent, screen } from '@testing-library/react';
import LoginForm from './LoginForm';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('LoginForm', () => {
  test('In the document', () => {
    renderComponent(<LoginForm onLoginSuccess={() => {}} />);

    expect(screen.getByTestId('loginForm')).toBeInTheDocument();
    expect(screen.getByTestId('emailInput')).toBeInTheDocument();
    expect(screen.getByTestId('passwordInput')).toBeInTheDocument();
    expect(screen.getByText('Почта')).toBeInTheDocument();
    expect(screen.getByText('Пароль')).toBeInTheDocument();
    expect(screen.getByText('Войти')).toBeInTheDocument();
  });

  test('In the document + click', () => {
    const onLoginSuccess = jest.fn();
    const onLoginStart = jest.fn();

    renderComponent(<LoginForm onLoginSuccess={onLoginSuccess} onLoginStart={onLoginStart} />);
    const emailInput = screen.getByTestId('emailInput');
    const passwordInput = screen.getByTestId('passwordInput');
    const button = screen.getByText('Войти');

    fireEvent.change(emailInput, { target: { value: 'email@mail.ru' } });
    fireEvent.change(passwordInput, { target: { value: '12345678' } });

    fireEvent.click(button);

    expect(onLoginStart.mock.calls.length).toBe(1);
    expect(screen.getByTestId('loginForm')).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('In the document + click empty', () => {
    const onLoginSuccess = jest.fn();
    const onLoginStart = jest.fn();

    renderComponent(<LoginForm onLoginSuccess={onLoginSuccess} onLoginStart={onLoginStart} />);
    const emailInput = screen.getByTestId('emailInput');
    const passwordInput = screen.getByTestId('passwordInput');
    const button = screen.getByText('Войти');

    fireEvent.change(emailInput, { target: { value: '' } });
    fireEvent.change(passwordInput, { target: { value: '' } });

    fireEvent.click(button);

    expect(onLoginStart.mock.calls.length).toBe(0);
    expect(screen.getByTestId('loginForm')).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
