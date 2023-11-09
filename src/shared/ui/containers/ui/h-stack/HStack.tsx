import { FC } from 'react';
import { classNames } from 'shared/lib/class-names';
import { Flex } from '../flex/Flex';
import type { IHStackProps } from './HStack.interface';
import styles from './HStack.module.scss';

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
