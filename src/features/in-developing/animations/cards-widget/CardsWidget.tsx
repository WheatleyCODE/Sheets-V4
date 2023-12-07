import { FC, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { classNames } from '@/shared/lib/class-names';
import type { ICardsWidgetProps } from './CardsWidget.interface';
import styles from './CardsWidget.module.scss';
import { TextLines } from '../text-widget/ui/text-lines/TextLines';

const carsArr = [1, 2, 3];

export const CardsWidget: FC<ICardsWidgetProps> = (props) => {
  const { className, delayLinesAnimation = 6, isLastShort = true, linesCount = 4, ...anotherProps } = props;

  const cards = carsArr.map((val) => (
    <motion.div className={classNames(styles.card, {}, [styles[`_v${val}`]])}>
      <div className={classNames(styles.card_circle, {}, [])}>
        <div className={classNames(styles.raz, {}, [styles[`_v${val}`]])} />
        <div className={classNames(styles.raz_shadow, {}, [])} />
      </div>
      <TextLines delayLinesAnimation={delayLinesAnimation} linesCount={linesCount} isLastShort={isLastShort} />
    </motion.div>
  ));

  return (
    <motion.div
      {...anotherProps}
      data-testid="cardsWidget"
      className={classNames(styles.cards_widget, {}, [className])}
    >
      {cards}
    </motion.div>
  );
};
