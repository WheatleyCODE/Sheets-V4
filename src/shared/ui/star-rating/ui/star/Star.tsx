import { FC, memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/class-names';
import { Icon } from '../../../icon';
import type { IStarProps } from './Star.interface';
import styles from './Star.module.scss';

export const Star: FC<IStarProps> = memo((props) => {
  const { className, isSelect, getChangeCurrent, selectStar, count, StarIcon, ...anotherProps } = props;

  const calcCount = useCallback((num: number, isLeft = false) => {
    return isLeft ? num * 2 - 1 : num * 2;
  }, []);

  const selectStarLeft = useCallback(() => {
    getChangeCurrent(calcCount(count, true))();
    selectStar(calcCount(count, true));
  }, [calcCount, count, getChangeCurrent, selectStar]);

  const selectStarRight = useCallback(() => {
    getChangeCurrent(calcCount(count))();
    selectStar(calcCount(count));
  }, [calcCount, count, getChangeCurrent, selectStar]);

  return (
    <div data-testid="star" {...anotherProps} className={classNames(styles.star, {}, [className])}>
      <div
        onClick={selectStarLeft}
        onMouseEnter={!isSelect ? getChangeCurrent(calcCount(count, true)) : undefined}
        className={styles.left}
      />

      <Icon className={styles.star_icon} Icon={StarIcon} />

      <div
        onClick={selectStarRight}
        onMouseEnter={!isSelect ? getChangeCurrent(calcCount(count)) : undefined}
        className={styles.right}
      />
    </div>
  );
});
