import { lazy } from 'react';

export const TemplateDetailsPage = lazy(
  () =>
    new Promise((res) => {
      // @ts-ignore
      setTimeout(() => res(import('./TemplateDetailsPage')), 500);
    }),
);
