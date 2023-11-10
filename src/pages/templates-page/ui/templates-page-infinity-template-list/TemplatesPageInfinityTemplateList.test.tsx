import { screen } from '@testing-library/react';
import { TemplatesPageInfinityTemplateList } from './TemplatesPageInfinityTemplateList';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('TemplatesPageInfinityTemplateList', () => {
  test('In the document', () => {
    renderComponent(<TemplatesPageInfinityTemplateList loadNextPart={() => {}} />);

    expect(screen.getByTestId('templatesPageInfinityTemplateList')).toBeInTheDocument();
  });
});
