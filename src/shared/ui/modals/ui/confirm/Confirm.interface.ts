export interface IConfirmProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  acceptTitle?: string;
  cancelTitle?: string;
  onAccept?: () => void;
  onCancel?: () => void;
}
