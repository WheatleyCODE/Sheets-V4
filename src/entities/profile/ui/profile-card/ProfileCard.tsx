import { FC, memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { IconType } from 'react-icons';
import { IProfile } from '../../model/types/profile';
import { Text } from 'shared/ui/text';
import { TextSize, TextStyle } from 'shared/ui/text';
import { Loader } from 'shared/ui/loader';
import { IInputOptions, IValidInputOpts, Input, useValidInput } from 'shared/ui/input';
import { intoIter } from 'shared/lib/iterators';
import { IInputValidHooks, getInfoItemArr } from './getInfoItemArr';
import {
  ageValidator,
  avatarValidator,
  cityValidator,
  countryValidator,
  firstnameValidator,
  lastnameValidator,
  usernameValidator,
} from 'shared/lib/validators';
import { ProfileCardEdit } from '../profile-card-edit/ProfileCardEdit';
import { Country, Currency } from '../../model/types/profile';
import { Title } from 'shared/ui/title';
import { Avatar } from 'shared/ui/avatar';
import { classNames } from 'shared/lib/class-names';
import styles from './ProfileCard.module.scss';
import { HStack, VStack } from 'shared/ui/containers';

export enum ProfileCardTextAlign {
  CENTER = 'center',
  LEFT = 'left',
  RIGHT = 'right',
}

interface IProfileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  profile: IProfile;
  error: string | null;
  isLoading: boolean;
  textAlign?: ProfileCardTextAlign;
  isReadonly: boolean;
  edit?: {
    enableProfileChange: () => void;
    disableProfileChange: () => void;
    saveProfileChange: (profile: IProfile) => void;
  };
}

export type InfoItem = {
  title: string;
  text?: string;
  input: IValidInputOpts<string>;
  Icon?: IconType;
  options?: IInputOptions;
};

export const ProfileCard: FC<IProfileCardProps> = memo((props) => {
  const {
    className,
    profile,
    isLoading,
    error,
    textAlign = ProfileCardTextAlign.CENTER,
    isReadonly,
    edit,
    ...anotherProps
  } = props;
  const { age, avatar, city, country, currency, firstname, lastname, username } = profile;
  const { t } = useTranslation('profile');

  const avatarInput = useValidInput('', [avatarValidator]);
  const usernameInput = useValidInput('', [usernameValidator]);
  const firstnameInput = useValidInput('', [firstnameValidator]);
  const lastnameInput = useValidInput('', [lastnameValidator]);
  const ageInput = useValidInput('', [ageValidator]);
  const cityInput = useValidInput('', [cityValidator]);
  const currencyInput = useValidInput(Currency.NONE);
  const countryInput = useValidInput(Country.NONE, [countryValidator]);

  useEffect(() => {
    avatarInput.changeValue(avatar || '');
    usernameInput.changeValue(username || '');
    firstnameInput.changeValue(firstname || '');
    lastnameInput.changeValue(lastname || '');
    ageInput.changeValue(age || '');
    cityInput.changeValue(city || '');
    currencyInput.changeValue(currency || Currency.NONE);
    countryInput.changeValue(country || Country.NONE);
  }, [firstname, lastname, city, currency, country, username, age, isReadonly, avatar]);

  const validHooks: IInputValidHooks = {
    age: ageInput,
    city: cityInput,
    country: countryInput,
    currency: currencyInput,
    firstname: firstnameInput,
    lastname: lastnameInput,
    username: usernameInput,
    avatar: avatarInput,
  };

  const infoArr = getInfoItemArr({ profile, validHooks });

  const infoItems = intoIter<InfoItem>(infoArr)
    .map(({ title, input, Icon, options }) => (
      <HStack key={title}>
        <Text className={styles.title} textSize={TextSize.SMALL} title={`${t(title)}:`} />
        <Title isStopShow={input.isFocus} text={t(title)}>
          <Input
            Icon={Icon}
            isReadonly={isReadonly}
            value={input.value}
            type="text"
            onChange={input.onChange}
            onBlur={input.onBlur}
            onFocus={input.onFocus}
            isError={input.isError}
            validError={t(input.validError || '')}
            isActive={input.isActive}
            isFocus={input.isFocus}
            options={options && options}
          />
        </Title>
      </HStack>
    ))
    .toArray();

  if (isLoading)
    return (
      <VStack {...anotherProps} data-testid="profileCard" className={classNames(styles.profile_card, {}, [className])}>
        <Loader isCenter />
      </VStack>
    );

  if (error)
    return (
      <VStack {...anotherProps} data-testid="profileCard" className={classNames(styles.profile_card, {}, [className])}>
        <VStack gapMultiply="1">
          <Text textStyle={TextStyle.ERROR} title={t('Произошла ошибка при загрузке профиля')} />
          <Text textStyle={TextStyle.ERROR} text={error} />
        </VStack>
      </VStack>
    );

  return (
    <VStack
      {...anotherProps}
      align="start"
      data-testid="profileCard"
      className={classNames(styles.profile_card, { [styles[textAlign]]: true }, [className])}
    >
      <HStack className={styles.title_container} justify="start">
        <Text textSize={TextSize.BIG} title={`${t('Профиль')}, ${username}`} />
      </HStack>

      <HStack className={styles.avatar_container} justify="start">
        <Title text={t('Аватар')}>
          <Avatar src={avatar} />
        </Title>
      </HStack>

      <VStack gapMultiply="1" className={styles.main}>
        {infoItems}
      </VStack>

      {!!edit && (
        <ProfileCardEdit
          validHooks={validHooks}
          isReadonly={isReadonly}
          disableProfileChange={edit.disableProfileChange}
          enableProfileChange={edit.enableProfileChange}
          saveProfileChange={edit.saveProfileChange}
        />
      )}
    </VStack>
  );
});
