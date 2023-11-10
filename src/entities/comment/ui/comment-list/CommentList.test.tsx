import { screen } from '@testing-library/react';
import { CommentList } from './CommentList';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

const comments = [
  {
    id: '1',
    text: 'Comment',
    user: {
      id: 'id1',
      email: 'email',
      avatar: 'https://cdn1.tenchat.ru/static/vbc-gostinder/user-picture/cdc8face-2608-4f07-90c3-68776d03c246.jpeg',
      username: 'Admin',
    },
  },
  {
    id: '2',
    text: 'Comment2',
    user: {
      id: 'id12',
      email: 'email',
      avatar: 'https://cdn1.tenchat.ru/static/vbc-gostinder/user-picture/cdc8face-2608-4f07-90c3-68776d03c246.jpeg',
      username: 'Admin2',
    },
  },
];

describe('CommentList', () => {
  test('In the document', () => {
    renderComponent(<CommentList comments={comments} />);

    expect(screen.getByTestId('commentList')).toBeInTheDocument();
  });
});
