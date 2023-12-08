import { screen } from '@testing-library/react';
import { Portal } from './Portal';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('Portal', () => {
  test('In the document', () => {
    renderComponent(
      <Portal>
        <h1>h1</h1>
      </Portal>,
    );

    screen.debug();

    expect(screen.getByText('h1')).toBeInTheDocument();
  });
});
