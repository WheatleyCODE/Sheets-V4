import { fireEvent, screen } from '@testing-library/react';
import { Backdrop } from './Backdrop';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';

describe('Backdrop', () => {
  test('In the document', () => {
    renderComponent(
      <Backdrop onClose={() => {}}>
        <h1>h1</h1>
      </Backdrop>,
    );

    expect(screen.getByTestId('backdrop')).toBeInTheDocument();
    expect(screen.getByText('h1')).toBeInTheDocument();
  });

  test('Backdrop click', () => {
    const callback = jest.fn();

    renderComponent(
      <Backdrop onClose={callback}>
        <h1>h1</h1>
      </Backdrop>,
    );

    const backdrop = screen.getByTestId('backdrop');

    expect(backdrop).toBeInTheDocument();
    expect(screen.getByText('h1')).toBeInTheDocument();

    fireEvent(backdrop, new MouseEvent('click', { bubbles: true, cancelable: true }));
    expect(callback.mock.calls).toHaveLength(1);
  });
});
