import { screen } from '@testing-library/react';
import { DragLine } from './DragLine';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';

describe('DragLine', () => {
  test('In the document', () => {
    renderComponent(<DragLine />);

    expect(screen.getByTestId('dragLine')).toBeInTheDocument();
  });
});
