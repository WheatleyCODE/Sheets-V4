import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/class-names';
import styles from './HStack.module.scss';

interface IHStackProps extends React.HTMLAttributes<HTMLDivElement> {
}

export const HStack: FC<IHStackProps> = (props) => {
  const { className, ...anotherProps } = props;
  const { t } = useTranslation();

  return (
    <div {...anotherProps} data-testid="hStack" className={classNames(styles.h_stack, {}, [className])}>
      HStack 
    </div>
  );
};
