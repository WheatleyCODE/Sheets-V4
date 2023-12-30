import { FC, memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from '@/shared/ui/text';
import { CircleLoader } from '@/shared/ui/loaders';
import { Input, useValidInput } from '@/shared/ui/input';
import { intoIter } from '@/shared/lib/iterators';
import { getInfoItemArr } from './ProfileCard.helpers';
import {
  ageValidator,
  avatarValidator,
  cityValidator,
  countryValidator,
  firstnameValidator,
  lastnameValidator,
  usernameValidator,
} from '@/shared/lib/validators';
import { ProfileCardEdit } from '../profile-card-edit/ProfileCardEdit';
import { Country, Currency, ProfileCardTextAlign } from '../../model/consts/profile.consts';
import { HStack, VStack } from '@/shared/ui/containers';
import { Title } from '@/shared/ui/title';
import { Avatar } from '@/shared/ui/avatar';
import { classNames } from '@/shared/lib/class-names';
import type { IInputValidHooks, IProfileCardProps, InfoItem } from './ProfileCard.interface';
import styles from './ProfileCard.module.scss';

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

  const avatarInput = useValidInput({ initValue: '', validators: [avatarValidator] });
  const usernameInput = useValidInput({ initValue: '', validators: [usernameValidator] });
  const firstnameInput = useValidInput({ initValue: '', validators: [firstnameValidator] });
  const lastnameInput = useValidInput({ initValue: '', validators: [lastnameValidator] });
  const ageInput = useValidInput({ initValue: '', validators: [ageValidator] });
  const cityInput = useValidInput({ initValue: '', validators: [cityValidator] });
  const currencyInput = useValidInput({ initValue: Currency.NONE });
  const countryInput = useValidInput({ initValue: Country.NONE, validators: [countryValidator] });

  useEffect(() => {
    avatarInput.dataChangers.changeValue(avatar || '');
    usernameInput.dataChangers.changeValue(username || '');
    firstnameInput.dataChangers.changeValue(firstname || '');
    lastnameInput.dataChangers.changeValue(lastname || '');
    ageInput.dataChangers.changeValue(age || '');
    cityInput.dataChangers.changeValue(city || '');
    currencyInput.dataChangers.changeValue(currency || Currency.NONE);
    countryInput.dataChangers.changeValue(country || Country.NONE);
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
    .map(({ title, input, Icon }) => (
      <HStack key={title}>
        <Text className={styles.title} textSize="small" title={`${t(title)}:`} />
        <Title isStopShow={input.data.isFocus} text={t(title)}>
          <Input
            Icon={Icon}
            type="text"
            data-testid={title}
            {...input.data}
            {...input.dataChangers}
            {...input.eventHandlers}
            isReadonly={isReadonly}
            validError={t(input.data.validError || '')}
            inputRef={input.ref}
          />
        </Title>
      </HStack>
    ))
    .toArray();

  if (isLoading)
    return (
      <VStack {...anotherProps} data-testid="profileCard" className={classNames(styles.profile_card, {}, [className])}>
        <CircleLoader />
      </VStack>
    );

  if (error)
    return (
      <VStack {...anotherProps} data-testid="profileCard" className={classNames(styles.profile_card, {}, [className])}>
        <VStack gapMultiply="1">
          <Text textStyle="error" title={t('Произошла ошибка при загрузке профиля')} />
          <Text textStyle="error" text={error} />
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
        <Text textSize="big" title={`${t('Профиль')}, ${username}`} />
      </HStack>

      <HStack className={styles.avatar_container} justify="start">
        <Title text={t('Аватар')}>
          <Avatar src={avatar} className={styles.avatar} />
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
