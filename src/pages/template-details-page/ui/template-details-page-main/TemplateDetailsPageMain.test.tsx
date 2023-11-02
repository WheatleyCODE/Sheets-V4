import { screen } from '@testing-library/react';
import { TemplateDetailsPageMain } from './TemplateDetailsPageMain';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';

describe('TemplateDetailsPageMain', () => {
  test('In the document', () => {
    renderComponent(<TemplateDetailsPageMain />);

    expect(screen.getByTestId('templateDetailsPageMain')).toBeInTheDocument();
  });
});
