import { screen } from '@testing-library/react';
import { {{pascalCase}} } from './{{pascalCase}}';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('{{pascalCase}}', () => {
  test('In the document', () => {
    renderComponent(<{{pascalCase}} />);

    expect(screen.getByTestId('{{camelCase}}')).toBeInTheDocument();
  });
});
