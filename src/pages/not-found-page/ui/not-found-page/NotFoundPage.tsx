import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/class-names';
import styles from './NotFoundPage.module.scss';

const NotFoundPage: FC = memo(() => {
  const { t } = useTranslation();

  return (
    <section data-testid="notFoundPage" className={classNames(styles.not_fount_page, {}, [])}>
      <h1 className={styles.h1}>{t('Страница не найдена')}</h1>
    </section>
  );
});

export default NotFoundPage;
