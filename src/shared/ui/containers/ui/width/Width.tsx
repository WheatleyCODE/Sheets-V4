import { FC } from 'react';
import { IFlexProps } from '../flex/Flex';
import { classNames } from 'shared/lib/class-names';
import styles from './Width.module.scss';

export type WidthMaxWidthNames = 'template' | 'sheets' | 'default';
export interface IWidthProps extends IFlexProps {
  maxWidth?: WidthMaxWidthNames;
}

export const Width: FC<IWidthProps> = (props) => {
  const { className, children, maxWidth = 'default', ...anotherProps } = props;

  return (
    <div {...anotherProps} data-testid="width" className={classNames(styles.width, {}, [className, styles[maxWidth]])}>
      {children}
    </div>
  );
};
