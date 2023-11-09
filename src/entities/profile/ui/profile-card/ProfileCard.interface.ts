import { IInputOptions, IValidInputOpts } from 'shared/ui/input';
import { ProfileCardTextAlign } from '../../model/consts/profile.consts';
import { IconType } from 'react-icons';
import type { IProfile } from '../../model/types/profile.interface';

export interface IProfileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  profile: IProfile;
  error: string | null;
  isLoading: boolean;
  textAlign?: ProfileCardTextAlign;
  isReadonly: boolean;
  edit?: {
    enableProfileChange: () => void;
    disableProfileChange: () => void;
    saveProfileChange: (profile: IProfile) => void;
  };
}

export type InfoItem = {
  title: string;
  text?: string;
  input: IValidInputOpts<string>;
  Icon?: IconType;
  options?: IInputOptions;
};

export interface IInputValidHooks extends Record<keyof Omit<IProfile, 'userId' | 'id'>, IValidInputOpts<any>> {}

export interface IGetInfoItemArrProps {
  profile: IProfile;
  validHooks: IInputValidHooks;
}
