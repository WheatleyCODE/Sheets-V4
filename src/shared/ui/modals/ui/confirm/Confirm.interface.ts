export interface IConfirmProps extends React.HTMLAttributes<HTMLDivElement> {
  acceptTitle?: string;
  cancelTitle?: string;
  onAccept?: () => void;
  onCancel?: () => void;
}
