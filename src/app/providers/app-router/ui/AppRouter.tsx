import { FC, memo } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { routeConfig, AppRoutesProps } from 'shared/config/route-config/routeConfig';
import { intoIter } from 'shared/lib/iterators';
import { getUser } from 'entities/user';

export const AppRouter: FC = memo(() => {
  const isAuth = !!useSelector(getUser);

  const routesArr = intoIter<AppRoutesProps>(routeConfig)
    .filter(({ authOnly }) => (isAuth ? true : !authOnly))
    .map(({ element, path }) => <Route key={path} path={path} element={element} />)
    .toArray();

  return <Routes>{routesArr}</Routes>;
});
