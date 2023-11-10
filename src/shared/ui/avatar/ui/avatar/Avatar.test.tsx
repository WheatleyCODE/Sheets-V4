import { screen } from '@testing-library/react';
import { Avatar } from './Avatar';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('Avatar', () => {
  test('In the document', () => {
    renderComponent(<Avatar />);

    expect(screen.getByTestId('imageLoad')).toBeInTheDocument();
  });
});
