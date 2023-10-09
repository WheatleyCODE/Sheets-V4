import { FC, memo, useCallback, useEffect } from 'react';
import { Layout } from 'widgets/layout';
import { useDynamicModule, useTypedDispatch } from 'shared/lib/hooks';
import {
  IProfile,
  ProfileCard,
  fetchProfile,
  getProfileError,
  getProfileIsLoading,
  getProfileIsReadonly,
  profileActions,
  profileReducer,
  updateProfile,
} from 'entities/profile';
import { useSelector } from 'react-redux';
import { getProfile } from 'entities/profile';
import { useInitialEffect } from 'shared/lib/hooks';
import { classNames } from 'shared/lib/class-names';
import styles from './ProfilePage.module.scss';

const ProfilePage: FC = memo(() => {
  useDynamicModule({ profile: profileReducer });
  const dispatch = useTypedDispatch();
  const profile = useSelector(getProfile);
  const isLoading = useSelector(getProfileIsLoading);
  const error = useSelector(getProfileError);
  const isReadonly = useSelector(getProfileIsReadonly);

  useInitialEffect(() => {
    if (__PROJECT__ === 'storybook') return;
    dispatch(fetchProfile());
  });

  const enableProfileChange = useCallback(() => {
    dispatch(profileActions.setIsReadonly(false));
  }, [dispatch]);

  const disableProfileChange = useCallback(() => {
    dispatch(profileActions.setProfile(profile));

    dispatch(profileActions.setIsReadonly(true));
  }, [dispatch, profile]);

  const saveProfileChange = useCallback(
    (profile: IProfile) => {
      dispatch(profileActions.setIsReadonly(true));
      dispatch(updateProfile(profile));
    },
    [dispatch],
  );

  return (
    <Layout>
      <div data-testid="profilePage" className={classNames(styles.profile_page, {}, ['page'])}>
        <ProfileCard
          className={styles.card}
          edit={{ disableProfileChange, enableProfileChange, saveProfileChange }}
          isReadonly={isReadonly}
          isLoading={isLoading}
          error={error}
          profile={profile}
        />
      </div>
    </Layout>
  );
});

export default ProfilePage;
