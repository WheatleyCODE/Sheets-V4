import { screen } from '@testing-library/react';
import { HStack } from './HStack';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';

describe('HStack', () => {
  test('In the document', () => {
    renderComponent(<HStack />);

    expect(screen.getByTestId('hStack')).toBeInTheDocument();
  });
});
