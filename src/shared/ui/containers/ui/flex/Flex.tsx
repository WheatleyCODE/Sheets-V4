import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/class-names';
import styles from './Flex.module.scss';

interface IFlexProps extends React.HTMLAttributes<HTMLDivElement> {
}

export const Flex: FC<IFlexProps> = (props) => {
  const { className, ...anotherProps } = props;
  const { t } = useTranslation();

  return (
    <div {...anotherProps} data-testid="flex" className={classNames(styles.flex, {}, [className])}>
      Flex 
    </div>
  );
};
