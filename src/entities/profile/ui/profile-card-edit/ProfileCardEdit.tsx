import { FC, memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/class-names';
import { Button } from '@/shared/ui/button';
import { Title } from '@/shared/ui/title';
import { HStack } from '@/shared/ui/containers';
import { intoIter } from '@/shared/lib/iterators';
import { UseValidInputResult } from '@/shared/ui/input';
import type { IProfile } from '../../model/types/profile.interface';
import type { IProfileCardEditProps } from './ProfileCardEdit.interface';
import styles from './ProfileCardEdit.module.scss';

export const ProfileCardEdit: FC<IProfileCardEditProps> = memo((props) => {
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
    const inputs = intoIter<UseValidInputResult>(validHooks);

    for (const input of inputs) {
      if (input.data.isError) {
        setIsDisable(true);
        return;
      }
    }

    setIsDisable(false);
  }, [validHooks]);

  const onSave = useCallback(() => {
    const profile: IProfile = {};

    const entries = intoIter<[keyof IProfile, UseValidInputResult]>(Object.entries(validHooks));

    for (const [key, input] of entries) {
      if (input.data.isError) return;
      profile[key] = input.data.value as any;
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
              buttonColor="danger"
              className={styles.button}
              text={t('Отменить')}
            />
          </Title>

          <Title text={t('Сохранить изменения')}>
            <Button
              buttonColor="primary"
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
});
