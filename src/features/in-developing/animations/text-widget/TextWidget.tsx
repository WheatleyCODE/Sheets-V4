import { FC } from 'react';
import { motion } from 'framer-motion';
import { DEFAULT_DURATION_X2_DELAY, DEFAULT_DURATION_X2 } from '../../consts/animations';
import { classNames } from '@/shared/lib/class-names';
import type { ITextWidgetProps } from './TextWidget.interface';
import styles from './TextWidget.module.scss';

export const TextWidget: FC<ITextWidgetProps> = (props) => {
  const { className, linesCount = 8, delayLinesAnimation = 0, firstLetter = 'A', ...anotherProps } = props;

  const linesArr = new Array(linesCount).fill(null);

  const lines = linesArr.map((_, i) => {
    if (firstLetter && i === 0) {
      return (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{
            duration: DEFAULT_DURATION_X2,
            delay: DEFAULT_DURATION_X2_DELAY * (i + delayLinesAnimation),
          }}
          className={classNames(styles.text_line_container, {}, [])}
        >
          <div className={classNames(styles.text_letter, {}, [])}>{firstLetter}</div>
          <div className={classNames(styles.text_line, {}, [])} />
        </motion.div>
      );
    }

    return (
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: i === linesArr.length - 1 ? '50%' : '100%' }}
        transition={{ duration: DEFAULT_DURATION_X2, delay: DEFAULT_DURATION_X2_DELAY * (i + delayLinesAnimation) }}
        className={classNames(styles.text_line, { [styles.short]: i === linesArr.length - 1 }, [])}
      />
    );
  });

  return (
    <motion.div {...anotherProps} data-testid="textWidget" className={classNames(styles.text_widget, {}, [className])}>
      {lines}
    </motion.div>
  );
};
