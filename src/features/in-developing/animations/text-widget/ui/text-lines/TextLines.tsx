import { FC } from 'react';
import { motion } from 'framer-motion';
import { DEFAULT_DURATION_X2, DEFAULT_DURATION_X2_DELAY } from '../../../../consts/animations';
import { classNames } from '@/shared/lib/class-names';
import type { ITextLinesProps } from './TextLines.interface';
import styles from './TextLines.module.scss';

export const TextLines: FC<ITextLinesProps> = (props) => {
  const { className, linesCount, isLastShort, delayLinesAnimation = 0, firstLetter, ...anotherProps } = props;

  const linesArr = new Array(linesCount).fill(null);

  const lines = linesArr.map((_, i) => {
    if (firstLetter && i === 0) {
      return (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          exit={{ width: 0 }}
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
        animate={{ width: i === linesArr.length - 1 && isLastShort ? '50%' : '100%' }}
        exit={{ width: 0 }}
        transition={{ duration: DEFAULT_DURATION_X2, delay: DEFAULT_DURATION_X2_DELAY * (i + delayLinesAnimation) }}
        className={classNames(
          styles.text_line,
          { [styles.short]: i === linesArr.length - 1 && isLastShort ? true : false },
          [],
        )}
      />
    );
  });

  return (
    <div {...anotherProps} data-testid="textLines" className={classNames(styles.text_lines, {}, [className])}>
      {lines}
    </div>
  );
};
