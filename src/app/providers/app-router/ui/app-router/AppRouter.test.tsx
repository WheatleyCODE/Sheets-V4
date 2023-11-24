import { screen } from '@testing-library/react';
import { AppRouter } from './AppRouter';
import { renderComponent } from '@/shared/lib/tests';
import {
  getRouteLanding,
  getRouteHome,
  getRouteSheets,
  getRouteProfile,
  getRouteTemplates,
  getRouteTemplateDetails,
  getRouteTemplateCreate,
  getRouteTemplateEdit,
  getRouteAdminPanel,
  getRouteForbidden,
} from '@/shared/config/route-config/routeConfig';
import { UserRoles } from '@/entities/user';

describe('AppRouter', () => {
  test('Render landing page', async () => {
    renderComponent(<AppRouter />, {
      route: getRouteLanding(),
    });

    const page = await screen.findByTestId('landingPage');
    expect(page).toBeInTheDocument();
  });

  test('Render home page', async () => {
    renderComponent(<AppRouter />, {
      route: getRouteHome(),
    });

    const page = await screen.findByTestId('homePage');
    expect(page).toBeInTheDocument();
  });

  test('Render sheets page', async () => {
    renderComponent(<AppRouter />, {
      route: getRouteSheets(),
    });

    const page = await screen.findByTestId('sheetsPage');
    expect(page).toBeInTheDocument();
  });

  // * Profile page
  test('Render profile page not auth', async () => {
    renderComponent(<AppRouter />, {
      route: getRouteProfile('1'),
    });

    const page = await screen.findByTestId('homePage');
    expect(page).toBeInTheDocument();
  });

  test('Render profile page auth', async () => {
    renderComponent(<AppRouter />, {
      route: getRouteProfile('1'),
      initialState: { user: { user: { roles: [UserRoles.ADMIN] } } },
    });

    const page = await screen.findByTestId('profilePage');
    expect(page).toBeInTheDocument();
  });

  // * Templates page
  test('Render templates page not auth', async () => {
    renderComponent(<AppRouter />, {
      route: getRouteTemplates(),
    });

    const page = await screen.findByTestId('homePage');
    expect(page).toBeInTheDocument();
  });

  test('Render templates page auth', async () => {
    renderComponent(<AppRouter />, {
      route: getRouteTemplates(),
      initialState: { user: { user: { roles: [UserRoles.USER] } }, templatesPage: { ids: [], entities: {} } },
    });

    const page = await screen.findByTestId('templatesPage');
    expect(page).toBeInTheDocument();
  });

  // * Template details page
  test('Render template details page auth', async () => {
    renderComponent(<AppRouter />, {
      route: getRouteTemplateDetails('1'),
      initialState: { user: { user: { roles: [UserRoles.USER] } } },
    });

    const page = await screen.findByTestId('templateDetailsPage');
    expect(page).toBeInTheDocument();
  });

  test('Render template details page not auth', async () => {
    renderComponent(<AppRouter />, {
      route: getRouteTemplateDetails('1'),
    });

    const page = await screen.findByTestId('homePage');
    expect(page).toBeInTheDocument();
  });

  // * Template create page
  test('Render template create page not auth', async () => {
    renderComponent(<AppRouter />, {
      route: getRouteTemplateCreate(),
    });

    const page = await screen.findByTestId('homePage');
    expect(page).toBeInTheDocument();
  });

  test('Render template create page auth', async () => {
    renderComponent(<AppRouter />, {
      route: getRouteTemplateCreate(),
      initialState: { user: { user: { roles: [UserRoles.USER] } } },
    });

    const page = await screen.findByTestId('templateCreatePage');
    expect(page).toBeInTheDocument();
  });

  // * Template edit page
  test('Render template edit page auth', async () => {
    renderComponent(<AppRouter />, {
      route: getRouteTemplateEdit('1'),
      initialState: { user: { user: { roles: [UserRoles.USER] } } },
    });

    const page = await screen.findByTestId('templateEditPage');
    expect(page).toBeInTheDocument();
  });

  test('Render template edit page not auth', async () => {
    renderComponent(<AppRouter />, {
      route: getRouteTemplateEdit('1'),
    });

    const page = await screen.findByTestId('homePage');
    expect(page).toBeInTheDocument();
  });

  test('Render forbidden page', async () => {
    renderComponent(<AppRouter />, {
      route: getRouteForbidden(),
    });

    const page = await screen.findByTestId('forbiddenPage');
    expect(page).toBeInTheDocument();
  });

  // * Admin page
  test('Render admin page user-admin', async () => {
    renderComponent(<AppRouter />, {
      route: getRouteAdminPanel(),
      initialState: { user: { user: { roles: [UserRoles.ADMIN] } } },
    });

    const page = await screen.findByTestId('adminPanelPage');
    expect(page).toBeInTheDocument();
  });

  test('Render admin page user-user', async () => {
    renderComponent(<AppRouter />, {
      route: getRouteAdminPanel(),
      initialState: { user: { user: { roles: [UserRoles.USER] } } },
    });

    const page = await screen.findByTestId('forbiddenPage');
    expect(page).toBeInTheDocument();
  });

  test('Render admin page not auth', async () => {
    renderComponent(<AppRouter />, {
      route: getRouteAdminPanel(),
    });

    const page = await screen.findByTestId('homePage');
    expect(page).toBeInTheDocument();
  });

  test('Render not found page', async () => {
    renderComponent(<AppRouter />, {
      route: '/blablabla',
    });

    const page = await screen.findByTestId('notFoundPage');
    expect(page).toBeInTheDocument();
  });
});
