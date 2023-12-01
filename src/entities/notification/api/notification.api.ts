import { rtkApi } from '@/shared/api';
import type { INotification } from '../model/types/notification.interface';

export const notificationApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getNotifications: build.query<INotification[], string | undefined>({
      query: (userId) => ({
        url: '/notifications',
        params: {
          userId,
        },
      }),
    }),
  }),
});

export const useNotifications = notificationApi.useGetNotificationsQuery;
