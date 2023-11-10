import { HomePage } from '@/pages/home-page';
import { SheetsPage } from '@/pages/sheets-page';
import { LandingPage } from '@/pages/landing-page';
import { NotFoundPage } from '@/pages/not-found-page';
import { ProfilePage } from '@/pages/profile-page';
import { TemplatesPage } from '@/pages/templates-page';
import { TemplateDetailsPage } from '@/pages/template-details-page';
import { TemplateCreatePage } from '@/pages/template-create-page';
import { TemplateEditPage } from '@/pages/template-edit-page';
import { AdminPanelPage } from '@/pages/admin-panel-page';
import { UserRoles } from '@/features/user';
import { ForbiddenPage } from '@/pages/forbidden-page';
import type { AppRoutesProps } from './routeConfig.interface';

export enum AppRoutes {
  HOME = 'home',
  SHEETS = 'sheets',
  LANDING = 'landing',
  PROFILE = 'profile',
  TEMPLATES = 'templates',
  TEMPLATE_DETAILS = 'template_details',
  TEMPLATE_CREATE = 'template_create',
  TEMPLATE_EDIT = 'template_edit',
  ADMIN_PANEL = 'admin_panel',
  FORBIDDEN = 'forbidden',
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
  [AppRoutes.ADMIN_PANEL]: '/admin/panel',
  [AppRoutes.FORBIDDEN]: '/forbidden',
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
  [AppRoutes.FORBIDDEN]: {
    path: RoutesPath.forbidden,
    element: <ForbiddenPage />,
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
  [AppRoutes.ADMIN_PANEL]: {
    path: RoutesPath.admin_panel,
    element: <AdminPanelPage />,
    roles: ['ADMIN', 'DEVELOPER'] as UserRoles[],
    authOnly: true,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutesPath.not_found,
    element: <NotFoundPage />,
  },
};
