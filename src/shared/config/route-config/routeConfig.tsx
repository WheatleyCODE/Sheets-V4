/* eslint-disable wheatley-code/layer-imports */
import { HomePage } from '@/pages/home-page';
import { SheetsPage } from '@/pages/sheets-page';
import { NotFoundPage } from '@/pages/not-found-page';
import { ProfilePage } from '@/pages/profile-page';
import { TemplatesPage } from '@/pages/templates-page';
import { TemplateDetailsPage } from '@/pages/template-details-page';
import { TemplateCreatePage } from '@/pages/template-create-page';
import { TemplateEditPage } from '@/pages/template-edit-page';
import { AdminPanelPage } from '@/pages/admin-panel-page';
import { UserRoles } from '@/entities/user';
import { ForbiddenPage } from '@/pages/forbidden-page';
import type { AppRoutesProps } from './routeConfig.interface';

export enum AppRoutes {
  HOME = 'home',
  SHEETS = 'sheets',
  PROFILE = 'profile',
  TEMPLATES = 'templates',
  TEMPLATE_DETAILS = 'template_details',
  TEMPLATE_CREATE = 'template_create',
  TEMPLATE_EDIT = 'template_edit',
  ADMIN_PANEL = 'admin_panel',
  FORBIDDEN = 'forbidden',
  NOT_FOUND = 'not_found',
}

export const getRouteHome = () => '/';
export const getRouteSheets = () => '/sheets';
export const getRouteProfile = (id: string) => `/profile/${id}`;
export const getRouteTemplates = () => '/templates';
export const getRouteTemplateDetails = (id: string) => `/template/${id}`;
export const getRouteTemplateCreate = () => '/templates/new';
export const getRouteTemplateEdit = (id: string) => `/template/${id}/edit`;
export const getRouteAdminPanel = () => '/admin/panel';
export const getRouteForbidden = () => '/forbidden';

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.HOME]: {
    path: getRouteHome(),
    element: <HomePage />,
  },
  [AppRoutes.SHEETS]: {
    path: getRouteSheets(),
    element: <SheetsPage />,
  },
  [AppRoutes.PROFILE]: {
    path: getRouteProfile(':id'),
    element: <ProfilePage />,
    authOnly: true,
  },
  [AppRoutes.TEMPLATES]: {
    path: getRouteTemplates(),
    element: <TemplatesPage />,
    authOnly: true,
  },
  [AppRoutes.TEMPLATE_DETAILS]: {
    path: getRouteTemplateDetails(':id'),
    element: <TemplateDetailsPage />,
    authOnly: true,
  },
  [AppRoutes.TEMPLATE_CREATE]: {
    path: getRouteTemplateCreate(),
    element: <TemplateCreatePage />,
    authOnly: true,
  },
  [AppRoutes.TEMPLATE_EDIT]: {
    path: getRouteTemplateEdit(':id'),
    element: <TemplateEditPage />,
    authOnly: true,
  },
  [AppRoutes.ADMIN_PANEL]: {
    path: getRouteAdminPanel(),
    element: <AdminPanelPage />,
    roles: ['ADMIN', 'DEVELOPER'] as UserRoles[],
    authOnly: true,
  },
  [AppRoutes.FORBIDDEN]: {
    path: getRouteForbidden(),
    element: <ForbiddenPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: '*',
    element: <NotFoundPage />,
  },
};
