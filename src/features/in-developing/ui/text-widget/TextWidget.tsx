import { FC } from 'react';
import { classNames } from '@/shared/lib/class-names';
import type { ITextWidgetProps } from './TextWidget.interface';
import styles from './TextWidget.module.scss';

export const TextWidget: FC<ITextWidgetProps> = (props) => {
  const { className, ...anotherProps } = props;

  return (
    <div {...anotherProps} data-testid="textWidget" className={classNames(styles.text_widget, {}, [className])}>
      TextWidget 
    </div>
  );
};
