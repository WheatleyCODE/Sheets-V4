import { screen } from '@testing-library/react';
import { Navbar } from './Navbar';
import { withTranslation } from 'react-i18next';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('Navbar', () => {
  test('1 Props', () => {
    const NavbarWithTranslation = withTranslation()(Navbar);

    renderComponent(<NavbarWithTranslation />);

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });
});
