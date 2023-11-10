import { screen } from '@testing-library/react';
import ForbiddenPage from './ForbiddenPage';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('ForbiddenPage', () => {
  test('In the document', () => {
    renderComponent(<ForbiddenPage />);

    expect(screen.getByTestId('forbiddenPage')).toBeInTheDocument();
  });
});
