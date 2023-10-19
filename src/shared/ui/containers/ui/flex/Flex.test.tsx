import { screen } from '@testing-library/react';
import { Flex } from './Flex';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';

describe('Flex', () => {
  test('In the document', () => {
    renderComponent(<Flex />);

    expect(screen.getByTestId('flex')).toBeInTheDocument();
  });
});
