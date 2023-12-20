import { FC } from 'react';
import { Text } from '../../../text';
import { Button } from '../../../button';
import { classNames } from '@/shared/lib/class-names';
import type { ISnackbarProps } from './Snackbar.interface';
import styles from './Snackbar.module.scss';

export const Snackbar: FC<ISnackbarProps> = (props) => {
  const { className, dataChangers, eventHandlers, ref, ...anotherProps } = props;

  return (
    <div
      {...anotherProps}
      ref={ref}
      {...eventHandlers}
      data-testid="snackbar"
      className={classNames(styles.snackbar, {}, [className])}
    >
      <Text className={styles.text} text="Рандомный текст" />
      <Button text="Закрыть" onClick={dataChangers.toggleIsShow} />
    </div>
  );
};
