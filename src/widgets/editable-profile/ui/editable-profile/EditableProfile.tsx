import { FC, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUser } from 'features/user';
import {
  IProfile,
  ProfileCard,
  fetchProfile,
  getProfile,
  getProfileError,
  getProfileIsLoading,
  getProfileIsReadonly,
  profileActions,
  profileReducer,
  updateProfile,
} from 'entities/profile';
import { ReducersList, useDynamicModule, useInitialEffect, useTypedDispatch } from 'shared/lib/hooks';
import { classNames } from 'shared/lib/class-names';
import type { IEditableProfileProps } from './EditableProfile.interface';
import styles from './EditableProfile.module.scss';

const reducers: ReducersList = { profile: profileReducer };

export const EditableProfile: FC<IEditableProfileProps> = (props) => {
  const { className, ...anotherProps } = props;
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
