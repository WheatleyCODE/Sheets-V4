import { screen } from '@testing-library/react';
import { ProfileCard } from './ProfileCard';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';
import { Country, Currency, IProfile } from 'entities/profile/model/types/profile';

describe('ProfileCard', () => {
  test('In the document', () => {
    const profile: IProfile = {
      firstname: 'Вася',
      lastname: 'Пупкин',
      age: '65',
      currency: Currency.USD,
      country: Country.RUSSIA,
      city: 'Благовещенск',
      username: 'Vasya28RUS',
      avatar: 'http://...',
    };

    renderComponent(<ProfileCard profile={profile} isLoading={false} error={null} isReadonly={false} />);

    expect(screen.getByTestId('profileCard')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Вася')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Пупкин')).toBeInTheDocument();
    expect(screen.getByDisplayValue(Currency.USD)).toBeInTheDocument();
    expect(screen.getByDisplayValue('Благовещенск')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Vasya28RUS')).toBeInTheDocument();
    expect(screen.getByText('Профиль, Vasya28RUS')).toBeInTheDocument();
  });

  test('In the document + edit', () => {
    const profile: IProfile = {
      firstname: 'Вася',
      lastname: 'Пупкин',
      age: '65',
      currency: Currency.USD,
      country: Country.RUSSIA,
      city: 'Благовещенск',
      username: 'Vasya28RUS',
      avatar: 'http://...',
    };

    const disableProfileChange = jest.fn();
    const enableProfileChange = jest.fn();
    const saveProfileChange = jest.fn();

    renderComponent(
      <ProfileCard
        profile={profile}
        edit={{ disableProfileChange, enableProfileChange, saveProfileChange }}
        isLoading={false}
        error={null}
        isReadonly={false}
      />,
    );

    expect(screen.getByTestId('profileCard')).toBeInTheDocument();
    expect(screen.getByTestId('profileCardEdit')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Вася')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Пупкин')).toBeInTheDocument();
    expect(screen.getByDisplayValue(Currency.USD)).toBeInTheDocument();
    expect(screen.getByDisplayValue('Благовещенск')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Vasya28RUS')).toBeInTheDocument();
    expect(screen.getByText('Профиль, Vasya28RUS')).toBeInTheDocument();
  });
});
