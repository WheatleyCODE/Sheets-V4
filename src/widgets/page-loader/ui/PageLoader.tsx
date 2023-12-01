import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Loader } from '@/shared/ui/loaders';
import { VStack } from '@/shared/ui/containers';
import { classNames } from '@/shared/lib/class-names';
import { IPageLoaderProps } from './PageLoader.interface';
import styles from './PageLoader.module.scss';

export const PageLoader: FC<IPageLoaderProps> = memo((props) => {
  const { className, ...anotherProps } = props;
  const { t } = useTranslation();

  return (
    <VStack {...anotherProps} className={classNames(styles.page_loader, {}, [className])}>
      <Loader className={styles.loader} />
      <h1 className={styles.h1}>{t('Загрузка...')}</h1>
    </VStack>
  );
});
