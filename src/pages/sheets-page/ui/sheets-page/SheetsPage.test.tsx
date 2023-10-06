import { screen } from '@testing-library/react';
import SheetsPage from './SheetsPage';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';

describe('SheetsPage', () => {
  test('In the document', () => {
    renderComponent(<SheetsPage />);

    expect(screen.getByTestId('sheetsPage')).toBeInTheDocument();
    expect(screen.getByTestId('layout')).toBeInTheDocument();
  });
});
