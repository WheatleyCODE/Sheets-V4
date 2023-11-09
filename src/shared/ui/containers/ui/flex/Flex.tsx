import { FC } from 'react';
import { classNames } from 'shared/lib/class-names';
import type { IFlexProps } from './Flex.interface';
import styles from './Flex.module.scss';

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
    <div data-testid="flex" {...anotherProps} className={classNames(styles.flex, {}, [className, ...flexClassNames])}>
      {children}
    </div>
  );
};
