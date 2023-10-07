import { screen } from '@testing-library/react';
import { Skeleton } from './Skeleton';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';

describe('Skeleton', () => {
  test('In the document', () => {
    renderComponent(<Skeleton />);

    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  });
});
