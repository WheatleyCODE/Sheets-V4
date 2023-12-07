import { FC } from 'react';
import { motion } from 'framer-motion';
import { TextLines } from '../text-lines/TextLines';
import { classNames } from '@/shared/lib/class-names';
import type { ITextWidgetProps } from './TextWidget.interface';
import styles from './TextWidget.module.scss';

export const TextWidget: FC<ITextWidgetProps> = (props) => {
  const {
    className,
    linesCount = 8,
    delayLinesAnimation = 0,
    isLastShort = true,
    firstLetter = 'A',
    ...anotherProps
  } = props;

  return (
    <motion.div {...anotherProps} data-testid="textWidget" className={classNames(styles.text_widget, {}, [className])}>
      <TextLines
        linesCount={linesCount}
        delayLinesAnimation={delayLinesAnimation}
        firstLetter={firstLetter}
        isLastShort={isLastShort}
      />
    </motion.div>
  );
};
