import { FC } from 'react';
import { Route, RouteProps, Routes } from 'react-router-dom';
import { routeConfig } from 'shared/config/route-config/routeConfig';
import { intoIter } from 'shared/lib/iterators/iter/Iter';

export const AppRouter: FC = () => {
  const routesArr = intoIter<RouteProps>(routeConfig)
    .map(({ element, path }) => <Route key={path} path={path} element={element} />)
    .toArray();

  return <Routes>{routesArr}</Routes>;
};
