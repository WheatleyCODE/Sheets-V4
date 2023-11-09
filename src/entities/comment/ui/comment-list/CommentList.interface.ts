import type { IComment } from '../../model/types/comment.interface';

export interface ICommentListProps extends React.HTMLAttributes<HTMLDivElement> {
  comments?: IComment[];
  isLoading?: boolean;
  error?: string | null;
}
