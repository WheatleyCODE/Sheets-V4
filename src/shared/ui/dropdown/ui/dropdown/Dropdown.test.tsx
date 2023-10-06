import { fireEvent, screen } from '@testing-library/react';
import { Dropdown } from './Dropdown';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';

describe('Dropdown', () => {
  test('In the document', () => {
    renderComponent(
      <Dropdown closeDropdown={() => {}}>
        <h1>h1</h1>
      </Dropdown>,
    );

    expect(screen.getByTestId('dropdown')).toBeInTheDocument();
    expect(screen.getByText('h1')).toBeInTheDocument();
  });

  test('Dropdown click outside', () => {
    const callback = jest.fn();

    renderComponent(
      <Dropdown closeDropdown={callback}>
        <h1>h1</h1>
      </Dropdown>,
    );

    const dropdown = screen.getByTestId('dropdown');

    expect(dropdown).toBeInTheDocument();
    expect(screen.getByText('h1')).toBeInTheDocument();

    fireEvent(document.body, new MouseEvent('click', { bubbles: true, cancelable: true }));
    expect(callback.mock.calls).toHaveLength(1);
  });
});
