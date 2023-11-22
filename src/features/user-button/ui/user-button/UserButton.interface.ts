import type { IUser } from '@/entities/user';

export interface IUserButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  user?: IUser;
  openAuth: () => void;
  logout: () => void;
}
