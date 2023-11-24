import { screen } from '@testing-library/react';
import { TemplatesPageFilters } from './TemplatesPageFilters';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

const templatesPage = {
  page: 2,
  ids: [],
  entities: {},
  limit: 5,
  isLoading: false,
  hasMore: false,
};

describe('TemplatesPageFilters', () => {
  test('In the document', () => {
    renderComponent(<TemplatesPageFilters />, { initialState: { templatesPage } });

    expect(screen.getByTestId('templatesPageFilters')).toBeInTheDocument();
  });
});
