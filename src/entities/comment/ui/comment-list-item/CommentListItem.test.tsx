import { screen } from '@testing-library/react';
import { CommentListItem } from './CommentListItem';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';

const comment = {
  id: '1',
  text: 'Comment',
  user: {
    id: 'id1',
    email: 'email',
    avatar: 'https://cdn1.tenchat.ru/static/vbc-gostinder/user-picture/cdc8face-2608-4f07-90c3-68776d03c246.jpeg',
    username: 'Admin',
  },
};

describe('CommentListItem', () => {
  test('In the document', () => {
    renderComponent(<CommentListItem comment={comment} />);

    expect(screen.getByTestId('commentListItem')).toBeInTheDocument();
    expect(screen.getByTestId('imageLoad')).toBeInTheDocument();
    expect(screen.getByText('Comment')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
  });
});
