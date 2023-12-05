import { FC } from 'react';
import { motion } from 'framer-motion';
import { classNames } from '@/shared/lib/class-names';
import type { ICommentsWidgetProps } from './CommentsWidget.interface';
import styles from './CommentsWidget.module.scss';

export const CommentsWidget: FC<ICommentsWidgetProps> = (props) => {
  const { className, ...anotherProps } = props;

  return (
    <motion.div
      {...anotherProps}
      data-testid="commentsWidget"
      className={classNames(styles.comments_widget, {}, [className])}
    >
      <div className={classNames(styles.line, {}, [])} />
      <div className={classNames(styles.comment, {}, [styles._v1])}>
        <div className={classNames(styles.square, {}, [])}>
          <div className={classNames(styles.circle, {}, [])}></div>
        </div>
        <div className={classNames(styles.text, {}, [])}>
          <div className={classNames(styles.text_triangle, {}, [])}></div>
          <div className={classNames(styles.text_line, {}, [])}></div>
          <div className={classNames(styles.text_line, {}, [])}></div>
        </div>
      </div>

      <div className={classNames(styles.comment, {}, [styles._v2])}>
        <div className={classNames(styles.square, {}, [])}>
          <div className={classNames(styles.circle, {}, [])}></div>
        </div>
        <div className={classNames(styles.text, {}, [])}>
          <div className={classNames(styles.text_triangle, {}, [])}></div>
          <div className={classNames(styles.text_line, {}, [])}></div>
          <div className={classNames(styles.text_line, {}, [])}></div>
        </div>
      </div>

      <div className={classNames(styles.comment, {}, [styles._v3])}>
        <div className={classNames(styles.square, {}, [])}>
          <div className={classNames(styles.circle, {}, [])}></div>
        </div>
        <div className={classNames(styles.text, {}, [])}>
          <div className={classNames(styles.text_triangle, {}, [])}></div>
          <div className={classNames(styles.text_line, {}, [])}></div>
          <div className={classNames(styles.text_line, {}, [])}></div>
        </div>
      </div>
    </motion.div>
  );
};
