import { FC } from 'react';
import { classNames } from 'shared/lib/class-names';
import { Flex, IFlexProps } from '../flex/Flex';
import styles from './HStack.module.scss';

interface IHStackProps extends Omit<IFlexProps, 'direction'> {}

export const HStack: FC<IHStackProps> = (props) => {
  const { className, children, ...anotherProps } = props;

  return (
    <Flex
      data-testid="hStack"
      {...anotherProps}
      direction="row"
      className={classNames(styles.h_stack, {}, [className])}
    >
      {children}
    </Flex>
  );
};
