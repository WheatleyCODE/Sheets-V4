import { screen } from '@testing-library/react';
import { TabItem } from './TabItem';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('TabItem', () => {
  test('In the document', () => {
    renderComponent(<TabItem itemId={1} value="1" children={<h1>1</h1>} />);

    expect(screen.getByTestId('tabItem')).toBeInTheDocument();
  });
});
