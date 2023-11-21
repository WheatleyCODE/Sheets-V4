export interface IMobileDrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
  maxChange?: number;
  translateY?: number;
}
