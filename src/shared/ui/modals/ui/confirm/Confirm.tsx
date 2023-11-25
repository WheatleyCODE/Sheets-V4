import { FC } from 'react';
import { HStack } from '../../../containers';
import { Button } from '../../../button';
import { Text } from '../../../text';
import { classNames } from '@/shared/lib/class-names';
import type { IConfirmProps } from './Confirm.interface';
import styles from './Confirm.module.scss';

export const Confirm: FC<IConfirmProps> = (props) => {
  const {
    className,
    acceptTitle = 'Ок',
    cancelTitle = 'Отмена',
    onAccept,
    onCancel,
    children,
    title = 'Заголовок',
    ...anotherProps
  } = props;

  return (
    <div {...anotherProps} data-testid="confirm" className={classNames(styles.confirm, {}, [className])}>
      <Text className={styles.title} title={title} />

      {children}

      <HStack justify="space-between" className={styles.buttons}>
        <Button data-testid="confirm.accept" onClick={onAccept} text={acceptTitle} buttonColor="primary" />
        <Button data-testid="confirm.cancel" onClick={onCancel} text={cancelTitle} />
      </HStack>
    </div>
  );
};
