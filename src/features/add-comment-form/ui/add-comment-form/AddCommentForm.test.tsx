import { fireEvent, screen } from '@testing-library/react';
import { AddCommentForm } from './AddCommentForm';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';

describe('AddCommentForm', () => {
  test('In the document', () => {
    renderComponent(<AddCommentForm addComment={() => {}} />);

    expect(screen.getByTestId('addCommentForm')).toBeInTheDocument();
  });

  test('In the document + button click', () => {
    const addComment = jest.fn();

    renderComponent(<AddCommentForm addComment={addComment} />);

    const button = screen.getByText('Отправить');
    const input = screen.getByTestId('commentInput');
    fireEvent.change(input, { target: { value: '23' } });
    fireEvent.click(button);

    expect(screen.getByTestId('addCommentForm')).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(addComment.mock.calls.length).toBe(1);
  });

  test('In the document + button click empty', () => {
    const addComment = jest.fn();

    renderComponent(<AddCommentForm addComment={addComment} />);

    const button = screen.getByText('Отправить');
    fireEvent.click(button);

    expect(screen.getByTestId('addCommentForm')).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(addComment.mock.calls.length).toBe(0);
  });
});
