import { FC } from 'react';
import { classNames } from 'shared/lib/class-names';
import { ModalController } from '../modal-controller/ModalController';
import styles from './Layout.module.scss';

interface ILayoutProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Layout: FC<ILayoutProps> = (props) => {
  const { className, children, ...anotherProps } = props;

  return (
    <div {...anotherProps} className={classNames(styles.layout, {}, [className])}>
      {children}
      <ModalController />
    </div>
  );
};
