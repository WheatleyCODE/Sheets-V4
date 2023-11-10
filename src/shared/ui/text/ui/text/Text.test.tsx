import { screen } from '@testing-library/react';
import { Text } from './Text';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';
import { TextSize, TextStyle } from './Text.consts';

describe('PageError', () => {
  test('In the document', () => {
    renderComponent(<Text text="text" />);

    expect(screen.getByText('text')).toBeInTheDocument();
    expect(screen.getByTestId('text')).toBeInTheDocument();
  });

  test('In the document', () => {
    renderComponent(<Text title="title" />);

    expect(screen.getByText('title')).toBeInTheDocument();
  });

  test('In the document + classes', () => {
    renderComponent(<Text textSize={TextSize.BIG} textStyle={TextStyle.ERROR} title="title" />);

    const container = screen.getByTestId('text');
    expect(screen.getByText('title')).toBeInTheDocument();
    expect(container).toHaveClass('big');
    expect(container).toHaveClass('error');
  });
});
