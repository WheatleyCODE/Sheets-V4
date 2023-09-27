import { screen } from '@testing-library/react';
import { Navbar } from './Navbar';
import { MemoryRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { renderWithTranslation } from 'shared/lib/tests/render-with-translation/renderWithTranslation';

describe('Navbar', () => {
  test('1 Props', () => {
    const NavbarWithTranslation = withTranslation()(Navbar);

    renderWithTranslation(
      <MemoryRouter>
        <NavbarWithTranslation />
      </MemoryRouter>,
    );
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });
});
