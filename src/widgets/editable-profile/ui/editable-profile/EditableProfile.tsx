import { FC, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '@/entities/user';
import {
  IProfile,
  ProfileCard,
  fetchProfile,
  useProfile,
  useProfileError,
  useProfileIsLoading,
  useProfileIsReadonly,
  profileActions,
  profileReducer,
  updateProfile,
} from '@/entities/profile';
import { ReducersList, useDynamicModule, useInitialEffect, useTypedDispatch } from '@/shared/lib/hooks';
import { classNames } from '@/shared/lib/class-names';
import type { IEditableProfileProps } from './EditableProfile.interface';
import styles from './EditableProfile.module.scss';

const reducers: ReducersList = { profile: profileReducer };

export const EditableProfile: FC<IEditableProfileProps> = (props) => {
  const { className, ...anotherProps } = props;
  useDynamicModule(reducers);
  const { id } = useParams<{ id: string }>();
  const dispatch = useTypedDispatch();
  const profile = useProfile();
  const user = useUser();
  const isLoading = useProfileIsLoading();
  const error = useProfileError();
  const isReadonly = useProfileIsReadonly();

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
    <div
      {...anotherProps}
      data-testid="editableProfile"
      className={classNames(styles.editable_profile, {}, [className])}
    >
      <ProfileCard
        className={styles.card}
        edit={getEdit()}
        isReadonly={isReadonly}
        isLoading={isLoading}
        error={error}
        profile={profile}
      />
    </div>
  );
};
