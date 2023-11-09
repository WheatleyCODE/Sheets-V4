import { FC } from 'react';
import { Width } from '../width/Width';
import { Flex } from '../flex/Flex';
import { classNames } from 'shared/lib/class-names';
import type { IRWidthProps } from './RWidth.interface';
import styles from './RWidth.module.scss';

export const RWidth: FC<IRWidthProps> = (props) => {
  const { className, children, ...anotherProps } = props;

  return (
    <Flex className={styles.r_width_flex}>
      <Width data-testid="rWidth" {...anotherProps} className={classNames(styles.r_width, {}, [className])}>
        {children}
      </Width>
    </Flex>
  );
};
