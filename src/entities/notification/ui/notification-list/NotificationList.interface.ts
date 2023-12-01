export interface INotificationListProps extends React.HTMLAttributes<HTMLDivElement> {
  onLinkClick?: () => void;
  userId?: string;
}
