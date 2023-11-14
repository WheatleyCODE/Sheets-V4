import { FC, memo, useCallback, useState } from 'react';
import { classNames } from '@/shared/lib/class-names';
import { getStars } from './StarRating.helpers';
import type { IStarRatingProps } from './StarRating.interface';
import styles from './StarRating.module.scss';
import { Text, TextSize } from '@/shared/ui/text';

export const StarRating: FC<IStarRatingProps> = memo((props) => {
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
    <div
      {...anotherProps}
      data-testid="starRating"
      className={classNames(styles.star_rating, { [styles.select]: isSelect }, [className])}
    >
      {resStars}

      {isSelect && (
        <div className={styles.select_text_container}>
          <Text textSize={TextSize.SMALL} className={styles.select_text} text="Спасибо за оценку!" />
        </div>
      )}
    </div>
  );
});
