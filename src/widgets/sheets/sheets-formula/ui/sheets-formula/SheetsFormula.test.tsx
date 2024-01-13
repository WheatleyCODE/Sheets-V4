import { screen } from '@testing-library/react';
import { SheetsFormula } from './SheetsFormula';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('SheetsFormula', () => {
  test('In the document', () => {
    renderComponent(<SheetsFormula />);

    expect(screen.getByTestId('sheetsFormula')).toBeInTheDocument();
  });
});
