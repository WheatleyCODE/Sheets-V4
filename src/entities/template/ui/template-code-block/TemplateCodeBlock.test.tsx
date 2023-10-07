import { screen } from '@testing-library/react';
import { TemplateCodeBlock } from './TemplateCodeBlock';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';

describe('TemplateCodeBlock', () => {
  test('In the document', () => {
    renderComponent(<TemplateCodeBlock />);

    expect(screen.getByTestId('templateCodeBlock')).toBeInTheDocument();
  });
});
