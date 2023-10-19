import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/class-names';
import styles from './VStack.module.scss';

interface IVStackProps extends React.HTMLAttributes<HTMLDivElement> {
}

export const VStack: FC<IVStackProps> = (props) => {
  const { className, ...anotherProps } = props;
  const { t } = useTranslation();

  return (
    <div {...anotherProps} data-testid="vStack" className={classNames(styles.v_stack, {}, [className])}>
      VStack 
    </div>
  );
};
