import { screen } from '@testing-library/react';
import { SheetsTable } from './SheetsTable';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('SheetsTable', () => {
  test('In the document', () => {
    renderComponent(<SheetsTable />);

    expect(screen.getByTestId('sheetsTable')).toBeInTheDocument();
  });
});
