import { FC } from 'react';
import { classNames } from 'shared/lib/class-names';
import styles from './Flex.module.scss';

export type FlexJustify = 'start' | 'center' | 'end' | 'space-around' | 'space-between' | 'space-evenly';
export type FlexAlign = 'start' | 'center' | 'end';
export type FlexDirection = 'row' | 'col' | 'row-reverse' | 'col-reverse';
export type FlexGapMultiply = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10';
export interface IFlexProps extends React.HTMLAttributes<HTMLDivElement> {
  justify?: FlexJustify;
  align?: FlexAlign;
  direction?: FlexDirection;
  gapMultiply?: FlexGapMultiply;
}

export const Flex: FC<IFlexProps> = (props) => {
  const {
    className,
    children,
    justify = 'center',
    align = 'center',
    gapMultiply = '0',
    direction = 'row',
    ...anotherProps
  } = props;

  const flexClassNames = Object.entries({ justify, align, direction, gapMultiply }).map(
    ([key, val]) => styles[`${key}_${val}`],
  );

  return (
    <div {...anotherProps} data-testid="flex" className={classNames(styles.flex, {}, [className, ...flexClassNames])}>
      {children}
    </div>
  );
};
