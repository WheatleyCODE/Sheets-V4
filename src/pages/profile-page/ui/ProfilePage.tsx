import { FC, memo } from 'react';
import { Layout } from 'widgets/layout';
import { classNames } from 'shared/lib/class-names';
import styles from './ProfilePage.module.scss';
import { useDynamicModule } from 'shared/lib/hooks/useDynamicModule';
import { profileReducer } from 'entities/profile';

const ProfilePage: FC = memo(() => {
  useDynamicModule({ profile: profileReducer });

  return (
    <Layout>
      <div className={classNames(styles.user_page, {}, ['page'])}>ProfilePage</div>
    </Layout>
  );
});

export default ProfilePage;
