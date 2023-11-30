import { FC, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '@/entities/user';
import {
  IProfile,
  ProfileCard,
  useFetchProfile,
  useProfile,
  useProfileError,
  useProfileIsLoading,
  useProfileIsReadonly,
  profileReducer,
  useUpdateProfile,
  useProfileActions,
} from '@/entities/profile';
import { ReducersList, useDynamicModule, useInitialEffect } from '@/shared/lib/hooks';
import { classNames } from '@/shared/lib/class-names';
import type { IEditableProfileProps } from './EditableProfile.interface';
import styles from './EditableProfile.module.scss';

const reducers: ReducersList = { profile: profileReducer };

export const EditableProfile: FC<IEditableProfileProps> = (props) => {
  const { className, ...anotherProps } = props;
  useDynamicModule(reducers);

  const { id } = useParams<{ id: string }>();
  const fetchProfile = useFetchProfile();
  const updateProfile = useUpdateProfile();
  const { setIsReadonly, setProfile } = useProfileActions();
  const profile = useProfile();
  const user = useUser();
  const isLoading = useProfileIsLoading();
  const error = useProfileError();
  const isReadonly = useProfileIsReadonly();

  useInitialEffect(() => {
    if (!id) return;

    fetchProfile({ userId: id });
  });

  const enableProfileChange = useCallback(() => {
    setIsReadonly(false);
  }, [setIsReadonly]);

  const disableProfileChange = useCallback(() => {
    setProfile(profile);
    setIsReadonly(true);
  }, [profile, setIsReadonly, setProfile]);

  const saveProfileChange = useCallback(
    (newProfile: IProfile) => {
      setIsReadonly(true);
      updateProfile({ ...profile, ...newProfile });
    },
    [profile, setIsReadonly, updateProfile],
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
