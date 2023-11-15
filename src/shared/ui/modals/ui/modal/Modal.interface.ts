export interface IModalProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
  isHideCloseButton?: boolean;
}
