import { lazy } from 'react';

export const RegisterFormAsync = lazy(
  () =>
    new Promise((res) => {
      // @ts-ignore
      setTimeout(() => res(import('./RegisterForm')), 500);
    }),
);
