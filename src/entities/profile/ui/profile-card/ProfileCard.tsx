import { FC, memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { IProfile } from 'entities/profile/model/types/profile';
import { Text } from 'shared/ui/text';
import { TextSize, TextStyle } from 'shared/ui/text/interface';
import { Loader } from 'shared/ui/loader';
import { IInputOptions, IValidInputOpts, Input, useValidInput } from 'shared/ui/input';
import { intoIter } from 'shared/lib/iterators';
import { IconType } from 'react-icons';
import { IInputValidHooks, getInfoItemArr } from 'entities/profile/getInfoItemArr';
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
import { Avatar } from 'shared/ui/avatar/Avatar';
import { classNames } from 'shared/lib/class-names';
import styles from './ProfileCard.module.scss';

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
      <div className={styles.row}>
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
      </div>
    ))
    .toArray();

  if (isLoading)
    return (
      <div {...anotherProps} className={classNames(styles.profile_card, {}, [className, styles.loading])}>
        <Loader isCenter />
      </div>
    );

  if (error)
    return (
      <div {...anotherProps} className={classNames(styles.profile_card, {}, [className, styles.error])}>
        <Text textStyle={TextStyle.ERROR} title={t('Произошла ошибка при загрузке профиля')} />
        <Text textStyle={TextStyle.ERROR} text={error} />
      </div>
    );

  return (
    <div {...anotherProps} className={classNames(styles.profile_card, { [styles[textAlign]]: true }, [className])}>
      <Text className={styles.card_title} textSize={TextSize.BIG} title={`${t('Профиль')}, ${username}`} />
      <div className={styles.avatar_container}>
        <Title text={t('Аватар')}>
          <Avatar src={avatar} />
        </Title>
      </div>
      <div className={styles.main}>{infoItems}</div>

      {!!edit && (
        <ProfileCardEdit
          validHooks={validHooks}
          isReadonly={isReadonly}
          disableProfileChange={edit.disableProfileChange}
          enableProfileChange={edit.enableProfileChange}
          saveProfileChange={edit.saveProfileChange}
        />
      )}
    </div>
  );
});
