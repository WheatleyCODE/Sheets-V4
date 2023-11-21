import { screen } from '@testing-library/react';
import { MobileDrawer } from './MobileDrawer';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('MobileDrawer', () => {
  test('In the document', () => {
    renderComponent(<MobileDrawer onClose={() => {}} />);

    expect(screen.getByTestId('mobileDrawer')).toBeInTheDocument();
  });
});
