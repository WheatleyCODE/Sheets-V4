import type { IComment } from '../../model/types/comment.interface';

export interface ICommentListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  comment: IComment;
  navigateToProfileText?: string;
}
