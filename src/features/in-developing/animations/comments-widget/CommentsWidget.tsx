import { FC } from 'react';
import { motion } from 'framer-motion';
import { MdPerson } from 'react-icons/md';
import { classNames } from '@/shared/lib/class-names';
import type { ICommentsWidgetProps } from './CommentsWidget.interface';
import styles from './CommentsWidget.module.scss';
import { TextLines } from '../text-widget/ui/text-lines/TextLines';
import { DEFAULT_DURATION, DEFAULT_DURATION_DELAY, DEFAULT_DURATION_X2_DELAY } from '../../consts/animations';

const commentsArr = [1, 2, 3];

export const CommentsWidget: FC<ICommentsWidgetProps> = (props) => {
  const { className, delayLinesAnimation = 0, ...anotherProps } = props;

  const comments = commentsArr.map((el, i) => (
    <div className={classNames(styles.comment, {}, [styles[`_v${el}`]])}>
      <div className={classNames(styles.square, {}, [])}>
        <div className={classNames(styles.circle, {}, [])}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: DEFAULT_DURATION,
              repeat: Infinity,
              repeatDelay: DEFAULT_DURATION_DELAY,
              repeatType: 'reverse',
              delay: DEFAULT_DURATION_X2_DELAY * delayLinesAnimation + DEFAULT_DURATION_X2_DELAY * i,
            }}
          >
            <MdPerson />
          </motion.div>
        </div>
      </div>
      <div className={classNames(styles.text, {}, [])}>
        <div className={classNames(styles.text_triangle, {}, [])}></div>
        <TextLines linesCount={2} isLastShort={false} delayLinesAnimation={delayLinesAnimation} />
      </div>
    </div>
  ));

  return (
    <motion.div
      {...anotherProps}
      data-testid="commentsWidget"
      className={classNames(styles.comments_widget, {}, [className])}
    >
      <div className={classNames(styles.line, {}, [])} />

      {comments}
    </motion.div>
  );
};
