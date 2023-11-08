import { screen } from '@testing-library/react';
import AdminPanelPage from './AdminPanelPage';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';

describe('AdminPanelPage', () => {
  test('In the document', () => {
    renderComponent(<AdminPanelPage />);

    expect(screen.getByTestId('adminPanelPage')).toBeInTheDocument();
  });
});
