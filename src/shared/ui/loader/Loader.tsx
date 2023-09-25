import { FC } from 'react';
import { classNames } from 'shared/lib/class-names';
import styles from './Loader.module.scss';

interface ILoaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Loader: FC<ILoaderProps> = (props) => {
  const { className, ...anotherProps } = props;

  return <div {...anotherProps} className={classNames(styles.loader, {}, [className])}></div>;
};
