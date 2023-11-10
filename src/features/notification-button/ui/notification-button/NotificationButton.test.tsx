import { screen } from '@testing-library/react';
import { NotificationButton } from './NotificationButton';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';

describe('NotificationButton', () => {
  test('In the document', () => {
    renderComponent(<NotificationButton />);

    expect(screen.getByTestId('notificationButton')).toBeInTheDocument();
  });
});
