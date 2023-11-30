import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/class-names';
import styles from './TemplateEditPage.module.scss';

const TemplateEditPage: FC = memo(() => {
  const { t } = useTranslation();

  return (
    <section data-testid="templateEditPage" className={classNames(styles.template_edit_page)}>
      TemplateEditPage
    </section>
  );
});

export default TemplateEditPage;
