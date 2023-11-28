import { IUser } from '@/entities/user';

export interface IThemeSwitcherProps extends React.HTMLAttributes<HTMLDivElement> {
  user?: IUser;
}
