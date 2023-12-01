export interface IAddCommentFormProps extends React.HTMLAttributes<HTMLDivElement> {
  addComment: (text: string) => void;
  commentPlaceholder?: string;
  sendCommentText?: string;
}
