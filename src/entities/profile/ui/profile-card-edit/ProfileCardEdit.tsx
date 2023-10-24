import { FC, useCallback, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/class-names';
import { IProfile } from '../../model/types/profile';
import { Button } from 'shared/ui/button';
import { useTranslation } from 'react-i18next';
import { IInputValidHooks } from '../profile-card/getInfoItemArr';
import { Title } from 'shared/ui/title';
import { HStack } from 'shared/ui/containers';
import { intoIter } from 'shared/lib/iterators';
import { IValidInputOpts } from 'shared/ui/input';
import { ButtonColor } from 'shared/ui/button/ui/button/interface';
import styles from './ProfileCardEdit.module.scss';

interface IProfileCardEditProps extends React.HTMLAttributes<HTMLDivElement> {
  enableProfileChange: () => void;
  disableProfileChange: () => void;
  saveProfileChange: (profile: IProfile) => void;
  isReadonly: boolean;
  validHooks: IInputValidHooks;
}

export const ProfileCardEdit: FC<IProfileCardEditProps> = (props) => {
  const {
    className,
    enableProfileChange,
    disableProfileChange,
    saveProfileChange,
    validHooks,
    isReadonly,
    ...anotherProps
  } = props;
  const { t } = useTranslation('profile');
  const [isDisable, setIsDisable] = useState(false);

  useEffect(() => {
    const inputs = intoIter<IValidInputOpts<any>>(validHooks);

    for (const input of inputs) {
      if (input.isError) {
        setIsDisable(true);
        return;
      }
    }

    setIsDisable(false);
  }, [validHooks]);

  const onSave = useCallback(() => {
    const profile: IProfile = {};

    const entries = intoIter<[keyof IProfile, IValidInputOpts<any>]>(Object.entries(validHooks));

    for (const [key, input] of entries) {
      if (input.isError) return;
      profile[key] = input.value;
    }

    saveProfileChange(profile);
  }, [saveProfileChange, validHooks]);

  return (
    <HStack
      justify="space-between"
      {...anotherProps}
      data-testid="profileCardEdit"
      className={classNames(styles.edit, {}, [className])}
    >
      {isReadonly ? (
        <Title text={t('Редактировать профиль')}>
          <Button onClick={enableProfileChange} className={styles.button} text={t('Редактировать')} />
        </Title>
      ) : (
        <>
          <Title text={t('Отменить изменения')}>
            <Button
              onClick={disableProfileChange}
              buttonColor={ButtonColor.DANGER}
              className={styles.button}
              text={t('Отменить')}
            />
          </Title>
          <Title text={t('Сохранить изменения')}>
            <Button
              buttonColor={ButtonColor.PRIMARY}
              disable={isDisable}
              onClick={onSave}
              className={styles.button}
              text={t('Сохранить')}
            />
          </Title>
        </>
      )}
    </HStack>
  );
};
