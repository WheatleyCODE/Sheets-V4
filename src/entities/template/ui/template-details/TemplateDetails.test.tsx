import { screen } from '@testing-library/react';
import { TemplateDetails } from './TemplateDetails';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';
import { ITemplate, TemplateTags } from 'entities/template/model/types/template';

const template: ITemplate = {
  id: '1',
  createdAt: '26.06.2001',
  image: 'http://...',
  title: 'Шаблон',
  subtitle: 'Новый',
  tags: [TemplateTags.IT],
  blocks: [],
  template: {},
  views: 12345,
};

describe('TemplateDetails', () => {
  test('In the document', () => {
    renderComponent(<TemplateDetails isLoading={true} error={null} template={template} />);

    expect(screen.getByTestId('templateDetails')).toBeInTheDocument();
  });
});
