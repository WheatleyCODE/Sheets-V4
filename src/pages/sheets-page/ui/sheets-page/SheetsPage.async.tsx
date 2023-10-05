import { lazy } from 'react';

export const SheetsPage = lazy(
  () =>
    new Promise((res) => {
      // @ts-ignore

      setTimeout(() => res(import('./SheetsPage')), 500);
    }),
);
