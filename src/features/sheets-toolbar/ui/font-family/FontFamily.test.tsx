import { screen } from '@testing-library/react';
import { FontFamily } from './FontFamily';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('FontFamily', () => {
  test('In the document', () => {
    renderComponent(<FontFamily />);

    expect(screen.getByTestId('fontFamily')).toBeInTheDocument();
  });
});
