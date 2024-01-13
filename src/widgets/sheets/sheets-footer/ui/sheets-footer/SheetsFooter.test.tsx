import { screen } from '@testing-library/react';
import { SheetsFooter } from './SheetsFooter';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('SheetsFooter', () => {
  test('In the document', () => {
    renderComponent(<SheetsFooter />);

    expect(screen.getByTestId('sheetsFooter')).toBeInTheDocument();
  });
});
