import { screen } from '@testing-library/react';
import { DragLineItem } from './DragLineItem';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';

describe('DragLineItem', () => {
  test('In the document', () => {
    // renderComponent(<DragLineItem />);

    expect(screen.getByTestId('dragLineItem')).toBeInTheDocument();
  });
});
