import { FC, memo } from 'react';
import { InDeveloping } from '@/features/in-developing';
import { classNames } from '@/shared/lib/class-names';
import styles from './AdminPanelPage.module.scss';

const AdminPanelPage: FC = memo(() => {
  return (
    <section data-testid="adminPanelPage" className={classNames(styles.admin_panel_page)}>
      <InDeveloping />
    </section>
  );
});

export default AdminPanelPage;
