import { screen } from '@testing-library/react';
import { TemplateDetailsPageHeader } from './TemplateDetailsPageHeader';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('TemplateDetailsPageHeader', () => {
  test('In the document', () => {
    renderComponent(<TemplateDetailsPageHeader />);

    expect(screen.getByTestId('templateDetailsPageHeader')).toBeInTheDocument();
  });
});
