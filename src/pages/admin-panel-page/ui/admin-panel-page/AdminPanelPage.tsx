import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Layout } from 'widgets/layout';
import { classNames } from 'shared/lib/class-names';
import styles from './AdminPanelPage.module.scss';

const AdminPanelPage: FC = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <section data-testid="adminPanelPage" className={classNames(styles.admin_panel_page)}>
        AdminPanelPage
      </section>
    </Layout>
  );
};

export default AdminPanelPage;
