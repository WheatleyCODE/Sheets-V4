import { screen } from '@testing-library/react';
import { NotificationListItem } from './NotificationListItem';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('NotificationListItem', () => {
  test('In the document', () => {
    renderComponent(<NotificationListItem notification={{} as any} />);

    expect(screen.getByTestId('notificationListItem')).toBeInTheDocument();
  });
});
