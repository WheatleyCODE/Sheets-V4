import { screen } from '@testing-library/react';
import NotFoundPage from './NotFoundPage';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';

describe('NotFoundPage', () => {
  test('In the document', () => {
    renderComponent(<NotFoundPage />);

    expect(screen.getByTestId('notFoundPage')).toBeInTheDocument();
    expect(screen.getByTestId('layout')).toBeInTheDocument();
    expect(screen.getByText('Страница не найдена')).toBeInTheDocument();
  });
});
