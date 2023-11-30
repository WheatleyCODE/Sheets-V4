import { FC, MutableRefObject, UIEvent, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { ModalController } from '../modal-controller/ModalController';
import { useScrollActions } from '../../model/slice/scroll/scrollSlice';
import { useScrollPositionByPath } from '../../model/selectors/scroll/getScrollPositionByPath/getScrollPositionByPath';
import { useDebounce, useInfiniteScroll, useInitialEffect } from '@/shared/lib/hooks';
import { classNames } from '@/shared/lib/class-names';
import type { ILayoutProps } from './Layout.interface';
import styles from './Layout.module.scss';

export const Layout: FC<ILayoutProps> = (props) => {
  const { className, children, onScrollEnd, ...anotherProps } = props;
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const { setScrollPosition } = useScrollActions();
  const { pathname } = useLocation();
  const scrollPosition = useScrollPositionByPath(pathname);

  const debouncedSetScrollPosition = useDebounce((position: number) => {
    setScrollPosition({ path: pathname, position });
  }, 300);

  const onScroll = useCallback(
    (e: UIEvent<HTMLDivElement>) => {
      debouncedSetScrollPosition(e.currentTarget.scrollTop);
    },
    [debouncedSetScrollPosition],
  );

  useInfiniteScroll({
    triggerRef,
    wrapperRef,
    callback: onScrollEnd,
  });

  useInitialEffect(() => {
    const div = wrapperRef.current;
    if (!div) return;

    div.scrollTop = scrollPosition;
  });

  return (
    <main
      {...anotherProps}
      ref={wrapperRef}
      data-testid="layout"
      className={classNames(styles.layout, {}, [className])}
      onScroll={onScroll}
    >
      {children}
      <ModalController />
      <div ref={triggerRef} />
    </main>
  );
};
