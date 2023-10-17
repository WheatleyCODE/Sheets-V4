import { screen } from '@testing-library/react';
import { TemplateEditPage } from './TemplateEditPage';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';

describe('TemplateEditPage', () => {
  test('In the document', () => {
    renderComponent(<TemplateEditPage />);

    expect(screen.getByTestId('templateEditPage')).toBeInTheDocument();
  });
});
