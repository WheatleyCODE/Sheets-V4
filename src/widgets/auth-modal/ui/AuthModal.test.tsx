import { screen } from '@testing-library/react';
import { AuthModal } from './AuthModal';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';

describe('AuthModal', () => {
  test('In the document', () => {
    renderComponent(<AuthModal onClose={() => {}} />);

    expect(screen.getByTestId('auth-modal')).toBeInTheDocument();
    expect(screen.getByText('Вход в систему')).toBeInTheDocument();
    expect(screen.getByText('Почта')).toBeInTheDocument();
    expect(screen.getByText('Пароль')).toBeInTheDocument();
    expect(screen.getByText('Войти')).toBeInTheDocument();
  });
});
