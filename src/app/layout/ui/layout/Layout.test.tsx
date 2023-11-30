import { screen } from '@testing-library/react';
import { Layout } from './Layout';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('Layout', () => {
  test('In the document', () => {
    renderComponent(
      <Layout>
        <h1>Hello</h1>
      </Layout>,
    );

    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByTestId('layout')).toBeInTheDocument();
  });
});
