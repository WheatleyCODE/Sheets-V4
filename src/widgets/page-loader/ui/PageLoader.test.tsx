import { screen } from '@testing-library/react';
import { PageLoader } from './PageLoader';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';

describe('PageLoader', () => {
  test('In the document', () => {
    renderComponent(<PageLoader />);

    expect(screen.getByText('Загрузка')).toBeInTheDocument();
  });
});
