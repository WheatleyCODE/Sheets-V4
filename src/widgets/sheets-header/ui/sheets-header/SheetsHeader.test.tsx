import { screen } from '@testing-library/react';
import { SheetsHeader } from './SheetsHeader';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('SheetsHeader', () => {
  test('In the document', () => {
    renderComponent(<SheetsHeader />);

    expect(screen.getByTestId('sheetsHeader')).toBeInTheDocument();
  });
});
