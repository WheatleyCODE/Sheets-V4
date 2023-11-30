import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/class-names';
import styles from './TemplateCreatePage.module.scss';

const TemplateCreatePage: FC = memo(() => {
  const { t } = useTranslation();

  return (
    <section data-testid="templateCreatePage" className={classNames(styles.template_create_page, {}, [])}>
      TemplateCreatePage
    </section>
  );
});

export default TemplateCreatePage;
