import { screen } from '@testing-library/react';
import { Tabs } from './Tabs';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';

describe('Tabs', () => {
  test('In the document', () => {
    // renderComponent(<Tabs />);

    expect(screen.getByTestId('tabs')).toBeInTheDocument();
  });
});
