import { FC } from 'react';
import { classNames } from '@/shared/lib/class-names';
import type { ICardProps } from './Card.interface';
import styles from './Card.module.scss';

export const Card: FC<ICardProps> = (props) => {
  const { className, ...anotherProps } = props;

  return <div {...anotherProps} data-testid="card" className={classNames(styles.card, {}, [className])} />;
};
