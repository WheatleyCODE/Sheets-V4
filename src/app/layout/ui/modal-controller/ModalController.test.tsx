import { screen } from '@testing-library/react';
import { ModalController } from './ModalController';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('ModalController', () => {
  test('In the document', async () => {
    renderComponent(<ModalController />, { initialState: { modals: { isAuth: true } } });

    expect(await screen.findByTestId('auth-modal')).toBeInTheDocument();
    expect(screen.getByText('Регистрация')).toBeInTheDocument();
    expect(screen.getByTestId('circleLoader')).toBeInTheDocument();
  });

  test('Not in the document', () => {
    renderComponent(<ModalController />, { initialState: { modals: { isAuth: false } } });

    expect(screen.queryByTestId('auth-modal')).not.toBeInTheDocument();
    expect(screen.queryByText('Вход в систему')).not.toBeInTheDocument();
    expect(screen.queryByText('Регистрация')).not.toBeInTheDocument();
    expect(screen.queryByText('Почта')).not.toBeInTheDocument();
    expect(screen.queryByText('Пароль')).not.toBeInTheDocument();
    expect(screen.queryByText('Войти')).not.toBeInTheDocument();
  });
});
