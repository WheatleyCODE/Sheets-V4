import type { INotification } from '../../model/types/notification.interface';

export interface INotificationListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  notification: INotification;
}
