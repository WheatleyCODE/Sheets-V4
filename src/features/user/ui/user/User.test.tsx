import { fireEvent, screen } from '@testing-library/react';
import { User } from './User';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';

describe('User', () => {
  test('In the document', () => {
    renderComponent(<User logout={() => {}} openAuth={() => {}} />);

    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByText('Войти')).toBeInTheDocument();
  });

  test('In the document + auth', () => {
    renderComponent(<User user={{ email: 'ya@mail.ru', id: '1' }} logout={() => {}} openAuth={() => {}} />);

    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByText('Выйти')).toBeInTheDocument();
  });

  test('In the document + callback', () => {
    const logout = jest.fn();
    const openAuth = jest.fn();

    renderComponent(<User logout={logout} openAuth={openAuth} />);

    const button = screen.getByText('Войти');

    fireEvent.click(button);

    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(openAuth.mock.calls).toHaveLength(1);
    expect(logout.mock.calls).toHaveLength(0);
  });

  test('In the document + auth + callback', () => {
    const logout = jest.fn();
    const openAuth = jest.fn();

    renderComponent(<User user={{ email: 'ya@mail.ru', id: '1' }} logout={logout} openAuth={openAuth} />);

    const button = screen.getByText('Выйти');

    fireEvent.click(button);

    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(openAuth.mock.calls).toHaveLength(0);
    expect(logout.mock.calls).toHaveLength(1);
  });
});
