import { screen } from '@testing-library/react';
import { InDeveloping } from './InDeveloping';
import { renderComponent } from '@/shared/lib/tests';

describe('InDeveloping', () => {
  test('In the document', () => {
    renderComponent(<InDeveloping />);

    expect(screen.getByTestId('inDeveloping')).toBeInTheDocument();
  });
});
