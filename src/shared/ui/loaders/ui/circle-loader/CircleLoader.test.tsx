import { screen } from '@testing-library/react';
import { CircleLoader } from './CircleLoader';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('CircleLoader', () => {
  test('In the document', () => {
    renderComponent(<CircleLoader />);

    expect(screen.getByTestId('circleLoader')).toBeInTheDocument();
  });
});
