import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/button';
import { VStack } from 'shared/ui/containers';
import { classNames } from 'shared/lib/class-names';
import type { IPageErrorProps } from './PageError.interface';
import styles from './PageError.module.scss';

export const PageError: FC<IPageErrorProps> = memo((props) => {
  const { className, ...anotherProps } = props;
  const { t } = useTranslation();

  const reloadPage = () => {
    location.reload();
  };

  return (
    <VStack {...anotherProps} className={classNames(styles.page_error, {}, [className])}>
      <h1 className={styles.h1}>{t('Что-то сломалось!')}</h1>
      <Button className={styles.button} onClick={reloadPage} text={t('Перезагрузить страницу')} />
    </VStack>
  );
});
