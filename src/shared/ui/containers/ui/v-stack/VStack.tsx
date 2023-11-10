import { FC } from 'react';
import { Flex } from '../flex/Flex';
import { classNames } from '@/shared/lib/class-names';
import type { IVStackProps } from './VStack.interface';
import styles from './VStack.module.scss';

export const VStack: FC<IVStackProps> = (props) => {
  const { className, children, ...anotherProps } = props;

  return (
    <Flex
      data-testid="vStack"
      {...anotherProps}
      direction="col"
      className={classNames(styles.v_stack, {}, [className])}
    >
      {children}
    </Flex>
  );
};
