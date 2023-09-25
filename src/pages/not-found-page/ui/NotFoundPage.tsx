import { FC } from 'react';
import { classNames } from 'shared/lib/class-names';
import styles from './NotFoundPage.module.scss';
import { useTranslation } from 'react-i18next';

interface INotFoundPageProps extends React.HTMLAttributes<HTMLDivElement> {}

const NotFoundPage: FC<INotFoundPageProps> = (props) => {
  const { t } = useTranslation();
  const { className, ...anotherProps } = props;

  return (
    <div {...anotherProps} className={classNames(styles.not_fount_page, {}, [className, 'page'])}>
      <h1 className={styles.h1}>{t('Страница не найдена')}</h1>
    </div>
  );
};

export default NotFoundPage;
