import { FC, memo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig, AppRoutesProps } from 'shared/config/route-config/routeConfig';
import { intoIter } from 'shared/lib/iterators';
import { RequireAuth } from '../require-auth/RequireAuth';

export const AppRouter: FC = memo(() => {
  const routesArr = intoIter<AppRoutesProps>(routeConfig)
    .map(({ element, path, authOnly }) =>
      authOnly ? (
        <Route key={path} path={path} element={<RequireAuth>{element}</RequireAuth>} />
      ) : (
        <Route key={path} path={path} element={element} />
      ),
    )
    .toArray();

  return <Routes>{routesArr}</Routes>;
});
