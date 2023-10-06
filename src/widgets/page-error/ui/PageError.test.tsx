import { screen } from '@testing-library/react';
import { PageError } from './PageError';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';

describe('PageError', () => {
  test('In the document', () => {
    renderComponent(<PageError />);

    expect(screen.getByText('Что-то сломалось!')).toBeInTheDocument();
  });
});
