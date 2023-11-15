import { FC } from 'react';
import { classNames } from '@/shared/lib/class-names';
import { HStack } from '@/shared/ui/containers';
import { Button } from '@/shared/ui/button';
import type { IConfirmProps } from './Confirm.interface';
import styles from './Confirm.module.scss';

// ! FIX

export const Confirm: FC<IConfirmProps> = (props) => {
  const { className, acceptTitle = 'Ок', cancelTitle = 'Отмена', ...anotherProps } = props;

  return (
    <div {...anotherProps} data-testid="confirm" className={classNames(styles.confirm, {}, [className])}>
      <HStack>
        <Button text={acceptTitle} />
        <Button text={cancelTitle} />
      </HStack>
    </div>
  );
};
