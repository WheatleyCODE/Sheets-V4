import type { IUser } from '../../model/types/user.interface';

export interface IUserProps extends React.HTMLAttributes<HTMLDivElement> {
  user?: IUser;
  openAuth: () => void;
  logout: () => void;
}
