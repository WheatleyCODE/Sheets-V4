import { screen } from '@testing-library/react';
import TemplateDetailsPage from './TemplateDetailsPage';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('TemplateDetailsPage', () => {
  test('In the document', () => {
    renderComponent(<TemplateDetailsPage />);

    expect(screen.getByTestId('templateDetailsPage')).toBeInTheDocument();
  });
});
