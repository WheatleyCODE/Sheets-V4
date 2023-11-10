import { screen } from '@testing-library/react';
import { ImageError } from './ImageError';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('ImageError', () => {
  test('In the document', () => {
    renderComponent(<ImageError />);

    expect(screen.getByTestId('imageError')).toBeInTheDocument();
  });
});
