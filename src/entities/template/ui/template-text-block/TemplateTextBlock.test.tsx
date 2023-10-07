import { screen } from '@testing-library/react';
import { TemplateTextBlock } from './TemplateTextBlock';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';

describe('TemplateTextBlock', () => {
  test('In the document', () => {
    renderComponent(<TemplateTextBlock />);

    expect(screen.getByTestId('templateTextBlock')).toBeInTheDocument();
  });
});
