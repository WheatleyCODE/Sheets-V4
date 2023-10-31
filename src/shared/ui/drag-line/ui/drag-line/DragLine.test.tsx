import { screen } from '@testing-library/react';
import { DragLine } from './DragLine';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';
import { DragLineItem } from '../drag-line-item/DragLineItem';

describe('DragLine', () => {
  test('In the document empty', () => {
    renderComponent(<DragLine items={[]} />);

    expect(screen.getByTestId('dragLine')).toBeInTheDocument();
    expect(screen.queryByTestId('dragLineItem')).not.toBeInTheDocument();
  });

  test('In the document empty', () => {
    renderComponent(<DragLine />);

    expect(screen.getByTestId('dragLine')).toBeInTheDocument();
    expect(screen.queryByTestId('dragLineItem')).not.toBeInTheDocument();
  });

  test('In the document fore', () => {
    renderComponent(
      <DragLine
        items={[
          { width: 100, itemId: 1, children: <h1>1</h1> },
          { width: 100, itemId: 2, children: <h1>2</h1> },
          { width: 100, itemId: 3, children: <h1>3</h1> },
          { width: 100, itemId: 4, children: <h1>4</h1> },
        ]}
      />,
    );

    expect(screen.getByTestId('dragLine')).toBeInTheDocument();
    expect(screen.getAllByTestId('dragLineItem').length).toBe(4);
  });

  test('In the document fore construct', () => {
    renderComponent(
      <DragLine>
        <DragLineItem width={100} itemId={1} children={<h1>1</h1>} />
        <DragLineItem width={100} itemId={2} children={<h1>2</h1>} />
        <DragLineItem width={100} itemId={3} children={<h1>3</h1>} />
        <DragLineItem width={100} itemId={4} children={<h1>4</h1>} />
      </DragLine>,
    );

    expect(screen.getByTestId('dragLine')).toBeInTheDocument();
    expect(screen.getAllByTestId('dragLineItem').length).toBe(4);
  });
});
