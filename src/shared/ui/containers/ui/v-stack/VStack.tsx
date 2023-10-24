import { FC } from 'react';
import { Flex, IFlexProps } from '../flex/Flex';
import { classNames } from 'shared/lib/class-names';
import styles from './VStack.module.scss';

interface IVStackProps extends Omit<IFlexProps, 'direction'> {}

export const VStack: FC<IVStackProps> = (props) => {
  const { className, children, ...anotherProps } = props;

  return (
    <Flex
      {...anotherProps}
      direction="col"
      data-testid="vStack"
      className={classNames(styles.v_stack, {}, [className])}
    >
      {children}
    </Flex>
  );
};
