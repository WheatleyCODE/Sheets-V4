import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LS_AUTH_KEY } from '@/shared/consts';
import { KVFactory } from '@/shared/lib/kv-storage';

const ls = KVFactory();

export const rtkApi = createApi({
  reducerPath: 'rtkApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000',
    prepareHeaders: (headers) => {
      // * Sync
      ls.get<string>(LS_AUTH_KEY).then((value) => headers.set('Authorization', `${value}`));
      return headers;
    },
  }),
  endpoints: () => ({}),
});
