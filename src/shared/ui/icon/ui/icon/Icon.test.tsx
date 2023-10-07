import { screen } from '@testing-library/react';
import { Icon } from './Icon';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';
import { MdHome } from 'react-icons/md';

describe('Icon', () => {
  test('In the document', () => {
    renderComponent(<Icon Icon={MdHome} />);

    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  test('Not in the document', () => {
    renderComponent(<Icon />);

    expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
  });
});
