import { screen } from '@testing-library/react';
import { TemplateDetails } from './TemplateDetails';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';
import { ITemplate } from '../../model/types/template.interface';
import { TemplateTags } from '../../model/consts/template.consts';

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
    renderComponent(<TemplateDetails isLoading={false} error={null} template={template} />);
    expect(screen.getByTestId('templateDetails')).toBeInTheDocument();
    expect(screen.getByText('Шаблон')).toBeInTheDocument();
    expect(screen.getByText('Новый')).toBeInTheDocument();
    expect(screen.getByText(TemplateTags.IT)).toBeInTheDocument();
    expect(screen.getByText(12345)).toBeInTheDocument();
  });

  test('In the document isLoading', () => {
    renderComponent(<TemplateDetails isLoading={true} error={null} template={template} />);

    expect(screen.getAllByTestId('skeleton').length).toBe(7);

    expect(screen.getByTestId('templateDetails')).toBeInTheDocument();
    expect(screen.queryByText('Шаблон')).not.toBeInTheDocument();
    expect(screen.queryByText('Новый')).not.toBeInTheDocument();
    expect(screen.queryByText(TemplateTags.IT)).not.toBeInTheDocument();
    expect(screen.queryByText(12345)).not.toBeInTheDocument();
  });

  test('In the document error', () => {
    renderComponent(<TemplateDetails isLoading={false} error={'Error'} template={template} />);

    expect(screen.getByText('Error')).toBeInTheDocument();

    expect(screen.getByTestId('templateDetails')).toBeInTheDocument();
    expect(screen.queryByText('Шаблон')).not.toBeInTheDocument();
    expect(screen.queryByText('Новый')).not.toBeInTheDocument();
    expect(screen.queryByText(TemplateTags.IT)).not.toBeInTheDocument();
    expect(screen.queryByText(12345)).not.toBeInTheDocument();
  });
});
