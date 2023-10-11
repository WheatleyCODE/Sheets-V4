import { screen } from '@testing-library/react';
import { TemplatesViewSwitcher } from './TemplatesViewSwitcher';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';

describe('TemplatesViewSwitcher', () => {
  test('In the document', () => {
    renderComponent(<TemplatesViewSwitcher changeView={() => {}} view={'' as any} />);

    expect(screen.getByTestId('templatesViewSwitcher')).toBeInTheDocument();
  });
});
