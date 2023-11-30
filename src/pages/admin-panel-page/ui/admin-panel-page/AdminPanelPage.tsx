import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/class-names';
import styles from './AdminPanelPage.module.scss';

const AdminPanelPage: FC = memo(() => {
  const { t } = useTranslation();

  return (
    <section data-testid="adminPanelPage" className={classNames(styles.admin_panel_page)}>
      AdminPanelPage
    </section>
  );
});

export default AdminPanelPage;
