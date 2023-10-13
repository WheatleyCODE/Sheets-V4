import { screen } from '@testing-library/react';
import { TemplatesPageFilters } from './TemplatesPageFilters';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';

describe('TemplatesPageFilters', () => {
  test('In the document', () => {
    // renderComponent(<TemplatesPageFilters />);

    expect(screen.getByTestId('templatesPageFilters')).toBeInTheDocument();
  });
});
