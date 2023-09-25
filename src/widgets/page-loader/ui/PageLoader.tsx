import { FC } from 'react';
import { classNames } from 'shared/lib/class-names';
import { Loader } from 'shared/ui/loader';
import styles from './PageLoader.module.scss';
import { useTranslation } from 'react-i18next';

interface IPageLoaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const PageLoader: FC<IPageLoaderProps> = (props) => {
  const { t } = useTranslation();
  const { className, ...anotherProps } = props;

  return (
    <div {...anotherProps} className={classNames(styles.page_loader, {}, [className])}>
      <Loader className={styles.loader} />
      <h1 className={styles.h1}>{t('Загрузка...')}</h1>
    </div>
  );
};
