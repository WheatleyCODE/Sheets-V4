import { FC } from 'react';
import { classNames } from 'shared/lib/class-names';
import styles from './Card.module.scss';

interface ICardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card: FC<ICardProps> = (props) => {
  const { className, ...anotherProps } = props;

  return <div {...anotherProps} data-testid="card" className={classNames(styles.card, {}, [className])} />;
};
