import { screen } from '@testing-library/react';
import { Portal } from './Portal';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';
import { Theme } from '@/app/providers/lib';

describe('Portal', () => {
  test('In the document', () => {
    renderComponent(
      <Portal>
        <h1>h1</h1>
      </Portal>,
    );

    expect(screen.getByTestId('portal')).toBeInTheDocument();
    expect(screen.getByText('h1')).toBeInTheDocument();
  });

  test('In the document + classes light theme', () => {
    renderComponent(
      <Portal>
        <h1>h1</h1>
      </Portal>,
    );
    const portal = screen.getByTestId('portal');

    expect(screen.getByText('h1')).toBeInTheDocument();
    expect(portal).toBeInTheDocument();
    expect(portal).toHaveClass('app');
    expect(portal).toHaveClass('light');
  });

  test('In the document + classes dark theme', () => {
    renderComponent(
      <Portal>
        <h1>h1</h1>
      </Portal>,
      { initTheme: Theme.DARK },
    );
    const portal = screen.getByTestId('portal');

    expect(screen.getByText('h1')).toBeInTheDocument();
    expect(portal).toBeInTheDocument();
    expect(portal).toHaveClass('app');
    expect(portal).toHaveClass('dark');
  });
});
