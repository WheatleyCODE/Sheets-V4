import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/class-names';
import { Button } from 'shared/ui/button';
import styles from './PageError.module.scss';

interface IPageErrorProps extends React.HTMLAttributes<HTMLDivElement> {}

export const PageError: FC<IPageErrorProps> = (props) => {
  const { t } = useTranslation();
  const { className, ...anotherProps } = props;

  const reloadPage = () => {
    location.reload();
  };

  return (
    <div {...anotherProps} className={classNames(styles.page_error, {}, [className])}>
      <h1 className={styles.h1}>{t('Что-то сломалось!')}</h1>
      <Button className={styles.button} onClick={reloadPage} text={t('Перезагрузить страницу')} />
    </div>
  );
};
