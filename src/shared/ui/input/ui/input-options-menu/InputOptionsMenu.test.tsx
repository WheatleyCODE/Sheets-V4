import { screen } from '@testing-library/react';
import { InputOptionsMenu } from './InputOptionsMenu';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('InputOptionsMenu', () => {
  test('In the document', () => {
    renderComponent(
      <InputOptionsMenu>
        <h1>h1</h1>
      </InputOptionsMenu>,
    );

    expect(screen.getByTestId('inputOptionsMenu')).toBeInTheDocument();
    expect(screen.getByText('h1')).toBeInTheDocument();
  });
});
