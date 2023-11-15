import { FC } from 'react';
import { curry } from '../../fp';

export const withProvider = curry((Provider: FC<any>, Component: FC<any>) => (props: any) => {
  return (
    <Provider>
      <Component {...props} />
    </Provider>
  );
});
