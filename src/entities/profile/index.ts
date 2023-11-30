export type { IProfile, IProfileSchema } from './model/types/profile.interface';
export { profileActions, profileReducer, useProfileActions } from './model/slice/profileSlice';
export { fetchProfile, useFetchProfile } from './model/services/fetch-profile/fetchProfile';
export { ProfileCard } from './ui/profile-card/ProfileCard';
export { updateProfile, useUpdateProfile } from './model/services/update-profille/updateProfile';
export { Country, Currency } from './model/consts/profile.consts';

export { getProfileFirstname, useProfileFirstName } from './model/selectors/get-profile-firstname/getProfileFirstname';
export { getProfile, useProfile } from './model/selectors/get-profile/getProfile';
export { getProfileLastname, useProfileLastname } from './model/selectors/get-profile-lastname/getProfileLastname';
export { getProfileIsLoading, useProfileIsLoading } from './model/selectors/get-profile-is-loading/getProfileIsLoading';
export { getProfileError, useProfileError } from './model/selectors/get-profile-error/getProfileError';
export {
  getProfileIsReadonly,
  useProfileIsReadonly,
} from './model/selectors/get-profile-is-readonly/getProfileIsReadonly';
