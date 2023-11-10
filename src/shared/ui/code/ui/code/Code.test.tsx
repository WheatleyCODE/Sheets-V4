import { screen } from '@testing-library/react';
import { Code } from './Code';
import { renderComponent } from '@/shared/lib/tests';

describe('Code', () => {
  test('In the document', () => {
    renderComponent(<Code code="console.log('Hello, world!')" />);

    expect(screen.getByTestId('code')).toBeInTheDocument();
  });
});
