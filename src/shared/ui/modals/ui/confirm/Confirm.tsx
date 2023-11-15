import { FC } from 'react';
import { classNames } from '@/shared/lib/class-names';
import { HStack } from '@/shared/ui/containers';
import { Button } from '@/shared/ui/button';
import { Text } from '@/shared/ui/text';
import type { IConfirmProps } from './Confirm.interface';
import styles from './Confirm.module.scss';

export const Confirm: FC<IConfirmProps> = (props) => {
  const {
    className,
    acceptTitle = 'Ок',
    cancelTitle = 'Отмена',
    children,
    title = 'Заголовок',
    ...anotherProps
  } = props;

  return (
    <div {...anotherProps} data-testid="confirm" className={classNames(styles.confirm, {}, [className])}>
      <Text className={styles.title} title={title} />

      {children}

      <HStack justify="space-between" className={styles.buttons}>
        <Button text={acceptTitle} buttonColor="primary" />
        <Button text={cancelTitle} />
      </HStack>
    </div>
  );
};
