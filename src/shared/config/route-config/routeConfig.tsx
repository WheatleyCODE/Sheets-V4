import { RouteProps } from 'react-router-dom';
import { HomePage } from 'pages/home-page';
import { SheetsPage } from 'pages/sheets-page';
import { LandingPage } from 'pages/landing-page';
import { NotFoundPage } from 'pages/not-found-page';

export enum AppRoutes {
  HOME = 'home',
  SHEETS = 'sheets',
  LANDING = 'landing',
  NOT_FOUND = 'not_found',
}

export const RoutesPath: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: '/home',
  [AppRoutes.SHEETS]: '/sheets',
  [AppRoutes.LANDING]: '/',
  [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.HOME]: {
    path: RoutesPath.home,
    element: <HomePage />,
  },
  [AppRoutes.SHEETS]: {
    path: RoutesPath.sheets,
    element: <SheetsPage />,
  },
  [AppRoutes.LANDING]: {
    path: RoutesPath.landing,
    element: <LandingPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutesPath.not_found,
    element: <NotFoundPage />,
  },
};
