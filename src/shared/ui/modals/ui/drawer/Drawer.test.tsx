import { screen } from '@testing-library/react';
import { Drawer } from './Drawer';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';
import { DrawerOpenStyles } from './Drawer.consts';

describe('Drawer', () => {
  test('In the document', () => {
    renderComponent(
      <Drawer openStyles={DrawerOpenStyles.TOP}>
        <h1>h1</h1>
      </Drawer>,
    );

    expect(screen.getByTestId('drawer')).toBeInTheDocument();
    expect(screen.getByText('h1')).toBeInTheDocument();
  });
});
