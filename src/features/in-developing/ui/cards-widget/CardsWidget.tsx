import { FC } from 'react';
import { classNames } from '@/shared/lib/class-names';
import type { ICardsWidgetProps } from './CardsWidget.interface';
import styles from './CardsWidget.module.scss';

export const CardsWidget: FC<ICardsWidgetProps> = (props) => {
  const { className, ...anotherProps } = props;

  return (
    <div {...anotherProps} data-testid="cardsWidget" className={classNames(styles.cards_widget, {}, [className])}>
      CardsWidget 
    </div>
  );
};
