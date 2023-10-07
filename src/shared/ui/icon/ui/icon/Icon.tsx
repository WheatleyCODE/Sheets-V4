import { FC, memo } from 'react';
import { IconType } from 'react-icons';
import { classNames } from 'shared/lib/class-names';
import styles from './Icon.module.scss';

interface IIconProps extends React.HTMLAttributes<HTMLOrSVGElement> {
  Icon?: IconType;
}

export const Icon: FC<IIconProps> = memo((props) => {
  const { className, Icon, ...anotherProps } = props;

  if (!Icon) return null;

  const MemoIcon = memo(Icon);

  return <MemoIcon {...anotherProps} data-testid="icon" className={classNames(styles.icon, {}, [className])} />;
});
