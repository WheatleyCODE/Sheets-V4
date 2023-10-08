import { screen } from '@testing-library/react';
import { TemplateImageBlock } from './TemplateImageBlock';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';

describe('TemplateImageBlock', () => {
  test('In the document', () => {
    renderComponent(<TemplateImageBlock block={{} as any} />);

    expect(screen.getByTestId('templateImageBlock')).toBeInTheDocument();
  });
});
