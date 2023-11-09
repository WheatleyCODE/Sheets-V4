import { IInputValidHooks } from '../profile-card/ProfileCard.interface';
import type { IProfile } from '../../model/types/profile.interface';

export interface IProfileCardEditProps extends React.HTMLAttributes<HTMLDivElement> {
  enableProfileChange: () => void;
  disableProfileChange: () => void;
  saveProfileChange: (profile: IProfile) => void;
  isReadonly: boolean;
  validHooks: IInputValidHooks;
}
