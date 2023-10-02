import { lazy } from 'react';

export const ProfilePage = lazy(
  () =>
    new Promise((res) => {
      // @ts-ignore
      setTimeout(() => res(import('./ProfilePage')), 500);
    }),
);
