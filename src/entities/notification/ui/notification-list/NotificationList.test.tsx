import { screen } from '@testing-library/react';
import { NotificationList } from './NotificationList';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('NotificationList', () => {
  test('In the document', () => {
    renderComponent(<NotificationList />);

    expect(screen.getByTestId('notificationList')).toBeInTheDocument();
  });
});
