import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/class-names';
import styles from './Width.module.scss';

interface IWidthProps extends React.HTMLAttributes<HTMLDivElement> {
}

export const Width: FC<IWidthProps> = (props) => {
  const { className, ...anotherProps } = props;
  const { t } = useTranslation();

  return (
    <div {...anotherProps} data-testid="width" className={classNames(styles.width, {}, [className])}>
      Width 
    </div>
  );
};
