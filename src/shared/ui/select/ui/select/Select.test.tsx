import { screen } from '@testing-library/react';
import { Select } from './Select';
import { renderComponent } from '@/shared/lib/tests';

describe('Select', () => {
  test('In the document', () => {
    // renderComponent(<Select items={[]} />);

    expect(screen.getByTestId('select')).toBeInTheDocument();
  });
});
