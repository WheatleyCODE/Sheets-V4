import { screen } from '@testing-library/react';
import { InputOptionsMenuItem } from './InputOptionsMenuItem';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';
import { MdHome } from 'react-icons/md';

describe('InputOptionsMenuItem', () => {
  test('In the document', () => {
    renderComponent(<InputOptionsMenuItem item={{ text: 'item' }} onClick={() => {}} />);

    expect(screen.getByTestId('inputOptionsMenuItem')).toBeInTheDocument();
    expect(screen.getByText('item')).toBeInTheDocument();
  });

  test('In the document + icon', () => {
    renderComponent(<InputOptionsMenuItem item={{ text: 'item', Icon: MdHome }} onClick={() => {}} />);

    expect(screen.getByTestId('inputOptionsMenuItem-icon')).toBeInTheDocument();
    expect(screen.getByTestId('inputOptionsMenuItem')).toBeInTheDocument();
    expect(screen.getByText('item')).toBeInTheDocument();
  });
});
