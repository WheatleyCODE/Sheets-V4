import { fireEvent, screen } from '@testing-library/react';
import { User } from './User';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';
import { sleep } from 'shared/lib/promise';
import { ANIMATION_DURATION_MS } from 'shared/consts';

const imgSrc =
  'https://avatars.mds.yandex.net/i?id=ff63d9036709e4bb15cab817afddf0fddaca9978-10639375-images-thumbs&n=13';

describe('User', () => {
  test('In the document', () => {
    renderComponent(<User logout={() => {}} openAuth={() => {}} />);

    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByText('Войти')).toBeInTheDocument();
  });

  test('In the document + auth', () => {
    renderComponent(<User user={{ email: 'ya@mail.ru', id: '1' }} logout={() => {}} openAuth={() => {}} />);

    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByTestId('imageLoad')).toBeInTheDocument();
  });

  test('In the document + callbacks', () => {
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

  test('In the document + open dropdown auth', async () => {
    const logout = jest.fn();
    const openAuth = jest.fn();

    renderComponent(
      <User user={{ email: 'ya@mail.ru', id: '1', avatar: imgSrc }} logout={logout} openAuth={openAuth} />,
    );

    const avatar = screen.getByTestId('imageLoad');

    fireEvent.click(avatar);
    await sleep(ANIMATION_DURATION_MS);

    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByText('Выйти')).toBeInTheDocument();
    expect(screen.getByText('Профиль')).toBeInTheDocument();
    expect(avatar).toBeInTheDocument();
  });
});
