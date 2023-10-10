import { screen } from '@testing-library/react';
import { TemplateList } from './TemplateList';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';

describe('TemplateList', () => {
  test('In the document', () => {
    renderComponent(<TemplateList templates={[]} />);

    expect(screen.getByTestId('templateList')).toBeInTheDocument();
  });
});
