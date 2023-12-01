export interface IRatingProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  feedbackTitle?: string;
  isFeedback?: boolean;
  rate?: number;
  onAccept?: (rate: number, feedback: string) => void;
  onCancel?: (rate: number) => void;
  isStarred?: boolean;
  staredText?: string;
  cancelText?: string;
  acceptText?: string;
  feedbackPlaceholder?: string;
}
