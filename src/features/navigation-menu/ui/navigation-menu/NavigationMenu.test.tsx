import { fireEvent, screen } from '@testing-library/react';
import { NavigationMenu } from './NavigationMenu';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('NavigationMenu', () => {
  test('In the document', () => {
    renderComponent(<NavigationMenu />);

    expect(screen.getByTestId('button')).toBeInTheDocument();
    expect(screen.getByTestId('navigationMenu')).toBeInTheDocument();
  });

  test('In the document + click', () => {
    renderComponent(<NavigationMenu />);

    let button = screen.getByTestId('button');

    fireEvent.click(button);

    // * Button icon rerender
    button = screen.getByTestId('button');

    expect(button).toBeInTheDocument();
    expect(screen.getByText('SHEETS V4')).toBeInTheDocument();
    expect(screen.getByText('Домашняя страница')).toBeInTheDocument();
    expect(screen.getByText('Таблицы')).toBeInTheDocument();
    expect(screen.getByTestId('navigationMenu')).toBeInTheDocument();
  });
});
