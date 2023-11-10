import { screen } from '@testing-library/react';
import { ImageLoad } from './ImageLoad';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('ImageLoad', () => {
  test('In the document', () => {
    renderComponent(<ImageLoad />);

    expect(screen.getByTestId('imageLoad')).toBeInTheDocument();
  });
});
