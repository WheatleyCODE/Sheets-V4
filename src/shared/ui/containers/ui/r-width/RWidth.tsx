import { FC } from 'react';
import { classNames } from 'shared/lib/class-names';
import styles from './RWidth.module.scss';
import { IWidthProps, Width } from '../width/Width';
import { Flex } from '../flex/Flex';

interface IRWidthProps extends IWidthProps {}

export const RWidth: FC<IRWidthProps> = (props) => {
  const { className, ...anotherProps } = props;

  return (
    <Flex className={styles.r_width_flex}>
      <Width {...anotherProps} data-testid="rWidth" className={classNames(styles.r_width, {}, [className])}></Width>
    </Flex>
  );
};
