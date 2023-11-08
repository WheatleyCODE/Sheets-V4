import { screen } from '@testing-library/react';
import { EditableProfile } from './EditableProfile';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';
import { Country, Currency, IProfile, profileReducer } from 'entities/profile';
import { userEvent } from '@testing-library/user-event';
import { api } from 'shared/api';

const profile: IProfile = {
  userId: '1',
  firstname: 'Вася',
  lastname: 'Пупкин',
  age: '65',
  currency: Currency.USD,
  country: Country.RUSSIA,
  city: 'Благовещенск',
  username: 'Vasya28RUS',
  avatar: 'http://...',
};

describe('EditableProfile', () => {
  test('In the document', () => {
    renderComponent(<EditableProfile />);

    expect(screen.getByTestId('editableProfile')).toBeInTheDocument();
  });

  test('In the document + isReadonly changes', async () => {
    renderComponent(<EditableProfile />, {
      initialState: {
        profile: { error: null, isLoading: false, isReadonly: true, profile },
        user: { _inited: true, user: { id: '1', username: 'Vasya28RUS' } },
      },
      asyncReducers: {
        profile: profileReducer,
      },
    });

    const edit = screen.getByText('Редактировать');
    expect(edit).toBeInTheDocument();

    await userEvent.click(edit);

    expect(screen.queryByText('Редактировать')).not.toBeInTheDocument();
    const cancel = screen.getByText('Отменить');
    const save = screen.getByText('Сохранить');

    expect(cancel).toBeInTheDocument();
    expect(save).toBeInTheDocument();

    await userEvent.click(cancel);
    const edit2 = screen.getByText('Редактировать');
    expect(edit2).toBeInTheDocument();

    expect(screen.queryByText('Отменить')).not.toBeInTheDocument();
    expect(screen.queryByText('Сохранить')).not.toBeInTheDocument();

    expect(screen.getByTestId('editableProfile')).toBeInTheDocument();
  });

  test('In the document + clear inputs', async () => {
    renderComponent(<EditableProfile />, {
      initialState: {
        profile: { error: null, isLoading: false, isReadonly: true, profile },
        user: { _inited: true, user: { id: '1', username: 'Vasya28RUS' } },
      },
      asyncReducers: {
        profile: profileReducer,
      },
    });

    const avatarInput = screen.getByTestId('Аватар');
    const nicknameInput = screen.getByTestId('Никнейм');
    const firstnameInput = screen.getByTestId('Имя');
    const lastnameInput = screen.getByTestId('Фамилия');
    const ageInput = screen.getByTestId('Возраст');
    const currencyInput = screen.getByTestId('Валюта');
    const countryInput = screen.getByTestId('Страна');
    const cityInput = screen.getByTestId('Город');

    expect(screen.getByTestId('editableProfile')).toBeInTheDocument();
    expect(screen.getByTestId('profileCardEdit')).toBeInTheDocument();
    expect(avatarInput).toBeInTheDocument();
    expect(nicknameInput).toBeInTheDocument();
    expect(firstnameInput).toBeInTheDocument();
    expect(lastnameInput).toBeInTheDocument();
    expect(ageInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();
    expect(countryInput).toBeInTheDocument();
    expect(cityInput).toBeInTheDocument();

    const edit = screen.getByText('Редактировать');
    expect(edit).toBeInTheDocument();
    await userEvent.click(edit);

    const cancel = screen.getByText('Отменить');
    const save = screen.getByText('Сохранить');

    expect(cancel).toBeInTheDocument();
    expect(save).toBeInTheDocument();

    await userEvent.clear(firstnameInput);
    await userEvent.clear(lastnameInput);
    await userEvent.type(firstnameInput, 'Дмитрий');
    await userEvent.type(lastnameInput, 'Бажаев');

    expect(firstnameInput).toHaveValue('Дмитрий');
    expect(lastnameInput).toHaveValue('Бажаев');

    await userEvent.click(cancel);

    expect(firstnameInput).toHaveValue('Вася');
    expect(lastnameInput).toHaveValue('Пупкин');
  });

  test('In the document + validations', async () => {
    renderComponent(<EditableProfile />, {
      initialState: {
        profile: { error: null, isLoading: false, isReadonly: true, profile },
        user: { _inited: true, user: { id: '1', username: 'Vasya28RUS' } },
      },
      asyncReducers: {
        profile: profileReducer,
      },
    });

    const avatarInput = screen.getByTestId('Аватар');
    const nicknameInput = screen.getByTestId('Никнейм');
    const firstnameInput = screen.getByTestId('Имя');
    const lastnameInput = screen.getByTestId('Фамилия');
    const ageInput = screen.getByTestId('Возраст');
    const currencyInput = screen.getByTestId('Валюта');
    const countryInput = screen.getByTestId('Страна');
    const cityInput = screen.getByTestId('Город');

    expect(screen.getByTestId('editableProfile')).toBeInTheDocument();
    expect(screen.getByTestId('profileCardEdit')).toBeInTheDocument();
    expect(avatarInput).toBeInTheDocument();
    expect(nicknameInput).toBeInTheDocument();
    expect(firstnameInput).toBeInTheDocument();
    expect(lastnameInput).toBeInTheDocument();
    expect(ageInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();
    expect(countryInput).toBeInTheDocument();
    expect(cityInput).toBeInTheDocument();

    const edit = screen.getByText('Редактировать');
    expect(edit).toBeInTheDocument();
    await userEvent.click(edit);

    const cancel = screen.getByText('Отменить');
    const save = screen.getByText('Сохранить');

    expect(cancel).toBeInTheDocument();
    expect(save).toBeInTheDocument();

    await userEvent.clear(firstnameInput);
    await userEvent.clear(lastnameInput);
    await userEvent.type(firstnameInput, 'F');
    await userEvent.type(lastnameInput, 'V');

    expect(firstnameInput).toHaveValue('F');
    expect(lastnameInput).toHaveValue('V');

    await userEvent.click(screen.getByTestId('profileCardEdit'));
    expect(screen.getByText('Имя должно быть больше 3 символов')).toBeInTheDocument();
    expect(screen.getByText('Фамилия должна быть больше 3 символов')).toBeInTheDocument();

    await userEvent.click(save);
    expect(firstnameInput).toHaveValue('F');
    expect(lastnameInput).toHaveValue('V');
    expect(screen.getByText('Имя должно быть больше 3 символов')).toBeInTheDocument();
    expect(screen.getByText('Фамилия должна быть больше 3 символов')).toBeInTheDocument();

    await userEvent.type(firstnameInput, 'BLABLABLABLABLABLABLABLA');
    await userEvent.type(lastnameInput, 'BLABLABLABLABLABLABLABLA');

    await userEvent.click(screen.getByTestId('profileCardEdit'));
    expect(firstnameInput).toHaveValue('FBLABLABLABLABLABLABLABLA');
    expect(lastnameInput).toHaveValue('VBLABLABLABLABLABLABLABLA');

    expect(screen.getByText('Имя должно быть меньше 14 символов')).toBeInTheDocument();
    expect(screen.getByText('Фамилия должна быть меньше 18 символов')).toBeInTheDocument();

    await userEvent.click(cancel);
    expect(firstnameInput).toHaveValue('Вася');
    expect(lastnameInput).toHaveValue('Пупкин');

    await userEvent.click(screen.getByTestId('profileCardEdit'));
    expect(screen.queryByText('Имя должно быть больше 3 символов')).not.toBeInTheDocument();
    expect(screen.queryByText('Фамилия должна быть больше 3 символов')).not.toBeInTheDocument();
    expect(screen.queryByText('Имя должно быть меньше 14 символов')).not.toBeInTheDocument();
    expect(screen.queryByText('Фамилия должна быть меньше 18 символов')).not.toBeInTheDocument();
  });

  test('In the document + request', async () => {
    const mockApi = jest.spyOn(api, 'put');

    renderComponent(<EditableProfile />, {
      initialState: {
        profile: { error: null, isLoading: false, isReadonly: true, profile },
        user: { _inited: true, user: { id: '1', username: 'Vasya28RUS' } },
      },
      asyncReducers: {
        profile: profileReducer,
      },
    });

    const avatarInput = screen.getByTestId('Аватар');
    const nicknameInput = screen.getByTestId('Никнейм');
    const firstnameInput = screen.getByTestId('Имя');
    const lastnameInput = screen.getByTestId('Фамилия');
    const ageInput = screen.getByTestId('Возраст');
    const currencyInput = screen.getByTestId('Валюта');
    const countryInput = screen.getByTestId('Страна');
    const cityInput = screen.getByTestId('Город');

    expect(screen.getByTestId('editableProfile')).toBeInTheDocument();
    expect(screen.getByTestId('profileCardEdit')).toBeInTheDocument();
    expect(avatarInput).toBeInTheDocument();
    expect(nicknameInput).toBeInTheDocument();
    expect(firstnameInput).toBeInTheDocument();
    expect(lastnameInput).toBeInTheDocument();
    expect(ageInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();
    expect(countryInput).toBeInTheDocument();
    expect(cityInput).toBeInTheDocument();

    const edit = screen.getByText('Редактировать');
    expect(edit).toBeInTheDocument();
    await userEvent.click(edit);

    const cancel = screen.getByText('Отменить');
    const save = screen.getByText('Сохранить');

    expect(cancel).toBeInTheDocument();
    expect(save).toBeInTheDocument();

    await userEvent.clear(firstnameInput);
    await userEvent.clear(lastnameInput);
    await userEvent.type(firstnameInput, 'Дмитрий');
    await userEvent.type(lastnameInput, 'Бажаев');

    expect(firstnameInput).toHaveValue('Дмитрий');
    expect(lastnameInput).toHaveValue('Бажаев');

    await userEvent.click(save);
    expect(mockApi).toHaveBeenCalled();
  });
});
