import { screen } from '@testing-library/react';
import { TemplateListItem } from './TemplateListItem';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';

describe('TemplateListItem', () => {
  test('In the document', () => {
    renderComponent(<TemplateListItem template={{ tags: [] } as any} view={'' as any} />);

    expect(screen.getByTestId('templateListItem')).toBeInTheDocument();
  });
});
