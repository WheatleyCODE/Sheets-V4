import { FC, MutableRefObject, UIEvent, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ModalController } from '../modal-controller/ModalController';
import { scrollActions } from '../../model/slice/scroll/scrollSlice';
import { getScrollPositionByPath } from '../../model/selectors/scroll/getScrollPositionByPath/getScrollPositionByPath';
import { IStateSchema } from 'app/providers/store-provider';
import { useDebounce, useInfiniteScroll, useInitialEffect, useTypedDispatch } from 'shared/lib/hooks';
import { classNames } from 'shared/lib/class-names';
import styles from './Layout.module.scss';

interface ILayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  onScrollEnd?: () => void;
}

export const Layout: FC<ILayoutProps> = (props) => {
  const { className, children, onScrollEnd, ...anotherProps } = props;
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const dispatch = useTypedDispatch();
  const { pathname } = useLocation();
  const scrollPosition = useSelector((state: IStateSchema) => getScrollPositionByPath(state, pathname));

  const debouncedSetScrollPosition = useDebounce((position: number) => {
    dispatch(scrollActions.setScrollPosition({ path: pathname, position }));
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
