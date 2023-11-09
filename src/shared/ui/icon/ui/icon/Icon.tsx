import { FC, memo } from 'react';
import { classNames } from 'shared/lib/class-names';
import type { IIconProps } from './Icon.interface';
import styles from './Icon.module.scss';

export const Icon: FC<IIconProps> = memo((props) => {
  const { className, Icon, ...anotherProps } = props;

  if (!Icon) return null;

  const MemoIcon = memo(Icon);

  return <MemoIcon {...anotherProps} data-testid="icon" className={classNames(styles.icon, {}, [className])} />;
});
