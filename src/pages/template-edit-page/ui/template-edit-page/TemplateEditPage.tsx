import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Layout } from 'widgets/layout';
import { classNames } from 'shared/lib/class-names';
import styles from './TemplateEditPage.module.scss';

const TemplateEditPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;
  const { t } = useTranslation();

  return (
    <Layout>
      <section data-testid="templateEditPage" className={classNames(styles.template_edit_page)}>
        TemplateEditPage
      </section>
    </Layout>
  );
};

export default TemplateEditPage;
