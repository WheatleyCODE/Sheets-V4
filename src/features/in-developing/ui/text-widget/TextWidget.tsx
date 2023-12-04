import { FC } from 'react';
import { classNames } from '@/shared/lib/class-names';
import type { ITextWidgetProps } from './TextWidget.interface';
import styles from './TextWidget.module.scss';

export const TextWidget: FC<ITextWidgetProps> = (props) => {
  const { className, linesCount = 8, firstLetter = 'A', ...anotherProps } = props;

  const linesArr = new Array(linesCount).fill(null);

  const lines = linesArr.map((_, i) => {
    if (firstLetter && i === 0) {
      return (
        <div className={classNames(styles.text_line_container, {}, [])}>
          <div className={classNames(styles.text_letter, {}, [])}>{firstLetter}</div>
          <div className={classNames(styles.text_line, {}, [])} />
        </div>
      );
    }

    return <div className={classNames(styles.text_line, {}, [])} />;
  });

  return (
    <div {...anotherProps} data-testid="textWidget" className={classNames(styles.text_widget, {}, [className])}>
      {lines}
    </div>
  );
};
