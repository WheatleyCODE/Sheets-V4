import { screen } from '@testing-library/react';
import { DragLineItem } from './DragLineItem';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('DragLineItem', () => {
  test('In the document', () => {
    renderComponent(<DragLineItem width={100} itemId={1} children={<h1>1</h1>} />);

    expect(screen.getByTestId('dragLineItem')).toBeInTheDocument();
  });
});
