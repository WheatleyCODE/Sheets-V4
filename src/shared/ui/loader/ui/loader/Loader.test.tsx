import { screen } from '@testing-library/react';
import { Loader } from './Loader';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';

describe('Loader', () => {
  test('In the document', () => {
    renderComponent(<Loader />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('In the document + class center', () => {
    renderComponent(<Loader isCenter />);

    const loader = screen.getByTestId('loader');

    expect(loader).toBeInTheDocument();
    expect(loader).toHaveClass('center');
  });
});
