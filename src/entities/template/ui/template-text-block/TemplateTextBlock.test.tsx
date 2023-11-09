import { screen } from '@testing-library/react';
import { TemplateTextBlock } from './TemplateTextBlock';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';
import { TemplateBlockTypes } from '../../model/consts/template.consts';

describe('TemplateTextBlock', () => {
  test('In the document', () => {
    renderComponent(
      <TemplateTextBlock block={{ paragraphs: ['Hello its me'], id: '1', type: TemplateBlockTypes.TEXT }} />,
    );

    expect(screen.getByTestId('templateTextBlock')).toBeInTheDocument();
  });
});
