import { fireEvent, screen } from '@testing-library/react';
import { Title } from './Title';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';
import { sleep } from 'shared/lib/promises';

describe('InputOptionsMenu', () => {
  test('In the document', () => {
    renderComponent(<Title text="Email" />);

    expect(screen.getByTestId('title')).toBeInTheDocument();
    expect(screen.queryByText('Email')).not.toBeInTheDocument();
  });

  test('In the document + hover', async () => {
    renderComponent(<Title text="Email" />);

    const title = screen.getByTestId('title');
    expect(title).toBeInTheDocument();
    fireEvent.mouseEnter(title);
    await sleep(1000);
    expect(screen.getByText('Email')).toBeInTheDocument();
  });
});
