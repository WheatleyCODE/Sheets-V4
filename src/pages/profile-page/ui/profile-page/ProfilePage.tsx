import { FC, memo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Layout } from 'widgets/layout';
import { getUser } from 'features/user';
import { getProfile } from 'entities/profile';
import { ReducersList, useDynamicModule, useTypedDispatch } from 'shared/lib/hooks';
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
import { useInitialEffect } from 'shared/lib/hooks';
import { classNames } from 'shared/lib/class-names';
import styles from './ProfilePage.module.scss';

const reducers: ReducersList = { profile: profileReducer };

const ProfilePage: FC = memo(() => {
  useDynamicModule(reducers);
  const { id } = useParams<{ id: string }>();
  const dispatch = useTypedDispatch();
  const profile = useSelector(getProfile);
  const user = useSelector(getUser);
  const isLoading = useSelector(getProfileIsLoading);
  const error = useSelector(getProfileError);
  const isReadonly = useSelector(getProfileIsReadonly);

  useInitialEffect(() => {
    if (!id) return;

    dispatch(fetchProfile({ userId: id }));
  });

  const enableProfileChange = useCallback(() => {
    dispatch(profileActions.setIsReadonly(false));
  }, [dispatch]);

  const disableProfileChange = useCallback(() => {
    dispatch(profileActions.setProfile(profile));

    dispatch(profileActions.setIsReadonly(true));
  }, [dispatch, profile]);

  const saveProfileChange = useCallback(
    (newProfile: IProfile) => {
      dispatch(profileActions.setIsReadonly(true));
      console.log({ ...profile, ...newProfile });

      dispatch(updateProfile({ ...profile, ...newProfile }));
    },
    [dispatch, profile],
  );

  const getEdit = () => {
    if (user && user.id !== profile.userId) return;
    return { disableProfileChange, enableProfileChange, saveProfileChange };
  };

  return (
    <Layout>
      <section data-testid="profilePage" className={classNames(styles.profile_page, {}, ['page'])}>
        <ProfileCard
          className={styles.card}
          edit={getEdit()}
          isReadonly={isReadonly}
          isLoading={isLoading}
          error={error}
          profile={profile}
        />
      </section>
    </Layout>
  );
});

export default ProfilePage;
