// eslint-disable-next-line wheatley-code/layer-imports
import { UserRoles } from '@/entities/user';
import { RouteProps } from 'react-router-dom';

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
  roles?: UserRoles[];
};
