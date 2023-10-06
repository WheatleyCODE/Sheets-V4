import { screen } from '@testing-library/react';
import { NavigationMenu } from './NavigationMenu';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';

describe('NavigationMenu', () => {
  test('In the document', () => {
    renderComponent(<NavigationMenu />);

    expect(screen.getByTestId('navigationMenu')).toBeInTheDocument();
  });
});
