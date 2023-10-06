import { lazy } from 'react';

export const TemplatesPage = lazy(
  () =>
    new Promise((res) => {
      // @ts-ignore
      setTimeout(() => res(import('./TemplatesPage')), 500);
    }),
);
