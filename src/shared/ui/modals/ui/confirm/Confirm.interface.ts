export interface IConfirmProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  acceptText?: string;
  cancelText?: string;
  onAccept?: () => void;
  onCancel?: () => void;
}
