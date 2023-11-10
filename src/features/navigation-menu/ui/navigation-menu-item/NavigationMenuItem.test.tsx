import { fireEvent, screen } from '@testing-library/react';
import { NavigationMenuItem } from './NavigationMenuItem';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';
import { MdHome } from 'react-icons/md';

describe('NavigationMenuItem', () => {
  test('In the document', () => {
    renderComponent(<NavigationMenuItem onClick={() => {}} item={{ Icon: MdHome, path: '', text: 'Home' }} />);

    expect(screen.getByTestId('navigationMenuItem')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  test('In the document + callback', () => {
    const callback = jest.fn();
    renderComponent(<NavigationMenuItem onClick={callback} item={{ Icon: MdHome, path: '', text: 'Home' }} />);

    const item = screen.getByTestId('navigationMenuItem');

    fireEvent.click(item);

    expect(item).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(callback.mock.calls).toHaveLength(1);
  });
});
