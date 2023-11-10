import { FC, memo } from 'react';
import { Layout } from '@/widgets/layout';
import { EditableProfile } from '@/widgets/editable-profile';
import { classNames } from '@/shared/lib/class-names';
import styles from './ProfilePage.module.scss';

const ProfilePage: FC = memo(() => {
  return (
    <Layout>
      <section data-testid="profilePage" className={classNames(styles.profile_page, {}, ['page'])}>
        <EditableProfile />
      </section>
    </Layout>
  );
});

export default ProfilePage;
