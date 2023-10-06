import { screen } from '@testing-library/react';
import { InputPlaceholder } from './InputPlaceholder';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';

describe('InputOptionsMenu', () => {
  test('In the document', () => {
    renderComponent(<InputPlaceholder placeholder="Email" />);

    expect(screen.getByTestId('inputOptionsMenu')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });
});
