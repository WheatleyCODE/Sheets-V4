import { screen } from '@testing-library/react';
import TemplateCreatePage from './TemplateCreatePage';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('TemplateCreatePage', () => {
  test('In the document', () => {
    renderComponent(<TemplateCreatePage />);

    expect(screen.getByTestId('templateCreatePage')).toBeInTheDocument();
  });
});
