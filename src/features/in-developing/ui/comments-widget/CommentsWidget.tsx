import { FC } from 'react';
import { classNames } from '@/shared/lib/class-names';
import type { ICommentsWidgetProps } from './CommentsWidget.interface';
import styles from './CommentsWidget.module.scss';

export const CommentsWidget: FC<ICommentsWidgetProps> = (props) => {
  const { className, ...anotherProps } = props;

  return (
    <div {...anotherProps} data-testid="commentsWidget" className={classNames(styles.comments_widget, {}, [className])}>
      CommentsWidget 
    </div>
  );
};
