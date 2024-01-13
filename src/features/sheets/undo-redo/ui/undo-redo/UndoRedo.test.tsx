import { screen } from '@testing-library/react';
import { UndoRedo } from './UndoRedo';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('UndoRedo', () => {
  test('In the document', () => {
    renderComponent(<UndoRedo />);

    expect(screen.getByTestId('undoRedo')).toBeInTheDocument();
  });
});
