import { screen } from '@testing-library/react';
import { TemplateDetails } from './TemplateDetails';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';

describe('TemplateDetails', () => {
  test('In the document', () => {
    renderComponent(<TemplateDetails isLoading={true} error={null} template={{} as any} />);

    expect(screen.getByTestId('templateDetails')).toBeInTheDocument();
  });
});
