import { screen } from '@testing-library/react';
import { TemplateComments } from './TemplateComments';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('TemplateComments', () => {
  test('In the document', () => {
    renderComponent(<TemplateComments />);

    expect(screen.getByTestId('templateComments')).toBeInTheDocument();
  });
});
