import { screen } from '@testing-library/react';
import { DropdownMenuItem } from './DropdownMenuItem';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';
import { MdHome } from 'react-icons/md';

describe('DropdownMenuItem', () => {
  test('In the document', () => {
    renderComponent(<DropdownMenuItem text="item" />);

    expect(screen.getByTestId('dropdownMenuItem')).toBeInTheDocument();
    expect(screen.getByText('item')).toBeInTheDocument();
  });

  test('In the document + icon', () => {
    renderComponent(<DropdownMenuItem Icon={MdHome} text="item" />);

    expect(screen.getByTestId('dropdownMenuItem-icon')).toBeInTheDocument();
    expect(screen.getByTestId('dropdownMenuItem')).toBeInTheDocument();
    expect(screen.getByText('item')).toBeInTheDocument();
  });
});
