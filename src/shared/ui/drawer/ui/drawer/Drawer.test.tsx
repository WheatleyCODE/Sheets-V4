import { screen } from '@testing-library/react';
import { Drawer } from './Drawer';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';
import { DrawerOpenStyles } from './interface';

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

  test('In the document + class', () => {
    renderComponent(
      <Drawer isFull openStyles={DrawerOpenStyles.TOP}>
        <h1>h1</h1>
      </Drawer>,
    );

    const drawer = screen.getByTestId('drawer');

    expect(drawer).toBeInTheDocument();
    expect(drawer).toHaveClass('full');
    expect(screen.getByText('h1')).toBeInTheDocument();
  });
});
