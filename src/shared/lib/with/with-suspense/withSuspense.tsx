import { FC, Suspense, SuspenseProps } from 'react';
import { curry } from '../../fp';

export const withSuspense = curry((suspenseProps: SuspenseProps, Component: FC<any>) => (props: any) => {
  return (
    <Suspense {...suspenseProps}>
      <Component {...props} />
    </Suspense>
  );
});
