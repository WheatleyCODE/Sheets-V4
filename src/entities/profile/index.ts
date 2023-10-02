export { IProfile, IProfileSchema } from './model/types/profile';
export { profileActions, profileReducer } from './model/slice/profileSlice';
export { fetchProfile } from './model/services/fetchProfile';
export { getProfileFirstname } from './model/selectors/get-profile-firstname/getProfileFirstname';
export { getProfileLastname } from './model/selectors/get-profile-lastname/get-profile-lastname';
export { ProfileCard } from './ui/profile-card/ProfileCard';
