import { FC, useCallback, useState } from 'react';
import { classNames } from '@/shared/lib/class-names';
import { getStars } from './StarRating.helpers';
import type { IStarRatingProps } from './StarRating.interface';
import styles from './StarRating.module.scss';

export const StarRating: FC<IStarRatingProps> = (props) => {
  const { className, onSelectStar, initStar = 5, ...anotherProps } = props;
  const [current, setCurrent] = useState<number>(initStar);
  const [isSelect, setIsSelect] = useState(false);

  const getChangeCurrent = useCallback((num: number) => {
    return () => {
      setCurrent(num);
    };
  }, []);

  const selectStar = useCallback(
    (num: number) => {
      onSelectStar?.(num);
      setIsSelect(true);
    },
    [onSelectStar],
  );

  const resStars = getStars(current, getChangeCurrent, isSelect, selectStar);

  return (
    <div {...anotherProps} data-testid="starRating" className={classNames(styles.star_rating, {}, [className])}>
      {resStars}
    </div>
  );
};
