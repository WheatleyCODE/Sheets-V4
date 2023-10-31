import { screen } from '@testing-library/react';
import { Tabs } from './Tabs';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';
import { TabItem } from '../tab-item/TabItem';

describe('Tabs', () => {
  test('In the document empty', () => {
    renderComponent(<Tabs tabItems={[]} initValue="" />);

    expect(screen.getByTestId('tabs')).toBeInTheDocument();
    expect(screen.queryByTestId('tabItem')).not.toBeInTheDocument();
  });

  test('In the document one', () => {
    renderComponent(<Tabs tabItems={[{ itemId: 1, value: '1', children: <h1>1</h1> }]} initValue="" />);

    expect(screen.getByTestId('tabs')).toBeInTheDocument();
    expect(screen.getByTestId('tabItem')).toBeInTheDocument();
  });

  test('In the document fore', () => {
    renderComponent(
      <Tabs
        tabItems={[
          { itemId: 1, value: '1', children: <h1>1</h1> },
          { itemId: 2, value: '2', children: <h1>2</h1> },
          { itemId: 3, value: '3', children: <h1>3</h1> },
          { itemId: 4, value: '4', children: <h1>4</h1> },
        ]}
        initValue="1"
      />,
    );

    expect(screen.getByTestId('tabs')).toBeInTheDocument();
    expect(screen.getAllByTestId('tabItem').length).toBe(4);
  });

  test('In the document fore construct', () => {
    renderComponent(
      <Tabs initValue="1">
        <TabItem children={<h1>1</h1>} itemId={1} value="1" />
        <TabItem children={<h1>2</h1>} itemId={2} value="2" />
        <TabItem children={<h1>3</h1>} itemId={3} value="3" />
        <TabItem children={<h1>4</h1>} itemId={4} value="4" />
      </Tabs>,
    );

    expect(screen.getByTestId('tabs')).toBeInTheDocument();
    expect(screen.getAllByTestId('tabItem').length).toBe(4);
  });
});
