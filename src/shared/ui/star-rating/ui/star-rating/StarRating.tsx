import { FC, memo, useCallback, useState } from 'react';
import { classNames } from '@/shared/lib/class-names';
import { Text } from '../../../text';
import { getStars } from './StarRating.helpers';
import type { IStarRatingProps } from './StarRating.interface';
import styles from './StarRating.module.scss';

export const StarRating: FC<IStarRatingProps> = memo((props) => {
  const {
    className,
    onSelectStar,
    initStar = 5,
    staredText = 'Спасибо за оценку!',
    isStarred = false,
    ...anotherProps
  } = props;
  const [current, setCurrent] = useState<number>(initStar);
  const [isSelect, setIsSelect] = useState(false);

  const getChangeCurrent = useCallback(
    (num: number) => {
      if (isStarred || isSelect) return () => {};

      return () => {
        setCurrent(num);
      };
    },
    [isStarred, isSelect],
  );

  const selectStar = useCallback(
    (num: number) => {
      if (isStarred || isSelect) return;

      onSelectStar?.(num);
      setIsSelect(true);
    },
    [onSelectStar, isStarred, isSelect],
  );

  const resStars = getStars(current, getChangeCurrent, isSelect, selectStar);

  return (
    <div
      {...anotherProps}
      data-testid="starRating"
      className={classNames(styles.star_rating, { [styles.select]: isSelect || isStarred }, [className])}
    >
      {resStars}

      {(isSelect || isStarred) && (
        <div className={styles.select_text_container}>
          <Text textSize="small" className={styles.select_text} text={staredText} />
        </div>
      )}
    </div>
  );
});
