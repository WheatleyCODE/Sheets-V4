import { screen } from '@testing-library/react';
import { DropdownMenu } from './DropdownMenu';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';

describe('DropdownMenu', () => {
  test('In the document', () => {
    renderComponent(
      <DropdownMenu>
        <h1>h1</h1>
      </DropdownMenu>,
    );

    expect(screen.getByTestId('dropdownMenu')).toBeInTheDocument();
    expect(screen.getByText('h1')).toBeInTheDocument();
  });
});
