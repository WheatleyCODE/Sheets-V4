import { screen } from '@testing-library/react';
import { AddCommentForm } from './AddCommentForm';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';

describe('AddCommentForm', () => {
  test('In the document', () => {
    renderComponent(<AddCommentForm addComment={() => {}} />);

    expect(screen.getByTestId('addCommentForm')).toBeInTheDocument();
  });
});
