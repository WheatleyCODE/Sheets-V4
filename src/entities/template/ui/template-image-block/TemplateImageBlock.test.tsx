import { screen } from '@testing-library/react';
import { TemplateImageBlock } from './TemplateImageBlock';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';
import { TemplateBlockTypes } from 'entities/template/model/types/template';

describe('TemplateImageBlock', () => {
  test('In the document', () => {
    renderComponent(
      <TemplateImageBlock
        block={{
          src: 'https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png',
          id: '1',
          title: 'Title',
          type: TemplateBlockTypes.IMAGE,
        }}
      />,
    );

    expect(screen.getByTestId('templateImageBlock')).toBeInTheDocument();
  });
});
