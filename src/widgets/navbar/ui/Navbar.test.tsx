import { render, screen } from '@testing-library/react';
import { Navbar } from './Navbar';
import { MemoryRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

describe('Navbar', () => {
  test('1 Props', () => {
    const NavbarWithTranslation = withTranslation()(Navbar);

    render(
      <MemoryRouter>
        <NavbarWithTranslation />
      </MemoryRouter>,
    );
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });
});
