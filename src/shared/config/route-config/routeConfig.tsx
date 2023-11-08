import { RouteProps } from 'react-router-dom';
import { HomePage } from 'pages/home-page';
import { SheetsPage } from 'pages/sheets-page';
import { LandingPage } from 'pages/landing-page';
import { NotFoundPage } from 'pages/not-found-page';
import { ProfilePage } from 'pages/profile-page';
import { TemplatesPage } from 'pages/templates-page';
import { TemplateDetailsPage } from 'pages/template-details-page';
import { TemplateCreatePage } from 'pages/template-create-page';
import { TemplateEditPage } from 'pages/template-edit-page';

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
};

export enum AppRoutes {
  HOME = 'home',
  SHEETS = 'sheets',
  LANDING = 'landing',
  PROFILE = 'profile',
  TEMPLATES = 'templates',
  TEMPLATE_DETAILS = 'template_details',
  TEMPLATE_CREATE = 'template_create',
  TEMPLATE_EDIT = 'template_edit',
  NOT_FOUND = 'not_found',
}

export const RoutesPath: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: '/home',
  [AppRoutes.SHEETS]: '/sheets',
  [AppRoutes.LANDING]: '/',
  [AppRoutes.PROFILE]: '/profile/', // + id
  [AppRoutes.TEMPLATES]: '/templates',
  [AppRoutes.TEMPLATE_DETAILS]: '/templates/', // + id
  [AppRoutes.TEMPLATE_CREATE]: '/templates/new',
  [AppRoutes.TEMPLATE_EDIT]: '/templates/:id/edit',
  [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
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
  [AppRoutes.PROFILE]: {
    path: `${RoutesPath.profile}:id`,
    element: <ProfilePage />,
    authOnly: true,
  },
  [AppRoutes.TEMPLATES]: {
    path: RoutesPath.templates,
    element: <TemplatesPage />,
    authOnly: true,
  },
  [AppRoutes.TEMPLATE_DETAILS]: {
    path: `${RoutesPath.template_details}:id`,
    element: <TemplateDetailsPage />,
    authOnly: true,
  },
  [AppRoutes.TEMPLATE_CREATE]: {
    path: RoutesPath.template_create,
    element: <TemplateCreatePage />,
    authOnly: true,
  },
  [AppRoutes.TEMPLATE_EDIT]: {
    path: RoutesPath.template_edit,
    element: <TemplateEditPage />,
    authOnly: true,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutesPath.not_found,
    element: <NotFoundPage />,
  },
};
