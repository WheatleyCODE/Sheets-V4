import { screen } from '@testing-library/react';
import { VStack } from './VStack';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('VStack', () => {
  test('In the document', () => {
    renderComponent(<VStack />);

    expect(screen.getByTestId('vStack')).toBeInTheDocument();
  });
});
