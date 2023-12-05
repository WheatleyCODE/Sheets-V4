import { FC } from 'react';
import { motion } from 'framer-motion';
import { classNames } from '@/shared/lib/class-names';
import type { ICardsWidgetProps } from './CardsWidget.interface';
import styles from './CardsWidget.module.scss';

export const CardsWidget: FC<ICardsWidgetProps> = (props) => {
  const { className, ...anotherProps } = props;

  return (
    <motion.div
      {...anotherProps}
      data-testid="cardsWidget"
      className={classNames(styles.cards_widget, {}, [className])}
    >
      <div className={classNames(styles.card, {}, [styles._v1])}>
        <div className={classNames(styles.card_circle, {}, [])}></div>
        <div className={classNames(styles.card_line, {}, [styles._v1])}></div>
        <div className={classNames(styles.card_line, {}, [styles._v2])}></div>
        <div className={classNames(styles.card_line, {}, [styles._v3])}></div>
        <div className={classNames(styles.card_line, {}, [styles._v4])}></div>
      </div>

      <div className={classNames(styles.card, {}, [styles._v2])}>
        <div className={classNames(styles.card_circle, {}, [])}></div>
        <div className={classNames(styles.card_line, {}, [styles._v1])}></div>
        <div className={classNames(styles.card_line, {}, [styles._v2])}></div>
        <div className={classNames(styles.card_line, {}, [styles._v3])}></div>
        <div className={classNames(styles.card_line, {}, [styles._v4])}></div>
      </div>

      <div className={classNames(styles.card, {}, [styles._v3])}>
        <div className={classNames(styles.card_circle, {}, [])}></div>
        <div className={classNames(styles.card_line, {}, [styles._v1])}></div>
        <div className={classNames(styles.card_line, {}, [styles._v2])}></div>
        <div className={classNames(styles.card_line, {}, [styles._v3])}></div>
        <div className={classNames(styles.card_line, {}, [styles._v4])}></div>
      </div>
    </motion.div>
  );
};
