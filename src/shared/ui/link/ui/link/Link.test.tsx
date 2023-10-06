import { screen } from '@testing-library/react';
import { Link } from './Link';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';

describe('Link', () => {
  test('In the document', () => {
    renderComponent(
      <Link to="/">
        <h1>link</h1>
      </Link>,
    );

    expect(screen.getByTestId('link')).toBeInTheDocument();
    expect(screen.getByText('link')).toBeInTheDocument();
  });
});
