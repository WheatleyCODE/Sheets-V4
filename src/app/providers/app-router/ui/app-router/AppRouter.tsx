import { FC, memo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from 'shared/config/route-config/routeConfig';
import { intoIter } from 'shared/lib/iterators';
import { RequireAuth } from '../require-auth/RequireAuth';
import { RequireRoles } from '../require-roles/RequireRoles';
import type { AppRoutesProps } from 'shared/config/route-config/routeConfig.interface';

export const AppRouter: FC = memo(() => {
  const routesArr = intoIter<AppRoutesProps>(routeConfig)
    .map(({ element, path, authOnly, roles }) => {
      if (roles && authOnly)
        return (
          <Route
            key={path}
            path={path}
            element={
              <RequireAuth>
                <RequireRoles roles={roles}>{element}</RequireRoles>
              </RequireAuth>
            }
          />
        );

      if (authOnly) return <Route key={path} path={path} element={<RequireAuth>{element}</RequireAuth>} />;

      return <Route key={path} path={path} element={element} />;
    })
    .toArray();

  return <Routes>{routesArr}</Routes>;
});
