import { FC, memo, useEffect } from 'react';
import { Layout } from 'widgets/layout';
import { classNames } from 'shared/lib/class-names';
import styles from './ProfilePage.module.scss';
import { useDynamicModule } from 'shared/lib/hooks/useDynamicModule';
import { ProfileCard, fetchProfile, profileReducer } from 'entities/profile';
import { useTypedDispatch } from 'shared/lib/hooks/useTypedDispatch';

const ProfilePage: FC = memo(() => {
  useDynamicModule({ profile: profileReducer });
  const dispatch = useTypedDispatch();

  useEffect(() => {
    // dispatch(fetchProfile());
  }, []);

  return (
    <Layout>
      <div className={classNames(styles.user_page, {}, ['page'])}>
        <ProfileCard />
      </div>
    </Layout>
  );
});

export default ProfilePage;
