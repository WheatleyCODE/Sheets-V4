import { fireEvent, screen } from '@testing-library/react';
import { Modal } from './Modal';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('Modal', () => {
  test('In the document', () => {
    renderComponent(<Modal onClose={() => {}} />);

    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByTestId('modal-close-button')).toBeInTheDocument();
  });

  test('Click close button', () => {
    const callback = jest.fn();
    renderComponent(<Modal onClose={callback} />);

    const button = screen.getByTestId('modal-close-button');

    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    fireEvent(button, new MouseEvent('click', { bubbles: true, cancelable: true }));
    expect(callback.mock.calls).toHaveLength(1);
  });
});
