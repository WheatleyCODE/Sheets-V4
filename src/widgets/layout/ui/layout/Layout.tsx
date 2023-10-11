import { FC, MutableRefObject, useRef } from 'react';
import { classNames } from 'shared/lib/class-names';
import { ModalController } from '../modal-controller/ModalController';
import styles from './Layout.module.scss';
import { useInfiniteScroll } from 'shared/lib/hooks';

interface ILayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  onScrollEnd?: () => void;
}

export const Layout: FC<ILayoutProps> = (props) => {
  const { className, children, onScrollEnd, ...anotherProps } = props;
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

  useInfiniteScroll({
    triggerRef,
    wrapperRef,
    callback: onScrollEnd,
  });

  return (
    <section
      {...anotherProps}
      ref={wrapperRef}
      data-testid="layout"
      className={classNames(styles.layout, {}, [className])}
    >
      {children}
      <ModalController />
      <div ref={triggerRef} />
    </section>
  );
};

Promise.allSettled;
