import { screen } from '@testing-library/react';
import TemplateRating from './TemplateRating';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('TemplateRating', () => {
  test('In the document', () => {
    renderComponent(<TemplateRating />);

    expect(screen.getByTestId('circleLoader')).toBeInTheDocument();
  });
});
