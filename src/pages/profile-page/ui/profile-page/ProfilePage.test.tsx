import { screen } from '@testing-library/react';
import ProfilePage from './ProfilePage';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('ProfilePage', () => {
  test('In the document', () => {
    renderComponent(<ProfilePage />);

    expect(screen.getByTestId('profilePage')).toBeInTheDocument();
    expect(screen.getByTestId('layout')).toBeInTheDocument();
    expect(screen.getByTestId('profileCard')).toBeInTheDocument();
  });
});
