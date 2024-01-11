import { FC, memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MdCurrencyExchange, MdLocationOn } from 'react-icons/md';
import { Text } from '@/shared/ui/text';
import { CircleLoader } from '@/shared/ui/loaders';
import { Input, useValidInput } from '@/shared/ui/input';
import { Select, useSelect } from '@/shared/ui/select';
import { cityItems, countryItems, currencyItems } from './ProfileCard.consts';
import {
  ageValidator,
  avatarValidator,
  firstnameValidator,
  lastnameValidator,
  usernameValidator,
} from '@/shared/lib/validators';
import { ProfileCardEdit } from '../profile-card-edit/ProfileCardEdit';
import { ProfileCardTextAlign } from '../../model/consts/profile.consts';
import { HStack, VStack } from '@/shared/ui/containers';
import { Title } from '@/shared/ui/title';
import { Avatar } from '@/shared/ui/avatar';
import { classNames } from '@/shared/lib/class-names';
import type { IProfileCardProps } from './ProfileCard.interface';
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

  const avatarInput = useValidInput({ initValue: username, validators: [avatarValidator] });
  const usernameInput = useValidInput({ initValue: '', validators: [usernameValidator] });
  const firstnameInput = useValidInput({ initValue: '', validators: [firstnameValidator] });
  const lastnameInput = useValidInput({ initValue: '', validators: [lastnameValidator] });
  const ageInput = useValidInput({ initValue: '', validators: [ageValidator] });

  const selectCurrency = useSelect({
    useControllableMenu: { items: currencyItems },
    useValidInput: { initValue: currency },
  });

  const selectCountry = useSelect({
    useControllableMenu: { items: countryItems },
    useValidInput: { initValue: country },
  });

  const selectCity = useSelect({ useControllableMenu: { items: cityItems }, useValidInput: { initValue: city } });

  useEffect(() => {
    avatarInput.dataChangers.changeValue(avatar || '');
  }, [avatar]);

  useEffect(() => {
    usernameInput.dataChangers.changeValue(username || '');
  }, [username]);

  useEffect(() => {
    firstnameInput.dataChangers.changeValue(firstname || '');
  }, [firstname]);

  useEffect(() => {
    lastnameInput.dataChangers.changeValue(lastname || '');
  }, [lastname]);

  useEffect(() => {
    ageInput.dataChangers.changeValue(age || '');
  }, [lastname]);

  useEffect(() => {
    selectCurrency.input.dataChangers.changeValue(currency || '');
  }, [currency]);

  useEffect(() => {
    selectCountry.input.dataChangers.changeValue(country || '');
  }, [country]);

  useEffect(() => {
    selectCity.input.dataChangers.changeValue(city || '');
  }, [city]);

  const disableProfileChange = useCallback(() => {
    avatarInput.dataChangers.changeValue(avatar || '');
    usernameInput.dataChangers.changeValue(username || '');
    firstnameInput.dataChangers.changeValue(firstname || '');
    lastnameInput.dataChangers.changeValue(lastname || '');
    ageInput.dataChangers.changeValue(age || '');
    selectCurrency.input.dataChangers.changeValue(currency || '');
    selectCountry.input.dataChangers.changeValue(country || '');
    selectCity.input.dataChangers.changeValue(city || '');

    if (edit) edit.disableProfileChange();
  }, [age, avatar, city, country, currency, edit, firstname, lastname, username]);

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
        <HStack>
          <Text className={styles.title} textSize="small" title={`${t('Аватар')}:`} />
          <Title text={t('Аватар')}>
            <Input
              data-testid="Аватар"
              isReadonly={isReadonly}
              {...avatarInput.data}
              {...avatarInput.dataChangers}
              {...avatarInput.eventHandlers}
              inputRef={avatarInput.ref}
            />
          </Title>
        </HStack>

        <HStack>
          <Text className={styles.title} textSize="small" title={`${t('Никнейм')}:`} />
          <Title text={t('Никнейм')}>
            <Input
              data-testid="Никнейм"
              isReadonly={isReadonly}
              {...usernameInput.data}
              {...usernameInput.dataChangers}
              {...usernameInput.eventHandlers}
              inputRef={usernameInput.ref}
            />
          </Title>
        </HStack>

        <HStack>
          <Text className={styles.title} textSize="small" title={`${t('Имя')}:`} />
          <Title text={t('Имя')}>
            <Input
              data-testid="Имя"
              isReadonly={isReadonly}
              {...firstnameInput.data}
              {...firstnameInput.dataChangers}
              {...firstnameInput.eventHandlers}
              inputRef={firstnameInput.ref}
            />
          </Title>
        </HStack>

        <HStack>
          <Text className={styles.title} textSize="small" title={`${t('Фамилия')}:`} />
          <Title text={t('Фамилия')}>
            <Input
              data-testid="Фамилия"
              isReadonly={isReadonly}
              {...lastnameInput.data}
              {...lastnameInput.dataChangers}
              {...lastnameInput.eventHandlers}
              inputRef={lastnameInput.ref}
            />
          </Title>
        </HStack>

        <HStack>
          <Text className={styles.title} textSize="small" title={`${t('Возраст')}:`} />
          <Title text={t('Возраст')}>
            <Input
              data-testid="Возраст"
              isReadonly={isReadonly}
              {...ageInput.data}
              {...ageInput.dataChangers}
              {...ageInput.eventHandlers}
              inputRef={ageInput.ref}
            />
          </Title>
        </HStack>

        <HStack>
          <Text className={styles.title} textSize="small" title={`${t('Валюта')}:`} />
          <Title isStopShow={selectCurrency.select.data.isShow} text={t('Валюта')}>
            <Select
              isWritable={false}
              data-testid="Валюта"
              isReadonly={isReadonly}
              Icon={MdCurrencyExchange}
              {...selectCurrency}
              selectRef={selectCurrency.select.ref}
            />
          </Title>
        </HStack>

        <HStack>
          <Text className={styles.title} textSize="small" title={`${t('Страна')}:`} />
          <Title isStopShow={selectCountry.select.data.isShow} text={t('Страна')}>
            <Select
              data-testid="Страна"
              isReadonly={isReadonly}
              Icon={MdLocationOn}
              {...selectCountry}
              selectRef={selectCountry.select.ref}
            />
          </Title>
        </HStack>

        <HStack>
          <Text className={styles.title} textSize="small" title={`${t('Город')}:`} />
          <Title isStopShow={selectCity.select.data.isShow} text={t('Город')}>
            <Select
              data-testid="Город"
              isReadonly={isReadonly}
              Icon={MdLocationOn}
              {...selectCity}
              selectRef={selectCity.select.ref}
            />
          </Title>
        </HStack>
      </VStack>

      {!!edit && (
        <ProfileCardEdit
          validHooks={{
            avatar: avatarInput,
            username: usernameInput,
            firstname: firstnameInput,
            lastname: lastnameInput,
            age: ageInput,
            currency: selectCurrency.input,
            country: selectCountry.input,
            city: selectCity.input,
          }}
          isReadonly={isReadonly}
          disableProfileChange={disableProfileChange}
          enableProfileChange={edit.enableProfileChange}
          saveProfileChange={edit.saveProfileChange}
        />
      )}
    </VStack>
  );
});
