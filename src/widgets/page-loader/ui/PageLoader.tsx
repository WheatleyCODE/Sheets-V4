import { FC, memo } from 'react';
import { Loader } from 'shared/ui/loader';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/class-names';
import styles from './PageLoader.module.scss';

interface IPageLoaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const PageLoader: FC<IPageLoaderProps> = memo((props) => {
  const { className, ...anotherProps } = props;
  const { t } = useTranslation();

  return (
    <div {...anotherProps} className={classNames(styles.page_loader, {}, [className])}>
      <Loader className={styles.loader} />
      <h1 className={styles.h1}>{t('Загрузка')}</h1>
    </div>
  );
});
