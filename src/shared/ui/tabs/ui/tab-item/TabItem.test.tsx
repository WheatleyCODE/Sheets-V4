import { screen } from '@testing-library/react';
import { TabItem } from './TabItem';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';

describe('TabItem', () => {
  test('In the document', () => {
    // renderComponent(<TabItem />);

    expect(screen.getByTestId('tabItem')).toBeInTheDocument();
  });
});
