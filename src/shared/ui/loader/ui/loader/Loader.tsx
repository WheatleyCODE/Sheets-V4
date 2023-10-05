import { FC, memo } from 'react';
import { classNames } from 'shared/lib/class-names';
import styles from './Loader.module.scss';

interface ILoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  isCenter?: boolean;
}

export const Loader: FC<ILoaderProps> = memo((props) => {
  const { className, isCenter = false, ...anotherProps } = props;

  return (
    <div className={classNames(styles.loader_container, { [styles.center]: isCenter })}>
      <div {...anotherProps} className={classNames(styles.loader, {}, [className])}></div>
    </div>
  );
});
