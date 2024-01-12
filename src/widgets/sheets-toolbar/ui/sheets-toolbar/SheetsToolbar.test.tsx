import { screen } from '@testing-library/react';
import { SheetsToolbar } from './SheetsToolbar';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('SheetsToolbar', () => {
  test('In the document', () => {
    renderComponent(<SheetsToolbar />);

    expect(screen.getByTestId('sheetsToolbar')).toBeInTheDocument();
  });
});
