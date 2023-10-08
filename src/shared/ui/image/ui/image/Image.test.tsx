import { screen } from '@testing-library/react';
import { Image } from './Image';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';

describe('Image', () => {
  test('In the document', () => {
    renderComponent(<Image />);

    expect(screen.getByTestId('image')).toBeInTheDocument();
  });
});
