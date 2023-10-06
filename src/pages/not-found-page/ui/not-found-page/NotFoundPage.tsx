import { FC, memo } from 'react';
import { Layout } from 'widgets/layout';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/class-names';
import styles from './NotFoundPage.module.scss';

interface INotFoundPageProps extends React.HTMLAttributes<HTMLDivElement> {}

const NotFoundPage: FC<INotFoundPageProps> = memo((props) => {
  const { t } = useTranslation();
  const { className, ...anotherProps } = props;

  return (
    <Layout>
      <div
        data-testid="notFoundPage"
        {...anotherProps}
        className={classNames(styles.not_fount_page, {}, [className, 'page'])}
      >
        <h1 className={styles.h1}>{t('Страница не найдена')}</h1>
      </div>
    </Layout>
  );
});

export default NotFoundPage;
