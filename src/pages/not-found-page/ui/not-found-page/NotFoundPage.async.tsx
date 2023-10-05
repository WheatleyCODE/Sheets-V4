import { lazy } from 'react';

export const NotFoundPage = lazy(
  () =>
    new Promise((res) => {
      // @ts-ignore
      setTimeout(() => res(import('./NotFoundPage')), 500);
    }),
);
