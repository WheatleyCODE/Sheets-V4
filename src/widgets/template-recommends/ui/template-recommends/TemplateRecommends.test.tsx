import { screen } from '@testing-library/react';
import { TemplateRecommends } from './TemplateRecommends';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('TemplateRecommends', () => {
  test('In the document', () => {
    renderComponent(<TemplateRecommends />);

    expect(screen.getByTestId('templateRecommends')).toBeInTheDocument();
  });
});
