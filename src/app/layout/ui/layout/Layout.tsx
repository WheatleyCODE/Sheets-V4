import { FC, MutableRefObject, UIEvent, useCallback, useEffect, useRef } from 'react';
import { Navbar } from '@/widgets/navbar';
import { useLocation } from 'react-router-dom';
import { EventEmitter, DataTypes, EventNames } from '@/shared/lib/event-emitter';
import { ModalController } from '../modal-controller/ModalController';
import { useScrollActions } from '../../model/slice/scroll/scrollSlice';
import { useScrollPositionByPath } from '../../model/selectors/scroll/getScrollPositionByPath/getScrollPositionByPath';
import { useDebounce, useInfiniteScroll } from '@/shared/lib/hooks';
import { classNames } from '@/shared/lib/class-names';
import styles from './Layout.module.scss';

const emitter = new EventEmitter();

export const Layout: FC<FCProps> = (props) => {
  const { children, ...anotherProps } = props;
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

  const emit = useCallback(
    () => emitter.emit({ id: 'layout', eventName: EventNames.SCROLL, type: DataTypes.SCROLL_TO_BOTTOM }),
    [],
  );

  useInfiniteScroll({
    triggerRef,
    wrapperRef,
    callback: emit,
  });

  useEffect(() => {
    const div = wrapperRef.current;
    if (!div) return;

    // * After requests
    setTimeout(() => {
      div.scrollTop = scrollPosition;
    }, 0);
  }, [pathname]);

  return (
    <>
      <Navbar />
      <main
        {...anotherProps}
        ref={wrapperRef}
        data-testid="layout"
        className={classNames(styles.layout, {}, [])}
        onScroll={onScroll}
      >
        {children}
        <ModalController />
        <div ref={triggerRef} />
      </main>
    </>
  );
};
